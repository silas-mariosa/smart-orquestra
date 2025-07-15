'use client'

import { BellIcon, InfoIcon } from "lucide-react";
import { Card, CardContent, CardDescription } from "./ui/card";
import { useCookie } from "@/context/useAuth";

export default function HeaderBar() {
    const { userData } = useCookie()
    return (
        <header className="w-full px-0 md:px-6 py-4 bg-white shadow-lg rounded-b-2xl flex items-center justify-between mt-[36px] sm:mt-0 mb-4 transition-all duration-200">
            <div className="flex-1 flex items-center">
                {/* Espaço para logo ou título se desejar */}
            </div>
            <div className="flex items-center gap-4 pr-4">
                <span className="font-semibold text-base text-gray-700 mr-2 hidden sm:block">{userData?.name}</span>
                <BellIcon className="h-6 w-6 text-primary cursor-pointer hover:scale-110 transition-transform" />
                <InfoIcon className="h-6 w-6 text-primary cursor-pointer hover:scale-110 transition-transform" onClick={() => { }} />
            </div>
        </header>
    );
}