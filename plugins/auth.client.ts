import * as msal from '@azure/msal-browser'
import {LogLevel} from '@azure/msal-browser'
import {defineNuxtPlugin, navigateTo} from "#app";
import {useAuthStore} from "~/store/useAuth";

export default defineNuxtPlugin(async (nuxtApp) => {
    const authStore = useAuthStore()
    const config = useRuntimeConfig()
    console.log(config)
    const msalConfig = {
        auth: {
            clientId: config.public.msal.auth.clientId,
            authority: config.public.msal.auth.authority,
            redirectUri: '/auth/callback',
        },
        cache: {
            cacheLocation: 'localStorage',
            storeAuthStateInCookie: true,
        },
    }
    const msalInstance = new msal.PublicClientApplication(msalConfig)
    await msalInstance.initialize()
    const account = msalInstance.getActiveAccount()

    if (account !== null) {
        if (account.idTokenClaims?.email === undefined) {
            navigateTo('/auth/error?e=invalid_email')
            return
        }
        authStore.updateUser(account)
    }
    msalInstance
        .handleRedirectPromise()
        .then((response) => {
            if (response) {
                const accounts = msalInstance.getAllAccounts()
                if (accounts.length > 0) {
                    msalInstance.setActiveAccount(accounts[0])
                    authStore.updateUser(accounts[0])
                }
            }
        })
        .catch((err) => {
            console.error('MSAL Failed : ', err)
        })
    nuxtApp.provide('msal', msalInstance)
})