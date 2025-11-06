const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const usernameInput = document.getElementById('username');

const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const scoreEl = document.getElementById('score');

let currentQuestion = 0;
let score = 0;
let userName = "";

const questions = [
  {
    question: "¿Qué significa HTML?",
    options: ["HyperText Markup Language", "HighText Machine Language", "HyperTransfer Markup Language"],
    answer: 0
  },
  {
    question: "¿Qué hace CSS?",
    options: ["Sirve para dar estilo a las páginas web", "Crea bases de datos", "Ejecuta código del servidor"],
    answer: 0
  },
  {
    question: "¿Qué es una variable en programación?",
    options: ["Un espacio para almacenar datos", "Una imagen en un sitio web", "Un error del sistema"],
    answer: 0
  },
  {
    question: "¿Qué lenguaje se usa en la web para interactividad?",
    options: ["Python", "JavaScript", "C++"],
    answer: 1
  },
  {
    question: "¿Qué significa ‘bug’ en programación?",
    options: ["Un error o falla en el código", "Un tipo de lenguaje", "Un estilo de diseño"],
    answer: 0
  }
];

startBtn.addEventListener('click', () => {
  userName = usernameInput.value.trim();
  if (userName === "") {
    alert("Por favor, ingresa tu nombre");
    return;
  }

  startContainer.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  showQuestion();
});

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => selectAnswer(index);
    optionsEl.appendChild(btn);
  });
  nextBtn.classList.add('hidden');
}

function selectAnswer(index) {
  const correct = questions[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll('button');
  buttons.forEach((btn, i) => {
    if (i === correct) btn.style.backgroundColor = "green";
    else btn.style.backgroundColor = "red";
    btn.disabled = true;
  });

  if (index === correct) score++;
  nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  scoreEl.textContent = `${userName}, tu puntaje final es ${score} de ${questions.length}`;
}

restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  resultContainer.classList.add('hidden');
  startContainer.classList.remove('hidden');
});
