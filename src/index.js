class Calculator {

  constructor(){
    this.screen = document.querySelector('.result');
    this.numbers = [...document.getElementsByClassName('number')];
    this.operations = [...document.getElementsByClassName('operation')];

    this.previousValue = null;
    this.currentValue = null;
    this.selectedOperation = null;
    this.isCalculating = false;
    
    this.addEventListenersToNumbers();
    this.cleanCalculator();
    this.addEventListenerToOperations();
    this.toggleSignOfNumber();
    this.calculatePercentage();
    this.addEventListenerToEqualButton();
    this.addEventListenerToDotButton();
    this.screenFlicker();
  }

  toggleSignOfNumber() {
    const plusMinus = document.querySelector('.plus-minus');

    plusMinus.addEventListener('click', () => {
      this.screen.innerHTML = -(Number(this.screen.innerHTML))
    })
  }

  screenFlicker(){
    const screenFlickersButtons = document.querySelectorAll('.screen-flicker');
    screenFlickersButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.screen.classList.add('animate-flicker');
  
        setTimeout(() => {
          this.screen.classList.remove('animate-flicker');
        }, 200)
      })
    })
  }

  addEventListenersToNumbers() {
    this.numbers.forEach(button => {
      button.addEventListener('click', () => {
        this.addNumberToScreen(button.innerHTML)
      })
    })
  }

  cleanCalculator(){
    const cleanScreen = document.querySelector('.cleanScreen');

    cleanScreen.addEventListener('click', () => {
      this.screen.innerHTML = 0
      this.selectedOperation = null;
      this.currentValue = null;
      this.previousValue = null;
      this.isCalculating = false;
    });
  }

  addNumberToScreen(number){
    if(this.screen.innerHTML === "0" || this.isCalculating || this.screen.innerHTML === 'Not a number'){
      if(this.isCalculating && !this.previousValue){
        this.previousValue = this.screen.innerHTML;
      } 

      this.screen.innerHTML = number;
      this.isCalculating = false;
      
    } else {
      this.screen.innerHTML += number;
    }
  
  }

  addEventListenerToDotButton(){
    const dot = document.querySelector('.dot');
    dot.addEventListener('click', () => {
      if(!this.screen.innerHTML.includes('.') && this.screen.innerHTML !== '0'){
        this.screen.innerHTML += '.'
      }
    })
  }

  addEventListenerToOperations(){
    this.operations.forEach(operation => {
      operation.addEventListener('click', (event) => {
        this.isCalculating = true;
        const currentOperation = event.target.innerHTML

        if(this.selectedOperation && this.previousValue){
          
          this.currentValue = this.screen.innerHTML 
          const result = this.calculate(this.previousValue, this.screen.innerHTML, this.selectedOperation);
          this.previousValue = null;
          this.screen.innerHTML = result;
          
        } else if(this.selectedOperation && !this.previousValue){
          this.currentValue = this.screen.innerHTML;
        }

        this.selectedOperation = currentOperation
        
      })
    })
  }

  addEventListenerToEqualButton(){
    const equalButton = document.querySelector('.equalButton');

    equalButton.addEventListener('click', () => {

      if(!this.selectedOperation){
        return
      } else if(this.previousValue){
        this.currentValue = this.screen.innerHTML
      }else {
        this.previousValue = this.screen.innerHTML;
      }

      const result = this.calculate(this.previousValue, this.currentValue, this.selectedOperation);
      this.previousValue = null;
      this.showResult(result)

    })

  }

  sumNumbers(a, b){
    const result = Number(a) + Number(b);

    return isFinite(result) ? result : 'Not a number';
  }

  subtractNumbers(a, b){
    const result = Number(a) - Number(b)

    return isFinite(result) ? result : 'Not a number';
  }
  
  multiplyNumbers(a, b){
    const result = Number(a) * Number(b);

    return isFinite(result) ? result : 'Not a number';
  }

  divideNumbers(a, b){
    const result = Number(a) / Number(b);
    
    return isFinite(result) ? result : 'Not a number';
  }

  calculatePercentage(){
    const percentage = document.querySelector('.percentage');

    percentage.addEventListener('click', () => {
      const percentageAmount = Number(this.screen.innerHTML) / 100;
      const totalAmount = Number(this.previousValue) * percentageAmount;
      this.screen.innerHTML = isFinite(totalAmount) ? totalAmount : 'Not a number'
    })
  }

  calculate(number1, number2, operation) {

    switch(operation){
      case '+':
        return this.sumNumbers(number1, number2);
      case '-':
        return this.subtractNumbers(number1, number2);
      case 'x':
        return this.multiplyNumbers(number1, number2);
      case '/':
        return this.divideNumbers(number1, number2);
      default:
        return 0
    }
  }

  showResult(result) {
    this.screen.innerHTML = result;
  }
}

const calculatorTs = new Calculator()
