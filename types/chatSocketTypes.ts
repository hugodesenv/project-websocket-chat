import { TChatMessage } from "@/component/ui/chat/types";
import { ReadyState } from "react-use-websocket";

export const WSDescription = {
  [ReadyState.CLOSED]: "Fechado",
  [ReadyState.CLOSING]: "Fechando",
  [ReadyState.CONNECTING]: "Conectando",
  [ReadyState.OPEN]: "Aberto",
  [ReadyState.UNINSTANTIATED]: "Não inicializado",
} as Record<number, string>;

export const WS_BASE = "ws://localhost:3001/";

export interface IUseChatStoreAuth {
  userId: string;
  token: string;
}

export interface IUseChatStore extends IUseChatStoreAuth {
  socket: WebSocket;
  socketState: number;
  setAuth: (userId: string, token: string) => void;
  connect: () => void;
  disconnect: () => void;
  messages: TChatMessage[];
  messageByFrom: (from: string) => TChatMessage;
}

/*
export const mockList: TChatMessage[] = [
  {
    key: "1",
    title: "Maria Silva",
    messages: [
      {
        text: "Oi! Você viu a reunião de amanhã?",
        created_at: new Date("2025-03-01T14:32:00Z"),
        owner_id: "user_2",
        owner_name: "Maria Silva",
      },
      { text: "Sim, às 10h. Já preparei a apresentação.", created_at: new Date("2025-03-01T14:35:00Z"), owner_id: "me", owner_name: "Eu" },
      { text: "Perfeito! Até lá então 👍", created_at: new Date("2025-03-01T14:36:00Z"), owner_id: "user_2", owner_name: "Maria Silva" },
    ],
  },
  {
    key: "2",
    title: "João Pedro",
    messages: [
      {
        text: "E aí, conseguiu o ingresso do show?",
        created_at: new Date("2025-02-28T20:15:00Z"),
        owner_id: "user_3",
        owner_name: "João Pedro",
      },
      { text: "Consegui! Compramos na pré-venda", created_at: new Date("2025-02-28T20:22:00Z"), owner_id: "me", owner_name: "Eu" },
      {
        text: "Que demais! Vai ser incrível 🔥",
        created_at: new Date("2025-02-28T20:25:00Z"),
        owner_id: "user_3",
        owner_name: "João Pedro",
      },
      { text: "Qual setor você pegou?", created_at: new Date("2025-02-28T20:26:00Z"), owner_id: "user_3", owner_name: "João Pedro" },
      { text: "Pista premium, bem perto do palco", created_at: new Date("2025-02-28T20:28:00Z"), owner_id: "me", owner_name: "Eu" },
      {
        text: "Nossa, sortudo! Eu fiquei na arquibancada",
        created_at: new Date("2025-02-28T20:30:00Z"),
        owner_id: "user_3",
        owner_name: "João Pedro",
      },
      { text: "Mas pelo menos entramos kkk", created_at: new Date("2025-02-28T20:31:00Z"), owner_id: "user_3", owner_name: "João Pedro" },
      { text: "Verdade! O importante é estar lá", created_at: new Date("2025-02-28T20:32:00Z"), owner_id: "me", owner_name: "Eu" },
      { text: "Você vai de carro ou de Uber?", created_at: new Date("2025-02-28T20:35:00Z"), owner_id: "user_3", owner_name: "João Pedro" },
      { text: "Ainda não decidi. E você?", created_at: new Date("2025-02-28T20:36:00Z"), owner_id: "me", owner_name: "Eu" },
      {
        text: "Talvez de metrô, evita trânsito",
        created_at: new Date("2025-02-28T20:38:00Z"),
        owner_id: "user_3",
        owner_name: "João Pedro",
      },
      { text: "Boa ideia. A estação fica perto?", created_at: new Date("2025-02-28T20:40:00Z"), owner_id: "me", owner_name: "Eu" },
      {
        text: "Fica uns 15 min a pé do estádio",
        created_at: new Date("2025-02-28T20:42:00Z"),
        owner_id: "user_3",
        owner_name: "João Pedro",
      },
      { text: "Beleza, combinamos de ir juntos então?", created_at: new Date("2025-02-28T20:45:00Z"), owner_id: "me", owner_name: "Eu" },
      {
        text: "Bora! A gente se encontra na saída do metrô",
        created_at: new Date("2025-02-28T20:47:00Z"),
        owner_id: "user_3",
        owner_name: "João Pedro",
      },
      { text: "Perfeito, às que horas abre o portão?", created_at: new Date("2025-02-28T20:50:00Z"), owner_id: "me", owner_name: "Eu" },
      {
        text: "Acho que 18h, deixa eu confirmar",
        created_at: new Date("2025-02-28T20:52:00Z"),
        owner_id: "user_3",
        owner_name: "João Pedro",
      },
      { text: "Show começa 21h né", created_at: new Date("2025-02-28T20:55:00Z"), owner_id: "user_3", owner_name: "João Pedro" },
      {
        text: "Isso! Vamos chegar umas 19h pra garantir lugar",
        created_at: new Date("2025-02-28T20:56:00Z"),
        owner_id: "me",
        owner_name: "Eu",
      },
      { text: "Boa, combina comigo", created_at: new Date("2025-02-28T20:58:00Z"), owner_id: "user_3", owner_name: "João Pedro" },
      {
        text: "E aí, lembra de levar documento?",
        created_at: new Date("2025-03-01T09:00:00Z"),
        owner_id: "user_3",
        owner_name: "João Pedro",
      },
      { text: "Boa! Ia esquecer kkk", created_at: new Date("2025-03-01T09:05:00Z"), owner_id: "me", owner_name: "Eu" },
      { text: "Ingresso é digital ou impresso?", created_at: new Date("2025-03-01T09:10:00Z"), owner_id: "me", owner_name: "Eu" },
      { text: "Digital, no app do evento", created_at: new Date("2025-03-01T09:12:00Z"), owner_id: "user_3", owner_name: "João Pedro" },
      { text: "Já baixei o app, tá tudo certo", created_at: new Date("2025-03-01T09:15:00Z"), owner_id: "me", owner_name: "Eu" },
      { text: "Que dia que é mesmo? Sexta?", created_at: new Date("2025-03-01T09:20:00Z"), owner_id: "user_3", owner_name: "João Pedro" },
      { text: "Sábado! Dia 8", created_at: new Date("2025-03-01T09:22:00Z"), owner_id: "me", owner_name: "Eu" },
      {
        text: "Ah é, confundi. Tô no countdown já",
        created_at: new Date("2025-03-01T09:25:00Z"),
        owner_id: "user_3",
        owner_name: "João Pedro",
      },
      { text: "Eu também 😂 uma semana!", created_at: new Date("2025-03-01T09:26:00Z"), owner_id: "me", owner_name: "Eu" },
      { text: "Será que chove?", created_at: new Date("2025-03-01T09:30:00Z"), owner_id: "user_3", owner_name: "João Pedro" },
      { text: "Tomara que não, é show ao ar livre", created_at: new Date("2025-03-01T09:32:00Z"), owner_id: "me", owner_name: "Eu" },
      {
        text: "Previsão tá boa até, vamos torcer",
        created_at: new Date("2025-03-01T09:35:00Z"),
        owner_id: "user_3",
        owner_name: "João Pedro",
      },
      { text: "Qual roupa você vai?", created_at: new Date("2025-03-01T09:40:00Z"), owner_id: "user_3", owner_name: "João Pedro" },
      {
        text: "Camiseta do artista e tênis, nada de fancy",
        created_at: new Date("2025-03-01T09:42:00Z"),
        owner_id: "me",
        owner_name: "Eu",
      },
      { text: "Mesma vibe aqui", created_at: new Date("2025-03-01T09:45:00Z"), owner_id: "user_3", owner_name: "João Pedro" },
      { text: "Já viu a setlist que ele postou?", created_at: new Date("2025-03-01T10:00:00Z"), owner_id: "me", owner_name: "Eu" },
      {
        text: "Vi! Tem aquela que a gente adora",
        created_at: new Date("2025-03-01T10:02:00Z"),
        owner_id: "user_3",
        owner_name: "João Pedro",
      },
      { text: "A do refrão que todo mundo canta?", created_at: new Date("2025-03-01T10:05:00Z"), owner_id: "me", owner_name: "Eu" },
      {
        text: "Essa mesma! Vai ser emocionante",
        created_at: new Date("2025-03-01T10:08:00Z"),
        owner_id: "user_3",
        owner_name: "João Pedro",
      },
      { text: "Mal posso esperar", created_at: new Date("2025-03-01T10:10:00Z"), owner_id: "me", owner_name: "Eu" },
      {
        text: "Falta pouco! Qualquer coisa me chama antes",
        created_at: new Date("2025-03-01T10:12:00Z"),
        owner_id: "user_3",
        owner_name: "João Pedro",
      },
      { text: "Combinado! Até sábado então", created_at: new Date("2025-03-01T10:15:00Z"), owner_id: "me", owner_name: "Eu" },
      { text: "Até! 🤘", created_at: new Date("2025-03-01T10:16:00Z"), owner_id: "user_3", owner_name: "João Pedro" },
    ],
  },
  {
    key: "3",
    title: "Ana Costa",
    messages: [
      {
        text: "Pode me mandar aquele link do drive?",
        created_at: new Date("2025-03-01T09:45:00Z"),
        owner_id: "user_4",
        owner_name: "Ana Costa",
      },
      { text: "Claro, já te envio", created_at: new Date("2025-03-01T09:50:00Z"), owner_id: "me", owner_name: "Eu" },
      { text: "https://drive.google.com/...", created_at: new Date("2025-03-01T09:51:00Z"), owner_id: "me", owner_name: "Eu" },
      { text: "Valeu! 🙏", created_at: new Date("2025-03-01T09:52:00Z"), owner_id: "user_4", owner_name: "Ana Costa" },
    ],
  },
  {
    key: "4",
    title: "Grupo Família",
    messages: [
      { text: "Alguém sabe se a vovó já chegou?", created_at: new Date("2025-03-01T12:00:00Z"), owner_id: "user_5", owner_name: "Ricardo" },
      { text: "Sim, está aqui em casa!", created_at: new Date("2025-03-01T12:05:00Z"), owner_id: "user_6", owner_name: "Julia" },
      { text: "Ótimo! Jantamos às 19h combinado?", created_at: new Date("2025-03-01T12:10:00Z"), owner_id: "me", owner_name: "Eu" },
    ],
  },
  {
    key: "5",
    title: "Carlos Mendes",
    messages: [
      {
        text: "Tudo certo para o almoço de amanhã?",
        created_at: new Date("2025-02-28T18:30:00Z"),
        owner_id: "user_7",
        owner_name: "Carlos Mendes",
      },
      { text: "Sim! Restaurante às 13h", created_at: new Date("2025-02-28T18:45:00Z"), owner_id: "me", owner_name: "Eu" },
    ],
  },
  {
    key: "6",
    title: "Fernanda Lima",
    messages: [
      {
        text: "Oi! Preciso de uma ajuda com o projeto",
        created_at: new Date("2025-03-01T08:20:00Z"),
        owner_id: "user_8",
        owner_name: "Fernanda Lima",
      },
    ],
  },
  {
    key: "7",
    title: "Roberto Alves",
    messages: [
      {
        text: "Pagamento confirmado. Obrigado!",
        created_at: new Date("2025-02-27T16:00:00Z"),
        owner_id: "user_9",
        owner_name: "Roberto Alves",
      },
      { text: "De nada! Qualquer coisa é só chamar", created_at: new Date("2025-02-27T16:05:00Z"), owner_id: "me", owner_name: "Eu" },
    ],
  },
  {
    key: "8",
    title: "Juliana Santos",
    messages: [
      {
        text: "Kkkkk muito bom esse meme",
        created_at: new Date("2025-03-01T11:22:00Z"),
        owner_id: "user_10",
        owner_name: "Juliana Santos",
      },
      { text: "Né? Morri de rir 😂", created_at: new Date("2025-03-01T11:25:00Z"), owner_id: "me", owner_name: "Eu" },
    ],
  },
  {
    key: "9",
    title: "Pedro Henrique",
    messages: [
      {
        text: "Opa, tá aí? Liga pra mim quando puder",
        created_at: new Date("2025-03-01T15:00:00Z"),
        owner_id: "user_11",
        owner_name: "Pedro Henrique",
      },
    ],
  },
  {
    key: "10",
    title: "Clínica Dr. Martins",
    messages: [
      {
        text: "Lembrete: sua consulta está agendada para 05/03 às 14h.",
        created_at: new Date("2025-02-28T10:00:00Z"),
        owner_id: "clinic",
        owner_name: "Clínica Dr. Martins",
      },
    ],
  },
  {
    key: "11",
    title: "Lucas Ferreira",
    messages: [
      {
        text: "E aí, tudo bem? Preciso te contar uma coisa que aconteceu essa semana no trabalho. A gente fez aquela apresentação pro cliente novo e correu tudo muito melhor do que a gente esperava. O diretor até elogiou a equipe no final da reunião e pediu pra gente encabeçar o próximo projeto deles. Fiquei bem animado com isso.",
        created_at: new Date("2025-03-02T09:15:00Z"),
        owner_id: "user_12",
        owner_name: "Lucas Ferreira",
      },
      {
        text: "Que ótimo! Fico muito feliz por você, de verdade. Você se dedicou demais nesse projeto e merece esse reconhecimento. Lembro que você ficou até tarde várias noites fechando os últimos detalhes. Agora é aproveitar e mostrar que a confiança deles faz sentido. Quando começa o próximo?",
        created_at: new Date("2025-03-02T09:28:00Z"),
        owner_id: "me",
        owner_name: "Eu",
      },
      {
        text: "Obrigado! Começa na segunda que vem. Ainda não passaram todos os detalhes, mas pelo que o Paulo comentou vai ser algo bem maior, com timeline de uns seis meses. Vou precisar me organizar direitinho porque não quero repetir aquela correria do último trimestre. Aprendi que deixar tudo pra cima da hora não vale a pena.",
        created_at: new Date("2025-03-02T09:45:00Z"),
        owner_id: "user_12",
        owner_name: "Lucas Ferreira",
      },
      {
        text: "Concordo totalmente. Planejamento faz toda diferença. Se quiser, a gente pode marcar um café um dia dessa semana e eu te conto como eu costumo organizar os projetos grandes no Trello. Não é nada de outro mundo, mas me ajuda a não perder prazos e a deixar o time alinhado. Você usa alguma ferramenta assim?",
        created_at: new Date("2025-03-02T10:02:00Z"),
        owner_id: "me",
        owner_name: "Eu",
      },
      {
        text: "Uso um pouco de tudo: Trello pra tarefas, Notion pros documentos e reuniões, e às vezes até uma planilha no Google quando preciso cruzar dados de timeline com custos. O problema é que às vezes fica tudo espalhado e eu perco tempo procurando onde anotei cada coisa. Adoraria ver como você estrutura isso aí.",
        created_at: new Date("2025-03-02T10:18:00Z"),
        owner_id: "user_12",
        owner_name: "Lucas Ferreira",
      },
      {
        text: "Então bora combinar. Que tal quinta à tarde? Sei que você costuma ter a reunião de alinhamento até as 15h. A gente pode ir naquele café perto do escritório, o que acha? Assim você já chega no fim de semana com uma ideia melhor de como organizar o novo projeto.",
        created_at: new Date("2025-03-02T10:35:00Z"),
        owner_id: "me",
        owner_name: "Eu",
      },
      {
        text: "Perfeito, quinta às 15h30 me atende demais. Vou bloquear na agenda. E já te adianto que a rodada de café é por minha conta, pelo menos pelo sucesso da apresentação e pela ajuda que você vai me dar. Valeu mesmo por se disponibilizar, isso é muito importante pra mim.",
        created_at: new Date("2025-03-02T10:48:00Z"),
        owner_id: "user_12",
        owner_name: "Lucas Ferreira",
      },
    ],
  },
];
*/