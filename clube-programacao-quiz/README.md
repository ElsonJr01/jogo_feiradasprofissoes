# Quiz · Clube de Programação

Quiz interativo, com tempo por pergunta e feedback imediato, feito para ser exibido
em estandes de feiras de profissões. As 10 perguntas foram tiradas do conteúdo da
apresentação **"Criando os criadores do futuro"** (o que é um algoritmo, o ENIAC, o
mercado de trabalho em tecnologia, as áreas de atuação e o próprio Clube de
Programação), para reforçar o que já foi mostrado ao público de Ensino
Fundamental e Médio.

Ao final, o visitante recebe um "perfil tech" (Explorador(a) Iniciante,
Programador(a) em Formação, Hacker do Bem ou Mestre dos Algoritmos) e pode jogar
de novo — pensado para funcionar em loop, sem intervenção de quem está no estande.

## Stack

- **TypeScript** (modo `strict`) — sem frameworks de UI, só DOM puro.
- **Vite** — build e servidor de desenvolvimento.
- Zero dependências de runtime: o pacote final é HTML + CSS + ~5 KB de JS
  (gzip), então carrega rápido mesmo em Wi-Fi de evento.

## Arquitetura: MVP (Model-View-Presenter)

O código é dividido em três camadas que não se conhecem diretamente, o que torna
cada peça fácil de entender, testar e trocar isoladamente:

```
┌─────────────┐   chama métodos    ┌─────────────┐
│  Presenter  │ ─────────────────▶ │    Model    │
│ (orquestra  │ ◀───────────────── │ (estado e   │
│   o fluxo)  │   devolve dados    │   regras)   │
└──────┬──────┘                    └─────────────┘
       │ manda renderizar
       ▼
┌─────────────┐   emite eventos
│    View     │ ─────────────────▶ (o Presenter escuta)
│ (DOM e UI)  │
└─────────────┘
```

- **Model** (`src/models`) — dados e regras puras: perguntas, pontuação, avanço
  de pergunta, cálculo do "perfil" final. Não importa nada de DOM, então dá para
  testar com Node puro, sem navegador.
- **View** (`src/views`) — só desenha a tela e escuta cliques. Recebe tudo pronto
  do Presenter (qual pergunta mostrar, quanto tempo falta) e nunca decide nada
  sozinha.
- **Presenter** (`src/presenters/QuizPresenter.ts`) — o único lugar que conhece
  Model e View ao mesmo tempo. Reage a eventos de clique, chama o Model, e manda
  a View certa renderizar o resultado. Controla também o timer de cada pergunta.

```
src/
├── models/
│   ├── types.ts            # Interfaces de domínio (Question, Answer...)
│   ├── questions.data.ts   # Banco de perguntas — edite só este arquivo
│   └── QuizModel.ts        # Estado do jogo e regras (pontuação, perfil final)
├── views/
│   ├── BaseView.ts         # Contrato comum (mount/unmount) das telas
│   ├── StartView.ts        # Tela inicial
│   ├── QuizView.ts         # Tela de pergunta, timer e alternativas
│   └── ResultView.ts       # Tela de resultado final
├── presenters/
│   └── QuizPresenter.ts    # Orquestra o fluxo entre Model e Views
├── utils/
│   ├── EventEmitter.ts     # Pub/sub tipado usado pelas Views
│   ├── dom.ts               # Helpers de criação/limpeza de elementos
│   └── mascot.ts             # Mascote em SVG, reaproveitado em duas telas
├── style.css                # Identidade visual (ver seção abaixo)
└── main.ts                  # Ponto de entrada: monta Model + Presenter
```

### Por que essa separação importa aqui

- Quer **mudar as perguntas**? Mexa só em `questions.data.ts`.
- Quer **mudar o visual**? Mexa só em `style.css` e nas Views — nenhuma regra de
  jogo está lá.
- Quer **mudar as regras** (tempo por pergunta, critério do "perfil" final,
  pontuação)? Mexa só em `QuizModel.ts` ou nas constantes do topo de
  `QuizPresenter.ts` — nenhuma View precisa mudar.

## Identidade visual

- **Cores**: azul (`#1857E0` / `#0E3FA8`) e verde (`#2BA84A`) do Clube, sobre um
  fundo claro com "manchas" arredondadas — o mesmo estilo de nuvem usado no plano
  de fundo dos slides da apresentação.
- **Tipografia**: [Fredoka](https://fonts.google.com/specimen/Fredoka) (títulos,
  arredondada e amigável, próxima da logo do Clube), 
  [Manrope](https://fonts.google.com/specimen/Manrope) (texto das perguntas e
  alternativas) e [Space Mono](https://fonts.google.com/specimen/Space+Mono)
  (só no placar e no cronômetro, para reforçar o clima "código").
- **Mascote**: um pequeno personagem em SVG (`src/utils/mascot.ts`), original,
  inspirado no robô-mascote do Clube.
- Botões e alternativas têm foco visível pelo teclado, e as animações respeitam
  a preferência `prefers-reduced-motion` do sistema.

## Rodando localmente

Requer [Node.js](https://nodejs.org) 18 ou mais recente.

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

Para gerar o build de produção (o mesmo que o Vercel gera):

```bash
npm run build   # roda o type-check (tsc) e depois o build (vite build)
npm run preview # serve o build gerado em dist/, para conferir antes do deploy
```

## Publicando no Vercel

O projeto já vem com `vercel.json` configurado (`framework: vite`,
`outputDirectory: dist`), então o Vercel reconhece tudo automaticamente.

**Opção A — pelo painel do Vercel (mais simples):**

1. Suba esta pasta para um repositório no GitHub (ou GitLab/Bitbucket).
2. Em [vercel.com/new](https://vercel.com/new), clique em **Import Project** e
   selecione o repositório.
3. O Vercel detecta o framework (Vite) automaticamente — não precisa mudar
   nenhum campo. Clique em **Deploy**.

**Opção B — pela CLI, sem precisar de repositório Git:**

```bash
npm install -g vercel
vercel        # deploy de preview
vercel --prod # deploy de produção
```

## Usando no estande da feira

- O jogo já reinicia sozinho com o botão **"Jogar novamente"** ao final — não
  precisa recarregar a página entre um visitante e outro.
- Cada pergunta tem **20 segundos** (ajustável em `QUESTION_TIME_SECONDS`, em
  `QuizPresenter.ts`); se o tempo acabar, conta como erro e o jogo segue sozinho.
- Recomenda-se abrir o navegador em **tela cheia** (F11 na maioria dos
  navegadores) no computador ou tablet do estande.

## Notas de qualidade

- TypeScript em modo `strict`, com `noUnusedLocals`/`noUnusedParameters`
  ativados — código morto não passa no build.
- `npm run build` roda `tsc` antes do `vite build`, então erros de tipo travam o
  build antes de gerar qualquer arquivo.
- Sem dependências de runtime: menos superfície de bugs e menos coisa para
  atualizar depois do evento.
- `npm install` pode reportar uma vulnerabilidade conhecida do Vite/esbuild que
  afeta apenas o servidor de desenvolvimento local (`npm run dev`) — ela não
  chega ao build de produção publicado no Vercel.

## Licença

Projeto feito para uso interno do Clube de Programação (UNIFESSPA). Sinta-se à
vontade para adaptar perguntas, cores e textos para outras edições da feira.
