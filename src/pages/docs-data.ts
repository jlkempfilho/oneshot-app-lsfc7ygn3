export const SECTIONS = [
  { id: 'visao-geral', title: '1. Visão Geral' },
  { id: 'arquitetura-dados', title: '2. Arquitetura de Dados' },
  { id: 'fluxos-principais', title: '3. Fluxos Principais' },
  { id: 'administracao', title: '4. Administração' },
  { id: 'estados-ui', title: '5. Estados de UI' },
  { id: 'seguranca', title: '6. Segurança' },
  { id: 'performance', title: '7. Performance' },
  { id: 'responsividade', title: '8. Responsividade' },
  { id: 'fases-desenvolvimento', title: '9. Fases de Desenvolvimento' },
  { id: 'endpoints-edge', title: '10. Endpoints e Edge Functions' },
  { id: 'glossario', title: '11. Glossário' },
]

export const VISAO_GERAL = [
  { label: 'App Name', value: 'OneShot App' },
  { label: 'Version', value: '1.0.0' },
  {
    label: 'Purpose',
    value: 'SaaS para artesãos e lojistas focada em estoque atômico e sincronia multicanal',
  },
  { label: 'Target Users', value: 'Artesãos, pequenos lojistas e vendedores independentes' },
  {
    label: 'Key Features',
    value:
      'IA para cadastro rápido, estoque único síncrono, multi-canal (ML/Shopee/WhatsApp), PDV local',
  },
  {
    label: 'Tech Stack',
    value: 'Vite, Typescript, Tailwind CSS, Shadcn UI, React, React Router, PocketBase',
  },
  { label: 'Last Updated', value: new Date().toLocaleDateString('pt-BR') },
]

export const ARQUITETURA = [
  { col: 'users', fields: 'name, email, avatar, created, updated' },
  {
    col: 'products',
    fields:
      'name, description, price, stock_type (unique/serial), status (available/reserved/sold), images, category, ai_metadata, user_id',
  },
  {
    col: 'sales',
    fields:
      'product_id, channel (local/vitrine/ml/shopee), total_price, payment_method, user_id, created',
  },
  { col: 'marketplaces', fields: 'provider_name, is_active, config_token, user_id' },
]

export const FLUXOS = [
  {
    title: 'Fluxo CADASTRO E ATIVAÇÃO',
    desc: 'Description of Photo -> IA Analysis -> Metadata Generation -> Marketplace Selection -> Multi-channel Publish.',
  },
  {
    title: 'Fluxo DE VENDAS VITRINE',
    desc: 'Description of Catalog Browse -> Checkout -> Pix Payment -> Real-time status update to "Sold".',
  },
  {
    title: 'Fluxo DE VENDAS MARKETPLACE',
    desc: 'Logic for External Webhook -> Internal Stock Check -> Automatic Pause on other channels.',
  },
  {
    title: 'Fluxo ESTOQUES',
    desc: 'Explanation of the "Atomic Stock" (1 unit = 1 sale) and SSE subscriptions for UI updates.',
  },
]

export const GLOSSARIO = [
  {
    term: 'Estoque Atômico',
    desc: 'Garantia de que uma peça única não seja vendida duas vezes em canais diferentes simultaneamente.',
  },
  {
    term: 'Markup',
    desc: 'Percentual adicionado ao custo para calcular o preço de venda sugerido pela IA.',
  },
  {
    term: 'PWA',
    desc: 'Aplicativo que pode ser instalado no celular sem depender de lojas de apps.',
  },
  {
    term: 'SSE (Realtime)',
    desc: 'Tecnologia que mantém a tela atualizada assim que uma venda ocorre, sem precisar dar F5.',
  },
]

export const FASES = [
  { title: 'Phase 1', desc: 'Core Modules & Zara UI.' },
  { title: 'Phase 2', desc: 'PocketBase Integration & Real-time.' },
  { title: 'Phase 3', desc: 'External API Webhooks.' },
]

export const TEXT_SECTIONS = {
  administracao:
    'Detail the /admin features including markup settings, financial dashboards (Recharts), and marketplace toggles.',
  estadosUi: 'Documentation on Loading (Skeletons), Success/Error (Toasts), and Empty States.',
  seguranca:
    'Description of Tenant Isolation (user-specific data) and Route Guards for Auth/Admin roles.',
  performance:
    'Target of <2s load times, image optimization, and efficient React state management.',
  responsividade: 'Mobile-first approach, Grid system (1 col mobile / 3 col desktop).',
  endpoints:
    'Reference to PocketBase Hooks for stock synchronization and custom API routes under /backend/v1/.',
}
