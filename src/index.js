class Calculator {
  #screen
  #numbers
  #operations
  #selectedOperation
  #cleanScreen
  #isCalculating
  #equalButton
  #previousValue
  #currentValue
  #plusMinus
  #percentage

  constructor(){
    this.#screen = document.getElementsByClassName('result')[0];
    this.#numbers = [...document.getElementsByClassName('number')];
    this.#operations = [...document.getElementsByClassName('operation')];
    this.#cleanScreen = document.querySelector('.cleanScreen');
    this.#equalButton = document.querySelector('.equalButton');
    this.#plusMinus = document.querySelector('.plus-minus');
    this.#percentage = document.querySelector('.percentage');

    this.#previousValue = null;
    this.#currentValue = null;

    this.#selectedOperation = null;
    this.#isCalculating = false;
    
    this.#addEventListenersToNumbers();
    this.#cleanCalculator();
    this.#addEventListenerToOperations();
    this.#showResult()
    this.#toggleSignOfNumber()
    this.calculatePercentage()
  }

  #toggleSignOfNumber() {
    this.#plusMinus.addEventListener('click', () => {
      this.#screen.innerHTML = -(Number(this.#screen.innerHTML))
    })
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

  calculatePercentage(){
    this.#percentage.addEventListener('click', () => {
      const percentageAmount = Number(this.#screen.innerHTML) / 100;
      const totalAmount = Number(this.#previousValue) 
      this.#screen.innerHTML = totalAmount * percentageAmount
      this.#currentValue = this.#screen.innerHTML;
    })
  }

  #showResult() {
    this.#equalButton.addEventListener('click', () => {

      if(!this.#currentValue){
        this.#currentValue = this.#screen.innerHTML;
      }

      const number1 = Number(this.#previousValue);
      const number2 = Number(this.#currentValue);

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

      this.#previousValue = this.#screen.innerHTML;
    })
  }
}

const calculatorTs = new Calculator()
