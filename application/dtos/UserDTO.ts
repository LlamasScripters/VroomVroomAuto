export interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
}

export interface UpdateUserDTO {
    userId: string;
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    isValidated?: boolean;
}

export interface DeleteUserDTO {
    userId: string;
}

export interface GetUserDTO {
    userId: string;
}

export interface UserDTO {
    userId: string;
    username: string;
    email: string;
    password: string;
    role: string;
    isValidated: boolean;
    dateCreation: Date;
    derniereConnexion: Date;
}


// Conversion entre domain et infrastructure, si l'infrastructure comprend uniqument des JSON ou du bineair si t'es RPC (Remote protocol call) par exemple 