class Calculator {
    constructor(prevOutputElement, currentOutputElement) {
        this.prevOutputElement = prevOutputElement
        this.currentOutputElement = currentOutputElement
        this.clear()
    }

    clear() {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) {
            return
        }
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }

    selectOperation(operation) {

        if (this.currentOperand === "") return

        if (this.previousOperand !== "") {
            this.solve();
        }

        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    solve() {

        let result
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(curr)) {
            return
        }

        switch (this.operation) {
            case "+":
                result = prev + curr
                break;
            case "-":
                result = prev - curr
                break;
            case "*":
                result = prev * curr
                break;
            case "÷":
                result = prev / curr
                break;
            default:
                return
        }
        this.currentOperand = result;
        this.operation = undefined
        this.previousOperand = ""

        return result
    }

    formatNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateScreen() {
        this.currentOutputElement.innerHTML = this.formatNumber(this.currentOperand)
        if (this.operation != null) {
            this.prevOutputElement.innerText = `${this.formatNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.prevOutputElement.innerText = ""
        }
    }

}

const currentOutputElement = document.querySelector('[data-current-operand]')
const prevOutputElement = document.querySelector('[data-previous-operand]')
const equalsBtn = document.querySelector('[data-equals]')
const clearBtn = document.querySelector('[data-all-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const operationBtns = document.querySelectorAll('[data-operation]')
const numberBtns = document.querySelectorAll('[data-number]')

const calculator = new Calculator(prevOutputElement, currentOutputElement)

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML)
        calculator.updateScreen();
    })
})

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateScreen();
    })
})

equalsBtn.addEventListener('click', (button) => {
    calculator.solve();
    calculator.updateScreen();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateScreen();
})

clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateScreen();
})
