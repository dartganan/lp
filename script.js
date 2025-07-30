// Animações de entrada ao fazer scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.step, .testimonial-card, .offer-item, .image-placeholder');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Classe de animação fade-in
const style = document.createElement('style');
style.textContent = '.fade-in { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// Smooth scroll para o botão CTA
document.querySelector('.cta-button').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Criar efeito de pulso no botão
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
    
    // Simular redirecionamento (substituir com URL real quando disponível)
    setTimeout(() => {
        alert('Redirecionando para a página de compra...\n\nAqui você integraria com o sistema de pagamento.');
        // window.location.href = 'URL_DA_PAGINA_DE_CHECKOUT';
    }, 300);
});

// Contador animado para estatística
function animateCounter() {
    const statNumber = document.querySelector('.stat-number');
    const targetNumber = 89;
    let currentNumber = 0;
    const increment = targetNumber / 50;
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
        }
        statNumber.textContent = Math.floor(currentNumber) + '%';
    }, 30);
}

// Ativar contador quando visível
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            statObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsElement = document.querySelector('.stats');
if (statsElement) {
    statObserver.observe(statsElement);
}

// Efeito parallax suave no hero
let heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    let scrolled = window.pageYOffset;
    let parallax = scrolled * 0.5;
    if (heroSection) {
        heroSection.style.transform = `translateY(${parallax}px)`;
    }
});

// Destacar passos ao passar o mouse
document.querySelectorAll('.step').forEach(step => {
    step.addEventListener('mouseenter', function() {
        this.querySelector('.step-number').style.transform = 'scale(1.1)';
    });
    
    step.addEventListener('mouseleave', function() {
        this.querySelector('.step-number').style.transform = 'scale(1)';
    });
});

// Adicionar efeito de digitação na headline principal
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação quando a página carregar
window.addEventListener('load', () => {
    const headline = document.querySelector('.main-headline');
    if (headline) {
        const originalText = headline.innerHTML;
        const textWithoutSpan = headline.textContent;
        const mainText = "O Método Que Fez um Homem Ouvir a Esposa Pela Primeira Vez em Anos";
        
        headline.innerHTML = '';
        typeWriter(headline, mainText, 30);
        
        // Adicionar o span após a digitação
        setTimeout(() => {
            headline.innerHTML += ' <span class="highlight">(Sem DR, Gritaria ou Terapia de Casal)</span>';
            document.querySelector('.highlight').style.opacity = '0';
            document.querySelector('.highlight').style.animation = 'fadeIn 1s ease forwards';
        }, mainText.length * 30);
    }
});

// Lazy loading para imagens (quando forem adicionadas)
document.querySelectorAll('img[data-src]').forEach(img => {
    img.setAttribute('loading', 'lazy');
});

// Adicionar indicador de progresso de leitura
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(135deg, #d64c7f, #8b5a8c);
    transition: width 0.3s ease;
    z-index: 1000;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// Adicionar botão de voltar ao topo
const backToTop = document.createElement('button');
backToTop.innerHTML = '↑';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #d64c7f, #8b5a8c);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
`;

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.transform = 'scale(1)';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.transform = 'scale(0.8)';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});