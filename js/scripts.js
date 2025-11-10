// === VARIABLES GLOBALES ===
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const timerEl = document.getElementById('timer');

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

// === BANCO DE PREGUNTAS ===
const questions = [
  {
    question: "¿Qué significa HTML?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "HyperTransfer Markup Language"
    ],
    answer: 0
  },
  {
    question: "¿Qué hace CSS?",
    options: [
      "Sirve para dar estilo a las páginas web",
      "Crea bases de datos",
      "Ejecuta código del servidor"
    ],
    answer: 0
  },
  {
    question: "¿Qué lenguaje se usa principalmente para la lógica en una página web?",
    options: [
      "JavaScript",
      "Python",
      "SQL"
    ],
    answer: 0
  }
];

// === MOSTRAR PREGUNTA ===
function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  nextBtn.classList.add('hidden');
  resetTimer();

  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => selectAnswer(index);
    optionsEl.appendChild(btn);
  });
}

// === SELECCIONAR RESPUESTA ===
function selectAnswer(index) {
  clearInterval(timerInterval);
  const correct = questions[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll('button');

  buttons.forEach((btn, i) => {
    if (i === correct) {
      btn.style.background = "linear-gradient(90deg, #22C55E, #16A34A)";
      btn.style.color = "#fff";
    } else {
      btn.style.background = "linear-gradient(90deg, #EF4444, #B91C1C)";
      btn.style.color = "#fff";
    }
    btn.disabled = true;
  });

  if (index === correct) score++;
  nextBtn.classList.remove('hidden');
}

// === SIGUIENTE PREGUNTA ===
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// === FINAL SIN RESULTADO ===
function endQuiz() {
  clearInterval(timerInterval);
  questionEl.textContent = "✅ Has completado todas las preguntas.";
  optionsEl.innerHTML = "";
  nextBtn.classList.add('hidden');
  timerEl.textContent = "";
}

// === TEMPORIZADOR ===
function startTimer() {
  timeLeft = 15;
  timerEl.textContent = `${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `${timeLeft}s`;

    if (timeLeft <= 5) {
      timerEl.style.color = "#EF4444"; // rojo
    } else if (timeLeft <= 10) {
      timerEl.style.color = "#F59E0B"; // naranja
    } else {
      timerEl.style.color = "#16A34A"; // verde
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoSelect();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerEl.style.color = "#16A34A";
  startTimer();
}

// === AUTOSELECCIÓN AL ACABAR TIEMPO ===
function autoSelect() {
  const correct = questions[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll('button');
  buttons.forEach((btn, i) => {
    if (i === correct) {
      btn.style.background = "linear-gradient(90deg, #22C55E, #16A34A)";
      btn.style.color = "#fff";
    } else {
      btn.style.background = "linear-gradient(90deg, #EF4444, #B91C1C)";
      btn.style.color = "#fff";
    }
    btn.disabled = true;
  });
  nextBtn.classList.remove('hidden');
}

// === INICIAR QUIZ AUTOMÁTICAMENTE ===
window.addEventListener("DOMContentLoaded", () => {
  showQuestion();
  nextBtn.addEventListener("click", nextQuestion);
});
