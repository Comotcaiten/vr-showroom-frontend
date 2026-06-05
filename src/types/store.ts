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