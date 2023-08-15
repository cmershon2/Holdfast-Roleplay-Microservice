'use client'
import React from 'react'
import { useTheme } from "next-themes";
import {GiSun, GiMoon} from 'react-icons/gi';

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

    let existingTheme;

    // check for an existing theme
    if (typeof window !== 'undefined') {
        existingTheme = localStorage.getItem('theme');
    }

    let themeButtonIcon;
    if(theme == "dark" || existingTheme == "dark")
    {
        themeButtonIcon = <GiSun className="w-6 h-6"/>;
    } else {
        themeButtonIcon = <GiMoon className="w-6 h-6"/>;
    }

    return (
        <button
            type="button"
            onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}
            className="p-2 mx-4 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        >
            <span className="sr-only">Light/Dark Mode</span>
            {themeButtonIcon}            
        </button>
    )
}