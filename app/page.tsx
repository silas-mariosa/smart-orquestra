'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Smart Orquestra</h1>
      <Button onClick={() => push("business/login")} variant="default">
        Logar
      </Button>
    </div>
  );
}
