// ===== MENÚ MÓVIL =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// ===== SCROLL SUAVE Y ANIMACIONES =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== EFECTO PARALLAX =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.proyecto-imagen');
  
  parallaxElements.forEach(element => {
    element.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
});

// ===== ANIMACIÓN AL SCROLLEAR =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Animar tarjetas de habilidades y proyectos
document.querySelectorAll('.habilidad-card, .proyecto-card, .stat, .contacto-item').forEach(card => {
  card.style.opacity = '0';
  observer.observe(card);
});

// Agregar animación CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ===== FORMULARIO DE CONTACTO =====
const formularioContacto = document.getElementById('formularioContacto');
const formRespuesta = document.getElementById('formRespuesta');

formularioContacto.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const asunto = document.getElementById('asunto').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  // Validación básica
  if (!nombre || !email || !asunto || !mensaje) {
    mostrarRespuesta('Por favor completa todos los campos', 'error');
    return;
  }

  if (!validarEmail(email)) {
    mostrarRespuesta('Por favor ingresa un email válido', 'error');
    return;
  }

  // Simular envío (en producción, enviarías a un servidor)
  try {
    formRespuesta.textContent = 'Enviando...';
    formRespuesta.className = '';
    formRespuesta.style.display = 'block';

    // Simular retraso de envío
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Aquí iría la llamada a la API/servidor
    // const respuesta = await fetch('/api/contacto', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ nombre, email, asunto, mensaje })
    // });

    mostrarRespuesta(
      '✓ ¡Gracias! Tu mensaje ha sido enviado correctamente. Me pondré en contacto pronto.',
      'exitoso'
    );

    formularioContacto.reset();

  } catch (error) {
    mostrarRespuesta(
      '✗ Error al enviar el mensaje. Por favor intenta más tarde.',
      'error'
    );
  }
});

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function mostrarRespuesta(mensaje, tipo) {
  formRespuesta.textContent = mensaje;
  formRespuesta.className = tipo;
  formRespuesta.style.display = 'block';

  // Limpiar mensaje después de 5 segundos
  if (tipo === 'exitoso') {
    setTimeout(() => {
      formRespuesta.style.display = 'none';
    }, 5000);
  }
}

// ===== CONTADOR ANIMADO =====
const stats = document.querySelectorAll('.stat-numero');

function animarNumeros() {
  stats.forEach(stat => {
    const final = parseInt(stat.textContent);
    let actual = 0;
    const incremento = final / 30;
    const duracion = 30;

    const intervalo = setInterval(() => {
      actual += incremento;
      if (actual >= final) {
        stat.textContent = final + (stat.textContent.includes('+') ? '+' : '%');
        clearInterval(intervalo);
      } else {
        stat.textContent = Math.floor(actual) + (stat.textContent.includes('+') ? '+' : '');
      }
    }, duracion);
  });
}

// Ejecutar animación cuando se vea la sección
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animado) {
      animarNumeros();
      entry.target.dataset.animado = 'true';
      statsObserver.unobserve(entry.target);
    }
  });
});

const statsSection = document.querySelector('.acerca-estadisticas');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ===== EFECTO HOVER EN BOTONES =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function(e) {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s ease-out';

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Agregar animación de ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    from {
      width: 20px;
      height: 20px;
      opacity: 1;
    }
    to {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// ===== CAMBIO DE TEMA (EXTRA) =====
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDark) {
  // Aquí podrías agregar lógica para tema oscuro
  console.log('Usuario prefiere tema oscuro');
}

// ===== LAZY LOADING PARA IMÁGENES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== SMOOTH SCROLL PARA NAVBAR =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }

  lastScroll = currentScroll;
});

// ===== UTILIDADES ADICIONALES =====

// Función para copiar al portapapeles
function copiarAlPortapapeles(texto) {
  navigator.clipboard.writeText(texto).then(() => {
    console.log('Copiado al portapapeles: ' + texto);
  });
}

// Función para formatear teléfono
function formatearTelefono(numero) {
  return numero.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '+$1 ($2) $3-$4');
}

// Detectar dispositivo móvil
const esMobil = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// ===== PERFORMANCE =====
window.addEventListener('load', () => {
  console.log('Página cargada correctamente');
  document.body.classList.add('loaded');
});

// Reporte de Core Web Vitals (opcional)
if ('web-vital' in window) {
  console.log('Web Vitals disponibles');
}

console.log('%c¡Bienvenido a Emmanuel Cell!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cDesarrollador Web Profesional', 'color: #ec4899; font-size: 12px;');
