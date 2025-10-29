// JavaScript funcional para menú responsive y botones
function toggleMenu(){const nav=document.querySelector('nav');nav.classList.toggle('active');}

// Desplazamiento suave
const links=document.querySelectorAll('a[href^="#"]');
links.forEach(link=>{link.addEventListener('click',function(e){e.preventDefault();document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});});});s