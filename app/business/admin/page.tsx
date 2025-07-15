"use client"

import { apiUrl } from "@/config/url";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

interface Usuario {
    id: string;
    name: string;
    email: string;
    nivelAcesso: string;
    createdAt: string;
}

interface Louvor {
    id: string;
    nameLouvor: string;
    description: string;
    instrumentos: string;
    createdAt: string;
}

interface DistribuicaoUsuarios {
    [key: string]: number;
}

interface Estatisticas {
    totalUsuarios: number;
    totalLouvores: number;
    usuariosPorNivel: DistribuicaoUsuarios;
}

interface DashboardAdmin {
    estatisticas: Estatisticas;
    ultimosUsuarios: Usuario[];
    ultimosLouvores: Louvor[];
}

export default function AdminDashboard() {
    const [dashboard, setDashboard] = useState<DashboardAdmin | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            setLoading(true);
            setError(null);
            try {
                const cookies = new Cookies();
                const token = cookies.get("authTokenSmart");
                const res = await fetch(`${apiUrl}dashboard/admin`, {
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

    const formatarData = (dataString: string) => {
        return new Date(dataString).toLocaleDateString('pt-BR');
    };

    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto mt-8 p-4 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-10 text-primary text-center font-sans">Dashboard Administrativo</h1>

            {loading && (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-muted-foreground text-lg">Carregando dashboard...</div>
                </div>
            )}

            {error && (
                <div className="bg-error/10 border border-error text-error px-4 py-3 rounded-xl mb-4 font-medium">
                    {error}
                </div>
            )}

            {dashboard && (
                <div className="space-y-10">
                    {/* Estatísticas Gerais */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4">
                            <h2 className="text-xl font-semibold mb-2 text-primary">Estatísticas Gerais</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Total de Usuários:</span>
                                    <span className="text-2xl font-bold text-primary">{dashboard.estatisticas.totalUsuarios}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Total de Louvores:</span>
                                    <span className="text-2xl font-bold text-success">{dashboard.estatisticas.totalLouvores}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4">
                            <h2 className="text-xl font-semibold mb-2 text-primary">Distribuição de Usuários</h2>
                            <div className="space-y-2">
                                {Object.entries(dashboard.estatisticas.usuariosPorNivel ?? {}).map(([nivel, quantidade]) => (
                                    <div key={nivel} className="flex justify-between items-center">
                                        <span className="font-medium">{nivel}:</span>
                                        <span className="text-lg font-semibold text-secondary">{quantidade}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Últimos Usuários e Louvores */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {/* Últimos Usuários */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-xl font-semibold mb-4 text-primary">Últimos 5 Usuários Cadastrados</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="bg-primary/10">
                                            <th className="text-left py-3 px-3 font-semibold text-primary">Nome</th>
                                            <th className="text-left py-3 px-3 font-semibold text-primary">Email</th>
                                            <th className="text-left py-3 px-3 font-semibold text-primary">Nível</th>
                                            <th className="text-left py-3 px-3 font-semibold text-primary">Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dashboard.ultimosUsuarios.map((usuario) => (
                                            <tr key={usuario.id} className="even:bg-muted/60 hover:bg-accent/10 transition-colors">
                                                <td className="py-2 px-3 font-medium">{usuario.name}</td>
                                                <td className="py-2 px-3 text-sm text-gray-600">{usuario.email}</td>
                                                <td className="py-2 px-3">
                                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${usuario.nivelAcesso === 'Administrador' ? 'bg-error/10 text-error' :
                                                        usuario.nivelAcesso === 'Membro' ? 'bg-primary/10 text-primary' :
                                                            'bg-muted text-gray-800'
                                                        }`}>
                                                        {usuario.nivelAcesso}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-3 text-sm text-gray-500">{formatarData(usuario.createdAt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Últimos Louvores */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-xl font-semibold mb-4 text-primary">Últimos 10 Louvores Cadastrados</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="bg-primary/10">
                                            <th className="text-left py-3 px-3 font-semibold text-primary">Nome</th>
                                            <th className="text-left py-3 px-3 font-semibold text-primary">Instrumento</th>
                                            <th className="text-left py-3 px-3 font-semibold text-primary">Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dashboard.ultimosLouvores.map((louvor) => (
                                            <tr key={louvor.id} className="even:bg-muted/60 hover:bg-accent/10 transition-colors">
                                                <td className="py-2 px-3 font-medium">{louvor.nameLouvor}</td>
                                                <td className="py-2 px-3 text-sm">{louvor.instrumentos}</td>
                                                <td className="py-2 px-3 text-sm text-gray-500">{formatarData(louvor.createdAt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}