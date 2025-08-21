import { Question } from '../types/quiz';

export const scienceQuestions: Question[] = [
  {
    id: 1,
    question: "Was ist das häufigste Element im Universum?",
    options: ["Sauerstoff", "Wasserstoff", "Helium", "Kohlenstoff"],
    correctAnswer: 1,
    explanation: "Wasserstoff macht etwa 75% der normalen Materie im Universum aus.",
    category: "Astronomie"
  },
  {
    id: 2,
    question: "Wie viele Knochen hat ein erwachsener Mensch?",
    options: ["186", "206", "216", "226"],
    correctAnswer: 1,
    explanation: "Ein erwachsener Mensch hat 206 Knochen, während ein Baby mit etwa 270 Knorpel- und Knochenstücken geboren wird.",
    category: "Biologie"
  },
  {
    id: 3,
    question: "Was ist die Lichtgeschwindigkeit im Vakuum?",
    options: ["299.792.458 m/s", "300.000.000 m/s", "299.000.000 m/s", "301.000.000 m/s"],
    correctAnswer: 0,
    explanation: "Die Lichtgeschwindigkeit im Vakuum beträgt exakt 299.792.458 Meter pro Sekunde.",
    category: "Physik"
  },
  {
    id: 4,
    question: "Welches ist das kleinste Teilchen eines Elements?",
    options: ["Molekül", "Proton", "Atom", "Elektron"],
    correctAnswer: 2,
    explanation: "Ein Atom ist das kleinste Teilchen eines Elements, das noch die Eigenschaften des Elements besitzt.",
    category: "Chemie"
  },
  {
    id: 5,
    question: "Wie lange dauert es, bis das Licht der Sonne die Erde erreicht?",
    options: ["8 Minuten", "4 Minuten", "12 Minuten", "16 Minuten"],
    correctAnswer: 0,
    explanation: "Das Sonnenlicht benötigt etwa 8 Minuten und 20 Sekunden, um die 150 Millionen Kilometer zur Erde zurückzulegen.",
    category: "Astronomie"
  },
  {
    id: 6,
    question: "Was ist die chemische Formel für Wasser?",
    options: ["H2O2", "H2O", "HO2", "H3O"],
    correctAnswer: 1,
    explanation: "Wasser hat die chemische Formel H2O - zwei Wasserstoffatome und ein Sauerstoffatom.",
    category: "Chemie"
  },
  {
    id: 7,
    question: "Welcher Planet ist der Sonne am nächsten?",
    options: ["Venus", "Erde", "Merkur", "Mars"],
    correctAnswer: 2,
    explanation: "Merkur ist mit einer durchschnittlichen Entfernung von 58 Millionen Kilometern der sonnennächste Planet.",
    category: "Astronomie"
  },
  {
    id: 8,
    question: "Was ist die normale Körpertemperatur des Menschen?",
    options: ["36,5°C", "37°C", "37,5°C", "38°C"],
    correctAnswer: 1,
    explanation: "Die normale Körpertemperatur liegt bei etwa 37°C (98,6°F), kann aber leicht schwanken.",
    category: "Biologie"
  }
];

export const getRandomQuestions = (count: number = 5): Question[] => {
  const shuffled = [...scienceQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, scienceQuestions.length));
};