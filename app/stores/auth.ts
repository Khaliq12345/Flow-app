// stores/auth.ts
import { defineStore } from "pinia";

export interface AuthUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string; // ex: "97000000"
  phone_country?: string; // ex: "BJ"
}

export const useAuthStore = defineStore("auth", () => {
  // ─── State ──────────────────────────────────────────────────────────────────
  const user = ref<AuthUser | null>(null);
  const isAuthenticated = ref(false);

  // ─── Getters ────────────────────────────────────────────────────────────────

  /** Retourne l'utilisateur connecté */
  const currentUser = computed(() => user.value);

  // ─── Actions ────────────────────────────────────────────────────────────────

  /** Initialise l'utilisateur (à appeler au login ou à l'hydratation SSR) */
  function setUser(payload: AuthUser) {
    user.value = payload;
    isAuthenticated.value = true;
  }

  /** Déconnecte l'utilisateur et réinitialise le store */
  function logout() {
    user.value = null;
    isAuthenticated.value = false;
  }

  return {
    // state
    user,
    isAuthenticated,
    // getters
    currentUser,
    // actions
    setUser,
    logout,
  };
});
