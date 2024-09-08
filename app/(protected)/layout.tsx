import { authenticate } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { redirect } from "next/navigation";

const Layout = async ({ children }: any) => {

    
    const auth = await authenticate();
    if (!auth.success || auth.unAuthenticated)
        return redirect("/login");

    logger.log('Hello from protected layout')

    return <>{children}</>;
};

export default Layout
