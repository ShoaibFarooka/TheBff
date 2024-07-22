import { useEffect } from "react"

export const useDebug = (...args: any[]) => {
    useEffect(() => {
        console.log(...args)
    }, [args])
}