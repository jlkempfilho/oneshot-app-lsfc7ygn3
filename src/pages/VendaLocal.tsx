import { useState } from 'react'
import { useMainStore, Product } from '@/stores/main'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Search, ScanBarcode, CreditCard, Banknote, SmartphoneNfc } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function VendaLocal() {
  const { products, sellProduct } = useMainStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('pix')

  const availableProducts = products.filter((p) => p.status === 'available')
  const filteredProducts = searchTerm
    ? availableProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.includes(searchTerm),
      )
    : availableProducts

  const handleSell = () => {
    if (selectedProduct) {
      if (navigator.vibrate) navigator.vibrate(200)

      sellProduct(selectedProduct.id, 'PDV Local')
      setSelectedProduct(null)
      setSearchTerm('')
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 h-full flex flex-col animate-fade-in">
      <div>
        <h1 className="text-3xl font-light tracking-tight mb-2">Ponto de Venda</h1>
        <p className="text-muted-foreground text-sm">
          Registre vendas locais para dar baixa automática nos canais.
        </p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1 shadow-sm rounded-lg">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou código..."
            className="pl-9 h-12 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button size="icon" variant="outline" className="h-12 w-12 shrink-0 shadow-sm">
          <ScanBarcode className="h-5 w-5" />
        </Button>
      </div>

      {!selectedProduct ? (
        <div className="flex-1 space-y-4">
          <h3 className="text-xs uppercase tracking-widest font-medium text-muted-foreground">
            Estoque Disponível
          </h3>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Nenhum produto encontrado.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-3 border rounded-lg hover:border-primary cursor-pointer transition-colors bg-card shadow-sm"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.imageUrl}
                    alt=""
                    className="w-16 h-16 object-cover bg-muted rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{product.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                      Ref: {product.id}
                    </p>
                  </div>
                  <div className="font-medium">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      product.price,
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 animate-fade-in space-y-8">
          <Card className="border-border shadow-md">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <img
                    src={selectedProduct.imageUrl}
                    className="w-24 h-32 object-cover rounded-md shadow-sm"
                    alt=""
                  />
                  <div>
                    <h3 className="text-xl font-light">{selectedProduct.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Ref: {selectedProduct.id}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProduct(null)}
                  className="uppercase text-xs"
                >
                  Trocar
                </Button>
              </div>

              <div className="pt-6 border-t space-y-4">
                <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                  Forma de Pagamento
                </Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem value="pix" id="pix" className="peer sr-only" />
                    <Label
                      htmlFor="pix"
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer shadow-sm transition-all"
                    >
                      <SmartphoneNfc className="mb-2 h-6 w-6" />
                      Pix
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer shadow-sm transition-all"
                    >
                      <CreditCard className="mb-2 h-6 w-6" />
                      Cartão
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                    <Label
                      htmlFor="cash"
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer shadow-sm transition-all"
                    >
                      <Banknote className="mb-2 h-6 w-6" />
                      Dinheiro
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="pt-6 border-t flex items-end justify-between">
                <span className="text-sm uppercase tracking-widest text-muted-foreground">
                  Total
                </span>
                <span className="text-3xl font-light">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    selectedProduct.price,
                  )}
                </span>
              </div>
            </CardContent>
          </Card>

          <Button
            size="lg"
            className="w-full h-14 uppercase tracking-widest font-medium text-base shadow-lg"
            onClick={handleSell}
          >
            Finalizar Venda
          </Button>
        </div>
      )}
    </div>
  )
}
