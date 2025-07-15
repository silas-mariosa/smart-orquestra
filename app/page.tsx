'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Users,
  Music,
  Calendar,
  FileText,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Shield,
  Zap,
  Heart,
  BookOpen,
  Loader2
} from "lucide-react";

export default function Home() {
  const { push } = useRouter();
  const [verse, setVerse] = useState<{ text: string; reference: string } | null>(null);
  const [verseLoading, setVerseLoading] = useState(true);

  // Buscar versículo bíblico
  useEffect(() => {
    const fetchVerse = async () => {
      try {
        setVerseLoading(true);
        // Lista de versículos populares e inspiradores
        const verses = [
          { text: "Louvem ao Senhor com harpa; cantem-lhe louvores com saltério de dez cordas.", reference: "Salmos 33:2" },
          { text: "Cantem ao Senhor um cântico novo, pois ele tem feito maravilhas!", reference: "Salmos 98:1" },
          { text: "Tudo quanto tem fôlego louve ao Senhor. Louvem ao Senhor!", reference: "Salmos 150:6" },
          { text: "Entoem louvores ao Senhor, pois ele tem feito coisas gloriosas!", reference: "Isaías 12:5" },
          { text: "Cantem ao Senhor, bendigam o seu nome; anunciem a sua salvação dia após dia.", reference: "Salmos 96:2" },
          { text: "Louvem ao Senhor, porque ele é bom; porque a sua misericórdia dura para sempre.", reference: "Salmos 136:1" },
          { text: "Cantem ao Senhor um cântico novo, cantem ao Senhor, toda a terra.", reference: "Salmos 96:1" },
          { text: "Louvem ao Senhor, todas as nações; exaltem-no, todos os povos!", reference: "Salmos 117:1" },
          { text: "Cantem ao Senhor com ações de graças; cantem louvores ao nosso Deus com a harpa.", reference: "Salmos 147:7" },
          { text: "Louvem ao Senhor, porque ele é bom; cantem louvores ao seu nome, porque é agradável.", reference: "Salmos 135:3" }
        ];

        // Selecionar versículo aleatório
        const randomVerse = verses[Math.floor(Math.random() * verses.length)];
        setVerse(randomVerse);
      } catch (error) {
        console.error('Erro ao buscar versículo:', error);
        setVerse({
          text: "Louvem ao Senhor com harpa; cantem-lhe louvores com saltério de dez cordas.",
          reference: "Salmos 33:2"
        });
      } finally {
        setVerseLoading(false);
      }
    };

    fetchVerse();
  }, []);

  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Gestão de Membros",
      description: "Cadastre e gerencie todos os membros da sua orquestra com perfis completos e níveis de acesso."
    },
    {
      icon: <Music className="w-8 h-8 text-primary" />,
      title: "Biblioteca de Louvores",
      description: "Organize seu repertório com PDFs, MP3s e informações detalhadas de cada música."
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Calendário de Ensaios",
      description: "Agende ensaios, eventos e mantenha todos informados sobre a programação."
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Relatórios e Estatísticas",
      description: "Acompanhe o crescimento da sua orquestra com dashboards completos."
    }
  ];

  const benefits = [
    "100% Gratuito para sempre",
    "Sem limitações de uso",
    "Sem anúncios",
    "Suporte da comunidade",
    "Atualizações regulares",
    "Dados seguros e privados"
  ];

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
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => push("/contato")}>
              Suporte
            </Button>
            <Button onClick={() => push("/business/login")}>
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-6">
          <Heart className="w-4 h-4 mr-2" />
          100% Gratuito
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Transforme sua Orquestra
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          O CRM completo e gratuito para gestão de orquestras. Organize membros, louvores, ensaios e muito mais.
        </p>
        <div className="flex justify-center mb-12">
          <Button size="lg" onClick={() => push("/business/login")} className="text-lg px-8 py-6">
            <Play className="w-5 h-5 mr-2" />
            Acessar Sistema
          </Button>
        </div>
        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Sem cartão de crédito
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Setup em 2 minutos
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Sempre gratuito
          </div>
        </div>
      </section>

      {/* Bible Verse Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-primary">Versículo do Dia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {verseLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Carregando versículo...</span>
                </div>
              ) : verse ? (
                <>
                  <blockquote className="text-xl md:text-2xl font-medium text-gray-800 italic leading-relaxed">
                    "{verse.text}"
                  </blockquote>
                  <p className="text-lg font-semibold text-primary">
                    — {verse.reference}
                  </p>
                </>
              ) : (
                <p className="text-muted-foreground">Versículo não disponível</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Tudo que você precisa para sua orquestra</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ferramentas poderosas para organizar, gerenciar e fazer sua orquestra crescer
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Free Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Por que é gratuito?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Acreditamos que toda orquestra merece ter acesso a ferramentas profissionais de gestão,
              independentemente do seu orçamento.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Heart className="w-12 h-12 text-red-500" />
                </div>
                <CardTitle>Missão Social</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Queremos apoiar o crescimento da música e das orquestras em todo o Brasil.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Shield className="w-12 h-12 text-blue-500" />
                </div>
                <CardTitle>Sem Compromissos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Sem contratos, sem taxas ocultas, sem surpresas. Sempre gratuito.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Zap className="w-12 h-12 text-yellow-500" />
                </div>
                <CardTitle>Comunidade Ativa</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Desenvolvido com feedback da comunidade de músicos e maestros.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Tudo incluído no plano gratuito</h2>
            <p className="text-xl text-muted-foreground">
              Não há pegadinhas. Tudo que você vê aqui está disponível gratuitamente.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Pronto para transformar sua orquestra?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de orquestras que já estão usando o Smart Orquestra para crescer.
          </p>
          <Button
            size="lg"
            variant="outline"
            onClick={() => push("/business/login")}
            className="text-lg px-8 py-6 hover:bg-blue-500 hover:text-primary-foreground"
          >
            <Star className="w-5 h-5 mr-2" />
            Acessar Smart Orquestra
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
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
            <span>© 2025 Smart Orquestra</span>
            <span>•</span>
            <span>100% Gratuito</span>
            <span>•</span>
            <span>Feito com ❤️ para músicos</span>
            <span>•</span>
            <span>Todos os direitos reservados</span>
            <span>•</span>
            <span>Desenvolvido por <a href="https://www.mariosatec.com.br" className="text-primary hover:text-primary-dark transition-colors">Mariosa Tech</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
