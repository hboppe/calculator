class Calculator {
  #screen
  #numbers
  #operations
  #selectedOperation
  #cleanScreen
  #isCalculating
  #equalButton
  #previousValue

  constructor(){
    this.#screen = document.getElementsByClassName('result')[0];
    this.#numbers = [...document.getElementsByClassName('number')];
    this.#operations = [...document.getElementsByClassName('operation')];
    this.#cleanScreen = document.querySelector('.cleanScreen');
    this.#equalButton = document.querySelector('.equalButton');
    this.#previousValue = null;

    this.#selectedOperation = null;
    this.#isCalculating = false;
    
    this.#addEventListenersToNumbers();
    this.#cleanCalculator();
    this.#addEventListenerToOperations();
    this.#showResult()
  }

  #addEventListenersToNumbers() {
    this.#numbers.forEach(button => {
      button.addEventListener('click', () => {
        this.#addNumberToScreen(button.innerHTML)
      })
    })
  }

  #cleanCalculator(){
    this.#cleanScreen.addEventListener('click', () => this.#screen.innerHTML = 0);
    this.#selectedOperation = null;
    this.#isCalculating = false;
  }

  #addNumberToScreen(number){
    if(this.#screen.innerHTML === "0" || this.#isCalculating){
      this.#previousValue = this.#screen.innerHTML;
      this.#isCalculating = false;
      this.#screen.innerHTML = number
    } else {
      this.#screen.innerHTML += number
    }
  
  }

  #addEventListenerToOperations(){
    this.#operations.forEach(button => {
      button.addEventListener('click', () => {
        this.#selectedOperation = button.innerHTML;
        this.#isCalculating = true;

      })
    })
  }

  sumNumbers(a, b){
    return a + b;
  }

  subtractNumbers(a, b){
    return a - b;
  }
  
  multiplyNumbers(a, b){
    return a * b;
  }

  divideNumbers(a, b){
    return a / b;
  }

  #showResult() {
    this.#equalButton.addEventListener('click', () => {
      const number1 = Number(this.#screen.innerHTML);
      const number2 = Number(this.#previousValue);

      switch(this.#selectedOperation){
        case '+':
          this.#screen.innerHTML = this.sumNumbers(number1, number2);
          break;
        case '-':
          this.#screen.innerHTML = this.subtractNumbers(number1, number2);
          break;
        case 'x':
          this.#screen.innerHTML = this.multiplyNumbers(number1, number2);
          break;
        case '/':
          this.#screen.innerHTML = this.divideNumbers(number1, number2);
      }
    })
  }
}

const calculatorTs = new Calculator()
