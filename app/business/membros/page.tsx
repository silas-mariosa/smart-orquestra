"use client"

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

interface Louvor {
    nome: string;
    descricao: string;
    instrumento: string;
    categoria: string;
    pdf: string;
    mp3: string;
}

interface DashboardMembros {
    totalLouvores: number;
    ultimosLouvores: Louvor[];
}

export default function Menbers() {
    const [dashboard, setDashboard] = useState<DashboardMembros | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            setLoading(true);
            setError(null);
            try {
                const cookies = new Cookies();
                const token = cookies.get("authTokenSmart");
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api/"}dashboard/membros`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error("Erro ao buscar dashboard");
                const data = await res.json();
                setDashboard(data);
            } catch (err: any) {
                setError(err.message || "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto mt-8 p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-8 text-primary text-center font-sans">Dashboard</h1>
            {loading && <div className="text-muted-foreground text-lg">Carregando...</div>}
            {error && <div className="bg-error/10 border border-error text-error px-4 py-3 rounded-xl mb-4 font-medium">{error}</div>}
            {dashboard && (
                <>
                    <div className="w-full mb-8">
                        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-between">
                            <span className="font-semibold text-lg">Total de Louvores:</span>
                            <span className="text-2xl font-bold text-primary">{dashboard.totalLouvores}</span>
                        </div>
                    </div>
                    <div className="w-full">
                        <h2 className="text-lg md:text-xl font-semibold mb-4 text-primary">Últimos 10 Louvores</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-primary/10">
                                        <th className="py-3 px-3 font-semibold text-primary">Nome</th>
                                        <th className="py-3 px-3 font-semibold text-primary">Descrição</th>
                                        <th className="py-3 px-3 font-semibold text-primary">Instrumento</th>
                                        <th className="py-3 px-3 font-semibold text-primary">Categoria</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(dashboard.ultimosLouvores ?? []).map((louvor, idx) => (
                                        <tr key={idx} className="even:bg-muted/60 hover:bg-accent/10 transition-colors">
                                            <td className="py-2 px-3 font-medium">{louvor.nome}</td>
                                            <td className="py-2 px-3 text-sm text-gray-600">{louvor.descricao}</td>
                                            <td className="py-2 px-3 text-sm">{louvor.instrumento}</td>
                                            <td className="py-2 px-3 text-sm text-gray-600">{louvor.categoria}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}