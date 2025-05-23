'use client'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ChangeThemeButton() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button type="button" onClick={() => resolvedTheme === "dark" ? setTheme('light') : setTheme('dark')} className="w-8 h-8 bg-gray-300 dark:bg-gray-800 rounded-full flex items-center justify-center hover:shadow-[0px_1px_10px] hover:shadow-gray-900 transition-all hover:cursor-pointer">
            {
                resolvedTheme === "dark" ?
                    <FiSun className="w-5 h-5 stroke-white" />
                    :
                    <FiMoon className="w-5 h-5 stroke-black" />
            }
        </button>
    );
}