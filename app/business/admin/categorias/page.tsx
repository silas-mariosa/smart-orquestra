"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { apiUrl } from "@/config/url";
import Cookies from "universal-cookie";

interface Categoria {
  id: string;
  name: string;
}

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategoria, setEditCategoria] = useState<Categoria | null>(null);
  const [form, setForm] = useState({ name: "" });

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const cookies = new Cookies();
      const token = cookies.get("authTokenSmart");
      const res = await fetch(`${apiUrl}categorias`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao buscar categorias");
      const data = await res.json();
      setCategorias(data);
    } catch (err) {
      console.log(err);
      setCategorias([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const cookies = new Cookies();
    const token = cookies.get("authTokenSmart");
    try {
      if (editCategoria) {
        // Editar
        const res = await fetch(`${apiUrl}categorias/${editCategoria.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: form.name }),
        });
        if (!res.ok) throw new Error("Erro ao editar categoria");
      } else {
        // Criar
        const res = await fetch(`${apiUrl}categorias`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: form.name }),
        });
        if (!res.ok) throw new Error("Erro ao criar categoria");
      }
      setModalOpen(false);
      setForm({ name: "" });
      setEditCategoria(null);
      fetchCategorias();
    } catch (err) {
      console.log(err);
      alert("Erro ao salvar categoria");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) return;
    const cookies = new Cookies();
    const token = cookies.get("authTokenSmart");
    try {
      const res = await fetch(`${apiUrl}categorias/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao excluir categoria");
      fetchCategorias();
    } catch (err) {
      console.log(err);
      alert("Erro ao excluir categoria");
    }
  };

  return (
    <Card className="p-2 mx-4 rounded-sm mt-8">
      <CardHeader>
        <CardTitle>Categorias de Instrumentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button onClick={() => { setEditCategoria(null); setForm({ name: "" }); setModalOpen(true); }}>
            Nova Categoria
          </Button>
        </div>
        {loading ? (
          <div>Carregando categorias...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categorias.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => { setEditCategoria(cat); setForm({ name: cat.name }); setModalOpen(true); }}>Editar</Button>
                    <Button size="sm" variant="destructive" className="ml-2 cursor-pointer bg-red-500 hover:bg-red-600" onClick={() => handleDelete(cat.id)}>Excluir</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editCategoria ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nome</label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
} 