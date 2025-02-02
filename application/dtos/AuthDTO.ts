export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface ForgotPasswordDTO {
    email: string;
}

export interface ChangePasswordDTO {
    token: string; 
    password: string;
    confirmPassword: string;
}

export interface AuthDTO {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}



// Conversion entre domain et infrastructure, si l'infrastructure comprend uniqument des JSON ou du bineair si t'es RPC (Remote protocol call) par exemple 