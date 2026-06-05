import { authService } from "@/services/auth-service";
import { ApiResponse } from "@/types/api-response";
import { AuthResponse } from "@/types/auth-respons";
import { AuthState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand"


export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    clearState: () => {
        set({accessToken: null, user: null, loading: false});
    },

    signUp: async (name, email, password, confirmPassword) => {
        try {
            set({ loading: true });
            const res = await authService.register({ name, email, password, confirmPassword });
            const { user, accessToken } = res.data;
            set({
                user,
                accessToken,
            });
            toast.success("Dang ky thanh cong");
            return true;
        }
        catch (err) {
            let data = err as ApiResponse<AuthResponse>
            console.log(err);
            toast.error(`Dang ky that bai: ${data.message}`);
            return false;
        }
        finally {
            set({ loading: false });
        }
    },

    singIn: async (email, password) => {
        try {
            set({ loading: true });
            const res = await authService.login({ email, password });
            const { user, accessToken } = res.data;
            set({
                user,
                accessToken,
            });
            toast.success("Dang nhap thanh cong");
            return true;
        }
        catch (err) {
            let data = err as ApiResponse<AuthResponse>
            console.log(err);
            toast.error(`Dang nhap that bai: ${data.message}`);
            return false;
        }
        finally {
            set({ loading: false });
        }
    },

    signOut: async () => {
        try {
            get().clearState();
            authService.logout();
            toast.success("Logout thanh cong");
        }
        catch (err) {
            toast.error("Logout that bai");
            console.log(err);
        }
    }
}))