import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, Camera, Store, LayoutGrid, Settings, SunMoon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useMainStore } from '@/stores/main'

export default function Layout() {
  const location = useLocation()
  const { user } = useMainStore()
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const allNavItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Cadastro', path: '/cadastro', icon: Camera },
    { name: 'Vitrine', path: '/vitrine', icon: Store },
    { name: 'PDV', path: '/venda-local', icon: LayoutGrid },
    { name: 'Admin', path: '/admin', icon: Settings },
  ]

  const navItems = allNavItems.filter((item) => item.name !== 'Admin' || user.role === 'admin')

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-medium tracking-tighter uppercase">
              DK Tech
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary',
                    location.pathname === item.path
                      ? 'text-primary border-b-2 border-primary pb-1'
                      : 'text-muted-foreground',
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              <SunMoon className="h-5 w-5" />
            </Button>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border">
                <span className="text-xs font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 py-8 pb-24 md:pb-8 animate-fade-in">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t pb-safe">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center w-full h-full gap-1 transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                <Icon className={cn('h-5 w-5', isActive && 'stroke-[2.5px]')} />
                <span className="text-[10px] uppercase font-medium tracking-wider">
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
