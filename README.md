# 🌟 Star Wars Universe Explorer

Uma aplicação web moderna e interativa para explorar o vasto universo de Star Wars. Desenvolvida com Next.js 14, TypeScript e Tailwind CSS, oferece uma experiência visual deslumbrante com animações suaves, efeitos glassmorphism e design totalmente responsivo.

![Star Wars Universe Explorer](https://img.shields.io/badge/Star%20Wars-Universe%20Explorer-yellow?style=for-the-badge&logo=star-wars)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Características Principais

### 🎨 Design Moderno
- **Glassmorphism**: Efeitos translúcidos com backdrop-filter blur
- **Gradientes**: Cores vibrantes e gradientes personalizados
- **Animações**: Transições suaves e animações CSS personalizadas
- **Responsivo**: Design adaptável para todos os dispositivos

### 🚀 Funcionalidades
- **Exploração de Categorias**: People, Planets, Films, Species, Vehicles, Starships
- **API SWAPI**: Integração com a API oficial do Star Wars
- **Paginação**: Navegação intuitiva entre páginas de resultados
- **Busca em Tempo Real**: Carregamento dinâmico de dados
- **Navegação Suave**: Transições e animações fluidas

### 📱 Experiência Mobile
- **Design Adaptativo**: Layout otimizado para dispositivos móveis
- **Touch-Friendly**: Botões e interações otimizados para touch
- **Performance**: Carregamento rápido e responsivo
- **Acessibilidade**: Navegação por teclado e leitores de tela

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Custom Properties
- **Icons**: Lucide React
- **API**: SWAPI (Star Wars API)
- **Deployment**: Vercel (recomendado)

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm, yarn ou pnpm

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/star-wars-universe.git
cd star-wars-universe
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Acesse no navegador**
```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
star-wars/
├── src/
│   ├── app/                    # App Router do Next.js 14
│   │   ├── [category]/        # Páginas dinâmicas por categoria
│   │   ├── globals.css        # Estilos globais e animações
│   │   ├── layout.tsx         # Layout principal da aplicação
│   │   └── page.tsx           # Página inicial
│   ├── components/            # Componentes reutilizáveis
│   │   ├── ui/               # Componentes de UI base
│   │   ├── BackButton.tsx    # Botão de voltar
│   │   ├── CategoryList.tsx  # Lista de itens por categoria
│   │   ├── LoadingSpinner.tsx # Spinner de carregamento
│   │   ├── Pagination.tsx    # Componente de paginação
│   │   ├── ScrollToTop.tsx   # Botão de voltar ao topo
│   │   └── StarryBackground.tsx # Fundo estrelado animado
│   └── lib/                  # Utilitários e configurações
├── public/                   # Assets estáticos
│   └── assets/              # Imagens e recursos
├── tailwind.config.ts        # Configuração do Tailwind CSS
├── next.config.ts           # Configuração do Next.js
└── package.json             # Dependências do projeto
```

## 🎯 Funcionalidades Detalhadas

### 🏠 Página Inicial
- **Hero Section**: Título animado com gradiente
- **Grid de Categorias**: Cards interativos com efeitos hover
- **Animações**: Entrada sequencial dos elementos
- **Call to Action**: Seção informativa sobre a aplicação

### 📋 Páginas de Categoria
- **Header Dinâmico**: Título e descrição personalizados
- **Lista de Itens**: Cards com informações detalhadas
- **Paginação Avançada**: Navegação com números de página
- **Loading States**: Spinners animados durante carregamento

### 🎨 Sistema de Design

#### Cores
- **Primária**: Amarelo (#fbbf24) - Representa a Força
- **Secundária**: Azul (#3b82f6) - Representa a tecnologia
- **Fundo**: Gradientes de slate para profundidade
- **Glassmorphism**: Transparências com blur para modernidade

#### Tipografia
- **Títulos**: Inter (Google Fonts) para legibilidade
- **Hierarquia**: Escalas consistentes para diferentes níveis
- **Responsividade**: Tamanhos adaptáveis para mobile

#### Animações
- **Float**: Movimento suave para elementos principais
- **Slide In**: Entrada dos elementos na tela
- **Hover Effects**: Interações responsivas
- **Loading States**: Indicadores visuais de carregamento

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px - Layout em coluna única
- **Tablet**: 768px - 1024px - Layout em duas colunas
- **Desktop**: > 1024px - Layout em três colunas

### Otimizações Mobile
- **Touch Targets**: Botões com tamanho mínimo de 48px
- **Gestos**: Suporte para swipe e touch
- **Performance**: Animações otimizadas para dispositivos móveis
- **Layout**: Espaçamentos e tamanhos adaptados

## 🔧 Configurações

### Tailwind CSS
```typescript
// tailwind.config.ts
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      }
    }
  }
}
```

### Next.js
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['swapi.dev'],
  }
}
```

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente se necessário
3. Deploy automático a cada push

### Outras Plataformas
- **Netlify**: Compatível com Next.js
- **Railway**: Deploy simples e rápido
- **AWS Amplify**: Para projetos empresariais

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- **SWAPI**: API oficial do Star Wars
- **Next.js Team**: Framework incrível
- **Tailwind CSS**: Sistema de design utilitário
- **Comunidade Star Wars**: Inspiração e paixão

## 📞 Contato

- **GitHub**: [@seu-usuario](https://github.com/seu-usuario)
- **Email**: seu-email@exemplo.com
- **LinkedIn**: [Seu Nome](https://linkedin.com/in/seu-perfil)

---

**Que a Força esteja com você!** ⚡

*Desenvolvido com ❤️ e persistência 💪*
