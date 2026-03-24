import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
      <h1 className="text-8xl font-light tracking-tighter">404</h1>
      <div className="space-y-2">
        <h2 className="text-xl font-medium uppercase tracking-widest">Página não encontrada</h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          A página que você está procurando não existe ou foi movida.
        </p>
      </div>
      <Button asChild variant="outline" className="rounded-none uppercase tracking-wider mt-8">
        <Link
          to="/"
          replace
          onClick={(e) => {
            if (window.history.length <= 2) {
              e.preventDefault()
              window.location.href = '/'
            }
          }}
        >
          Voltar ao Início
        </Link>
      </Button>
    </div>
  )
}
