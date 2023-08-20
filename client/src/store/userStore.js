import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userStore = (set) => ({
    isAuth: false,
    user: {},
    isAccess: false,
    users: [],
    search: {},
    contributers : [],
    isLoading : false,
    addUser: (user) => {
        set(() => ({
            isAuth: true,
            user: user,
        }))
    },
    addUsers: (users, search) => {
        set(() => ({
            users: users,
            search: search
        }))
    },
    addContributers: (contributers) => {
        set(() => ({
            contributers: contributers
        }))
    },
    deleteContributers: (id) => {
        set((state) => ({
            contributers: state.contributers.filter(contributer => contributer._id !== id)
        }))
    },
    setViewAccess: () => {
        set(() => ({
            isAccess: true,
        }))
    },
    removeViewAccess: () => {
        set(() => ({
            isAccess: false,
        }))
    },
    activeLoading : () => {
        set(() =>({
            isLoading : true
        }))
    },
    cancelLoading : () => {
        set(() =>({
            isLoading : false
        }))
    },
    removeUser: () => {
        set(() => ({
            isAuth: false,
            user: {},
            isAccess: false,
            users: [],
            search: {},
        }))
    }
})
const useUserStore = create(
    devtools(
        persist(userStore, {
            name: "user"
        })
    )
)
export default useUserStore;