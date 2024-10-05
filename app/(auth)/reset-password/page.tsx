    "use client"
import React from 'react'
import { verifyEmail } from '@/lib/auth'
import { RxCross1 } from 'react-icons/rx'
import Link from 'next/link'
import { MdLockReset } from 'react-icons/md'
import { toast, Toaster } from 'react-hot-toast'
import { FiEye, FiEyeOff } from 'react-icons/fi'

type SearchParams = {
    token: string | null
    cb?: string | null
}

const ResetPassword = ( { searchParams } : { searchParams: SearchParams } ) => {

    const [loading, setLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const target = e.target as HTMLFormElement
        const password = target.password.value,
            confirmPassword = target.confirmPassword.value;

        if (!password || !confirmPassword) return toast.error('Please enter your password.')
        if (password != confirmPassword) return toast.error('Passwords do not match.')

        setLoading(true)
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: searchParams.token, newPass: password })
            })
            if ( res.status == 200 ) {
                toast.success('Password reset successfully! You can now login.')
            } else {
                const data = await res.json()
                toast.error(data.message ?? 'Something went wrong.')
            }
        } catch (error: any) {
            toast.error(error.message ?? 'Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    if (!searchParams.token) return (
        <div className="min-h-[70vh] center flex-col mt-24 text-white">
          <RxCross1 size={70} className="text-red-500 fill-red-500 mb-4" />
          <h2 className="text-3xl center">
              <span> Token not found </span>
          </h2>
        </div>
      )

    return (
        <div className="min-h-[70vh] center flex-col mt-24 text-white px-5">
            <div className="bg-blue-100/5 md:p-14 py-10 px-8 rounded-md mx-3">
                <h2 className="text-5xl center font-bold mb-10">
                    <MdLockReset size={70} className="text-purple-500 fill-purple-500 mb-4 mt-4 mr-2" />
                    <span> Reset Password </span>
                </h2>

                <form className="items-center gap-4" onSubmit={handleSubmit}>

                    <div className="w-full mb-2">
                        <button onClick={() => setShowPassword(!showPassword)} type='button' className="hover:underline p-0 bg-transparent flex gap-2 ml-auto max-w-max">
                            {
                                showPassword ? <>
                                    <FiEye size={20} className="text-white mt-1" />
                                    <span> Hide Password </span>
                                </> : <>
                                    <FiEyeOff size={20} className="text-white mt-1" />
                                    <span> Show Password </span>
                                </>
                            }
                        </button>
                    </div>

                    <div className="mb-5">
                        <input
                            placeholder="Enter New Passowrd"
                            type={showPassword ? "text": "password"}
                            className="w-full px-5 py-2 rounded-md bg-white/20 outline-white/80 text-white"
                            required
                            minLength={8}
                            maxLength={12}
                            name="password"
                        />
                    </div>
                    <div className="">
                        <input
                            placeholder="Enter New Passowrd"
                            type={showPassword ? "text": "password"}
                            className="w-full px-5 py-2 rounded-md bg-white/20 outline-white/80 text-white"
                            required
                            minLength={8}
                            maxLength={12}
                            name="confirmPassword"
                        />
                    </div>

                    <div className="mb-5 mt-2">
                        <Link href="/login" className="hover:underline text-blue-500">
                            Remember Password? Login 
                        </Link>
                    </div>

                    <div className="mt-8 max-w-max mx-auto">
                        <button type='submit' disabled={loading} className="mx-auto px-6 py-2 rounded-full bg-blue-500 center gap-2 disabled:opacity-80 disabled:cursor-not-allowed">
                            <span> Submit </span>
                            {
                                loading && <span className="border-t-transparent border-solid animate-spin rounded-full border-white border-2 h-5 w-5"></span>
                            }
                        </button>
                    </div>

                </form>
            </div>
            <Toaster />
        </div>
    )

}

export default ResetPassword