import type { Locale } from './content';
import nexo from '../assets/previews/nexo.svg';
import forma from '../assets/previews/forma.svg';
import clara from '../assets/previews/clara.svg';
export const previews = [nexo, forma, clara];
export const projects = [
  {
    "name": "Nexo",
    "stack": [
      "React",
      "TypeScript",
      "Ant Design",
      "Supabase"
    ],
    "pt": {
      "type": "Gestão de pedidos",
      "summary": "Um painel para consultar pedidos, acompanhar entregas e resolver pendências sem depender de planilhas.",
      "problem": "Pedidos eram acompanhados em fontes separadas, dificultando a identificação de pendências e a atualização das entregas.",
      "choices": "Filtros persistidos na URL mantêm o contexto da consulta. A paginação acontece no servidor e as alterações apresentam feedback de envio, sucesso ou erro.",
      "result": "Autenticação, filtros, consulta e atualização de pedidos conectados ao banco."
    },
    "en": {
      "type": "Order management",
      "summary": "A workspace to find orders, track deliveries and resolve pending issues without relying on spreadsheets.",
      "problem": "Orders were tracked across separate sources, making pending issues and delivery updates difficult to follow.",
      "choices": "URL-based filters preserve query context. Pagination runs on the server, and updates communicate pending, success and error states.",
      "result": "Authentication, filtering, order lookup and updates connected to the database."
    }
  },
  {
    "name": "Forma",
    "stack": [
      "Next.js",
      "TypeScript",
      "Stripe",
      "PostgreSQL"
    ],
    "pt": {
      "type": "Catálogo e checkout",
      "summary": "Uma loja com catálogo, variações e carrinho. Da descoberta de um produto à conclusão da compra.",
      "problem": "Organizar produtos e suas variações em uma experiência de compra que também funcionasse bem no celular.",
      "choices": "O catálogo é renderizado no servidor. Carrinho e variações são interativos; valores e estoque são verificados no backend antes de criar a sessão de pagamento.",
      "result": "Catálogo persistido, seleção de variações, carrinho e checkout em ambiente de teste."
    },
    "en": {
      "type": "Catalog and checkout",
      "summary": "A store with a catalog, product variants and a cart. From product discovery to completing a purchase.",
      "problem": "Organize products and variants in a shopping experience that also works well on mobile.",
      "choices": "The catalog is server-rendered. Cart and variant selection are interactive; prices and stock are checked on the backend before creating a payment session.",
      "result": "A persisted catalog, variant selection, cart and checkout in a test environment."
    }
  },
  {
    "name": "Clara",
    "stack": [
      "React",
      "Node.js",
      "PostgreSQL"
    ],
    "pt": {
      "type": "Agendamento online",
      "summary": "Seleção de serviço, consulta de horários e confirmação de reserva em um fluxo curto e direto.",
      "problem": "A confirmação manual de horários exigia mensagens e permitia conflitos na agenda dos profissionais.",
      "choices": "O fluxo é dividido em serviço, horário e confirmação. Datas respeitam o fuso local e o servidor revalida a disponibilidade antes de salvar a reserva.",
      "result": "Consulta de disponibilidade, formulários com validação e reservas persistidas."
    },
    "en": {
      "type": "Online booking",
      "summary": "Service selection, available time slots and booking confirmation in a short, straightforward flow.",
      "problem": "Manual appointment confirmation required repeated messages and led to scheduling conflicts.",
      "choices": "The flow separates service, time and confirmation. Dates use the local time zone, and the server rechecks availability before persisting a booking.",
      "result": "Availability lookup, validated forms and persisted bookings."
    }
  }
];
export function technology(tag: string, lang: Locale){const descriptions: Record<string, [string, string]>={React:['Componentes e estado da interface para filtros, formulários e ações do usuário.','UI components and state for filters, forms and user actions.'],TypeScript:['Tipos para dados, contratos de API e propriedades de componentes.','Types for data, API contracts and component properties.'],'Ant Design':['Componentes de formulário, tabela e feedback com comportamento consistente.','Form, table and feedback components with consistent behavior.'],Supabase:['Autenticação e persistência dos pedidos no PostgreSQL.','Authentication and order persistence in PostgreSQL.'],'Next.js':['Renderização do catálogo no servidor e rotas para integração com o checkout.','Server rendering for the catalog and routes for checkout integration.'],Stripe:['Sessões de pagamento em ambiente de teste, criadas no servidor.','Test-mode payment sessions created on the server.'],PostgreSQL:['Dados persistidos com relações entre entidades e validação de consistência.','Persisted data with entity relationships and consistency validation.'],'Node.js':['API para consultar disponibilidade e confirmar reservas.','An API to check availability and confirm bookings.']};return descriptions[tag]?.[lang==='pt'?0:1]||tag}


export type Project = typeof projects[number];
