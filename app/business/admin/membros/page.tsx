'use client'

import { useState, useEffect } from "react";
import FormSchemaMembros from "./formSchema";
import MembrosHook from "./membrosHook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Plus, Key, Copy, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Cookies from "universal-cookie";
import InstrumentosAPIs from "@/hooks/instrumentosHooks/instrumentosHooks";
import { apiUrl } from "@/config/url";

const instrumentOptions = [
    "Violão",
    "Piano",
    "Bateria",
    "Guitarra",
    "Baixo",
    "Saxofone - Tenor",
    "Saxofone - Barítono",
    "Saxofone - Alto",
    "Flauta",
    "Teclado"
]

const positions = [
    "Primeiro",
    "Segundo",
    "Terceiro",
]

const accessLevels = [
    "Membro",
    "Administrador"
]

// Schema para criação de usuário
const createUserSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    accessLevel: z.string().min(1, "Nível de acesso é obrigatório"),
});

type CreateUserFormData = z.infer<typeof createUserSchema>;

export default function Membros() {
    const { form } = FormSchemaMembros(instrumentOptions, positions)
    const {
        onSubmit,
        resetForm,
        createUserWithPassword,
        resetUserPassword,
        isCreatingUser,
        isResettingPassword,
        generatedPassword,
        resetPasswordData,
        clearPasswordData
    } = MembrosHook()

    const { instrumentos, instrumentosIsLoading } = InstrumentosAPIs();

    // Form para criação de usuário
    const createUserForm = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            email: "",
            accessLevel: "",
        },
    });

    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [usuariosLoading, setUsuariosLoading] = useState(false);
    const [usuariosError, setUsuariosError] = useState<string | null>(null);
    const [instrumentosDialogOpen, setInstrumentosDialogOpen] = useState(false);
    const [instrumentosSelecionados, setInstrumentosSelecionados] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            setUsuariosLoading(true);
            setUsuariosError(null);
            try {
                const cookies = new Cookies();
                const token = cookies.get("authTokenSmart");
                const res = await fetch(`${apiUrl}usuario`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error("Erro ao buscar usuários");
                const data = await res.json();
                console.log('USUARIOS:', data); // Depuração
                setUsuarios(data);
            } catch (err: any) {
                setUsuariosError(err.message || "Erro desconhecido");
            } finally {
                setUsuariosLoading(false);
            }
        };
        fetchUsuarios();
    }, []);

    // Filtro aplicado aos usuários reais
    const filteredUsuarios = usuarios.filter((item) => {
        // Se todos os filtros estiverem vazios, retorna todos
        if (!form.getValues().nome && !form.getValues().position && !form.getValues().instrument && (form.getValues().actived === undefined || form.getValues().actived === null)) {
            return true;
        }
        return (
            (!form.getValues().nome || (item.usuario?.name && item.usuario.name.toLowerCase().includes(form.getValues().nome?.toLowerCase()))) &&
            (!form.getValues().position || (Array.isArray(item.instrumentos) && item.instrumentos?.some((inst: any) => inst.position && typeof inst.position === 'string' && inst.position.toLowerCase().includes(form.getValues().position?.toLowerCase())))) &&
            (!form.getValues().instrument || (Array.isArray(item.instrumentos) && item.instrumentos?.some((inst: any) => inst.owner && typeof inst.owner === 'string' && inst.owner.toLowerCase().includes(form.getValues().instrument?.toLowerCase())))) &&
            (form.getValues().actived === undefined || form.getValues().actived === null || item.usuario?.active === form.getValues().actived)
        );
    });

    const sortedFilteredUsuarios = filteredUsuarios.sort((a: any, b: any) => {
        if ((a.usuario.name || "") < (b.usuario.name || "")) {
            return -1;
        }
        if ((a.usuario.name || "") > (b.usuario.name || "")) {
            return 1;
        }
        return 0;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [showCreateUserDialog, setShowCreateUserDialog] = useState(false);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    const currentRows = sortedFilteredUsuarios.slice(
        indexOfFirstRow,
        indexOfLastRow
    );

    const totalPages = Math.ceil(sortedFilteredUsuarios.length / rowsPerPage);
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const nextPage = () => {
        if (indexOfLastRow < sortedFilteredUsuarios.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Handler para criação de usuário
    const handleCreateUser = async (data: CreateUserFormData) => {
        try {
            await createUserWithPassword(data);
            setShowCreateUserDialog(false);
            createUserForm.reset();
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    };

    // Handler para redefinir senha
    const handleResetPassword = async (userId: string) => {
        try {
            setSelectedUserId(userId);
            await resetUserPassword(userId);
            setShowPasswordDialog(true);
        } catch (error) {
            console.error("Erro ao redefinir senha:", error);
        }
    };

    // Copiar senha para clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Você pode adicionar um toast aqui se quiser
    };

    return (
        <>
            {/* Card de criação de usuário */}
            <Card className="p-2 mx-4 rounded-sm mb-4">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Gerenciamento de Usuários</CardTitle>
                        <Dialog open={showCreateUserDialog} onOpenChange={setShowCreateUserDialog}>
                            <DialogTrigger asChild>
                                <Button className="flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    Criar Usuário
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Criar Novo Usuário</DialogTitle>
                                </DialogHeader>
                                <Form {...createUserForm}>
                                    <form onSubmit={createUserForm.handleSubmit(handleCreateUser)} className="space-y-4">
                                        <FormField
                                            control={createUserForm.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Nome completo" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={createUserForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="email@exemplo.com" type="email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={createUserForm.control}
                                            name="accessLevel"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nível de Acesso</FormLabel>
                                                    <FormControl>
                                                        <select {...field} className="border p-2 rounded-md w-full">
                                                            <option value="">Selecione o nível</option>
                                                            {accessLevels.map((level) => (
                                                                <option key={level} value={level}>
                                                                    {level}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex justify-end gap-2 pt-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setShowCreateUserDialog(false)}
                                            >
                                                Cancelar
                                            </Button>
                                            <Button type="submit" disabled={isCreatingUser}>
                                                {isCreatingUser ? "Criando..." : "Criar Usuário"}
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600">
                        Crie novos usuários com senha aleatória ou redefina senhas de usuários existentes.
                    </p>
                </CardContent>
            </Card>

            {/* Card de filtro */}
            <Card className="p-2 mx-4 rounded-sm">
                <CardHeader>
                    <CardTitle>Filtro de membros</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form id="form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <FormField
                                    control={form.control}
                                    name={"nome"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{"Nome de membro"}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={"Buscar por nome do membro"} type={"text"} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={"bairro"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{"Bairro"}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={"Buscar membro por bairro"} type={"text"} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={"position"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Posição</FormLabel>
                                            <FormControl>
                                                <select {...field} className="border p-2 rounded-md w-full">
                                                    <option value="">Selecione uma posição</option>
                                                    {positions.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={"instrument"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Instrumento</FormLabel>
                                            <FormControl>
                                                <select {...field} className="border p-2 rounded-md w-full" disabled={instrumentosIsLoading}>
                                                    <option value="">Selecione um instrumento</option>
                                                    {(instrumentos ?? []).map((inst: any) => (
                                                        <option key={inst.id} value={inst.nameInstrument}>
                                                            {inst.nameInstrument}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={"actived"}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                                            <FormLabel className="font-bold">{"Ativo?"}</FormLabel>
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex justify-end gap-6">
                                <Button type="button" onClick={() => {
                                    form.reset();
                                    resetForm()
                                }}>Limpar</Button>
                                <Button onClick={() => setCurrentPage(1)} type="submit">Filtrar</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Exibir senha gerada após criar usuário */}
            {generatedPassword && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center justify-between">
                    <div>
                        <strong>Senha gerada:</strong> <span className="font-mono">{generatedPassword}</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedPassword)}>
                        <Copy className="w-4 h-4 mr-1" /> Copiar
                    </Button>
                    <Button variant="ghost" size="sm" onClick={clearPasswordData}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            )}

            {/* Tabela de membros */}
            <Card className="p-2 mx-4 rounded-sm mt-4">
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow className="grid-cols-7">
                            <TableHead className="col-span-1">Nome do membro</TableHead>
                            <TableHead className="col-span-1">Email</TableHead>
                            <TableHead className="col-span-1">Nível</TableHead>
                            <TableHead className="col-span-1">Ativo?</TableHead>
                            <TableHead className="col-span-1">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usuariosLoading && (
                            <TableRow><TableCell colSpan={5}>Carregando usuários...</TableCell></TableRow>
                        )}
                        {usuariosError && (
                            <TableRow><TableCell colSpan={5} className="text-red-500">{usuariosError}</TableCell></TableRow>
                        )}
                        {currentRows.map((item) => (
                            <TableRow key={item.usuario.id}>
                                <TableCell className="col-span-1">{item.usuario.name}</TableCell>
                                <TableCell className="col-span-1">{item.usuario.email}</TableCell>
                                <TableCell className="col-span-1">{item.usuario.accessLevel}</TableCell>
                                <TableCell className="col-span-1">{item.usuario.active ? "Sim" : "Não"}</TableCell>
                                <TableCell className="col-span-1 flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleResetPassword(item.usuario.id.toString())}
                                        disabled={isResettingPassword}
                                        className="flex items-center gap-1 cursor-pointer"
                                    >
                                        <Key className="w-3 h-3" />
                                        {isResettingPassword && selectedUserId === item.usuario.id.toString() ? "Redefinindo..." : "Redefinir Senha"}
                                    </Button>
                                    <Button
                                        className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
                                        variant="default"
                                        size="sm"
                                        onClick={() => {
                                            setInstrumentosSelecionados(item.instrumentos);
                                            setInstrumentosDialogOpen(true);
                                        }}
                                    >
                                        Instrumentos
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-center items-center mt-4">
                    {totalPages > 1 ? (
                        <>
                            <Button
                                variant="outline"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(1)}
                            >
                                {totalPages / totalPages}
                            </Button>
                            <Button
                                variant="ghost"
                                disabled={currentPage === 1}
                                onClick={prevPage}
                            >
                                <ChevronLeft />
                            </Button>
                            <div className="mx-2">
                                <Badge variant="outline" className="text-sm">{currentPage}</Badge>
                            </div>
                            <Button
                                variant="ghost"
                                disabled={indexOfLastRow >= sortedFilteredUsuarios.length}
                                onClick={nextPage}
                            >
                                <ChevronRight />
                            </Button>
                            <Button
                                variant="outline"
                                disabled={indexOfLastRow >= sortedFilteredUsuarios.length}
                                onClick={() => setCurrentPage(totalPages)}
                            >
                                {totalPages}
                            </Button>
                        </>
                    )
                        :
                        <div className="mx-2">
                            <Badge variant="outline" className="text-sm">{currentPage}</Badge>
                        </div>
                    }
                </div>
            </Card>

            {/* Dialog para exibir senhas geradas */}
            <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Senha Gerada</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        {generatedPassword && (
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">Senha gerada para o novo usuário:</p>
                                <div className="flex items-center gap-2 p-3 bg-gray-100 rounded border">
                                    <code className="flex-1 font-mono text-sm">{generatedPassword}</code>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => copyToClipboard(generatedPassword)}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-xs text-red-600">
                                    ⚠️ Guarde esta senha! Ela não será exibida novamente.
                                </p>
                            </div>
                        )}
                        {resetPasswordData && (
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">Nova senha para o usuário:</p>
                                <div className="flex items-center gap-2 p-3 bg-gray-100 rounded border">
                                    <code className="flex-1 font-mono text-sm">{resetPasswordData.newPassword}</code>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => copyToClipboard(resetPasswordData.newPassword)}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-xs text-red-600">
                                    ⚠️ Guarde esta senha! Ela não será exibida novamente.
                                </p>
                            </div>
                        )}
                        <div className="flex justify-end">
                            <Button onClick={() => {
                                setShowPasswordDialog(false);
                                clearPasswordData();
                            }}>
                                Fechar
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Dialog para exibir instrumentos do usuário */}
            <Dialog open={instrumentosDialogOpen} onOpenChange={setInstrumentosDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Instrumentos do Usuário</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        {instrumentosSelecionados.length === 0 ? (
                            <div className="text-gray-500">Nenhum instrumento vinculado.</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Posição</TableHead>
                                        <TableHead>Proprietário</TableHead>
                                        <TableHead>Série</TableHead>
                                        <TableHead>Marca</TableHead>
                                        <TableHead>Modelo</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {instrumentosSelecionados.map((inst, idx) => (
                                        <TableRow key={inst.id || idx}>
                                            <TableCell>{inst.position}</TableCell>
                                            <TableCell>{inst.owner}</TableCell>
                                            <TableCell>{inst.serie}</TableCell>
                                            <TableCell>{inst.brand}</TableCell>
                                            <TableCell>{inst.model}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button onClick={() => setInstrumentosDialogOpen(false)}>Fechar</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}