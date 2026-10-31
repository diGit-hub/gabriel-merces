import type { Locale } from './content';
import frutigames from '../assets/previews/frutigames.jpg';
import nando from '../assets/previews/nando-merces.jpg';
import weather from '../assets/previews/weather-app.jpg';
import shopi from '../assets/previews/shopi.jpg';

interface ProjectContent {
  type: string;
  summary: string;
  problem: string;
  role: string;
  choices: string;
  result: string;
  next: string;
  status: string;
}

export type ProjectBadge = 'inProgress' | 'aiAssisted' | 'noAiCode';

export interface Project {
  name: string;
  preview: string;
  siteUrl: string;
  repositoryUrl: string;
  privateRepository: boolean;
  badges: ProjectBadge[];
  stack: string[];
  pt: ProjectContent;
  en: ProjectContent;
}

export const projects: Project[] = [
  {
    name: 'FrutiGames',
    preview: frutigames,
    siteUrl: 'https://fruti-games.vercel.app',
    repositoryUrl: 'https://github.com/diGit-hub/FrutiGames',
    privateRepository: true,
    badges: ['inProgress', 'aiAssisted'],
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'GamePix API', 'Supabase'],
    pt: {
      type: 'Portal de jogos online',
      summary: 'Catálogo, busca e jogos no navegador, com uma interface inspirada nos portais de jogos dos anos 2000.',
      problem: 'Projeto de conclusão da Funval: reunir jogos de uma API externa em um portal com identidade visual própria e navegação entre catálogo e partidas.',
      role: 'Desenvolvimento da interface em React, integração do catálogo com a GamePix e implementação das telas de acesso e perfil.',
      choices: 'Componentes React organizam o catálogo e as páginas de jogos. A integração com a GamePix inclui cache e tratamento de falhas; o Supabase é usado nos fluxos de autenticação.',
      result: 'Catálogo conectado à API, busca por título, tela para jogar e páginas de login e perfil. O projeto está publicado e continua em desenvolvimento.',
      next: 'Concluir os fluxos de perfil, revisar a navegação e os estados de erro e corrigir bugs de usabilidade.',
      status: 'Projeto de conclusão da Funval · em evolução',
    },
    en: {
      type: 'Online gaming portal',
      summary: 'A game catalog, search and browser games, with an interface inspired by gaming portals from the 2000s.',
      problem: 'My Funval final project: bring games from an external API into a portal with its own visual identity and navigation between the catalog and games.',
      role: 'Built the React interface, integrated the GamePix catalog and implemented the sign-in and profile screens.',
      choices: 'React components organize the catalog and game pages. The GamePix integration includes caching and error handling; Supabase supports the authentication flows.',
      result: 'An API-connected catalog, title search, a game screen and sign-in and profile pages. The project is deployed and remains in development.',
      next: 'Complete the profile flows, review navigation and error states, and fix usability issues.',
      status: 'Funval final project · in progress',
    },
  },
  {
    name: 'Nando Mercês',
    preview: nando,
    siteUrl: 'https://nando-merces.vercel.app',
    repositoryUrl: 'https://github.com/diGit-hub/nando-merces',
    privateRepository: true,
    badges: ['aiAssisted'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    pt: {
      type: 'Portfólio de artista e painel administrativo',
      summary: 'Galeria de obras, pedidos de orçamento e um painel para administrar conteúdo e acompanhar atendimentos.',
      problem: 'Apresentar o trabalho de um artista plástico e centralizar pedidos de orçamento, informações das obras e acompanhamento dos contatos recebidos.',
      role: 'Desenvolvimento do site público, do painel administrativo e da integração com o banco de dados.',
      choices: 'Next.js reúne a interface e as rotas de servidor. Prisma e PostgreSQL persistem obras, conteúdo e pedidos; o painel usa autenticação e os pedidos recebem validação e protocolo.',
      result: 'Galeria com filtros de disponibilidade, formulários de orçamento e painel com busca, paginação e histórico de status dos pedidos. Site e banco de dados publicados.',
      next: 'Revisar o conteúdo final com o artista, adicionar upload direto de imagens e configurar notificações por e-mail.',
      status: 'Site e painel publicados · melhorias em andamento',
    },
    en: {
      type: 'Artist portfolio and admin dashboard',
      summary: 'An artwork gallery, quote requests and a dashboard to manage content and follow up on inquiries.',
      problem: 'Showcase an artist’s work and centralize quote requests, artwork information and follow-up on incoming inquiries.',
      role: 'Built the public website, admin dashboard and database integration.',
      choices: 'Next.js brings together the interface and server routes. Prisma and PostgreSQL persist artworks, content and requests; the dashboard uses authentication and requests are validated and assigned a reference number.',
      result: 'A gallery with availability filters, quote forms and a dashboard with search, pagination and request status history. The website and database are deployed.',
      next: 'Review the final content with the artist, add direct image uploads and configure email notifications.',
      status: 'Website and dashboard deployed · ongoing improvements',
    },
  },
  {
    name: 'Weather App',
    preview: weather,
    siteUrl: 'https://weather-merces.vercel.app',
    repositoryUrl: 'https://github.com/diGit-hub/weather-app',
    privateRepository: false,
    badges: ['aiAssisted'],
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'OpenWeather API'],
    pt: {
      type: 'Clima e previsão do tempo',
      summary: 'Clima atual e previsão para os próximos dias, com busca por cidade e alternância entre Celsius e Fahrenheit.',
      problem: 'Projeto desenvolvido na Funval para praticar consumo de API e apresentar dados meteorológicos em uma interface responsiva, a partir do desafio do devChallenges.',
      role: 'Implementação da interface, da busca por cidade, da consulta à API e da conversão das unidades exibidas.',
      choices: 'A OpenWeather fornece o clima atual e a previsão. Componentes React separam o resumo do tempo, os próximos dias e os indicadores de vento, umidade, visibilidade e pressão.',
      result: 'Consulta por cidade, localização opcional, previsão para os próximos dias e alternância entre °C e °F. Aplicação publicada e conectada à API.',
      next: 'Melhorar o feedback de carregamento e de erro, incluindo cidades não encontradas, falhas de conexão e indisponibilidade da localização.',
      status: 'Projeto da Funval · publicado',
    },
    en: {
      type: 'Weather and forecast',
      summary: 'Current weather and a forecast for the coming days, with city search and Celsius/Fahrenheit switching.',
      problem: 'Built during Funval training to practice API integration and display weather data in a responsive interface, based on the devChallenges challenge.',
      role: 'Implemented the interface, city search, API requests and conversion of the displayed units.',
      choices: 'OpenWeather supplies current weather and forecast data. React components separate the weather summary, upcoming days and wind, humidity, visibility and pressure indicators.',
      result: 'City search, optional geolocation, a forecast for the coming days and °C/°F switching. The application is deployed and connected to the API.',
      next: 'Improve loading and error feedback, including unknown cities, connection failures and unavailable location access.',
      status: 'Funval project · deployed',
    },
  },
  {
    name: 'Shopi',
    preview: shopi,
    siteUrl: 'https://shopi-merces.vercel.app',
    repositoryUrl: 'https://github.com/diGit-hub/Shopi',
    privateRepository: false,
    badges: ['inProgress', 'noAiCode'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Axios'],
    pt: {
      type: 'Vitrine de e-commerce',
      summary: 'Interface de marketplace inspirada na Shopee, com banners, categorias, vitrines e ofertas carregadas de uma API.',
      problem: 'Praticar a construção manual de uma interface de e-commerce rica em conteúdo, reproduzindo a hierarquia visual de um marketplace.',
      role: 'Frontend escrito manualmente, sem geração de código por IA, com implementação dos componentes, layout e integração das ofertas.',
      choices: 'React e TypeScript estruturam os componentes e os dados das ofertas. Tailwind CSS define o layout e o Axios busca as ofertas relâmpago na API.',
      result: 'Página inicial com banners, categorias, vitrines, contador e ofertas conectadas à API. Carrinho, busca, produto e autenticação ainda precisam ser implementados.',
      next: 'Implementar os fluxos de produto, busca e carrinho, revisar responsividade e acessibilidade e padronizar a apresentação dos preços.',
      status: 'Frontend manual · em desenvolvimento',
    },
    en: {
      type: 'E-commerce storefront',
      summary: 'A Shopee-inspired marketplace interface with banners, categories, product displays and API-driven offers.',
      problem: 'Practice building a content-rich e-commerce interface by hand, reproducing the visual hierarchy of a marketplace.',
      role: 'Frontend written manually, without AI-generated code, including the components, layout and offers integration.',
      choices: 'React and TypeScript structure the components and offer data. Tailwind CSS defines the layout, and Axios fetches flash offers from the API.',
      result: 'A homepage with banners, categories, product displays, a countdown and API-connected offers. Cart, search, product and authentication flows still need implementation.',
      next: 'Implement product, search and cart flows, review responsiveness and accessibility, and standardize price formatting.',
      status: 'Manually written frontend · in development',
    },
  },
];

