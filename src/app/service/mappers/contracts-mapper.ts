import {firstValueFrom, Observable} from "rxjs";

import {TranslateService} from "@ngx-translate/core";

export const expectedWarnMonths = 6

const mockData = {
  values: [
    {
      reference: '806089',
      customer: 'Britney Allen',
      description: 'Rafale E-Tech Full hybrid',
      product: 'Financial Lease',
      expectedEndDate: '01/12/2025'
    },
    {
      reference: '878961',
      customer: 'Ashley White',
      description: 'Arkana E-Tech 100% electric',
      product: 'Financial Lease',
      expectedEndDate: '12/02/2025',
    },
    {
      reference: '806078',
      customer: 'David Franco',
      description: 'Scenic E-Tech 100% electric',
      product: 'Financing',
      expectedEndDate: '31/10/2024',
    },
    {
      reference: '456987',
      customer: 'Tobias Jurgen',
      description: 'Rafale E-Tech Full hybrid',
      product: 'Financing',
      expectedEndDate: '12/08/2024',
    },
    {
      reference: '461239',
      customer: 'Elliot Graf',
      description: 'Rafale E-Tech Full hybrid',
      product: 'Maintenance',
      expectedEndDate: '12/12/2025',
    },
    {
      reference: '789452',
      customer: 'Kathryn Mathis',
      description: 'Scenic E-Tech 100% electric',
      product: 'Maintenance',
      expectedEndDate: '12/12/2026',
    },
    {
      reference: '1236589',
      customer: 'Bella Huffman',
      description: 'Arkana E-Tech 100% electric',
      product: 'Financial Lease',
      expectedEndDate: '12/08/2024',
    },
    {
      reference: '1245698',
      customer: 'Amy Hansen',
      description: 'Scenic E-Tech 100% electric',
      product: 'Financial Lease',
      expectedEndDate: '12/08/2024',
    },
    {
      reference: '7418521',
      customer: 'Roland Bourdon',
      description: 'Arkana E-Tech 100% electric',
      product: 'Financial Lease',
      expectedEndDate: '12/08/2024',
    }
  ],
}

export const mockTableData = (translate: TranslateService) => {
  return new Observable<any>(subscriber => {
    Promise.all([
      firstValueFrom(translate.get('PAGES.COMPONENTS.LIST.SHARED.REFERENCE')),
      firstValueFrom(translate.get('PAGES.COMPONENTS.LIST.SHARED.CUSTOMER_NAME')),
      firstValueFrom(translate.get('PAGES.COMPONENTS.LIST.SHARED.DESCRIPTION')),
      firstValueFrom(translate.get('PAGES.COMPONENTS.LIST.SHARED.PRODUCT')),
      firstValueFrom(translate.get('PAGES.COMPONENTS.LIST.SHARED.EXPECTED_END_DATE')),


    ]).then((data) => {
      subscriber.next({
        headers: [
        { header: data[0], field: 'reference' },
        { header: data[1], field: 'customer' },
        { header: data[2], field: 'description' },
        { header: data[3], field: 'product' },
        { header: data[4], field: 'expectedEndDate' },
      ],
        values: [
          ...mockData.values,
          ...mockData.values,
          ...mockData.values,
          ...mockData.values
        ],
        expansionRow: [
        [
          { label: 'vehicle', value: 'vehicle' },
          { label: 'vehicle', value: 'vehicle' },
          { label: 'vehicle', value: 'vehicle' },
        ],
        [
          { label: 'vehicle', value: 'vehicle' },
          { label: 'vehicle', value: 'vehicle' },
          { label: 'vehicle', value: 'vehicle' },
        ]
      ],
      })
    })

  })
}

