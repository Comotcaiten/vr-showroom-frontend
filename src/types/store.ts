import { Brand } from "./brand";
import { Category } from "./category";
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

export interface CategoryState {
    data: Category[];
    loading: boolean;

    getCategorys: () => Promise<void>;
    createCategory: (name: string, description: string, categoryUrl: string) => Promise<boolean>;
    updateCategory: (id: string, name: string, description: string, categoryUrl: string) => Promise<boolean>;
    removeCategory: (id: string) => Promise<void>;
}