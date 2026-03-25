import { useState } from 'react'
import { useMainStore, Product } from '@/stores/main'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShoppingBag, QrCode } from 'lucide-react'

export default function Vitrine() {
  const { products, sellProduct } = useMainStore()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'pix'>('details')

  const vitrineProducts = products.filter((p) => p.channels.includes('Vitrine'))

  const handleCheckout = () => {
    if (selectedProduct) {
      sellProduct(selectedProduct.id, 'Vitrine')
      setCheckoutStep('details')
      setSelectedProduct(null)
    }
  }

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-light tracking-tighter">NEW ARRIVALS</h1>
        <p className="text-muted-foreground text-sm uppercase tracking-widest">
          Peças únicas. Atualização em tempo real.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {vitrineProducts.map((product) => (
          <div key={product.id} className="group relative space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-lg shadow-sm">
              <img
                src={product.imageUrl}
                alt={product.title}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${product.status !== 'available' ? 'opacity-50 grayscale' : ''}`}
              />
              {product.status !== 'available' && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-[2px]">
                  <span className="bg-background px-6 py-2 rounded-full shadow-md text-xs uppercase tracking-widest font-medium">
                    Esgotado
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-1 text-center">
              <h3 className="font-medium text-sm">{product.title}</h3>
              <p className="text-muted-foreground text-sm">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  product.price,
                )}
              </p>
            </div>
            <Button
              className="w-full opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-20 left-0 shadow-md"
              disabled={product.status !== 'available'}
              onClick={() => setSelectedProduct(product)}
            >
              Comprar Agora
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center font-light text-2xl tracking-tight">
              Checkout Rapido
            </DialogTitle>
          </DialogHeader>

          {selectedProduct && checkoutStep === 'details' && (
            <div className="space-y-6 pt-4 animate-fade-in">
              <div className="flex gap-4 items-center">
                <img
                  src={selectedProduct.imageUrl}
                  className="w-20 h-24 object-cover rounded-md shadow-sm"
                  alt=""
                />
                <div>
                  <h4 className="font-medium">{selectedProduct.title}</h4>
                  <p className="text-lg font-light mt-1">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      selectedProduct.price,
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input placeholder="João da Silva" />
                </div>
                <div className="space-y-2">
                  <Label>Endereço de Entrega (CEP)</Label>
                  <Input placeholder="00000-000" />
                </div>
              </div>

              <Button
                className="w-full uppercase tracking-wider"
                size="lg"
                onClick={() => setCheckoutStep('pix')}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Pagar com PIX
              </Button>
            </div>
          )}

          {checkoutStep === 'pix' && (
            <div className="space-y-6 pt-4 flex flex-col items-center text-center animate-fade-in">
              <div className="p-4 bg-white border rounded-xl shadow-sm">
                <QrCode className="w-48 h-48 opacity-80" />
              </div>
              <p className="text-sm text-muted-foreground">
                Escaneie o código para pagar. O estoque será reservado por 5 minutos.
              </p>
              <Button className="w-full uppercase tracking-wider" onClick={handleCheckout}>
                Simular Pagamento Aprovado
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
