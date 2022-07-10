
/* get all number buttons */

const numberButtons = document.querySelectorAll('[data-number]')

/* get all operation buttons */

const operationButtons = document.querySelectorAll('[data-operation]')

/* get individual buttons only */

const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-all-clear]')

/* get individual text element only */

const previousOperationTextElement = document.querySelector('data-previous-operation')
const currentOperationTextElement = document.querySelector('data-current-operation')

const calculator = new Calculator(previousOperationTextElement, currentOperationTextElement)


/* calculator operations and computation */

class Calculator {
    constructor(previousOperationTextElement, currentOperationTextElement) {
      this.previousOperationTextElement = previousOperationTextElement
      this.currentOperationTextElement = currentOperationTextElement
      this.clear()
    }
  
    clear() {
      this.currentOperation = ''
      this.previousOperation = ''
      this.operation = undefined
    }
  
    delete() {
      this.currentOperation = this.currentOperation.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperation.includes('.')) return
      this.currentOperation = this.currentOperation.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperation === '') return
      if (this.previousOperation !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperation = this.currentOperand
      this.currentOperation = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.previousOperation)
      const current = parseFloat(this.currentOperation)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperation = computation
      this.operation = undefined
      this.previousOperation = ''
    }

    /* display */

    getDisplayNumber(number) {
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
    
      updateDisplay() {
        this.currentOperationTextElement.innerText =
          this.getDisplayNumber(this.currentOperation)
        if (this.operation != null) {
          this.previousOperationTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperation)} ${this.operation}`
        } else {
          this.previousOperationTextElement.innerText = ''
        }
      }
    }

/* button functions */

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
