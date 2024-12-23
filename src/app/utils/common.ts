import {MessageType} from "../service/app-message.service";

export const deepClone = (data: any) => JSON.parse(JSON.stringify(data))

export const sleep = async (delay: number) => await new Promise(resolve => setTimeout(resolve, delay))

export const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export const moneyFormat = (value: number, locale: string = 'de-DE' ) => new Intl.NumberFormat(locale, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(value)


export const downloadDocument = (documentBlob: Blob, name: string) => {
  const file = new Blob([documentBlob], { type: 'application/pdf' })
  const fileURL = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = fileURL;
  a.target = '_blank';
  a.download = name;
  document.body.appendChild(a);
  a.click();
}


export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function getEnumKeyByEnumValue<T extends {[index:string]:string}>(myEnum:T, enumValue:string):keyof T|null {
  let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : null;
}


export const groupBy = function(xs: any, key: any) {
  return xs.reduce(function(rv: any, x: any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};


export const dateFormat = 'DD/MM/YYYY'
