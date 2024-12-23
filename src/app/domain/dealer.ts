export class Dealer {
  code?: string;
  description?: string;
  secondaryCode?: string;
  reference?: string;
  name?: string;
  identifier?: string;

  constructor() {
  }

  static transformData = (data: string): Dealer[] => {
    return data.trim().split('\n').map(entry => {
      const [brandCode, secondaryCode, detail] = entry.split(';');
      const [code, description] = brandCode.split(':');
      const [reference, , name, identifier] = detail.split('|');
      return {
        code, description, secondaryCode, reference, name, identifier
      };
    });
  };

}
