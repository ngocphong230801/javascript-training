function add() {
    var num1 = parseFloat(document.getElementById('num1').value);
    var num2 = parseFloat(document.getElementById('num2').value);

    var result = num1 + num2;
    document.getElementById('result').textContent = 'Kết quả: ' + result;
}

function subtract() {
    var num1 = parseFloat(document.getElementById('num1').value);
    var num2 = parseFloat(document.getElementById('num2').value);

    var result = num1 - num2;
    document.getElementById('result').textContent = 'Kết quả: ' + result;
}

function multiply() {
    var num1 = parseFloat(document.getElementById('num1').value);
    var num2 = parseFloat(document.getElementById('num2').value);

    var result = num1 * num2;
    document.getElementById('result').textContent = 'Kết quả: ' + result;
}

function divide() {
    var num1 = parseFloat(document.getElementById('num1').value);
    var num2 = parseFloat(document.getElementById('num2').value);

    var result = num1 / num2;
    document.getElementById('result').textContent = 'Kết quả: ' + result;
}

function reset() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('result').textContent = '';
}
