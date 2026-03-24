import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { toast } from '@/hooks/use-toast'

export type ProductStatus = 'available' | 'reserved' | 'sold'

export interface Product {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  status: ProductStatus
  channels: string[]
  createdAt: string
}

export interface Activity {
  id: string
  message: string
  timestamp: string
  type: 'sale' | 'system' | 'sync'
}

interface MainStoreContext {
  products: Product[]
  activities: Activity[]
  stats: {
    totalValue: number
    salesToday: number
    activeChannels: number
  }
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'status'>) => void
  sellProduct: (productId: string, channel: string) => void
  syncChannels: () => void
}

const initialProducts: Product[] = [
  {
    id: 'p1',
    title: 'Blazer Estruturado Preto',
    description: 'Blazer de alfaiataria com corte reto e botões forrados.',
    price: 359.9,
    imageUrl: 'https://img.usecurling.com/p/400/600?q=black%20blazer',
    status: 'available',
    channels: ['Mercado Livre', 'Vitrine'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    title: 'Calça Wide Leg Linho',
    description: 'Calça ampla em linho natural de cintura alta.',
    price: 229.0,
    imageUrl: 'https://img.usecurling.com/p/400/600?q=linen%20pants',
    status: 'available',
    channels: ['Vitrine', 'Shopee'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p3',
    title: 'Camisa Seda Off-White',
    description: 'Camisa clássica em seda pura com caimento fluido.',
    price: 499.0,
    imageUrl: 'https://img.usecurling.com/p/400/600?q=white%20silk%20shirt',
    status: 'sold',
    channels: ['Vitrine'],
    createdAt: new Date().toISOString(),
  },
]

const initialActivities: Activity[] = [
  {
    id: 'a1',
    message: 'Sistema sincronizado com Mercado Livre.',
    timestamp: new Date().toISOString(),
    type: 'sync',
  },
]

const MainContext = createContext<MainStoreContext | null>(null)

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [activities, setActivities] = useState<Activity[]>(initialActivities)

  const addActivity = useCallback((message: string, type: Activity['type']) => {
    setActivities((prev) => [
      { id: Math.random().toString(), message, timestamp: new Date().toISOString(), type },
      ...prev,
    ])
  }, [])

  const addProduct = useCallback(
    (product: Omit<Product, 'id' | 'createdAt' | 'status'>) => {
      const newProduct: Product = {
        ...product,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        status: 'available',
      }
      setProducts((prev) => [newProduct, ...prev])
      addActivity(`Novo produto cadastrado: ${product.title}`, 'system')
      toast({
        title: 'Produto Cadastrado',
        description: 'O produto foi adicionado e sincronizado.',
      })
    },
    [addActivity],
  )

  const sellProduct = useCallback(
    (productId: string, channel: string) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, status: 'sold' as ProductStatus } : p)),
      )
      const product = products.find((p) => p.id === productId)

      // Deterministic sync logic simulation
      addActivity(`Venda realizada via ${channel}: ${product?.title}`, 'sale')
      toast({
        title: 'Estoque baixado!',
        description: `Venda concluída no canal ${channel}. Sincronizando pausas...`,
        variant: 'default',
      })

      // Simulate pausing other channels
      setTimeout(() => {
        addActivity(`Pausado em todos os outros canais para evitar overselling.`, 'sync')
        toast({
          title: 'Canais Sincronizados',
          description: 'Anúncios pausados nos demais marketplaces.',
        })
      }, 1500)
    },
    [products, addActivity],
  )

  const syncChannels = useCallback(() => {
    addActivity('Forçando sincronização manual de canais.', 'sync')
    toast({ title: 'Sincronização', description: 'Todos os canais estão atualizados.' })
  }, [addActivity])

  const availableProducts = products.filter((p) => p.status === 'available')
  const totalValue = availableProducts.reduce((acc, p) => acc + p.price, 0)
  const salesToday = products.filter((p) => p.status === 'sold').length * 250 // mock value

  return (
    <MainContext.Provider
      value={{
        products,
        activities,
        stats: {
          totalValue,
          salesToday,
          activeChannels: 4,
        },
        addProduct,
        sellProduct,
        syncChannels,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export const useMainStore = () => {
  const context = useContext(MainContext)
  if (!context) {
    throw new Error('useMainStore must be used within a MainProvider')
  }
  return context
}
