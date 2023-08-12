'use client'
import React from 'react'
import { useTheme } from "next-themes";

import {signIn, signOut} from 'next-auth/react'

export const LoginButton = () => {
    return <button onClick={() => signIn()}>Sign In</button>
}

export const LogoutButton = () => {
    return <button onClick={() => signOut()}>Sign Out</button>
}

export const ThemeButton = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <button
            onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}
            className='bg-gray-800 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 transition-all duration-100 text-white dark:text-gray-800 px-8 py-2 text-2xl md:text-4xl rounded-lg absolute bottom-32'>
            Toggle Mode
        </button>
    )
}