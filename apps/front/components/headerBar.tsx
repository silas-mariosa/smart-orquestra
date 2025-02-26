'use client'

import { BellIcon, InfoIcon } from "lucide-react";
import { Card, CardContent, CardDescription } from "./ui/card";

export default function HeaderBar() {
    return (
        <div className="py-3 z-0 mx-4  mt-[36px] sm:mt-0">
            <Card className="rounded-sm shadow-gray-400 shadow-md">
                <CardContent className=" p-2 m-0 ">
                    <div className="flex-row flex items-center justify-end">
                        <CardDescription className="mr-2 text-xs">
                            {/* {nameUser} */}
                            nome do usário
                        </CardDescription>
                        <BellIcon className="mr-2 h-4 w-4 cursor-pointer"></BellIcon>
                        <InfoIcon className="mr-2 h-4 w-4 cursor-pointer" onClick={() => { }}></InfoIcon>
                    </div>
                </CardContent>
            </Card>
        </div>

    );
}