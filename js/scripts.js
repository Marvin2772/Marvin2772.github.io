// === VARIABLES GLOBALES ===
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const timerEl = document.getElementById('timer');

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
let incorrectAnswers = 0;

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
  nextBtn.style.display = 'none';
  resetTimer();

  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'opcion-btn';
    btn.innerHTML = `
      <div class="opcion-indicator">${String.fromCharCode(65 + index)}</div>
      <div class="opcion-text">${option}</div>
    `;
    btn.onclick = () => selectAnswer(index);
    optionsEl.appendChild(btn);
  });
}

// === SELECCIONAR RESPUESTA ===
function selectAnswer(index) {
  clearInterval(timerInterval);
  const correct = questions[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll('.opcion-btn');

  buttons.forEach((btn, i) => {
    if (i === correct) {
      btn.classList.add('correcta');
    } else {
      btn.classList.add('incorrecta');
    }
    btn.disabled = true;
  });

  // Marcar la opción seleccionada
  buttons[index].classList.add('seleccionada');

  if (index === correct) score++;
  nextBtn.style.display = 'flex';
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

// === FINAL CON PUNTUACIÓN Y REDIRECCIÓN ===
function endQuiz() {
  clearInterval(timerInterval);
  
  // Calcular porcentaje
  const porcentaje = Math.round((score / questions.length) * 100);
  
  // Determinar mensaje según puntuación
  let mensaje = "";
  if (porcentaje >= 90) {
    mensaje = "¡Excelente trabajo! Eres un verdadero maestro del código.";
  } else if (porcentaje >= 70) {
    mensaje = "¡Buen trabajo! Tienes sólidos conocimientos de programación.";
  } else if (porcentaje >= 50) {
    mensaje = "¡No está mal! Sigue practicando para mejorar.";
  } else {
    mensaje = "¡Sigue intentándolo! La práctica hace al maestro.";
  }
  
  // Mostrar resultados
  questionEl.textContent = `🎉 ¡Quiz Completado!`;
  questionEl.classList.add('resultado-completado');
  
  // Crear contenedor de resultados
  const resultadosContainer = document.createElement('div');
  resultadosContainer.className = 'puntuacion-final';
  
  // Aplicar clase según puntuación
  if (porcentaje >= 90) {
    resultadosContainer.classList.add('puntuacion-excelente');
  } else if (porcentaje >= 70) {
    resultadosContainer.classList.add('puntuacion-buena');
  } else {
    resultadosContainer.classList.add('puntuacion-regular');
  }
  
  // Crear elementos
  const puntuacionEl = document.createElement('h2');
  puntuacionEl.textContent = `${score}/${questions.length}`;
  
  const mensajeEl = document.createElement('p');
  mensajeEl.id = 'mensaje-resultado';
  mensajeEl.textContent = mensaje;
  
  // Stats container
  const statsContainer = document.createElement('div');
  statsContainer.className = 'stats-container';
  
  // Crear estadísticas
  const porcentajeItem = document.createElement('div');
  porcentajeItem.className = 'stat-item';
  
  const porcentajeLabel = document.createElement('span');
  porcentajeLabel.className = 'stat-label';
  porcentajeLabel.textContent = 'Porcentaje:';
  
  const porcentajeValue = document.createElement('span');
  porcentajeValue.className = 'stat-value';
  porcentajeValue.textContent = `${porcentaje}%`;
  
  porcentajeItem.appendChild(porcentajeLabel);
  porcentajeItem.appendChild(porcentajeValue);
  statsContainer.appendChild(porcentajeItem);
  
  // Ensamblar todo
  resultadosContainer.appendChild(puntuacionEl);
  resultadosContainer.appendChild(mensajeEl);
  resultadosContainer.appendChild(statsContainer);
  
  // Mostrar resultados
  optionsEl.innerHTML = '';
  optionsEl.appendChild(resultadosContainer);
  
  // Cambiar el botón a "Volver al Inicio"
  nextBtn.innerHTML = `<span class="btn-icon">🏠</span>VOLVER AL INICIO`;
  nextBtn.style.display = 'flex';
  nextBtn.onclick = () => {
    window.location.href = 'index.html';
  };
  
  timerEl.textContent = "¡Completado!";
  timerEl.classList.add('resultado-completado-timer');
}

// === TEMPORIZADOR ===
function startTimer() {
  timeLeft = 15;
  timerEl.textContent = `${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `${timeLeft}s`;

    if (timeLeft <= 5) {
      timerEl.classList.add('tiempo-bajo');
      timerEl.classList.remove('tiempo-medio', 'tiempo-alto');
    } else if (timeLeft <= 10) {
      timerEl.classList.add('tiempo-medio');
      timerEl.classList.remove('tiempo-bajo', 'tiempo-alto');
    } else {
      timerEl.classList.add('tiempo-alto');
      timerEl.classList.remove('tiempo-bajo', 'tiempo-medio');
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoSelect();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerEl.classList.remove('tiempo-bajo', 'tiempo-medio');
  timerEl.classList.add('tiempo-alto');
  startTimer();
}

// === AUTOSELECCIÓN AL ACABAR TIEMPO ===
function autoSelect() {
  const correct = questions[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll('.opcion-btn');
  
  buttons.forEach((btn, i) => {
    if (i === correct) {
      btn.classList.add('correcta');
    } else {
      btn.classList.add('incorrecta');
    }
    btn.disabled = true;
  });

  nextBtn.style.display = 'flex';
}

// === INICIAR QUIZ AUTOMÁTICAMENTE ===
window.addEventListener("DOMContentLoaded", () => {
  showQuestion();
  nextBtn.addEventListener("click", nextQuestion);
});