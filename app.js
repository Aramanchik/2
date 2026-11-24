document.addEventListener('DOMContentLoaded', () => {
  const sideA = document.getElementById('sideA');
  const sideB = document.getElementById('sideB');
  const sideC = document.getElementById('sideC');
  const areaOutput = document.getElementById('area');
  const calcBtn = document.getElementById('calcBtn');
  const message = document.getElementById('message');

  function parseSide(input) {
    return parseFloat(String(input.value).replace(',', '.'));
  }

  function calculateTriangleArea() {
    const a = parseSide(sideA);
    const b = parseSide(sideB);
    const c = parseSide(sideC);

    if (![a, b, c].every(Number.isFinite) || a <= 0 || b <= 0 || c <= 0) {
      areaOutput.value = '';
      message.textContent = 'Введите положительные числовые значения сторон.';
      message.className = 'message error';
      return;
    }

    if (a + b <= c || a + c <= b || b + c <= a) {
      areaOutput.value = '';
      message.textContent = 'Такого треугольника не существует: сумма двух сторон должна быть больше третьей.';
      message.className = 'message error';
      return;
    }

    const p = (a + b + c) / 2;
    const area = Math.sqrt(p * (p - a) * (p - b) * (p - c));

    areaOutput.value = area.toFixed(2).replace('.', ',');
    message.textContent = 'Готово. Можно изменить стороны и посчитать снова.';
    message.className = 'message ok';
  }

  calcBtn.addEventListener('click', calculateTriangleArea);

  [sideA, sideB, sideC].forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        calculateTriangleArea();
      }
    });
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('sw.js')
        .then((registration) => console.log('SW registered:', registration))
        .catch((error) => console.log('SW failed:', error));
    });
  }
});