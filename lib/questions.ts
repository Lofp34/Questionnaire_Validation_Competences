export type Question = {
  id: string;
  text: string;
  options: string[];
  correct: number;
};

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "Dans la méthode 'Anti-vente', quelle est l'attitude à adopter ?",
    options: [
      "Convaincre le client à tout prix",
      "Montrer du détachement et disqualifier si besoin",
      "Baisser le prix immédiatement",
      "Parler plus fort que le client"
    ],
    correct: 1
  },
  {
    id: "q2",
    text: "Que signifie l'acronyme BAC dans l'argumentation ?",
    options: [
      "Bénéfice - Avantage - Caractéristique",
      "Budget - Achat - Client",
      "Besoin - Attente - Conclusion",
      "Bon - À - Commander"
    ],
    correct: 0
  },
  {
    id: "q3",
    text: "Le 'Closing' désigne :",
    options: [
      "L'ouverture de l'entretien",
      "La conclusion de la vente",
      "La gestion des réclamations",
      "La prise de rendez-vous"
    ],
    correct: 1
  },
  {
    id: "q4",
    text: "En phase de découverte, la règle des 80/20 signifie :",
    options: [
      "80% de parole pour le vendeur, 20% pour le client",
      "80% de rabais, 20% de marge",
      "80% d'écoute (client), 20% de parole (vendeur)",
      "80% de questions fermées, 20% d'ouvertes"
    ],
    correct: 2
  },
  {
    id: "q5",
    text: "Pour traiter une objection, quelle méthode est recommandée ?",
    options: [
      "La méthode CRAC (Creuser, Reformuler, Argumenter, Contrôler)",
      "Ignorer l'objection",
      "Dire au client qu'il a tort",
      "Arrêter la vente"
    ],
    correct: 0
  },
  {
    id: "q6",
    text: "Une question ouverte commence généralement par :",
    options: [
      "Est-ce que...",
      "Avez-vous...",
      "C'est, Quoi, Comment, Pourquoi...",
      "Êtes-vous d'accord..."
    ],
    correct: 2
  },
  {
    id: "q7",
    text: "Quand doit-on annoncer le prix de préférence ?",
    options: [
      "Dès le début de l'entretien",
      "Après avoir valorisé l'offre et les bénéfices",
      "Par email après le rendez-vous",
      "Uniquement si le client le demande"
    ],
    correct: 1
  },
  {
    id: "q8",
    text: "Le TGR (Taux de Global de Rendement) ou Taux de Transformation mesure :",
    options: [
      "Le nombre de ventes / nombre de contacts",
      "Le chiffre d'affaires total",
      "La satisfaction client",
      "Le temps passé en rendez-vous"
    ],
    correct: 0
  },
  {
    id: "q9",
    text: "Le silence pendant un entretien de vente est :",
    options: [
      "Gênant, il faut le combler",
      "Un outil pour laisser le client réfléchir ou s'engager",
      "Une preuve d'incompétence",
      "Interdit"
    ],
    correct: 1
  },
  {
    id: "q10",
    text: "Quelle est la meilleure façon de terminer un entretien ?",
    options: [
      "Partir en courant",
      "Valider les prochaines étapes (Date, Action)",
      "Laisser le client revenir vers vous",
      "Donner sa carte de visite sans rien dire"
    ],
    correct: 1
  }
];
