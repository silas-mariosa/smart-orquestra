import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookUserIcon, ImageIcon } from "lucide-react";
import Image from "next/image";

export default function Grupos() {
    return (
        <div className="flex min-h-screen flex-col">
            <Card className="p-2 mx-4 rounded-sm">
                <CardHeader>
                    <CardTitle>Grupos </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col justify-center items-center rounded-sm border-shadow shadow-lg max-w-sm p-3 bg-[#acb8c0] gap-6">
                        <div className="relative w-[225px] h-[150px] sm:w-[280px] sm:h-[196px] md:w-[320px] md:h-[224px] bg-white rounded-lg">
                            <Image src="/orquestra.png" alt="Logo orquestra" fill className="object-cover"></Image>
                        </div>
                        <h2 className="text-2xl font-bold">Orquestra Maná</h2>
                        <p className="text-base px-5 font-medium">Breve história da orquestra, quando ela foi fundada bakod askd oaskdo aksdoa ksoaksdkasd kaoskd oaskd askdoa sd</p>
                        <div className="flex flex-row justify-between items-center gap-6">
                            <a href="/grupos/orquestra" className="bg-[#25508C] text-white font-semibold px-4 py-2 rounded-md flex items-center justify-center"><BookUserIcon className="w-8 h-8 mr-2"></BookUserIcon>Ver Mais</a>
                            <a href="#" className="bg-[#25508C] text-white font-semibold px-4 py-2 rounded-md flex items-center justify-center"><ImageIcon className="w-8 h-8 mr-2"></ImageIcon>Galeria</a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}