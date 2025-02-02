// application/dtos/MotoDTO.ts
export interface CreateMotoDTO {
  marque: string;
  model: string;
  serialNumber: string;
  kilometrage: number;
  dateMiseEnService: string;
  statut: string;
  userId: string;
}

export interface UpdateMotoDTO {
  motoId: string;
  marque?: string;
  model?: string;
  serialNumber?: string;
  kilometrage?: number;
  dateMiseEnService?: string;
  statut?: string;
  userId?: string;
}

export interface DeleteMotoDTO {
  motoId: string;
}

export interface GetMotoDTO {
  motoId: string;
}

export interface UserDTO {
  userId: string;
  username: string;
  email: string;
}

export interface MotoDTO {
  motoId: string;
  marque: string;
  model: string;
  serialNumber: string;
  kilometrage: number;
  dateMiseEnService: string;
  statut: string;
  userId: string;
  user?: UserDTO;
}