// Скрываем все этапы, кроме первого
document.querySelectorAll('.stage').forEach((el, index) => {
  if (index !== 0) el.classList.add('hidden');
});

const stages = [
  null,
  {
    check: (input) => {
      const norm = input.toLowerCase().replace(/ё/g, 'е').trim();
      return norm.includes('щелковск') || norm.includes('щёлковск');
    },
    fragment: 'Pa',
    feedback: `✅ <strong>Верно!</strong><br>
      Ты стоял возле вокзала, опершись спиной на стену, и втыкал в телефон.<br>
      Когда я тебя звал — ты не реагировал.<br>
      Когда я к тебе подошёл — ты меня сначала не узнал…<br>
      И на лице у тебя читалось: «Мальчик, ты кто такой? Что тебе от меня надо?» 😂<br><br>
      Но потом — узнал.<br><br>
      <strong>Твой фрагмент: \`Pa\`</strong>`
  },
  {
    check: (input) => input.toLowerCase() === 'ek',
    fragment: 'ek',
    feedback: `✅ <strong>Верно!</strong><br>
      Верно, проверка на профпригодность пройдена)))<br>
      А ты не зря занимаешь место руководителя, что-то, да понимаешь в программировании😂<br><br>
      <strong>Твой фрагмент: \`ek\`</strong>`
  },
  {
    check: (input) => input === 'd_',
    fragment: 'd_',
    feedback: `✅ <strong>Верно!</strong><br>
      Не переживай — это крутой титул, и он даётся только тем<br>
      кто прошёл 10 лет дружбы и ни разу не удалил меня из контактов.<br><br>
      <strong>Твой фрагмент: \`d_\`</strong>`
  },
  {
    check: (input) => input.toLowerCase() === 'sh',
    fragment: 'sh',
    feedback: `✅ <strong>Верно!</strong><br>
      Это очень крутое и интересное хобии — особенно когда клюёт.<br><br>
      <strong>Твой фрагмент: \`sh\`</strong>`
  },
  {
    check: (input) => input.toLowerCase() === 'ul',
    fragment: 'ul',
    feedback: `✅ <strong>Верно!</strong><br>
      ЧтоЖЖЖЖЖ......Ты реально крутой программист, решил все задачки по программированию.<br>
      Впереди, последнее задание и ты получишь последний фрагмент кода)<br><br> 
      <strong>Твой фрагмент: \`ul\`</strong>`
  },
  {
    check: (input) => input === 'De',
    fragment: 'De',
    feedback: `✅ <strong>Верно!</strong><br>
      De jure — ты крутой дядька(дед) программист.<br>
      De facto — ты мой друг, который дружит со мной вот уже 10 лет, ты прошёл ВСЕ испытания, осталось только финальное задание - <br>
      собрать все фрагменты воедино.<br>
      <strong>Твой фрагмент: \`De\`</strong>`
  }
];

let collectedFragments = [];

for (let i = 1; i <= 6; i++) {
  document.getElementById(`btn${i}`).addEventListener('click', () => {
    const input = document.getElementById(`answer${i}`).value.trim();
    const feedbackEl = document.getElementById(`feedback${i}`);

    if (stages[i].check(input)) {
      collectedFragments.push(stages[i].fragment);
      feedbackEl.innerHTML = stages[i].feedback;
      feedbackEl.className = "feedback success";

      const oldBtn = feedbackEl.querySelector('.next-btn');
      if (oldBtn) oldBtn.remove();

      const nextBtn = document.createElement('button');
      nextBtn.textContent = i === 6 ? 'Перейти к финалу' : 'Следующий этап';
      nextBtn.className = 'next-btn';
      nextBtn.style.marginTop = '15px';
      nextBtn.style.display = 'block';
      nextBtn.onclick = () => {
        document.getElementById(`stage${i}`).classList.add('hidden');
        if (i < 6) {
          document.getElementById(`stage${i + 1}`).classList.remove('hidden');
        } else {
          document.getElementById('fragmentsList').textContent = collectedFragments.join(', ');
          document.getElementById('finalStage').classList.remove('hidden');
        }
      };
      feedbackEl.appendChild(document.createElement('br'));
      feedbackEl.appendChild(nextBtn);
    } else {
      feedbackEl.textContent = "❌ Неверно. Подумай ещё.";
      feedbackEl.className = "feedback error";
    }
  });
}

document.getElementById('btnFinal').addEventListener('click', () => {
  const input = document.getElementById('finalPassword').value.trim();
  const feedback = document.getElementById('finalFeedback');

  if (input === 'Ded_Pashulek') {
    feedback.textContent = "🔓 Архив распакован...";
    feedback.className = "feedback success";
    setTimeout(() => {
      document.getElementById('finalStage').classList.add('hidden');
      document.getElementById('finalSuccess').classList.remove('hidden');
    }, 1500);
  } else {
    feedback.innerHTML = "❌ Неверный пароль.<br>Подумай: как логично собрать эти фрагменты?<br>(Подсказка: начало — титул, конец — как я тебя часто называю.)";
    feedback.className = "feedback error";
  }
});
// Подсказка для этапа 2
document.getElementById('hint2').addEventListener('click', () => {
  const hint = document.getElementById('hint2Content');
  if (hint.classList.contains('hidden')) {
    hint.classList.remove('hidden');
    document.getElementById('hint2').textContent = 'Скрыть подсказку';
  } else {
    hint.classList.add('hidden');
    document.getElementById('hint2').textContent = 'Подсказка, если уж прям совсем не получается расшифровать';
  }
});
// Анимация снега
function createSnow() {
  const container = document.getElementById('snow-container');
  const snowflakesCount = 60; // количество снежинок

  for (let i = 0; i < snowflakesCount; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // Случайный размер (от 2 до 6px)
    const size = Math.random() * 5 + 3;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    // Случайная позиция по X
    snowflake.style.left = `${Math.random() * 100}vw`;

    // Случайная прозрачность
    snowflake.style.opacity = Math.random() * 0.5 + 0.3;

    // Анимация падения
    const duration = Math.random() * 10 + 10; // от 10 до 20 сек
    const delay = Math.random() * 5; // сдвиг по времени

    snowflake.style.animation = `fall ${duration}s linear ${delay}s infinite`;

    container.appendChild(snowflake);
  }

  // Добавляем CSS-анимацию через JS (чтобы не засорять CSS)
  if (!document.getElementById('snow-style')) {
    const style = document.createElement('style');
    style.id = 'snow-style';
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100vh) translateX(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 20}px);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Запускаем снег при загрузке
document.addEventListener('DOMContentLoaded', createSnow);
// Отправка по Enter для всех полей ввода
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      // Найдём кнопку "Отправить" в том же блоке
      const btn = e.target.closest('.stage, #finalStage').querySelector('button:not(.hint-btn):not(.next-btn)');
      if (btn) btn.click();
    }
  });
});