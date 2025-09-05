const expressionEl = document.getElementById('expression');
const resultEl = document.getElementById('result');
let currentExp = '';
let showExpression = true;

function append(value) {
  const last = currentExp.slice(-1);
  const operators = ['+', '-', '*', '/'];

  if (operators.includes(last) && operators.includes(value)) return;

  currentExp += value;
  expressionEl.innerText = currentExp;

  // Don't live update result on append
  expressionEl.style.display = 'block';
  showExpression = true;
  resultEl.classList.remove('empty');
}

function clearDisplay() {
  currentExp = '';
  expressionEl.innerText = '';
  resultEl.innerText = '0';
  resultEl.classList.add('empty');
  expressionEl.style.display = 'block';
  showExpression = true;
}

function backspace() {
  currentExp = currentExp.slice(0, -1);
  expressionEl.innerText = currentExp;

  if (currentExp === '') {
    resultEl.innerText = '0';
    resultEl.classList.add('empty');
  } else {
    try {
      const result = eval(currentExp);
      resultEl.innerText = '=' + result.toLocaleString();
      resultEl.classList.remove('empty');
    } catch {
      resultEl.innerText = '=';
    }
  }

  expressionEl.style.display = 'block';
  showExpression = true;
}

function calculate() {
  try {
    const result = eval(currentExp);
    resultEl.innerText = result.toLocaleString(); // No "="
    resultEl.classList.remove('empty');
    expressionEl.style.display = 'none'; // Hide expression
    showExpression = false;
  } catch {
    resultEl.innerText = 'Error';
    expressionEl.style.display = 'none';
    showExpression = false;
  }
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark');
  body.classList.toggle('light');
}

// Set default theme and 0 state
document.body.classList.add('dark');
resultEl.innerText = '0';
resultEl.classList.add('empty');
