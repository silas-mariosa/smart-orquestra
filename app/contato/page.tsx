'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
  ArrowLeft,
  Users,
  Music,
  Calendar,
  FileText,
  Heart
} from "lucide-react";

export default function Contato() {
  const { push } = useRouter();

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email de Suporte",
      value: "siloks.developer@gmail.com",
      description: "Entre em contato para solicitar acesso ou tirar dúvidas"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Tempo de Resposta",
      value: "Até 24 horas",
      description: "Respondemos todas as solicitações em até 24 horas"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Acesso Gratuito",
      value: "100% Gratuito",
      description: "Não há custos para usar o Smart Orquestra"
    }
  ];

  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Gestão de Membros",
      description: "Cadastre e gerencie todos os membros da sua orquestra"
    },
    {
      icon: <Music className="w-8 h-8 text-primary" />,
      title: "Biblioteca de Louvores",
      description: "Organize seu repertório com PDFs e MP3s"
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Calendário de Ensaios",
      description: "Agende ensaios e mantenha todos informados"
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Relatórios",
      description: "Acompanhe o crescimento da sua orquestra"
    }
  ];

  const handleEmailClick = () => {
    const subject = encodeURIComponent("Solicitação de Acesso - Smart Orquestra");
    const body = encodeURIComponent(`Olá!

Gostaria de solicitar acesso ao Smart Orquestra para minha orquestra.

Informações da orquestra:
- Nome da orquestra:
- Número aproximado de membros:
- Tipo de orquestra (igreja, escola, comunidade, etc.):
- Nome do responsável:
- Telefone para contato:

Aguardo o retorno!

Atenciosamente,
[Seu nome]`);

    window.location.href = `mailto:siloks.developer@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Smart Orquestra</h1>
          </div>
          <Button variant="ghost" onClick={() => push("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-6">
          <Heart className="w-4 h-4 mr-2" />
          Suporte Personalizado
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Entre em Contato
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Solicite acesso ao Smart Orquestra ou tire suas dúvidas. Estamos aqui para ajudar sua orquestra a crescer!
        </p>
      </section>

      {/* Contact Info */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {info.icon}
                </div>
                <CardTitle className="text-lg">{info.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary mb-2">{info.value}</p>
                <CardDescription className="text-base">
                  {info.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Main CTA */}
      <section className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <CardTitle className="text-3xl mb-4">Solicitar Acesso</CardTitle>
            <CardDescription className="text-lg">
              Envie um email para solicitar acesso ao Smart Orquestra para sua orquestra
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">O que incluir no email:</h3>
              <ul className="text-left space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Nome da orquestra
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Número aproximado de membros
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Tipo de orquestra (igreja, escola, comunidade, etc.)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Nome do responsável
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Telefone para contato
                </li>
              </ul>
            </div>
            <Button size="lg" onClick={handleEmailClick} className="text-lg px-8 py-6">
              <Mail className="w-5 h-5 mr-2" />
              Enviar Email de Solicitação
            </Button>
            <p className="text-sm text-muted-foreground">
              Ou copie o email: <span className="font-mono bg-muted px-2 py-1 rounded">siloks.developer@gmail.com</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Features Reminder */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">O que você terá acesso</h2>
            <p className="text-xl text-muted-foreground">
              Todas as funcionalidades do Smart Orquestra estarão disponíveis gratuitamente
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold">Smart Orquestra</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            CRM gratuito para gestão de orquestras
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>© 2024 Smart Orquestra</span>
            <span>•</span>
            <span>100% Gratuito</span>
            <span>•</span>
            <span>Suporte: siloks.developer@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
} 