import type { Question } from '@/types';

/**
 * Banco de perguntas do quiz.
 *
 * Todo o conteúdo foi baseado na apresentação oficial do Clube de
 * Programação ("Criando os criadores do futuro"), usada na Feira das
 * Profissões. Escrito em linguagem simples, acessível tanto para
 * alunos do Ensino Fundamental quanto do Ensino Médio.
 */
export const QUESTIONS: readonly Question[] = [
  {
    id: 'q1-algoritmo',
    category: 'algoritmos',
    prompt: 'O que é um algoritmo?',
    options: [
      'Um vírus de computador',
      'Uma sequência de instruções para realizar uma tarefa',
      'Um tipo de teclado',
      'Um jogo eletrônico',
    ],
    correctOptionIndex: 1,
    funFact:
      'Isso mesmo! Um algoritmo é como uma receita de bolo: uma sequência de passos que uma máquina pode seguir.',
  },
  {
    id: 'q2-programacao',
    category: 'algoritmos',
    prompt: 'O que é "programação"?',
    options: [
      'Assistir a vídeos de tecnologia',
      'Montar peças de computador',
      'O ato de escrever algoritmos para o computador executar',
      'Apenas usar aplicativos no celular',
    ],
    correctOptionIndex: 2,
    funFact:
      'Programar é escrever instruções que o computador entende e executa — é assim que jogos, apps e sites são criados.',
  },
  {
    id: 'q3-eniac-nome',
    category: 'historia',
    prompt: 'Qual foi o primeiro computador do mundo, criado em 1945?',
    options: ['ENIAC', 'iPhone', 'Atari', 'MacBook'],
    correctOptionIndex: 0,
    funFact:
      'O ENIAC tinha quase 18.000 válvulas, esquentava muito e nem tinha monitor ou mouse!',
  },
  {
    id: 'q4-eniac-tamanho',
    category: 'historia',
    prompt: 'Comparado aos computadores de hoje, como era o ENIAC?',
    options: [
      'Do tamanho de um celular',
      'Enorme, ocupava uma sala inteira e precisava de resfriamento',
      'Idêntico a um notebook atual',
      'Cabia dentro de uma mochila',
    ],
    correctOptionIndex: 1,
    funFact:
      'O ENIAC era tão grande e esquentava tanto que precisava de sistemas gigantes de resfriamento para não derreter.',
  },
  {
    id: 'q5-decada-1940',
    category: 'historia',
    prompt: 'Na década de 1940, como as instruções eram dadas às máquinas?',
    options: [
      'Por comando de voz',
      'Por aplicativos de celular',
      'Por furos manuais em cartões perfurados',
      'Pela internet',
    ],
    correctOptionIndex: 2,
    funFact:
      'Antes dos teclados e telas, programar significava perfurar cartões manualmente para controlar as máquinas!',
  },
  {
    id: 'q6-hoje-ia',
    category: 'historia',
    prompt: 'O que marca a era atual da tecnologia, segundo a linha do tempo do Clube?',
    options: [
      'O surgimento do disquete',
      'A revolução da Inteligência Artificial',
      'A invenção do rádio',
      'O fim da internet',
    ],
    correctOptionIndex: 1,
    funFact:
      'Hoje vivemos a revolução da IA: algoritmos autônomos capazes de conversar, criar textos e imagens.',
  },
  {
    id: 'q7-vagas-mercado',
    category: 'mercado',
    prompt: 'Segundo estimativas, quantas vagas de tecnologia podem ficar sem profissionais no Brasil até 2025?',
    options: ['5 mil', '50 mil', '530 mil', '5 milhões'],
    correctOptionIndex: 2,
    funFact:
      'São cerca de 530 mil vagas! Por isso aprender a programar hoje é uma das melhores apostas para o futuro.',
  },
  {
    id: 'q8-trabalho-remoto',
    category: 'mercado',
    prompt: 'Para trabalhar com tecnologia, é obrigatório morar em uma grande cidade?',
    options: [
      'Sim, sempre',
      'Não! É possível trabalhar remoto de qualquer lugar, até em dólar ou euro',
      'Só se a cidade tiver mais de 1 milhão de habitantes',
      'Só depois dos 30 anos',
    ],
    correctOptionIndex: 1,
    funFact:
      'A tecnologia não tem barreiras geográficas: dá para morar em Marabá e trabalhar remotamente para o mundo todo.',
  },
  {
    id: 'q9-areas-atuacao',
    category: 'areas',
    prompt: 'Qual das opções abaixo é uma área de atuação para quem programa?',
    options: ['Culinária internacional', 'Inteligência Artificial', 'Corte de cabelo', 'Costura'],
    correctOptionIndex: 1,
    funFact:
      'Além de IA, dá para atuar com Mobile & Web, Criação de Jogos, Cybersegurança, Telecomunicações e Automação.',
  },
  {
    id: 'q10-areas-jogos',
    category: 'areas',
    prompt: 'Quem gosta de jogos eletrônicos pode trabalhar programando na área de...',
    options: ['Criação de Jogos', 'Jardinagem', 'Transporte rodoviário', 'Nutrição'],
    correctOptionIndex: 0,
    funFact: 'Criação de Jogos é uma das áreas mais procuradas por quem ama games e tecnologia!',
  },
  {
    id: 'q11-clube-o-que-e',
    category: 'clube',
    prompt: 'O que é o Clube de Programação?',
    options: [
      'Uma loja de eletrônicos',
      'Uma iniciativa de alunos de Engenharia da Computação para ensinar tecnologia',
      'Um time de futebol',
      'Uma rede social',
    ],
    correctOptionIndex: 1,
    funFact:
      'O Clube é uma comunidade de alunos da UNIFESSPA que preza pela colaboração, trabalho em equipe e aprendizado.',
  },
  {
    id: 'q12-clube-objetivo',
    category: 'clube',
    prompt: 'Qual é o objetivo principal do Clube de Programação?',
    options: [
      'Vender computadores',
      'Democratizar o conhecimento tecnológico',
      'Competir em campeonatos esportivos',
      'Organizar festas',
    ],
    correctOptionIndex: 1,
    funFact: 'Democratizar o conhecimento tecnológico significa levar esse saber a todas as pessoas, de graça.',
  },
  {
    id: 'q13-clube-atividades',
    category: 'clube',
    prompt: 'O que o Clube de Programação oferece para quem participa?',
    options: [
      'Apenas provas teóricas',
      'Oficinas, desafios semanais e hackathons',
      'Somente aulas de matemática',
      'Passagens aéreas',
    ],
    correctOptionIndex: 1,
    funFact:
      'Nos hackathons, os participantes criam um protótipo em equipe, do zero, em torno de um tema central.',
  },
  {
    id: 'q14-clube-materiais',
    category: 'clube',
    prompt: 'Onde é possível encontrar aulas e materiais de apoio do Clube?',
    options: [
      'Só em livros impressos',
      'No canal do YouTube do Clube de Programação',
      'Apenas em DVDs',
      'Não existem materiais disponíveis',
    ],
    correctOptionIndex: 1,
    funFact: 'As aulas ficam disponíveis gratuitamente em youtube.com/@clubedeprogramacao.',
  },
];
