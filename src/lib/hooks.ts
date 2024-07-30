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
    return useCallback(debounce(fn, delay), [fn, delay])
}