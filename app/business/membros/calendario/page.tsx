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
    <Card className="p-2 mx-2 sm:mx-4 rounded-sm mt-4 sm:mt-8">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-lg sm:text-xl md:text-2xl text-center sm:text-left">
          Calendário de Ensaios
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        {loading ? (
          <div className="text-center py-8">Carregando ensaios...</div>
        ) : (
          <div className="calendar-wrapper">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={ensaios}
              eventContent={renderEventContent}
              locale="pt-br"
              height="auto"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: ''
              }}
              buttonText={{
                today: 'Hoje',
                month: 'Mês',
                week: 'Semana',
                day: 'Dia'
              }}
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
          </div>
        )}
      </CardContent>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[95%] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Detalhes do Ensaio</DialogTitle>
          </DialogHeader>
          {eventoSelecionado && (
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Título:</span>
                <p className="text-gray-700 mt-1 text-sm sm:text-base">{eventoSelecionado.title || 'Sem título'}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Descrição:</span>
                <p className="text-gray-700 mt-1 text-sm sm:text-base">{eventoSelecionado.description || 'Sem descrição'}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Data:</span>
                <p className="text-gray-700 mt-1 text-sm sm:text-base">
                  {eventoSelecionado.start ? new Date(eventoSelecionado.start).toLocaleDateString('pt-BR') : 'Data não definida'}
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Horário:</span>
                <p className="text-gray-700 mt-1 text-sm sm:text-base">
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

      <style jsx global>{`
        .calendar-wrapper {
          width: 100%;
          overflow-x: auto;
        }
        
        .calendar-wrapper .fc {
          font-size: 14px;
        }
        
        .calendar-wrapper .fc-toolbar {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        
        .calendar-wrapper .fc-toolbar-chunk {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .calendar-wrapper .fc-toolbar-title {
          font-size: 1.1rem !important;
          font-weight: 600;
          text-align: center;
          order: 2;
        }
        
        .calendar-wrapper .fc-toolbar-chunk:first-child {
          order: 1;
        }
        
        .calendar-wrapper .fc-button-group {
          display: flex;
          gap: 0.25rem;
        }
        
        .calendar-wrapper .fc-button {
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          min-width: 60px;
        }
        
        .calendar-wrapper .fc-daygrid-day {
          min-height: 80px;
        }
        
        .calendar-wrapper .fc-daygrid-day-number {
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .calendar-wrapper .fc-col-header-cell {
          padding: 0.5rem 0;
        }
        
        .calendar-wrapper .fc-col-header-cell-cushion {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .calendar-wrapper .fc-event {
          font-size: 0.75rem;
          padding: 0.125rem 0.25rem;
          margin: 0.125rem 0;
          border-radius: 0.25rem;
        }
        
        .calendar-wrapper .fc-event-title {
          font-weight: 500;
          line-height: 1.2;
        }
        
        .calendar-wrapper .fc-event-time {
          font-size: 0.625rem;
        }
        
        @media (min-width: 640px) {
          .calendar-wrapper .fc-toolbar {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
          }
          
          .calendar-wrapper .fc-toolbar-chunk {
            gap: 0.75rem;
          }
          
          .calendar-wrapper .fc-toolbar-title {
            font-size: 1.25rem !important;
            order: unset;
          }
          
          .calendar-wrapper .fc-toolbar-chunk:first-child {
            order: unset;
          }
          
          .calendar-wrapper .fc-button {
            padding: 0.625rem 1rem;
            font-size: 0.875rem;
            min-width: 70px;
          }
          
          .calendar-wrapper .fc-daygrid-day {
            min-height: 100px;
          }
          
          .calendar-wrapper .fc-daygrid-day-number {
            font-size: 1rem;
          }
          
          .calendar-wrapper .fc-col-header-cell-cushion {
            font-size: 0.875rem;
          }
          
          .calendar-wrapper .fc-event {
            font-size: 0.875rem;
            padding: 0.25rem 0.5rem;
            margin: 0.25rem 0;
          }
          
          .calendar-wrapper .fc-event-time {
            font-size: 0.75rem;
          }
        }
        
        @media (min-width: 768px) {
          .calendar-wrapper .fc-toolbar-title {
            font-size: 1.5rem !important;
          }
          
          .calendar-wrapper .fc-daygrid-day {
            min-height: 120px;
          }
          
          .calendar-wrapper .fc-event {
            font-size: 1rem;
            padding: 0.375rem 0.75rem;
          }
        }
      `}</style>
    </Card>
  );
}

function renderEventContent(eventInfo: any) {
  return (
    <div className="event-content">
      <div className="event-title">{eventInfo.event.title}</div>
      {eventInfo.event.extendedProps.description && (
        <div className="event-description">{eventInfo.event.extendedProps.description}</div>
      )}
      <div className="event-time">{eventInfo.timeText}</div>

      <style jsx>{`
        .event-content {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          width: 100%;
        }
        
        .event-title {
          font-weight: 600;
          font-size: 0.75rem;
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .event-description {
          font-size: 0.625rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .event-time {
          font-size: 0.625rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }
        
        @media (min-width: 640px) {
          .event-title {
            font-size: 0.875rem;
          }
          
          .event-description {
            font-size: 0.75rem;
          }
          
          .event-time {
            font-size: 0.75rem;
          }
        }
        
        @media (min-width: 768px) {
          .event-title {
            font-size: 1rem;
          }
          
          .event-description {
            font-size: 0.875rem;
          }
          
          .event-time {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}

