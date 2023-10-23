/** A function to manipulate cookies */
export const cookie = {
    set: (name: string, value: string, maxAge?: number) => {
        let cookie = `${name}=${value};path=/`
        if (maxAge) {
            cookie += `;max-age=${maxAge}`
        }
        document.cookie = cookie
    },
    get: (name: string) => {
        const cookie = document.cookie.split(';').find((c: string) => c.trim()?.startsWith(`${name}=`))
        if (!cookie) {
            return null
        }
        return cookie.split('=')[1]
    },
    delete: (name: string) => {
        document.cookie = `${name}=;path=/;max-age=0`
    },
    deleteAll: () => {
        document.cookie.split(';').forEach((c: string) => {
            document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;path=/;max-age=0`)
        })
    },
    getAll: () => {
        const cookies: any = {}
        document.cookie.split(';').forEach((c: string) => {
            const cookie = c.replace(/^ +/, '').replace(/=.*/, '')
            cookies[cookie] = cookie
        })
        return cookies
    },
    exists: (name: string) => {
        return cookie.getAll().hasOwnProperty(name)
    }
}