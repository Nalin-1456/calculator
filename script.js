let currentOperand = '0';
let previousOperand = '';
let operation = null;

const currentDisplay = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');

function updateDisplay() {
    currentDisplay.textContent = currentOperand;
    if (operation != null) {
        previousDisplay.textContent = `${previousOperand} ${operation}`;
    } else {
        previousDisplay.textContent = '';
    }
}

function inputNumber(num) {
    if (currentOperand === '0') {
        currentOperand = num;
    } else {
        currentOperand = currentOperand.toString() + num.toString();
    }
    updateDisplay();
}

function inputDecimal() {
    if (currentOperand.indexOf('.') === -1) {
        currentOperand = currentOperand.toString() + '.';
    }
    updateDisplay();
}

function inputOperator(nextOperation) {
    if (previousOperand === '') {
        previousOperand = currentOperand;
    } else if (operation !== null) {
        const result = performCalculation();
        currentOperand = result;
        previousOperand = result;
    }
    
    operation = nextOperation;
    currentOperand = '0';
    updateDisplay();
}

function calculate() {
    if (operation === null || previousOperand === '') return;
    
    const result = performCalculation();
    currentOperand = result;
    operation = null;
    previousOperand = '';
    updateDisplay();
}

function performCalculation() {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    let computation = 0;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Error: Division by zero');
                return '0';
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    return computation.toString();
}

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function deleteLast() {
    if (currentOperand.length > 1) {
        currentOperand = currentOperand.slice(0, -1);
    } else {
        currentOperand = '0';
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key >= '0' && e.key <= '9') {
        inputNumber(e.key);
    } else if (e.key === '.') {
        inputDecimal();
    } else if (e.key === '+') {
        inputOperator('+');
    } else if (e.key === '-') {
        inputOperator('-');
    } else if (e.key === '*') {
        inputOperator('*');
    } else if (e.key === '/') {
        e.preventDefault();
        inputOperator('/');
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Escape') {
        clearAll();
    } else if (e.key === 'Backspace') {
        deleteLast();
    }
});

// Initialize display
updateDisplay();