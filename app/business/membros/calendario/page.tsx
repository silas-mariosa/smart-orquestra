"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { apiUrl } from "@/config/url";
import Cookies from "universal-cookie";

interface Ensaio {
  id: string;
  title: string;
  description: string;
  start: string; // ISO date
  end?: string; // ISO date
}

export default function CalendarioMembros() {
  const [ensaios, setEnsaios] = useState<Ensaio[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
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

  return (
    <Card className="p-2 mx-4 rounded-sm mt-8">
      <CardHeader>
        <CardTitle>Calendário de Ensaios</CardTitle>
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
            eventClick={(info) => {
              setEventoSelecionado(info.event.extendedProps as Ensaio);
              setModalOpen(true);
            }}
          />
        )}
      </CardContent>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Ensaio</DialogTitle>
          </DialogHeader>
          {eventoSelecionado && (
            <div className="space-y-2">
              <div><b>Título:</b> {eventoSelecionado.title}</div>
              <div><b>Descrição:</b> {eventoSelecionado.description}</div>
              <div><b>Data:</b> {eventoSelecionado.start?.split('T')[0]}</div>
              <div><b>Horário:</b> {eventoSelecionado.start?.split('T')[1]?.slice(0, 5)}</div>
            </div>
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