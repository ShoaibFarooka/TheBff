import React from 'react'
import { authenticate } from '@/lib/auth'
import { UserRole } from '@/types/user'
// import { notFound } from 'next/navigation'

const Layout = async ({ children }: any) => {
  const auth = await authenticate(UserRole.ADMIN);

  if (auth.unAuthenticated) return <div>You are not logged in</div>;
  if (!auth.success) return <div>Only admins can access this page</div>;

  return <>{children}</>;
};

export default Layout
