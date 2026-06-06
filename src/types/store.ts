import { Brand } from "./brand";
import { User } from "./user";

export interface AuthState {
    accessToken: string | null;
    user: User | null;
    loading: boolean;

    clearState: () => void;
    signUp: (name: string, email: string, password: string, confirmPassword: string ) => Promise<boolean>;
    singIn: (email: string, password: string) => Promise<boolean>;
    signOut: () => Promise<void>;
}

export interface BrandState {
    data: Brand[];
    loading: boolean;

    getBrands: () => Promise<void>;
    createBrand: (name: string, description: string, logoUrl: string) => Promise<boolean>;
    updateBrand: (id: string, name: string, description: string, logoUrl: string) => Promise<boolean>;
    removeBrand: (id: string) => Promise<void>;
}