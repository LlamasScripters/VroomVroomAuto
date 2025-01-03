export interface Moto {
    id?: string;
    marque: string;
    model: string;
    serialNumber: string;
    kilometrage: number;
    dateMiseEnService: string;
    status: string;
  }
  
  export interface Entretien {
    id?: string;
    motoId: string;
    type: string;
    description: string;
    date: string;
    status: string;
  }
  