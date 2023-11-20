import {defineStore} from "pinia";
import type {AccountInfo} from "@azure/msal-common";

interface AuthStoreState {
    _currentUser: AccountInfo | null;
}

export const useAuthStore = defineStore('auth-store', {
    state: (): AuthStoreState => ({
        _currentUser: null,
    }),
    actions: {
        updateUser(user: AccountInfo | null) {
            this._currentUser = user
        },
    },
    getters: {
        isLoggedIn: (state): boolean => state._currentUser !== null,
        currentUser: (state): AccountInfo | null => state._currentUser,
    },
})