const technologyDescriptions: Record<string, Record<Locale, string>> = {
  React: {
    pt: 'Componentes reutilizáveis e estado para organizar a interface e as interações do usuário.',
    en: 'Reusable components and state to organize the interface and user interactions.',
  },
  JavaScript: {
    pt: 'Lógica da aplicação, eventos da interface e requisições assíncronas.',
    en: 'Application logic, interface events and asynchronous requests.',
  },
  TypeScript: {
    pt: 'Tipos para os dados da aplicação e as propriedades dos componentes.',
    en: 'Types for application data and component properties.',
  },
  'Tailwind CSS': {
    pt: 'Classes utilitárias para construir o layout, a identidade visual e os ajustes de responsividade.',
    en: 'Utility classes for layout, visual styling and responsive adjustments.',
  },
  'GamePix API': {
    pt: 'Catálogo externo com títulos, imagens, informações e endereços dos jogos.',
    en: 'An external catalog with game titles, images, information and URLs.',
  },
  Supabase: {
    pt: 'Serviço usado para autenticação e gerenciamento da sessão do usuário.',
    en: 'A service used for authentication and user session management.',
  },
  'Next.js': {
    pt: 'Estrutura do site público, do painel administrativo e das rotas de servidor.',
    en: 'The framework for the public website, admin dashboard and server routes.',
  },
  Prisma: {
    pt: 'Modelagem dos dados, migrations e acesso ao PostgreSQL a partir do servidor.',
    en: 'Data modeling, migrations and server-side access to PostgreSQL.',
  },
  PostgreSQL: {
    pt: 'Persistência de obras, conteúdo, contas administrativas e pedidos de orçamento.',
    en: 'Storage for artworks, content, admin accounts and quote requests.',
  },
  'OpenWeather API': {
    pt: 'Dados de clima atual e previsão consultados por cidade ou coordenadas.',
    en: 'Current weather and forecast data queried by city or coordinates.',
  },
  Axios: {
    pt: 'Requisições HTTP para carregar os dados das ofertas na página inicial.',
    en: 'HTTP requests to load offer data on the homepage.',
  },
};

export function technology(tag: string, locale: Locale) {
  return technologyDescriptions[tag]?.[locale] ?? tag;
}
