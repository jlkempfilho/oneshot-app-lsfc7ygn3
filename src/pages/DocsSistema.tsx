import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  SECTIONS,
  VISAO_GERAL,
  ARQUITETURA,
  FLUXOS,
  GLOSSARIO,
  FASES,
  TEXT_SECTIONS,
} from './docs-data'

export default function DocsSistema() {
  const [open, setOpen] = useState(false)

  const NavLinks = () => (
    <nav className="flex flex-col gap-3">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={() => setOpen(false)}
          className="text-sm font-medium hover:underline text-muted-foreground hover:text-foreground transition-colors"
        >
          {s.title}
        </a>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-[#f8f8f8] font-sans text-foreground pb-20">
      <div className="container mx-auto px-4 py-8 md:grid md:grid-cols-[250px_1fr] gap-12 items-start">
        {/* Mobile Header & Nav */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold uppercase tracking-widest">Docs</h1>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className="mb-6">
                <SheetTitle className="uppercase tracking-widest text-left">Navegação</SheetTitle>
              </SheetHeader>
              <NavLinks />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden md:block sticky top-24">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-b pb-4">
            Navegação do Sistema
          </h2>
          <NavLinks />
        </aside>

        {/* Main Content */}
        <main className="space-y-12">
          <Section id="visao-geral" title="1. Visão Geral">
            <div className="space-y-3">
              {VISAO_GERAL.map((item) => (
                <div key={item.label} className="grid sm:grid-cols-[150px_1fr] gap-1 sm:gap-4">
                  <span className="font-semibold text-foreground">{item.label}</span>
                  <span className="text-muted-foreground">{item.value || 'N/A'}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section id="arquitetura-dados" title="2. Arquitetura de Dados">
            <ul className="space-y-4">
              {ARQUITETURA.map((a) => (
                <li key={a.col} className="p-4 border border-border/40 rounded bg-muted/20">
                  <div className="font-mono font-semibold mb-2 text-primary">{a.col}</div>
                  <div className="text-muted-foreground text-sm">Campos: {a.fields}</div>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="fluxos-principais" title="3. Fluxos Principais">
            <div className="grid gap-4">
              {FLUXOS.map((f) => (
                <div
                  key={f.title}
                  className="p-4 border border-border/40 rounded-sm bg-white shadow-sm"
                >
                  <h3 className="font-bold mb-2 uppercase text-xs tracking-wider">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="administracao" title="4. Administração">
            <p className="text-muted-foreground">{TEXT_SECTIONS.administracao}</p>
          </Section>

          <Section id="estados-ui" title="5. Estados de UI">
            <p className="text-muted-foreground">{TEXT_SECTIONS.estadosUi}</p>
          </Section>

          <Section id="seguranca" title="6. Segurança">
            <p className="text-muted-foreground">{TEXT_SECTIONS.seguranca}</p>
          </Section>

          <Section id="performance" title="7. Performance">
            <p className="text-muted-foreground">{TEXT_SECTIONS.performance}</p>
          </Section>

          <Section id="responsividade" title="8. Responsividade">
            <p className="text-muted-foreground">{TEXT_SECTIONS.responsividade}</p>
          </Section>

          <Section id="fases-desenvolvimento" title="9. Fases de Desenvolvimento">
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {FASES.map((f) => (
                <li key={f.title}>
                  <strong className="text-foreground">{f.title}:</strong> {f.desc}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="endpoints-edge" title="10. Endpoints e Edge Functions">
            <p className="text-muted-foreground">{TEXT_SECTIONS.endpoints}</p>
          </Section>

          <Section id="glossario" title="11. Glossário">
            <dl className="grid sm:grid-cols-2 gap-6">
              {GLOSSARIO.map((g) => (
                <div key={g.term} className="p-4 bg-muted/10 rounded border border-border/30">
                  <dt className="font-bold mb-1">{g.term}</dt>
                  <dd className="text-sm text-muted-foreground leading-relaxed">{g.desc}</dd>
                </div>
              ))}
            </dl>
          </Section>
        </main>
      </div>
    </div>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <Card className="shadow-md bg-white border-none rounded-sm overflow-hidden">
        <CardHeader className="pb-4 border-b border-border/50 bg-background/50">
          <CardTitle className="uppercase tracking-widest text-lg font-light">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 text-sm leading-relaxed text-foreground/90">
          {children}
        </CardContent>
      </Card>
    </section>
  )
}
