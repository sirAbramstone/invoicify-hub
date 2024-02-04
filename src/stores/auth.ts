import { defineStore } from 'pinia';
import { ref, Ref, computed, ComputedRef } from 'vue';
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
    const session: Ref<User> = ref({} as User);

    async function signup ({ email, password }: UserCredentials) {
        await auth.signup(email, password);
    }

    async function confirmSignup(token: Token) {
        session.value = await auth.confirm(token, true);
    }

    async function login({ email, password }: UserCredentials) {
        const session = await auth.login(email, password, true);
    }

    async function logout() {
        const user = auth.currentUser();

        if (user == null) {
            return;
        }

        await user.logout();
    }

    const userEmail: ComputedRef<string|null> = computed(() => session.value?.email ?? null);

    const accessToken: ComputedRef<string|null> = computed(() => session.value?.token.access_token ?? null);
});
