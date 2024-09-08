import { authenticate } from '@/lib/auth';
import { redirect } from "next/navigation";

const Layout = async ({ children }: any) => {

    const auth = await authenticate();
    if (!auth.success || auth.unAuthenticated)
        return redirect("/login");

    return <>{children}</>;
};

export default Layout
