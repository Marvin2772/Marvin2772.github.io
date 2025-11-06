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
    question: "¿Qué lenguaje se usa principalmente para programar en el navegador?",
    options: [
      "Python",
      "JavaScript",
      "C++"
    ],
    answer: 1
  }
];

// === VARIABLES DE CONTROL ===
let currentQuestion = 0;
let tiempoRestante = 30;
let temporizador;

// === FUNCIÓN PRINCIPAL: CARGAR PREGUNTA ===
function loadQuestion() {
  const container = document.getElementById("pregunta-container");
  const q = questions[currentQuestion];

  container.innerHTML = `
    <h2>${q.question}</h2>
    <div class="opciones">
      ${q.options
        .map((op, i) => `<button onclick="checkAnswer(${i})">${op}</button>`)
        .join("")}
    </div>
  `;

  // Reiniciar temporizador al cargar cada pregunta
  resetTimer();
}

// === FUNCIÓN: VERIFICAR RESPUESTA ===
function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  let score = parseInt(localStorage.getItem("score")) || 0;

  if (selected === correct) score++;

  localStorage.setItem("score", score);

  // Siguiente pregunta o resultados
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    clearInterval(temporizador);
    window.location.href = "resultadoc.html";
  }
}

// === TEMPORIZADOR ===
function startTimer() {
  const tiempoDisplay = document.getElementById("tiempo");
  temporizador = setInterval(() => {
    tiempoRestante--;
    tiempoDisplay.textContent = `${tiempoRestante}s`;

    if (tiempoRestante <= 0) {
      clearInterval(temporizador);
      checkAnswer(-1); // Se acaba el tiempo => pasa a la siguiente
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(temporizador);
  tiempoRestante = 30;
  document.getElementById("tiempo").textContent = `${tiempoRestante}s`;
  startTimer();
}

// === INICIAR TRIVIA ===
window.onload = () => {
  loadQuestion();
};
