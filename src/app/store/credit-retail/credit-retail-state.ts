import {getState, patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {CreditApplication} from "../../domain/credit-retail";
import {
  activeStates,
  archivedStates,
  awaitingDeliveryStates,
  dateTimeFormat,
  pendingStates,
  preApprovedStates
} from "../../service/mappers/credit-retail-mapper";
import {CreditRequestService} from "../../service/credit-request.service";
import {computed} from "@angular/core";
import {
  CreditApplicationsBySalesPerson,
  CreditRequestState,
  CreditRetailState, FindPendingContractState,
  initialState
} from "./objects";
import {
  addApplicantStipulationsDocumentsState, addPendingContractApplicantStipulationsDocumentsState,
  getCreditRequestsBySalesPerson,
  groupCreditApplicationsBySalesPerson,
  removeApplicantStipulationsDocumentsState,
  setSalesPersonSelected, updateCanceledCreditApplication, updateContractsDetailState,
  updateCreditApplicationDynamicAttribute,
  updateCreditRequestState,
  updateRefreshDataState
} from "./functions";
import moment from "moment";
import {FindPendingContract} from "../../domain/dealer/model/find-pending-contract";
import {
  DeliveryInformationComponentModel
} from "../../component/shared/credit-request-detail/contract-delivery/delivery-information/delivery-information.component";
import {async} from "rxjs";

export * from './objects'
export * from './functions'

export const CreditRetailStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({
                  creditRequests,
                  salesPersonState,
                  pendingContractsState,
                  lastRefresh}) => ({
    lastRefreshDate: computed<any> (() => {
        if (!lastRefresh) {
          return undefined
        }
        return lastRefresh()
      }
    ),
    lastRefresh: computed<any> (() => {
        if (!lastRefresh) {
          return '-'
        }
        return `${moment(lastRefresh()).format(dateTimeFormat)}`
      }
    ),
    findPendingContracts: computed<FindPendingContractState[]> (
      () => {
        return pendingContractsState().pendingContracts
      }
    ),
    salesPerson: computed<CreditApplicationsBySalesPerson[]> (
      () => groupCreditApplicationsBySalesPerson(creditRequests())
    ),
    creditRequestsBySalesPerson: computed<CreditRequestState[]>(
      () => getCreditRequestsBySalesPerson(creditRequests(), salesPersonState().salesPersonSelected)
    ),
    preApproved: computed<CreditRequestState[]>(
      () => getCreditRequestsBySalesPerson(creditRequests(), salesPersonState().salesPersonSelected).filter(data => preApprovedStates.some(item => item === data.creditApplication.status?.enumId))
    ),
    pending: computed<CreditRequestState[]>(
      () => getCreditRequestsBySalesPerson(creditRequests(), salesPersonState().salesPersonSelected).filter(data => pendingStates.some(item => item === data.creditApplication.status?.enumId))
    ),
    awaitingDelivery: computed<CreditRequestState[]>(
      () => getCreditRequestsBySalesPerson(creditRequests(), salesPersonState().salesPersonSelected).filter(data => awaitingDeliveryStates.some(item => item === data.creditApplication.status?.enumId))
    ),
    lastCreatedCreditRequests: computed<CreditRequestState[]>(
      () => getCreditRequestsBySalesPerson(creditRequests(), salesPersonState().salesPersonSelected).slice(0, 8)
    ),
    activeRequests: computed<CreditRequestState[]>(
      () => getCreditRequestsBySalesPerson(creditRequests(), salesPersonState().salesPersonSelected).filter(data => activeStates.some(item => item === data.creditApplication.status?.enumId))
    ),
    archivedRequests: computed<CreditRequestState[]>(
      () => getCreditRequestsBySalesPerson(creditRequests(), salesPersonState().salesPersonSelected).filter(data => archivedStates.some(item => item === data.creditApplication.status?.enumId))
    ),
  })),
  withMethods(({...store}) => ({

    getCreditApplications: async (service: CreditRequestService) => {
      await service.getCreditRequests().then(data => {
        patchState(store, {creditRequests: data})

        const salesPerson = groupCreditApplicationsBySalesPerson(data)
        patchState(store, {salesPersonState: { salesPersonSelected: salesPerson }})

        // complete active credit requests

        store.lastCreatedCreditRequests().forEach(data => {
          service.getSalesQuote(data.creditApplication)
            .then(salesQuote =>
              patchState(store, (state: CreditRetailState) =>
                updateCreditRequestState(state, data.creditApplicationId, undefined, salesQuote)))

          service.getCustomer(data.creditApplication)
            .then(customer =>
              patchState(store, (state: CreditRetailState) =>
                updateCreditRequestState(state, data.creditApplicationId, undefined, undefined, customer)))
        })

        // complete pre approved requests

        store.preApproved().forEach(data =>
          service.getCreditApplicants(data.creditApplication)
            .then(creditApplicants =>
              patchState(store, (state: CreditRetailState) =>
                updateCreditRequestState(state, data.creditApplicationId, creditApplicants))))
      })
      // const contractsResponse = await service.getPendingContractList()
      // service.getPendingContractDetails(contractsResponse.pendingContracts).then(result => patchState(store, (state: CreditRetailState) => {
      //
      //   // TODO review
      //   // result.forEach(data => {
      //   //   service.fetchCreditRequestDetail(
      //   //     data.creditApplication.creditApplicationId!,
      //   //     getState(store).creditRequests,
      //   //     getState(store).pendingContractsState
      //   //   ).then(data => {
      //   //     const {creditRequests, creditRequestDetail} = data
      //   //     patchState(store, (state  => {
      //   //         state.creditRequests = creditRequests
      //   //         state.creditRequestDetail = creditRequestDetail
      //   //         return state
      //   //       }
      //   //     ))
      //   //   })
      //   // })
      //
      //   return updateContractsDetailState(state, result)
      // }))

      patchState(store, (state: CreditRetailState) => updateRefreshDataState(state))

    },

    completeLastCreatedCreditRequests: async (service: CreditRequestService, creditRequestState: CreditRequestState) => {
      service.getSalesQuote(creditRequestState.creditApplication)
        .then(salesQuote =>
          patchState(store, (state: CreditRetailState) =>
            updateCreditRequestState(state, creditRequestState.creditApplicationId, undefined, salesQuote)))

      service.getCustomer(creditRequestState.creditApplication)
        .then(customer =>
          patchState(store, (state: CreditRetailState) =>
            updateCreditRequestState(state, creditRequestState.creditApplicationId, undefined, undefined, customer)))
    },

    getCreditApplicationsArchived: async (service: CreditRequestService, count: number, offset: number) => {
      return await service.getCreditRequestsArchived(count, offset)
    },

    getCreditRequestsPreApproved: (service: CreditRequestService, preApprovedRequests: CreditRequestState[]) => {
      preApprovedRequests
        .filter(data => !data.salesQuote)
        .forEach(data => {
          service.getSalesQuote(data.creditApplication)
                 .then(salesQuote => {
                   if (salesQuote) {
                     patchState(store, (state: CreditRetailState) =>
                       updateCreditRequestState(state, data.creditApplicationId, undefined, salesQuote))
                   }
                 })
          service.getCreditApplicants(data.creditApplication).then(creditApplicants => {
            if (creditApplicants) {
              data.creditApplicants = creditApplicants
              patchState(store, (state: CreditRetailState) =>
                updateCreditRequestState(state, data.creditApplicationId, creditApplicants, undefined))
            }
          });
        })
    },

    getCreditRequestsPending: (service: CreditRequestService, pendingRequests: CreditRequestState[]) => {
      pendingRequests
        .filter(pe => !pe.salesQuote)
        .forEach(pe => {
          service.getSalesQuote(pe.creditApplication).then(salesQuote => {
            if (salesQuote) {
              patchState(store, (state: CreditRetailState) =>
                updateCreditRequestState(state, pe.creditApplicationId, undefined, salesQuote))
            }
          });
          service.getCreditApplicants(pe.creditApplication).then(creditApplicants => {
            if (creditApplicants) {
              pe.creditApplicants = creditApplicants
              patchState(store, (state: CreditRetailState) =>
                updateCreditRequestState(state, pe.creditApplicationId, creditApplicants, undefined))
            }
          });
      })
    },

    getCreditApplicationDetail: async (service: CreditRequestService, creditApplicationId: string) => {
      return service.fetchCreditRequestDetail(
        creditApplicationId,
        getState(store).creditRequests,
        getState(store).pendingContractsState
      ).then(data => {
        const {creditRequests, creditRequestDetail} = data
        patchState(store, (state  => {
            state.creditRequests = creditRequests
            state.creditRequestDetail = creditRequestDetail
            return state
          }
        ))
      })
    },


    cancelCreditApplication: (service: CreditRequestService, creditApplicationId: string) => {
      service.cancelCreditApplication(creditApplicationId).then(() => patchState(store, (state  => {
          return updateCanceledCreditApplication(state, creditApplicationId)
        }
      )))
    },

    clearCreditApplicationDetail: () => {
      patchState(store, (state  => {
          delete state.creditRequestDetail
          return state
        }
      ))
    },

    getCreditApplicants: async (service: CreditRequestService, creditApplication: CreditApplication) => {
      return await service.getCreditApplicants(creditApplication)
    },

    uploadApplicantStipulationsDocuments: async (service: CreditRequestService,
                                                 creditApplicationId: string,
                                                 applicantCreditScore: string,
                                                 stipulationId: string,
                                                 description: string,
                                                 file: File,
                                                 ) => {
      try {
        const response = await service.uploadCreditApplicantCreditScoresStipulationsDocuments(
          creditApplicationId,
          applicantCreditScore,
          stipulationId,
          description,
          file
        )
        patchState(store, (state  => {
            const documentId = response.documentId
            const documentName = file.name
            return addApplicantStipulationsDocumentsState(
              state,
              creditApplicationId,
              applicantCreditScore,
              stipulationId,
              documentId,
              documentName,
              description,
            )
          }
        ))
      } catch (e) {
        console.error(e)
        throw e
      }
      return true
    },

    uploadPendingContractStipulationsDocuments: async (service: CreditRequestService,
                                                       pendingContractId: string,
                                                       stipulationId: string,
                                                       description: string,
                                                       file: File,
    ) => {
      try {
        const response = await service.uploadPendingContractStipulationsDocuments(
          pendingContractId,
          stipulationId,
          description,
          file
        )
        patchState(store, (state  => {
            const documentId = response.documentId
            const documentName = file.name
            return addPendingContractApplicantStipulationsDocumentsState(
              state,
              pendingContractId,
              stipulationId,
              documentId,
              documentName,
              description,
            )
          }
        ))
      } catch (e) {
        console.error(e)
        throw e
      }
      return true
    },


    deleteApplicantStipulationsDocuments: async (service: CreditRequestService,
                                                 creditApplicationId: string,
                                                 applicantCreditScore: string,
                                                 stipulationId: string,
                                                 documentId: string,
    ) => {
      try {
        await service.deleteCreditApplicantCreditScoresStipulationsDocuments(
          creditApplicationId,
          applicantCreditScore,
          stipulationId,
          documentId,
        )
        patchState(store, (state  => {
            return removeApplicantStipulationsDocumentsState(
              state,
              creditApplicationId,
              applicantCreditScore,
              documentId,
            )
          }
        ))
      } catch (e) {
        console.error(e)
        throw e
      }
      return true
    },

    addCreditApplicationRemark: async (service: CreditRequestService,
                                       creditApplicationId: string,
                                       remark: string,
    ) => {
      try {
        const result = await service.addCreditApplicationRemark(
          creditApplicationId,
          remark,
        )
        const {dynamicAttributes} = result
        if (dynamicAttributes) {
          patchState(store, (state  => {
              return updateCreditApplicationDynamicAttribute(
                state,
                creditApplicationId,
                dynamicAttributes,
              )
            }
          ))
        }
      } catch (e) {
        console.error(e)
        throw e
      }
      return true
    },

    changeSalesPersonSelected: (creditApplicationsBySalesPersons: CreditApplicationsBySalesPerson[]) => {
      patchState(store, state => setSalesPersonSelected(state, creditApplicationsBySalesPersons))
    },

  //   Pending Contracts

    updatePendingContractDetail: async (service: CreditRequestService, payload: DeliveryInformationComponentModel) => {
      const {pendingContract} = payload
      const creditApplicationId = pendingContract.creditApplication.creditApplicationId!
      await service.updatePendingContractDetail(pendingContract)
      const {creditRequests, creditRequestDetail} = await service.fetchCreditRequestDetail(creditApplicationId, getState(store).creditRequests, getState(store).pendingContractsState)
      patchState(store, (state  => {
          state.creditRequests = creditRequests
          state.creditRequestDetail = creditRequestDetail
          return state
        }
      ))
    }

  })),
)
