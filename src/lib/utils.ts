import { clsx, type ClassValue } from "clsx";
import { TransitionStartFunction } from "react";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// a function to capitalize the first letter of a string using regex
export function capitalizeFirstLetter(string: string) {
  return string.replace(/^./, string[0].toUpperCase());
}


// a function run code on server side using startTransition
export async function getServerData<T = any>(startTransition: TransitionStartFunction, func: Function): Promise<T> {
  return new Promise((resolve, reject) => {
    startTransition(() => {
      try {
        resolve(func());
      } catch (err: any) {
        reject(err);
      }
    });
  });
}