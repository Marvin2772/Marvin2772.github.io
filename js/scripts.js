// === VARIABLES GLOBALES GENERALES ===
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
const timerEl = document.getElementById('timer');

let currentQuestion = 0;
let score = 0;
let userName = "";
let timeLeft = 15;
let timerInterval;

// === BANCO DE PREGUNTAS (para modo de una sola página) ===
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

// === EVENTOS PRINCIPALES (solo si existen los botones en la página actual) ===
if (startBtn) startBtn.addEventListener('click', startGame);
if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
if (restartBtn) restartBtn.addEventListener('click', restartGame);

// === FUNCIONES GENERALES (para modo de una sola página) ===
function startGame() {
  userName = usernameInput.value.trim();
  if (userName === "") {
    alert("Por favor, ingresa tu nombre");
    return;
  }

  startContainer.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  currentQuestion = 0;
  score = 0;
  showQuestion();
  startTimer();
}

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

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    startTimer();
  } else {
    showResult();
  }
}

function showResult() {
  quizContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  scoreEl.textContent = `${userName}, tu puntaje final es ${score} de ${questions.length}`;
  clearInterval(timerInterval);
}

function restartGame() {
  currentQuestion = 0;
  score = 0;
  timeLeft = 15;
  resultContainer.classList.add('hidden');
  startContainer.classList.remove('hidden');
  clearInterval(timerInterval);
}

// === TEMPORIZADOR GENERAL (para el modo todo-en-una-página) ===
function startTimer() {
  timeLeft = 15;
  timerEl.textContent = `Tiempo: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Tiempo: ${timeLeft}s`;

    // Cambio visual del tiempo
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

/* =====================================================================
   === SECCIÓN NUEVA: TEMPORIZADOR PARA PÁGINAS SEPARADAS (como pregunta1.html)
   ===================================================================== */

if (document.body.contains(document.getElementById("tiempo"))) {
  // --- Detectamos si la página tiene el elemento #tiempo ---
  let tiempoRestante = 30;
  const tiempoElemento = document.getElementById("tiempo");
  const botones = document.querySelectorAll(".opciones button");

  // Inicia el contador
  const temporizador = setInterval(() => {
    tiempoRestante--;
    tiempoElemento.textContent = `00:${tiempoRestante < 10 ? "0" + tiempoRestante : tiempoRestante}`;

    // Colores visuales según el tiempo restante
    if (tiempoRestante <= 10) tiempoElemento.style.color = "#EAB308"; // amarillo
    if (tiempoRestante <= 5) tiempoElemento.style.color = "#DC2626"; // rojo

    // Si se acaba el tiempo, se pasa automáticamente
    if (tiempoRestante <= 0) {
      clearInterval(temporizador);
      alert("⏰ Se acabó el tiempo. Pasarás automáticamente.");
      verificarRespuesta(-1); // respuesta incorrecta
    }
  }, 1000);

  // Verificación de respuesta (función para pregunta individual)
  function verificarRespuesta(indice) {
    clearInterval(temporizador);
    const correcta = 0; // ← aquí cambias el número según la pregunta (0, 1 o 2)
    let puntaje = parseInt(localStorage.getItem("score")) || 0;
    if (indice === correcta) puntaje++;
    localStorage.setItem("score", puntaje);
    window.location.href = "resultadoc.html"; // o pregunta2.html si es la siguiente
  }

  // Asignar eventos a los botones de respuesta
  botones.forEach((boton, i) => {
    boton.addEventListener("click", () => verificarRespuesta(i));
  });
}
