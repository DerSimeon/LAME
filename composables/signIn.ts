import {useNuxtApp} from "#app";

export const signIn = async () => {
    const { $msal } = useNuxtApp()
    const loginRequest = {
        scopes: [
            'openid',
            'profile',
            'email'
        ],
    }
    try {
        await $msal.loginRedirect(loginRequest)
    }catch (err) {
        console.error('MSAL Failed : ', err)
    }
}