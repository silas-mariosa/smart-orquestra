"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/config/url";
import Cookies from "universal-cookie";

interface Ensaio {
  id: string;
  title: string;
  description: string;
  start: string; // ISO date
  end?: string; // ISO date
}

export default function CalendarioAdmin() {
  const [ensaios, setEnsaios] = useState<Ensaio[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", time: "" });
  const [editMode, setEditMode] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState<Ensaio | null>(null);

  useEffect(() => {
    const fetchEnsaios = async () => {
      setLoading(true);
      try {
        const cookies = new Cookies();
        const token = cookies.get("authTokenSmart");
        const res = await fetch(`${apiUrl}ensaios`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Erro ao buscar ensaios");
        const data = await res.json();
        setEnsaios(data);
      } catch (err) {
        setEnsaios([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEnsaios();
  }, []);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setModalOpen(true);
  };

  const handleAddEnsaio = async (e: any) => {
    e.preventDefault();
    if (!selectedDate) return;
    const start = `${selectedDate}T${form.time}`;
    const date = selectedDate;
    const cookies = new Cookies();
    const token = cookies.get("authTokenSmart");
    try {
      const res = await fetch(`${apiUrl}ensaios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          start,
          date,
        }),
      });
      if (!res.ok) throw new Error("Erro ao criar ensaio");
      const novo = await res.json();
      setEnsaios((prev) => [...prev, novo]);
      setModalOpen(false);
      setForm({ title: "", description: "", time: "" });
    } catch (err) {
      alert("Erro ao criar ensaio");
    }
  };

  return (
    <Card className="p-2 mx-4 rounded-sm mt-8">
      <CardHeader>
        <CardTitle>Calendário de Ensaios (Admin)</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Carregando ensaios...</div>
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={ensaios}
            eventContent={renderEventContent}
            locale="pt-br"
            height={600}
            dateClick={handleDateClick}
            eventClick={(info) => {
              setEventoSelecionado({
                id: info.event.id,
                title: info.event.title,
                description: info.event.extendedProps.description,
                start: info.event.startStr,
                end: info.event.endStr,
              });
              setEditMode(true);
              setModalOpen(true);
            }}
          />
        )}
      </CardContent>
      <Dialog open={modalOpen} onOpenChange={(open) => {
        setModalOpen(open);
        if (!open) {
          setEditMode(false);
          setEventoSelecionado(null);
          setForm({ title: "", description: "", time: "" });
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editMode ? "Editar/Excluir Ensaio" : "Adicionar Ensaio"}</DialogTitle>
          </DialogHeader>
          {editMode && eventoSelecionado ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const cookies = new Cookies();
                const token = cookies.get("authTokenSmart");
                const date = eventoSelecionado.start.split("T")[0];
                const start = `${date}T${form.time || eventoSelecionado.start.split("T")[1]?.slice(0, 5) || "19:00"}`;
                try {
                  const res = await fetch(`${apiUrl}ensaios/${eventoSelecionado.id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      title: form.title || eventoSelecionado.title,
                      description: form.description || eventoSelecionado.description,
                      start,
                      date,
                    }),
                  });
                  if (!res.ok) throw new Error("Erro ao atualizar ensaio");
                  const atualizado = await res.json();
                  setEnsaios((prev) => prev.map(e => e.id === atualizado.id ? atualizado : e));
                  setModalOpen(false);
                } catch (err) {
                  alert("Erro ao atualizar ensaio");
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium">Título</label>
                <Input
                  value={form.title || eventoSelecionado.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Descrição</label>
                <Input
                  value={form.description || eventoSelecionado.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Horário</label>
                <Input
                  type="time"
                  value={form.time || eventoSelecionado.start.split("T")[1]?.slice(0, 5) || "19:00"}
                  onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="submit">Salvar</Button>
                <Button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 cursor-pointer"
                  variant="destructive"
                  onClick={async () => {
                    if (!window.confirm("Tem certeza que deseja excluir este ensaio?")) return;
                    const cookies = new Cookies();
                    const token = cookies.get("authTokenSmart");
                    try {
                      const res = await fetch(`${apiUrl}ensaios/${eventoSelecionado.id}`, {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });
                      if (!res.ok) throw new Error("Erro ao excluir ensaio");
                      setEnsaios((prev) => prev.filter(e => e.id !== eventoSelecionado.id));
                      setModalOpen(false);
                    } catch (err) {
                      alert("Erro ao excluir ensaio");
                    }
                  }}
                >
                  Excluir
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAddEnsaio} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Título</label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Descrição</label>
                <Input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Horário</label>
                <Input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} required />
              </div>
              <div>
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.event.title}</b>
      <div className="text-xs text-gray-500">{eventInfo.event.extendedProps.description}</div>
      <div className="text-xs">{eventInfo.timeText}</div>
    </>
  );
} 