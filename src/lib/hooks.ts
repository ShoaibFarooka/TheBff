"use client";

// @ts-expect-error
import debounce from 'lodash.debounce';
import { useCallback, useEffect } from "react";

export const useDebug = (...args: any[]) => {
    useEffect(() => {
        console.log(...args)
    }, [args])
}


export const useDebounce = (fn: Function, delay: number) => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(debounce(fn, delay), [fn, delay])
}

// a hook which disables the scroll on the body element when the component mounts
export const useDisableBodyScroll = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        }
    }, [])
}