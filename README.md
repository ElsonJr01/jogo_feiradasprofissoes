# 🐙 Quiz do Clube de Programação

Jogo educativo desenvolvido para a **Feira das Profissões**, apresentando o
**Clube de Programação (UNIFESSPA)** a alunos do Ensino Fundamental e Médio
de forma divertida e interativa.

O jogo é um **quiz de múltipla escolha** com perguntas sobre algoritmos,
história da computação, mercado de trabalho em tecnologia e sobre o próprio
Clube — todo o conteúdo foi extraído da apresentação oficial "Criando os
criadores do futuro".

Mascote: **Polvinho**, o personagem oficial do Clube. 💙💚

---

## 🎮 Como jogar

1. Tela inicial com o Polvinho e o botão **"Começar o Quiz"**.
2. 8 perguntas sorteadas aleatoriamente entre um banco de 14, cada uma com
   20 segundos e 4 alternativas.
3. Feedback imediato (certo/errado) + uma curiosidade educativa a cada
   resposta.
4. Tela final com pontuação, nível de desempenho e convite para conhecer o
   Clube.

Pensado para rodar em **tablets, notebooks ou totens** durante o evento,
com botões grandes, alto contraste e textos curtos.

---

## 🧱 Stack técnica

| Camada          | Tecnologia                                  |
| ---------------- | -------------------------------------------- |
| Framework        | [Next.js 14](https://nextjs.org/) (App Router) |
| Linguagem        | TypeScript (modo `strict`)                    |
| Estilização      | Tailwind CSS (paleta customizada do Clube)    |
| Testes           | Vitest                                        |
| Lint             | ESLint (`eslint-config-next`)                 |
| Deploy           | Vercel (zero config)                          |

Sem backend, sem banco de dados — 100% estático e client-side, ideal para
rodar offline em um evento (após o primeiro carregamento).

---

## 🏗️ Arquitetura: MVP (Model–View–Presenter)

O projeto segue o padrão **MVP** adaptado ao React, com responsabilidades
bem separadas e testáveis:

```
┌─────────────────────┐      ┌──────────────────────────┐      ┌───────────────────────┐
│        MODEL         │      │         PRESENTER          │      │          VIEW           │
│  src/domain/          │      │  src/presenters/            │      │  src/components/         │
│                       │◄────►│                            │◄────►│  src/app/page.tsx        │
│ • entidades (types)   │      │ • useQuizPresenter (hook)  │      │ • Screens (Start/Quiz/   │
│ • QuizService          │      │ • orquestra estado + timer │      │   Result)                │
│ • banco de perguntas   │      │ • traduz Model → ViewModel │      │ • componentes de UI      │
│                       │      │ • NÃO contém JSX            │      │ • NÃO contém regra de    │
│ Puro TypeScript,       │      │                            │      │   negócio, só props      │
│ sem React              │      │                            │      │                          │
└─────────────────────┘      └──────────────────────────┘      └───────────────────────┘
```

- **Model** (`src/domain`): regras de negócio puras — sorteio de perguntas,
  cálculo de pontuação, condição de vitória, avaliação de desempenho.
  Não importa React; é 100% testável isoladamente.
- **Presenter** (`src/presenters/useQuizPresenter.ts`): um hook React que
  mantém o estado do jogo, controla o cronômetro e expõe um `QuizViewModel`
  pronto para renderizar — sem nenhuma linha de JSX.
- **View** (`src/components`): componentes "burros", que só recebem props e
  dados já processados e chamam callbacks. Nenhuma lógica de negócio mora
  aqui.

Essa separação permite trocar a interface (ex.: um app mobile nativo) ou o
motor de perguntas sem reescrever as outras camadas, além de tornar a
lógica de negócio testável sem precisar renderizar componentes.

---

## 📁 Estrutura de pastas

```
src/
├── app/                     # App Router do Next.js (rotas, layout, estilos globais)
│   ├── layout.tsx
│   ├── page.tsx             # composition root: conecta Presenter + Views
│   └── globals.css
├── components/
│   ├── layout/               # Header, Footer
│   ├── screens/               # StartScreen, QuizScreen, ResultScreen
│   └── ui/                   # Button, Mascot, OptionCard, Timer, ProgressBar, Badge
├── domain/                    # MODEL — regras de negócio (sem React)
│   ├── data/questions.ts     # banco de perguntas
│   ├── entities/              # (reservado para futuras entidades)
│   └── services/QuizService.ts
├── presenters/
│   └── useQuizPresenter.ts   # PRESENTER
├── lib/
│   ├── constants.ts          # configuração do jogo, níveis de desempenho
│   └── shuffle.ts            # utilitário puro de embaralhamento
├── types/
│   └── index.ts              # tipos compartilhados do domínio
└── __tests__/                # testes unitários (Vitest)
    ├── QuizService.test.ts
    └── shuffle.test.ts
```

---

## 🎨 Identidade visual

Cores extraídas diretamente do material oficial do Clube de Programação:

| Cor                | Hex        | Uso                                  |
| ------------------- | ---------- | -------------------------------------- |
| 🔵 Azul primário     | `#136AFF`  | Títulos, botões principais, logo       |
| 🟢 Verde             | `#6CBD3D`  | Sucesso, progresso, botão secundário   |
| 🟣 Roxo              | `#8D3596`  | Acentos lúdicos (olhos do mascote)     |
| 🌸 Lavanda           | `#F4E2F5`  | Superfícies suaves, badges             |
| 🔷 Azul claro        | `#A3C3FF`  | Fundos e detalhes                       |
| ⬛ Navy (texto)      | `#001F57`  | Texto de alto contraste                 |

A paleta está centralizada em `tailwind.config.ts` (`theme.extend.colors.clube`),
evitando cores soltas espalhadas pelo código.

O mascote **Polvinho** (`public/images/polvinho.png`) foi extraído em alta
resolução, com fundo transparente, diretamente do material institucional do
Clube.

---

## 🚀 Rodando localmente

Pré-requisitos: **Node.js 18.18+**.

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento (http://localhost:3000)
npm run dev

# checagem de tipos
npm run type-check

# lint
npm run lint

# testes unitários
npm run test

# build de produção
npm run build
npm run start
```

---

## ☁️ Deploy no Vercel

Este projeto foi estruturado para ser **importado diretamente no Vercel**,
sem nenhuma configuração adicional (framework Next.js detectado
automaticamente).

### Opção 1 — Botão de deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Clique no botão acima (ou em **Add New → Project** no seu dashboard Vercel).
2. Importe este repositório (faça upload no GitHub/GitLab/Bitbucket primeiro,
   ou use `vercel` CLI — veja abaixo).
3. Mantenha as configurações padrão sugeridas pela Vercel:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
4. Clique em **Deploy**. Pronto — sem variáveis de ambiente necessárias.

### Opção 2 — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel        # ambiente de preview
vercel --prod # publica em produção
```

---

## ✅ Qualidade de software

- **TypeScript `strict`** habilitado, incluindo `noUncheckedIndexedAccess`.
- **Testes unitários** cobrindo 100% das regras de negócio do `QuizService`
  e do utilitário de embaralhamento (17 testes).
- **Funções puras e imutáveis** na camada de domínio (facilita testes e
  previne bugs de estado compartilhado).
- **Componentes pequenos e coesos**, cada um com responsabilidade única
  (princípio SRP).
- **Sem números/strings mágicos**: configurações centralizadas em
  `src/lib/constants.ts`.
- **Acessibilidade**: `aria-live`, `role="progressbar"`/`role="timer"`,
  contraste adequado, navegação por teclado (`:focus-visible`), textos
  alternativos em imagens.
- **ESLint** com `eslint-config-next` (regras de boas práticas React/Next).

---

## ✏️ Customizando o conteúdo

- **Adicionar/editar perguntas**: edite `src/domain/data/questions.ts`.
  Cada pergunta segue a interface `Question` (`src/types/index.ts`).
- **Ajustar regras do jogo** (quantidade de perguntas, tempo por pergunta):
  edite `src/lib/constants.ts` (`GAME_CONFIG`).
- **Alterar cores**: edite `tailwind.config.ts` (`theme.extend.colors.clube`).
- **Trocar o mascote**: substitua `public/images/polvinho.png` (mantendo
  proporção similar) — o componente `src/components/ui/Mascot.tsx` ajusta o
  tamanho automaticamente.

---

## 📄 Licença

MIT — sinta-se livre para adaptar este projeto para outras edições da Feira
das Profissões ou outros eventos do Clube de Programação.

---

<p align="center">Feito com 💙 para o <strong>Clube de Programação — UNIFESSPA</strong></p>
