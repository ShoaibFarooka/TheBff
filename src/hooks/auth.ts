// import axios from 'axios'
import { create } from 'zustand'

interface AuthState {
    user: any,
    token: string,
    isLoading: boolean,
    status: 'loading' | 'authenticated' | 'unauthenticated',
    logout: () => void,
    authenticate: () => any,
}

// a hook to manage authentication state, fetch session from api and set it in the store
export const useAuth = create<AuthState>((set, get) => {

    const authenticate = async () => {
        try{
            // wait 4 seconds before fetching session
            // await new Promise((resolve) => setTimeout(resolve, 4000))
            
            const res = await fetch('/api/auth/me', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                },
            });
            
            if(res.status === 200) {
            const d = await res.json()
                set({ user: d, isLoading: false, status: 'authenticated' })
            }else {
                set({ user: null as any, status: 'unauthenticated', isLoading: false })
            }
        } catch (error) {
            console.log(error)
            set({ user: null as any, status: 'unauthenticated', isLoading: false })
        }
    }

    // if(typeof window !== 'undefined') authenticate()
    // useEffect(() => {
    // }, [])

    const logout = () => {
        // delete token from cookie
        document.cookie = 'token=; SameSite=Strict; Max-Age=0;'
        set({ user: null as any, status: 'unauthenticated', isLoading: false })
    }

    return {    
        user: null,
        token: '',
        isLoading: true,
        status: 'loading',
        logout,
        authenticate
    }
})