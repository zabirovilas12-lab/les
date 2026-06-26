// Мобильное меню
const toggleBtn = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (toggleBtn && mobileMenu) {
  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });
}

// Модальное окно
const modal = document.getElementById('modal');
const openModalBtns = document.querySelectorAll('#openModalBtn, #heroModalBtn, .orderBtn');
const closeModal = document.querySelector('.close-modal');

function openModalFunc() {
  if (modal) modal.style.display = 'flex';
}

function closeModalFunc() {
  if (modal) modal.style.display = 'none';
}

openModalBtns.forEach(btn => {
  if (btn) btn.addEventListener('click', openModalFunc);
});

if (closeModal) closeModal.addEventListener('click', closeModalFunc);

window.addEventListener('click', (e) => {
  if (e.target === modal) closeModalFunc();
});

// FAQ аккордеон
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  if (question) {
    question.addEventListener('click', () => {
      item.classList.toggle('active');
      const icon = question.querySelector('i');
      if (icon) {
        icon.style.transform = item.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
      }
    });
  }
});

// Форма обратной связи
const form = document.getElementById('callbackForm');
const msgDiv = document.getElementById('formMsg');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();

    if (!name || !phone) {
      msgDiv.innerHTML = '<span style="color:#c0392b;">❌ Заполните имя и телефон</span>';
      setTimeout(() => msgDiv.innerHTML = '', 3000);
      return;
    }

    const btn = form.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = 'Отправка...';
    btn.disabled = true;

    setTimeout(() => {
      msgDiv.innerHTML = '<span style="color:#0a5c36;">✅ Заявка принята! Свяжемся с вами.</span>';
      form.reset();
      btn.innerText = originalText;
      btn.disabled = false;
      setTimeout(() => msgDiv.innerHTML = '', 5000);
    }, 1000);
  });
}

const modalForm = document.getElementById('modalForm');

if (modalForm) {
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✅ Заявка принята! Мы перезвоним в ближайшее время.');
    modalForm.reset();
    closeModalFunc();
  });
}

// =============================================
// ⭐ ФОРМА ДЛЯ ОТЗЫВОВ
// =============================================
const reviewForm = document.getElementById('reviewForm');
const reviewMsg = document.getElementById('reviewMsg');
const reviewsContainer = document.getElementById('reviewsContainer');

if (reviewForm) {
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('reviewName').value.trim();
    const city = document.getElementById('reviewCity').value.trim();
    const rating = document.getElementById('reviewRating').value;
    const service = document.getElementById('reviewService').value.trim();
    const text = document.getElementById('reviewText').value.trim();

    // Проверка
    if (!name || !city || !rating || !text) {
      reviewMsg.innerHTML = '<span style="color:#c0392b;">❌ Заполните все поля</span>';
      setTimeout(() => reviewMsg.innerHTML = '', 3000);
      return;
    }

    // Показываем сообщение о загрузке
    const btn = reviewForm.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = 'Отправка...';
    btn.disabled = true;

    // Имитация отправки на сервер
    setTimeout(() => {
      // Создаём новую карточку отзыва
      const newReview = document.createElement('div');
      newReview.className = 'review-card';
      newReview.style.opacity = '0';
      newReview.style.transform = 'translateY(25px)';
      newReview.style.transition = 'all 0.5s ease';

      newReview.innerHTML = `
        <i class="fas fa-quote-left"></i>
        <span class="review-stars">${rating}</span>
        <p>${text}</p>
        <div class="review-author">${name}, ${city}</div>
        <span class="review-service">${service || 'Услуга не указана'}</span>
      `;

      // Добавляем в начало контейнера
      reviewsContainer.insertBefore(newReview, reviewsContainer.firstChild);

      // Анимация появления
      setTimeout(() => {
        newReview.style.opacity = '1';
        newReview.style.transform = 'translateY(0)';
      }, 50);

      // Очищаем форму
      reviewForm.reset();
      reviewMsg.innerHTML = '<span style="color:#0a5c36;">✅ Спасибо! Ваш отзыв добавлен.</span>';
      
      btn.innerText = originalText;
      btn.disabled = false;

      setTimeout(() => reviewMsg.innerHTML = '', 4000);
    }, 1000);
  });
}

// Плавный скролл
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === "#" || href === "") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (mobileMenu) mobileMenu.classList.remove('active');
    }
  });
});

// Анимация карточек
const cards = document.querySelectorAll('.service-item, .work-card, .review-card, .faq-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(25px)';
  card.style.transition = 'all 0.5s ease';
  observer.observe(card);
});