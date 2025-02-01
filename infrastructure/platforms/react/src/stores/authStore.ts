// stores/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    token: string | null;
    user: {
        id: string;
        email: string;
        role: string;
    } | null;
    setAuth: (token: string, user: any) => void;
    clearAuth: () => void;
    validateToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,

            setAuth: (token, user) => set({ token, user }),

            clearAuth: () => set({ token: null, user: null }),

            // Dans authStore.ts
            validateToken: async () => {
                const { token } = get();
                if (!token) return false;

                try {
                    const response = await fetch('http://localhost:3000/api/auth/me', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (!response.ok) throw new Error('Token invalid');

                    // On récupère le user
                    const user = await response.json();
                    // user = { id, email, role, ... }

                    // On met à jour dans le store
                    get().setAuth(token, user);

                    return true;
                } catch (error) {
                    get().clearAuth();
                    return false;
                }
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
