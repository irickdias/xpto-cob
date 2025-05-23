'use client'

import { MdLogout } from "react-icons/md";
import ChangeThemeButton from "../ChangeThemeButton";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export default function Header() {
    const pathname = usePathname();

    function logout() {
        localStorage.removeItem("user");
        redirect("/");
    }

    return (
        <section className="w-full h-[6vh] flex justify-center bg-primary">
            <div className="w-[60%] h-full flex justify-between items-center">
                <div className="text-2xl font-semibold text-white">
                    <p>XPTO Cobranças</p>
                </div>
                <div className="text-lg flex gap-2 transition-all duration-200">
                    <ChangeThemeButton />
                    {
                        pathname !== "/" &&
                        <button onClick={logout} className="w-8 h-8 bg-gray-300 dark:bg-gray-800 rounded-full flex items-center justify-center hover:shadow-[0px_1px_10px] hover:shadow-gray-900 transition-all hover:cursor-pointer">
                            <MdLogout className="w-5 h-5 dark:fill-white fill-black" />
                        </button>
                    }

                </div>
            </div>
        </section>
    );
}