import type { QuizQuestion } from './types';

/**
 * Perguntas baseadas na apresentação "Criando os criadores do futuro" do
 * Clube de Programação (UNIFESSPA). Para adicionar, remover ou editar
 * perguntas, basta alterar este arquivo — nenhuma outra camada precisa
 * mudar.
 */
export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    prompt: 'O que é um algoritmo?',
    options: [
      { id: 'a', text: 'Um vírus de computador' },
      { id: 'b', text: 'Uma sequência de instruções para realizar uma tarefa' },
      { id: 'c', text: 'Um tipo de hardware' },
      { id: 'd', text: 'Uma marca de processador' },
    ],
    correctOptionId: 'b',
    explanation: 'É como uma receita de bolo: uma sequência de passos que uma máquina consegue executar.',
  },
  {
    id: 2,
    prompt: 'Qual foi o primeiro computador do mundo, criado em 1945?',
    options: [
      { id: 'a', text: 'IBM PC' },
      { id: 'b', text: 'Apple I' },
      { id: 'c', text: 'ENIAC' },
      { id: 'd', text: 'Macintosh' },
    ],
    correctOptionId: 'c',
    explanation: 'O ENIAC tinha quase 18 mil válvulas e nem monitor ou mouse possuía.',
  },
  {
    id: 3,
    prompt: 'Nos anos 1940, como os primeiros computadores recebiam instruções?',
    options: [
      { id: 'a', text: 'Por comando de voz' },
      { id: 'b', text: 'Por cartões perfurados' },
      { id: 'c', text: 'Por Wi-Fi' },
      { id: 'd', text: 'Por Bluetooth' },
    ],
    correctOptionId: 'b',
    explanation: 'Os furos no cartão representavam instruções que a máquina lia e executava.',
  },
  {
    id: 4,
    prompt: 'Aproximadamente quantas vagas de tecnologia devem ficar sem profissionais no Brasil até 2025?',
    options: [
      { id: 'a', text: '5 mil' },
      { id: 'b', text: '50 mil' },
      { id: 'c', text: '530 mil' },
      { id: 'd', text: '1 milhão' },
    ],
    correctOptionId: 'c',
    explanation: 'O mercado de tecnologia cresce muito mais rápido do que o número de profissionais formados.',
  },
  {
    id: 5,
    prompt: 'Programando, é possível morar em Marabá e trabalhar para empresas de outros países. Isso é chamado de:',
    options: [
      { id: 'a', text: 'Trabalho presencial obrigatório' },
      { id: 'b', text: 'Trabalho remoto sem barreiras geográficas' },
      { id: 'c', text: 'Trabalho só em grandes capitais' },
      { id: 'd', text: 'Estágio não remunerado' },
    ],
    correctOptionId: 'b',
    explanation: 'Quem programa pode trabalhar remotamente e até receber em dólar ou euro.',
  },
  {
    id: 6,
    prompt: 'Qual área da tecnologia protege sistemas e dados contra ataques?',
    options: [
      { id: 'a', text: 'Automação' },
      { id: 'b', text: 'Cybersegurança' },
      { id: 'c', text: 'Telecomunicações' },
      { id: 'd', text: 'Criação de jogos' },
    ],
    correctOptionId: 'b',
    explanation: 'Profissionais de cybersegurança protegem as informações de empresas e pessoas.',
  },
  {
    id: 7,
    prompt: 'Em qual década a programação "migrou" para o bolso das pessoas, com os smartphones?',
    options: [
      { id: 'a', text: 'Anos 1940' },
      { id: 'b', text: 'Anos 1990' },
      { id: 'c', text: 'Anos 2010' },
      { id: 'd', text: 'Anos 2020' },
    ],
    correctOptionId: 'c',
    explanation: 'Foi na década de 2010 que os aplicativos de celular viraram parte do dia a dia.',
  },
  {
    id: 8,
    prompt: 'O Clube de Programação da UNIFESSPA é uma iniciativa de alunos de qual curso?',
    options: [
      { id: 'a', text: 'Direito' },
      { id: 'b', text: 'Engenharia da Computação' },
      { id: 'c', text: 'Medicina' },
      { id: 'd', text: 'Administração' },
    ],
    correctOptionId: 'b',
    explanation: 'O Clube nasceu de alunos de Engenharia da Computação que queriam compartilhar conhecimento.',
  },
  {
    id: 9,
    prompt: 'Qual é o principal objetivo do Clube de Programação?',
    options: [
      { id: 'a', text: 'Vender computadores' },
      { id: 'b', text: 'Democratizar o conhecimento tecnológico' },
      { id: 'c', text: 'Substituir as aulas da universidade' },
      { id: 'd', text: 'Competir com outras universidades' },
    ],
    correctOptionId: 'b',
    explanation: 'O Clube busca levar tecnologia para todas as pessoas interessadas, sem barreiras.',
  },
  {
    id: 10,
    prompt: 'Além de mobile, web e jogos, qual área usa algoritmos para criar sistemas que "aprendem" e conversam?',
    options: [
      { id: 'a', text: 'Inteligência Artificial' },
      { id: 'b', text: 'Contabilidade' },
      { id: 'c', text: 'Jardinagem' },
      { id: 'd', text: 'Culinária' },
    ],
    correctOptionId: 'a',
    explanation: 'A Inteligência Artificial usa algoritmos para reconhecer padrões, conversar e até criar conteúdo.',
  },
];
