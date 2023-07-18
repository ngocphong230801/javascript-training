function add() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    const result = num1 + num2;
    document.getElementById('result').textContent = 'result: ' + result;
}

function subtract() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    const result = num1 - num2;
    document.getElementById('result').textContent = 'result: ' + result;
}

function multiply() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    const result = num1 * num2;
    document.getElementById('result').textContent = 'result: ' + result;
}

function divide() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    const result = num1 / num2;
    document.getElementById('result').textContent = 'result: ' + result;
}

function reset() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('result').textContent = '';
}
