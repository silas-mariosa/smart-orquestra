import { Toaster } from "@/components/ui/toaster";

export default function BusinessLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
            <Toaster />
        </>
    );
}
