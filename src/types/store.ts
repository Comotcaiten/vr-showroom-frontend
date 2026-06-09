import { Brand } from "./brand";
import { Category } from "./category";
import { User } from "./user";
import { Model } from "./model";
import { Furniture } from "./furniture";

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
    dataBrand: Brand[];
    loading: boolean;

    getBrands: () => Promise<void>;
    createBrand: (name: string, description: string, logoUrl: string) => Promise<boolean>;
    updateBrand: (id: string, name: string, description: string, logoUrl: string) => Promise<boolean>;
    removeBrand: (id: string) => Promise<void>;
}

export interface CategoryState {
    dataCategory: Category[];
    loading: boolean;

    getCategorys: () => Promise<void>;
    createCategory: (name: string, description: string, categoryUrl: string) => Promise<boolean>;
    updateCategory: (id: string, name: string, description: string, categoryUrl: string) => Promise<boolean>;
    removeCategory: (id: string) => Promise<void>;
}

export interface ModelState {
    dataModel: Model[];
    loading: boolean;

    getModels: () => Promise<void>;
    createModel: (file: File) => Promise<boolean>;
    removeModel: (id: string) => Promise<void>;
}

export interface FurnitureState {
    dataFurniture: Furniture[];
    loading: boolean;

    getFurnitures: () => Promise<void>;
    createFurniture: (
        name: string, 
        description: string, 
        categoryId: string, 
        brandId: string, 
        price: Number, 
        quantity: Number, 
        modelId: string, 
        thumbnailUrl: string
    ) => Promise<boolean>;
    updateFurniture: (
        id: String,
        name: string, 
        description: string, 
        categoryId: string, 
        brandId: string, 
        price: Number, 
        quantity: Number, 
        modelId: string, 
        thumbnailUrl: string
    ) => Promise<boolean>;
    removeFurniture: (id: String) => Promise<void>;
}