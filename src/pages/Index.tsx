import { useMainStore } from '@/stores/main'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Box, Camera, Activity as ActivityIcon, DollarSign, Store } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Index() {
  const { stats, activities } = useMainStore()
  const navigate = useNavigate()

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-2">Resumo Geral</h1>
          <p className="text-muted-foreground text-sm">
            Controle unificado de todos os seus canais.
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => navigate('/cadastro')}
          className="w-full md:w-auto uppercase tracking-wider text-xs font-medium"
        >
          <Camera className="mr-2 h-4 w-4" />
          OneShot App
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-none border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
              Valor em Estoque
            </CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                stats.totalValue,
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
              Vendas Hoje
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                stats.salesToday,
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
              Canais Ativos
            </CardTitle>
            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light">{stats.activeChannels}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm uppercase tracking-widest font-medium">Atividades Recentes</h2>
            <Link
              to="/admin"
              className="text-xs text-muted-foreground hover:text-primary uppercase flex items-center"
            >
              Ver tudo <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {activities.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 border border-border/50 bg-card"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-secondary/30 p-8 border border-border/50 flex flex-col items-center justify-center text-center space-y-4">
          <Store className="h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="font-medium text-lg">Sua vitrine está online</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Compartilhe o link da sua loja com os clientes no WhatsApp ou Instagram.
          </p>
          <Button variant="outline" className="uppercase text-xs tracking-wider" asChild>
            <Link to="/vitrine">Acessar Vitrine</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
