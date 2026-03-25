import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { useToast } from '@/hooks/use-toast'

const salesData = [
  { day: 'Seg', total: 1200, shoppe: 400, ml: 600, vitrine: 200 },
  { day: 'Ter', total: 900, shoppe: 300, ml: 400, vitrine: 200 },
  { day: 'Qua', total: 1600, shoppe: 500, ml: 800, vitrine: 300 },
  { day: 'Qui', total: 1400, shoppe: 400, ml: 700, vitrine: 300 },
  { day: 'Sex', total: 2100, shoppe: 800, ml: 1000, vitrine: 300 },
  { day: 'Sáb', total: 2800, shoppe: 1000, ml: 1200, vitrine: 600 },
  { day: 'Dom', total: 3200, shoppe: 1200, ml: 1500, vitrine: 500 },
]

const chartConfig = {
  total: { label: 'Total Sales', color: 'hsl(var(--primary))' },
  shoppe: { label: 'Shopee', color: 'hsl(var(--chart-2))' },
  ml: { label: 'Mercado Livre', color: 'hsl(var(--chart-3))' },
  vitrine: { label: 'Vitrine', color: 'hsl(var(--chart-4))' },
}

export default function Admin() {
  const { toast } = useToast()
  const [markup, setMarkup] = useState('30')

  const handleSaveConfig = () => {
    toast({
      title: 'Configurações Salvas',
      description: 'As preferências da empresa foram atualizadas.',
    })
  }

  const handleTestConnection = (name: string) => {
    toast({
      title: 'Conexão Testada',
      description: `A comunicação com a API do ${name} está normal.`,
    })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-light tracking-tight mb-2">Administração</h1>
        <p className="text-muted-foreground text-sm">
          Gerencie integrações, finanças e regras de negócio.
        </p>
      </div>

      <Tabs defaultValue="marketplaces" className="w-full">
        <TabsList className="w-full justify-start border-b bg-transparent p-0 h-auto overflow-x-auto">
          <TabsTrigger
            value="config"
            className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 uppercase text-xs tracking-wider font-medium"
          >
            Config Empresa
          </TabsTrigger>
          <TabsTrigger
            value="marketplaces"
            className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 uppercase text-xs tracking-wider font-medium"
          >
            Marketplaces
          </TabsTrigger>
          <TabsTrigger
            value="finance"
            className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 uppercase text-xs tracking-wider font-medium"
          >
            Financeiro
          </TabsTrigger>
          <TabsTrigger
            value="plans"
            className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 uppercase text-xs tracking-wider font-medium"
          >
            Planos SaaS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="pt-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Informações Gerais</CardTitle>
              <CardDescription>
                Defina as regras padrão para a geração de anúncios via IA.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome da Empresa</Label>
                  <Input defaultValue="DK Store Oficial" />
                </div>
                <div className="space-y-2">
                  <Label>Chave PIX Padrão</Label>
                  <Input defaultValue="contato@dktech.com" />
                </div>
                <div className="space-y-2">
                  <Label>Markup Padrão IA (%)</Label>
                  <Input type="number" value={markup} onChange={(e) => setMarkup(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Simulação de Preço</Label>
                  <div className="p-3 border rounded-md bg-muted/30 text-sm">
                    Custo: R$ 100,00 → Sugestão:{' '}
                    <strong>R$ {(100 * (1 + Number(markup) / 100)).toFixed(2)}</strong>
                  </div>
                </div>
              </div>
              <Button onClick={handleSaveConfig} className="uppercase tracking-wider text-xs">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketplaces" className="pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: 'Mercado Livre', status: true },
              { name: 'Shopee', status: true },
              { name: 'WhatsApp Catalog', status: false },
            ].map((channel) => (
              <Card key={channel.name} className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-base font-medium">{channel.name}</CardTitle>
                  <Switch checked={channel.status} />
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-xs text-muted-foreground h-8">
                    {channel.status
                      ? 'Sincronização em tempo real ativa.'
                      : 'Canal pausado ou desconectado.'}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Token
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => handleTestConnection(channel.name)}
                    >
                      Testar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="finance" className="pt-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-medium">Desempenho Semanal</h2>
            <div className="flex items-center gap-3">
              <Input type="date" className="h-9 w-auto text-sm" defaultValue="2026-03-24" />
              <Button
                variant="outline"
                size="sm"
                className="uppercase text-xs tracking-wider"
                onClick={() =>
                  toast({ title: 'Exportado', description: 'CSV baixado com sucesso.' })
                }
              >
                Exportar CSV
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border/50 p-4">
              <h3 className="text-sm uppercase tracking-widest font-medium mb-4 text-center">
                Volume Total
              </h3>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="hsl(var(--border))"
                    />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v}`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="var(--color-total)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Card>

            <Card className="border-border/50 p-4">
              <h3 className="text-sm uppercase tracking-widest font-medium mb-4 text-center">
                Por Canal
              </h3>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="hsl(var(--border))"
                    />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="ml" stackId="a" fill="var(--color-ml)" />
                    <Bar dataKey="shoppe" stackId="a" fill="var(--color-shoppe)" />
                    <Bar dataKey="vitrine" stackId="a" fill="var(--color-vitrine)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plans" className="pt-6">
          <Card className="border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plano</TableHead>
                  <TableHead>Mensalidade</TableHead>
                  <TableHead>Limite Produtos</TableHead>
                  <TableHead className="text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Freemium</TableCell>
                  <TableCell>R$ 0,00</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Pro</TableCell>
                  <TableCell>R$ 99,90</TableCell>
                  <TableCell>Ilimitado</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
