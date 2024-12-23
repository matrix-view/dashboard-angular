import * as XLSX from 'xlsx';

export class Export {

  private static EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  private static EXCEL_EXTENSION = '.xlsx'

  private static onDownloadExcel(data: any[], exportFilename: string) {
    const workSheet: XLSX.Sheet = XLSX.utils.json_to_sheet(data);
    const workBook: XLSX.WorkBook = { Sheets: { 'data': workSheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, exportFilename);
  }

  private static onDownloadPdf = (data: any[]) => {
    console.log('Downloading PDF with data:', data);
  }

  private static onDownloadWord = (data: any[]) => {
    console.log('Downloading Word with data:', data);
  }

  private static saveAsExcelFile(buffer: any, fileName: string): void {
    const blob: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  static exportTypes = [
    {
      name: "Excel",
      action: Export.onDownloadExcel.bind(this),
    },
    {
      name: "Pdf",
      action: Export.onDownloadPdf.bind(this),
    },
    {
      name: "Word",
      action: Export.onDownloadWord.bind(this),
    }
  ];
}
