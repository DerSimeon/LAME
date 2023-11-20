import {useAuthStore} from "~/store/useAuth";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn && to.path !== '/') {
        return '/'
    }
})