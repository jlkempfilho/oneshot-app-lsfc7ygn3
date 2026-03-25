import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MainProvider, useMainStore } from '@/stores/main'
import Layout from './components/Layout'
import Index from './pages/Index'
import Admin from './pages/Admin'
import Cadastro from './pages/Cadastro'
import Vitrine from './pages/Vitrine'
import VendaLocal from './pages/VendaLocal'
import NotFound from './pages/NotFound'

const AppRoutes = () => {
  const { user } = useMainStore()

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route
          path="/admin"
          element={user.role === 'admin' ? <Admin /> : <Navigate to="/" replace />}
        />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/vitrine" element={<Vitrine />} />
        <Route path="/venda-local" element={<VendaLocal />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <MainProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </MainProvider>
  </BrowserRouter>
)

export default App
