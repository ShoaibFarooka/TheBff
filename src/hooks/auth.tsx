// import axios from 'axios'
import { useEffect } from "react";
import { create } from "zustand";

interface AuthState {
  user: any;
  token: string;
  isLoading: boolean;
  status: "loading" | "authenticated" | "unauthenticated";
  logout: () => void;
  authenticate: () => any;
}

// a hook to manage authentication state, fetch session from api and set it in the store
export const useAuth = create<AuthState>((set, get) => {
  const authenticate = async () => {
    // if authenticated, return
    if (get().status === "authenticated") return;

    try {
      const res = await fetch("/api/auth/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      if (res.status === 200) {
        const d = await res.json();
        set({ user: d, isLoading: false, status: "authenticated" });
      } else {
        set({ user: null as any, status: "unauthenticated", isLoading: false });
      }
    } catch (error) {
      console.error(error);
      set({ user: null as any, status: "unauthenticated", isLoading: false });
    }
  };

  // if(typeof window !== 'undefined') authenticate()
  // useEffect(() => {
  // }, [])

  const logout = () => {
    // delete token from cookie
    document.cookie = "token=; SameSite=Strict; Max-Age=0;";
    set({ user: null as any, status: "unauthenticated", isLoading: false });
  };

  // authenticate on mount

  return {
    user: null,
    token: "",
    isLoading: true,
    status: "loading",
    logout,
    authenticate,
  };
});

// a high order component, in which there will be useEffect hook which will run authenticate function on mount
// and will set the authentication state in the store

export const withAuth = (Component: React.FC<any>, forceAuth?: boolean) => {
  return function AuthComponent(props: any) {
    const { status, authenticate } = useAuth();

    useEffect(() => {
      if (forceAuth || props?.auth) {
        if (status !== "authenticated") authenticate();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticate]);

    return <Component {...props} />;
  };
};
