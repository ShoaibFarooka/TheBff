import React from 'react'
import { authenticate } from '@/lib/auth'
import { UserRole } from '@/types/user'
import { notFound } from 'next/navigation'

const Layout = async () => {

    const auth = await authenticate(UserRole.ADMIN)

    if (auth.unAuthenticated) throw new Error( 'You are not logged in' )
    if (!auth.success) throw new Error( 'Only admins can access this page' )
    
    return (
        <div>Layout</div>
    )
}

export default Layout