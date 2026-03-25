import { useState } from 'react'
import { Camera, ImagePlus, Loader2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import { Checkbox } from '@/components/ui/checkbox'
import { useMainStore } from '@/stores/main'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

export default function Cadastro() {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'form'>('upload')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    imageUrl: '',
    tags: '',
  })
  const [channels, setChannels] = useState<Record<string, boolean>>({
    'Mercado Livre': true,
    Shopee: true,
    'Vitrine Digital': true,
    'WhatsApp Catalog': false,
  })

  const { addProduct } = useMainStore()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleUploadClick = () => {
    setStep('analyzing')
    setTimeout(() => {
      setFormData({
        title: 'Vestido Midi Plissado',
        description:
          'Vestido midi em tecido leve com saia plissada. Perfeito para eventos casuais.',
        price: 289.9,
        imageUrl: 'https://img.usecurling.com/p/800/1000?q=pleated%20dress',
        tags: 'vestido, feminino, verão, plissado',
      })
      setStep('form')
    }, 3000)
  }

  const handleChannelChange = (channel: string) => {
    setChannels((prev) => ({ ...prev, [channel]: !prev[channel] }))
  }

  const handlePublish = () => {
    const activeChannels = Object.entries(channels)
      .filter(([_, v]) => v)
      .map(([k]) => k)

    addProduct({
      title: formData.title,
      description: formData.description,
      price: formData.price,
      imageUrl: formData.imageUrl,
      channels: activeChannels,
    })

    toast({
      title: 'Publicado com Sucesso!',
      description: `Ativo em ${activeChannels.length} canais!`,
    })
    navigate('/vitrine')
  }

  if (step === 'upload') {
    return (
      <div className="max-w-xl mx-auto space-y-8 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-medium tracking-tight">Novo Produto</h1>
          <p className="text-muted-foreground text-sm">Tire uma foto e deixe a IA fazer o resto.</p>
        </div>

        <button
          onClick={handleUploadClick}
          className="w-full aspect-[4/5] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-4 hover:bg-secondary/50 transition-colors group cursor-pointer bg-card shadow-sm"
        >
          <div className="p-6 rounded-full bg-secondary group-hover:scale-110 transition-transform">
            <Camera className="w-8 h-8 opacity-70" />
          </div>
          <span className="text-sm uppercase tracking-widest font-medium">Capturar Foto</span>
        </button>
      </div>
    )
  }

  if (step === 'analyzing') {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-xl font-medium tracking-tight flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Analisando Imagem...
          </h1>
          <p className="text-muted-foreground text-sm">Extraindo características e precificando.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-[4/5] w-full" />
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-1/2" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-light tracking-tight">Revisão IA</h1>
        <Button onClick={handlePublish} className="uppercase tracking-wider text-xs">
          <Save className="w-4 h-4 mr-2" />
          Publicar em Todos
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative aspect-[4/5] bg-muted rounded-xl overflow-hidden shadow-md">
          <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-4 right-4 rounded-full shadow-lg"
          >
            <ImagePlus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">
              Título (Gerado)
            </Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">
              Descrição Persuasiva
            </Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="h-32 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                Preço Sugerido
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">R$</span>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="pl-9 text-lg font-medium"
                />
              </div>
            </div>
            <div className="space-y-2 flex flex-col justify-end">
              <div className="flex items-center justify-between p-3 border rounded-md shadow-sm">
                <Label className="text-xs uppercase tracking-widest cursor-pointer">
                  Peça Única
                </Label>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t space-y-4">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">
              Publicar nos Canais
            </Label>
            <div className="space-y-3">
              {Object.keys(channels).map((channel) => (
                <div key={channel} className="flex items-center space-x-3">
                  <Checkbox
                    id={channel}
                    checked={channels[channel]}
                    onCheckedChange={() => handleChannelChange(channel)}
                  />
                  <Label htmlFor={channel} className="font-normal cursor-pointer">
                    {channel}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
