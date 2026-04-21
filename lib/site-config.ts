import { 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Users, 
  TrendingUp, 
  FileText, 
  PieChart, 
  Briefcase,
  Clock,
  CheckCircle2,
  Cpu,
  UserCheck,
  Sparkles,
  Layers,
  Store,
  Factory
} from 'lucide-react';

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image?: string;
  content?: string;
}

export interface Service {
  title: string;
  description: string;
  icon: any;
  whatsappMessage?: string;
}

export const siteConfig = {
  name: 'OFFICIA ROCHA ASSESSORIA',
  description: 'Inteligência Financeira e Contabilidade de Alta Performance',
  stats: [
    { label: 'Anos de Experiência', value: '10+', icon: Clock },
    { label: 'Clientes Ativos', value: '300+', icon: Users },
    { label: 'Economia Gerada', value: 'R$ 5M+', icon: TrendingUp },
    { label: 'Índice de Satisfação', value: '99%', icon: CheckCircle2 },
  ],
  services: [
    {
      title: 'Contabilidade para TI',
      description: 'Gestão financeira eficiente para startups e empresas de tecnologia, incluindo incentivos fiscais e organização de projetos.',
      icon: Cpu,
      whatsappMessage: 'Olá, tenho interesse em serviços contábeis para empresas de TI e gostaria de mais informações.'
    },
    {
      title: 'Representantes Comerciais',
      description: 'Suporte contábil para gestão de comissões, despesas de viagem e organização fiscal para representantes.',
      icon: UserCheck,
      whatsappMessage: 'Olá, tenho interesse em serviços contábeis para representantes comerciais e gostaria de mais informações.'
    },
    {
      title: 'Beleza e Bem-estar',
      description: 'Soluções para salões, spas e clínicas. Gestão de estoques e conformidade fiscal para o setor de bem-estar.',
      icon: Sparkles,
      whatsappMessage: 'Olá, tenho interesse em serviços contábeis para o setor de beleza e bem-estar e gostaria de mais informações.'
    },
    {
      title: 'Prestadores de Serviços',
      description: 'Estudo tributário e planejamento anual para garantir o menor imposto legal e maior lucro distribuído.',
      icon: Layers,
      whatsappMessage: 'Olá, tenho interesse em serviços contábeis para prestadores de serviços e gostaria de mais informações.'
    },
    {
      title: 'Contabilidade para Comércios',
      description: 'Suporte total para lojas, bares e restaurantes. Análise de produtos para menor carga tributária e recuperação de impostos.',
      icon: Store,
      whatsappMessage: 'Olá, tenho interesse em serviços contábeis para comércios e gostaria de mais informações.'
    },
    {
      title: 'Migrar de MEI para ME',
      description: 'Assessoria especializada para a transição segura do MEI para Microempresa, garantindo conformidade no crescimento.',
      icon: TrendingUp,
      whatsappMessage: 'Olá, tenho interesse em serviços contábeis para migração de MEI para ME e gostaria de mais informações.'
    },
    {
      title: 'Indústrias',
      description: 'Suporte fiscal e tributário especializado para indústrias, com foco na particularidade de cada produto comercializado.',
      icon: Factory,
      whatsappMessage: 'Olá, tenho interesse em serviços contábeis para indústrias e gostaria de mais informações.'
    },
  ],
  differentials: [
    {
      title: 'Atendimento Humanizado',
      description: 'Você não é apenas um número. Entendemos suas dores e objetivos.',
      icon: Users,
    },
    {
      title: 'Estratégia Contábil',
      description: 'Transformamos dados em insights para o crescimento do seu negócio.',
      icon: TrendingUp,
    },
    {
      title: 'Agilidade Digital',
      description: 'Processos otimizados para que você não perca tempo com burocracia.',
      icon: Zap,
    },
    {
      title: 'Segurança Absoluta',
      description: 'Conformidade total com as leis para sua tranquilidade total.',
      icon: ShieldCheck,
    },
  ],
  testimonials: [
    {
      name: 'Ricardo Silva',
      company: 'Tech Solutions',
      text: 'A Officia Contabil mudou minha visão sobre contabilidade. Hoje tenho clareza total das minhas finanças.',
    },
    {
      name: 'Ana Oliveira',
      company: 'Studio Criativo',
      text: 'Atendimento impecável. O suporte via WhatsApp é muito rápido e sempre resolvem minhas dúvidas.',
    },
    {
      name: 'Marcos Santos',
      company: 'Logística Express',
      text: 'O planejamento tributário que fizeram me economizou milhares de reais no último ano. Recomendo.',
    },
  ],
  blogPosts: [
    {
      title: 'Contabilidade Estratégica: O Motor do Crescimento Empresarial',
      slug: 'contabilidade-estrategica-crescimento',
      excerpt: 'Descubra como a contabilidade pode ir além dos impostos e se tornar uma poderosa ferramenta de decisão para empresas de todos os portes em 2026.',
      date: '15 Abr 2026',
      author: 'Equipe OFFICIA',
      category: 'Gestão',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      content: `
        <h3 class="text-2xl font-bold text-primary pt-4">O que é contabilidade estratégica?</h3>
        <p>A contabilidade estratégica deixou de ser apenas um registro de entradas e saídas. Em 2026, empresas que crescem de forma sustentável utilizam os dados contábeis para tomar decisões mais inteligentes — sobre precificação, expansão, investimentos e gestão de caixa.</p>
        <p>Quando bem estruturada, a contabilidade oferece uma visão 360° do negócio: quais produtos são mais lucrativos, quais clientes geram mais receita e onde estão os maiores riscos financeiros.</p>
        <div class="bg-blue-50 border-l-4 border-secondary p-6 my-8 rounded-r-2xl">
          <p class="text-primary font-medium">💡 Empresas que integram contabilidade à gestão estratégica têm 2x mais chances de atingir suas metas de crescimento no médio prazo.</p>
        </div>
        <h3 class="text-2xl font-bold text-primary pt-4">Indicadores que todo gestor deve acompanhar</h3>
        <p>Margem de contribuição, ponto de equilíbrio, EBITDA e fluxo de caixa livre são alguns dos indicadores que transformam números em decisões. Em 2026, com a inflação ainda pressionando custos, monitorar esses dados mensalmente é indispensável para manter a saúde financeira do negócio.</p>
        <h3 class="text-2xl font-bold text-primary pt-4">Como implementar na prática?</h3>
        <p>O primeiro passo é organizar o plano de contas da empresa e garantir que as informações estejam sempre atualizadas. A partir daí, um contador estratégico pode ajudá-lo a montar um dashboard gerencial e estabelecer metas baseadas em dados reais — não em intuição.</p>
        <p>Ferramentas de BI integradas aos sistemas contábeis estão cada vez mais acessíveis para PMEs em 2026. Combinadas a uma assessoria contábil de qualidade, elas permitem antecipar tendências e reagir antes que os problemas se tornem crises.</p>
      `
    },
    {
      title: 'MEI em 2026: O que Mudou e Como se Preparar',
      slug: 'mei-2026-mudancas',
      excerpt: 'Fique por dentro das novas regras, limites de faturamento e obrigações do Microempreendedor Individual em 2026 — e saiba o que fazer para estar em conformidade.',
      date: '10 Abr 2026',
      author: 'Equipe OFFICIA',
      category: 'MEI',
      readTime: '4 min',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
      content: `
        <h3 class="text-2xl font-bold text-primary pt-4">Novo limite de faturamento anual</h3>
        <p>Em 2026, o teto anual do MEI foi reajustado para R$ 169.000,00, seguindo a correção prevista na legislação. Isso representa uma oportunidade importante para empreendedores que estavam próximos do limite anterior e precisavam de mais margem para crescer sem precisar mudar de categoria.</p>
        <div class="bg-blue-50 border-l-4 border-secondary p-6 my-8 rounded-r-2xl">
          <p class="text-primary font-medium">⚠️ Se você ultrapassou o limite em 2025, é hora de avaliar a migração para ME (Microempresa). O contador pode orientar qual regime tributário é mais vantajoso nessa transição.</p>
        </div>
        <h3 class="text-2xl font-bold text-primary pt-4">DAS 2026: valores atualizados</h3>
        <p>Os valores do DAS (Documento de Arrecadação do Simples Nacional) foram atualizados em janeiro de 2026 com base no novo salário mínimo. O pagamento vence todo dia 20 do mês — fique atento para evitar juros e multas que podem comprometer o registro da empresa.</p>
        <h3 class="text-2xl font-bold text-primary pt-4">Obrigações acessórias em 2026</h3>
        <p>A DASN-SIMEI (declaração anual) deve ser entregue até 31 de maio de 2026, referente ao ano-calendário 2025. Além disso, o MEI que contrata funcionário precisa cumprir obrigações trabalhistas mensais, como folha de pagamento e FGTS.</p>
        <p>A digitalização dos processos fiscais exige que o microempreendedor esteja cada vez mais atento às atualizações do Portal do Empreendedor e do e-CAC. Contar com suporte profissional evita erros que podem resultar em cancelamento do CNPJ.</p>
      `
    },
    {
      title: 'Planejamento Tributário: Como Reduzir Custos Legalmente em 2026',
      slug: 'planejamento-tributario-custos',
      excerpt: 'Aprenda as estratégias para otimizar a carga tributária da sua empresa com segurança jurídica — e entenda como a Reforma Tributária impacta seu negócio em 2026.',
      date: '05 Abr 2026',
      author: 'Equipe OFFICIA',
      category: 'Tributário',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200',
      content: `
        <h3 class="text-2xl font-bold text-primary pt-4">Reforma tributária e o impacto nas empresas em 2026</h3>
        <p>Com a implementação gradual da Reforma Tributária em curso, 2026 é um ano de transição importante. Empresas precisam entender como a unificação de tributos sobre consumo (IBS e CBS) afeta seus custos, precificação e fluxo de caixa — especialmente nos setores de comércio e serviços.</p>
        <div class="bg-blue-50 border-l-4 border-secondary p-6 my-8 rounded-r-2xl">
          <p class="text-primary font-medium">📌 Empresas que realizaram o planejamento tributário preventivo em 2025 chegam a 2026 com vantagem competitiva. Ainda há tempo para agir — o ideal é revisar agora, no início do exercício.</p>
        </div>
        <h3 class="text-2xl font-bold text-primary pt-4">Escolha do regime tributário</h3>
        <p>Simples Nacional, Lucro Presumido ou Lucro Real? A escolha certa pode representar uma diferença significativa na carga de impostos ao final do ano. A decisão deve considerar o faturamento projetado, a margem de lucro e o perfil das despesas dedutíveis de cada empresa.</p>
        <p>Em 2026, com as mudanças no ambiente tributário, algumas empresas que estavam no Lucro Presumido podem se beneficiar da migração para o Lucro Real — especialmente aquelas com margens apertadas e alto volume de despesas operacionais comprováveis.</p>
        <h3 class="text-2xl font-bold text-primary pt-4">Estratégias legais de economia tributária</h3>
        <p>Entre as principais ferramentas disponíveis estão: aproveitamento de créditos de PIS/COFINS, dedução de despesas operacionais, distribuição eficiente de lucros e pró-labore, uso de benefícios fiscais regionais e setoriais e o planejamento societário para grupos empresariais.</p>
        <h3 class="text-2xl font-bold text-primary pt-4">Quando buscar um contador especializado?</h3>
        <p>O planejamento tributário não é uma ação pontual — deve ser revisado a cada início de exercício e sempre que houver mudanças relevantes na legislação ou no perfil do negócio. Um especialista garante conformidade e reduz o risco de autuações fiscais, que em 2026 contam com sistemas de cruzamento de dados cada vez mais sofisticados pela Receita Federal.</p>
      `
    }
  ],
  contact: {
    title: 'Pronto para elevar o nível da sua gestão?',
    description: 'Nossa equipe de especialistas está pronta para analisar seu negócio e propor soluções que geram resultados reais.',
    buttonText: 'Enviar Mensagem',
    email: 'contato@officiacontabil.com',
    phone: '(11) 95590-7718',
    address: 'Rua Barão de Itapetininga, 50, São Paulo',
    hours: 'Seg–Qui 09h–18h | Sex 09h–17h',
    facebook: 'https://www.facebook.com/officiarochacontabil',
    instagram: 'https://www.instagram.com/officiarochacontabil/',
  },
  finalCTA: {
    title: 'Sua empresa merece uma gestão de elite.',
    buttonText: 'Falar com Especialista agora',
  },
  whatsapp: {
    link: 'https://wa.me/5511955907718',
    defaultMessage: 'Olá, gostaria de falar com um especialista sobre a gestão da minha empresa e obter mais informações.',
  },
};
