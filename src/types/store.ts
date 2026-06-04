import { User } from "./user";

export interface AuthState {
    accessToken: string | null;
    user: User | null;
    loading: boolean;

    clearState: () => void;
    signUp: (name: string, email: string, password: string, confirmPassword: string ) => Promise<void>;
    singIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}