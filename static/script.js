// GSAP для анимаций текста
gsap.from('#hero h1', { opacity: 0, y: -50, duration: 1, delay: 0.5 });
gsap.from('#hero .subtitle', { opacity: 0, y: 50, duration: 1, delay: 1 });
gsap.from('.btn', { opacity: 0, y: 50, duration: 1, delay: 1.1 });

// Анимация #about
gsap.from('#about p', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 1  ,
    scrollTrigger: {
        trigger: '#about',
        start: 'top 90%',
    },
});

// Анимация карточек проектов
gsap.from('.project-card', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '#projects',
        start: 'top 50%',
    },
});


// Регистрируем плагин ScrollTo
gsap.registerPlugin(ScrollToPlugin);
// Находим все ссылки в навигации
const navLinks = document.querySelectorAll('nav ul li a');
const projectsButton = document.querySelector('a.btn[href="#projects"]');
const scrollElements = [...navLinks, projectsButton];

// Добавляем обработчик событий для каждой ссылки
scrollElements.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Отменяем стандартное поведение ссылки

        // Получаем целевой раздел по атрибуту href
        const targetSection = document.querySelector(link.getAttribute('href'));

        // Плавный скролл до целевого раздела
        gsap.to(window, {
            duration: 1, // Длительность анимации (в секундах)
            scrollTo: {
                y: targetSection, // Целевой элемент
                offsetY: 70, // Смещение (например, для учета высоты шапки)
            },
            ease: 'power3.inOut', // Тип анимации
        });
    });
});

// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         gsap.to(window, {
//             duration: 1,
//             scrollTo: {
//                 y: this.getAttribute('href'),
//                 offsetY: 70, // Смещение для учета шапки
//             },
//             ease: 'power2.inOut',
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            // Прокрутка вниз
            header.classList.add('hidden');
        } else {
            // Прокрутка вверх
            header.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    });


    const textElement = document.getElementById('dynamic-text');
    const texts = ['[legal]', 'legalchik', 'nelegal?'];
    let index = 0;
    let isDeleting = false;
    let text = 'ebat';
    let typingSpeed = 120; // Скорость печати
    let pauseBeforeDelete = 8000; // Пауза перед стиранием

    function type() {
        const currentText = texts[index];
        if (isDeleting) {
            text = currentText.substring(0, text.length - 1);
        } else {
            text = currentText.substring(0, text.length + 1);
        }

        textElement.textContent = text;

        let timeout = typingSpeed;
        if (!isDeleting && text === currentText) {
            timeout = pauseBeforeDelete;
            isDeleting = true;
        } else if (isDeleting && text === '') {
            isDeleting = false;
            index = (index + 1) % texts.length;
            timeout = typingSpeed / 2;
        }

        setTimeout(type, timeout);
    }
    type();


    // const paragraphs = document.querySelectorAll('.typewriter p');

    // // Очищаем весь текст во всех <p>
    // paragraphs.forEach(p => {
    //     p.dataset.text = p.textContent.trim(); // Сохраняем оригинальный текст
    //     p.textContent = ''; // Очищаем абзацы перед анимацией
    //     p.style.visibility = 'visible'; // Делаем их видимыми
    // });
    
    // function typeWriter(index = 0) {
    //     if (index >= paragraphs.length) return; // Если все абзацы напечатаны, выходим
    
    //     const paragraph = paragraphs[index];
    //     const text = paragraph.dataset.text; // Берём сохранённый текст
    //     let charIndex = 0;
    
    //     const interval = setInterval(() => {
    //         if (charIndex < text.length) {
    //             paragraph.textContent += text[charIndex++];
    //         } else {
    //             clearInterval(interval);
    //             typeWriter(index + 1); // Переход к следующему абзацу
    //         }
    //     }, 5);
    // }
    // typeWriter();
    
});
