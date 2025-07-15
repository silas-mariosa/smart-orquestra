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
        console.log(err);
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
              const evento = {
                id: info.event.id,
                title: info.event.title,
                description: info.event.extendedProps.description || '',
                start: info.event.start?.toISOString() || '',
                end: info.event.end?.toISOString() || ''
              };
              setEventoSelecionado(evento);
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
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-900">Título:</span>
                <p className="text-gray-700 mt-1">{eventoSelecionado.title || 'Sem título'}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Descrição:</span>
                <p className="text-gray-700 mt-1">{eventoSelecionado.description || 'Sem descrição'}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Data:</span>
                <p className="text-gray-700 mt-1">
                  {eventoSelecionado.start ? new Date(eventoSelecionado.start).toLocaleDateString('pt-BR') : 'Data não definida'}
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Horário:</span>
                <p className="text-gray-700 mt-1">
                  {eventoSelecionado.start ? new Date(eventoSelecionado.start).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 'Horário não definido'}
                </p>
              </div>
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