import { defineStore } from 'pinia';
import { ref, computed, ComputedRef } from 'vue';
import Auth, { User } from 'gotrue-js';

export interface UserCredentials {
    email: string;
    password: string;
}

export type Token = string;

const auth: Auth = new Auth({
    APIUrl: process.env.API_URL,
    audience: '',
    setCookie: true
});

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null as null | User);
    const isLoggedIn = ref(false);

    async function signup ({ email, password }: UserCredentials) {
        await auth.signup(email, password);
    }

    async function confirmSignup (token: Token) {
        user.value = await auth.confirm(token, true);
        isLoggedIn.value = true;
    }

    async function login ({ email, password }: UserCredentials) {
        user.value = await auth.login(email, password, true);
        isLoggedIn.value = true;
    }

    async function logout () {
        const user = auth.currentUser();

        if (user == null) {
            return;
        }

        await user.logout();
        isLoggedIn.value = false;
    }

    const currentUser: ComputedRef<User | null> = computed(() => user.value);
    const isAuthenticated: ComputedRef<boolean> = computed(() => isLoggedIn.value);
    const accessToken: ComputedRef<string | null> = computed(() => user.value?.token.access_token ?? null);

    return {
        currentUser,
        isAuthenticated,
        accessToken,
        signup,
        confirmSignup,
        login,
        logout
    };
});
