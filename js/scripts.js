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
  
  // Mostrar resultados usando elementos existentes
  questionEl.textContent = `🎉 ¡Quiz Completado!`;
  questionEl.style.fontSize = "1.8rem";
  questionEl.style.color = "#2754F5";
  
  // Crear contenedor de resultados
  const resultadosContainer = document.createElement('div');
  resultadosContainer.className = 'puntuacion-final';
  resultadosContainer.style.margin = '20px 0';
  resultadosContainer.style.padding = '20px';
  resultadosContainer.style.background = 'linear-gradient(135deg, #F0F8FF, #E0F2FE)';
  resultadosContainer.style.borderRadius = '8px';
  resultadosContainer.style.border = '2px solid #2754F5';
  
  // Crear elementos de puntuación
  const puntuacionEl = document.createElement('h2');
  puntuacionEl.textContent = `${score}/${questions.length}`;
  puntuacionEl.style.fontSize = '2.5rem';
  puntuacionEl.style.color = '#2754F5';
  puntuacionEl.style.margin = '0 0 10px 0';
  
  const mensajeEl = document.createElement('p');
  mensajeEl.textContent = mensaje;
  mensajeEl.style.color = '#475569';
  mensajeEl.style.fontSize = '1.1rem';
  mensajeEl.style.margin = '0 0 15px 0';
  
  const porcentajeContainer = document.createElement('div');
  porcentajeContainer.style.display = 'flex';
  porcentajeContainer.style.justifyContent = 'center';
  porcentajeContainer.style.gap = '20px';
  porcentajeContainer.style.marginTop = '15px';
  
  const porcentajeEl = document.createElement('div');
  porcentajeEl.style.textAlign = 'center';
  
  const porcentajeLabel = document.createElement('div');
  porcentajeLabel.textContent = 'Porcentaje';
  porcentajeLabel.style.fontSize = '0.9rem';
  porcentajeLabel.style.color = '#64748B';
  
  const porcentajeValue = document.createElement('div');
  porcentajeValue.textContent = `${porcentaje}%`;
  porcentajeValue.style.fontSize = '1.2rem';
  porcentajeValue.style.fontWeight = 'bold';
  porcentajeValue.style.color = '#2754F5';
  
  // Ensamblar elementos
  porcentajeEl.appendChild(porcentajeLabel);
  porcentajeEl.appendChild(porcentajeValue);
  porcentajeContainer.appendChild(porcentajeEl);
  
  resultadosContainer.appendChild(puntuacionEl);
  resultadosContainer.appendChild(mensajeEl);
  resultadosContainer.appendChild(porcentajeContainer);
  
  // Limpiar opciones y mostrar resultados
  optionsEl.innerHTML = '';
  optionsEl.appendChild(resultadosContainer);
  
  // Cambiar el botón a "Volver al Inicio"
  nextBtn.innerHTML = `<span class="btn-icon">🏠</span>VOLVER AL INICIO`;
  nextBtn.style.display = 'flex';
  nextBtn.onclick = () => {
    window.location.href = 'index.html';
  };
  
  timerEl.textContent = "¡Completado!";
  timerEl.style.color = "#2754F5";
}

// === TEMPORIZADOR ===
function startTimer() {
  timeLeft = 15;
  timerEl.textContent = `${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `${timeLeft}s`;

    if (timeLeft <= 5) {
      timerEl.style.color = "#EF4444";
    } else if (timeLeft <= 10) {
      timerEl.style.color = "#F59E0B";
    } else {
      timerEl.style.color = "#16A34A";
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