class Calculator {

  constructor(){
    this.screen = document.querySelector('.result');
    this.numbers = [...document.getElementsByClassName('number')];
    this.operations = [...document.getElementsByClassName('operation')];
    this.cleanScreen = document.querySelector('.cleanScreen');
    this.plusMinus = document.querySelector('.plus-minus');
    this.percentage = document.querySelector('.percentage');

    this.previousValue = null;
    this.currentValue = null;
    this.selectedOperation = null;
    this.isCalculating = false;
    
    this.addEventListenersToNumbers();
    this.cleanCalculator();
    this.addEventListenerToOperations();
    this.toggleSignOfNumber()
    this.calculatePercentage()
    this.addEventListenerToEqualButton()
  }

  toggleSignOfNumber() {
    this.plusMinus.addEventListener('click', () => {
      this.screen.innerHTML = -(Number(this.screen.innerHTML))
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
    this.cleanScreen.addEventListener('click', () => this.screen.innerHTML = 0);
    this.selectedOperation = null;
    this.currentValue = null;
    this.previousValue = null;
  }

  // setCurrentValue(){
  //   if(this.previousValue) {
  //     this.currentValue = this.screen.innerHTML;
  //   }
  // }

  addNumberToScreen(number){
    if(this.screen.innerHTML === "0" || this.isCalculating){
      if(this.isCalculating && !this.previousValue){
        this.previousValue = this.screen.innerHTML;
      } 
      
      // else if(this.isCalculating && this.previousValue){
      //   this.currentValue = this.screen.innerHTML;
      // }

      this.screen.innerHTML = number;
      this.isCalculating = false;

      // this.setCurrentValue()

      // seta currentValue

      // if(this.previousValue) {
      //   this.currentValue = this.screen.innerHTML;
      // }
      
    } else {
      this.screen.innerHTML += number;
      // seta currentValue
      // if(this.previousValue) {
      //   this.currentValue = this.screen.innerHTML;
      // }
    }
  
  }

  addEventListenerToOperations(){
    this.operations.forEach(operation => {
      operation.addEventListener('click', (event) => {
        this.isCalculating = true;
        const currentOperation = event.target.innerHTML

        if(this.selectedOperation && this.previousValue){
          
          this.currentValue = this.screen.innerHTML // teste aqui
          const result = this.calculate(this.previousValue, this.screen.innerHTML, currentOperation);
          this.previousValue = null;
          this.screen.innerHTML = result
          this.selectedOperation = currentOperation

          
        } else if(!this.selectedOperation && !this.previousValue){
          this.selectedOperation = currentOperation
        } else if(this.selectedOperation && !this.previousValue){
          this.currentValue = this.screen.innerHTML;
        }

        // this.previousValue = this.screen.innerHTML;
        
      })
    })
  }

  // addEventListenerToOperations(){
  //   this.operations.forEach(operationButton => {
  //     operationButton.addEventListener('click', (e) => {
  //       this.isCalculating = true;

  //       const currentOperation = e.target.innerHTML

  //       if(currentOperation !== '='){
  //         if(!this.selectedOperation){
  //           this.previousValue = this.screen.innerHTML;
  //         } else {
  //           const result = this.calculate();
  //           this.showResult(result);
  //           this.previousValue = result;
  //         }
  
  //         this.selectedOperation = currentOperation;
  //         this.currentValue = null; // coloca o current value como null para evitar cliques e calculos
  //       } 

  //       const result = this.calculate()
  //       this.previousValue = result;
  //       this.showResult(result)
  //       console.log(this.previousValue, this.currentValue)


        
  //     })
  //   })
  // }

  addEventListenerToEqualButton(){
    const equalButton = document.querySelector('.equalButton');

    equalButton.addEventListener('click', () => {

      if(this.previousValue){
        this.currentValue = this.screen.innerHTML
      }else {
        this.previousValue = this.screen.innerHTML;
      }

      console.log(`previous:`, this.previousValue, `current:`,this.currentValue, `screen:`,this.screen.innerHTML, this.selectedOperation)

      const result = this.calculate(this.previousValue || this.screen.innerHTML, this.currentValue, this.selectedOperation)

      this.previousValue = null;
      console.log(result)
      this.showResult(result)
    })

  }

  sumNumbers(a, b){
    return Number(a) + Number(b);
  }

  subtractNumbers(a, b){
    return Number(a) - Number(b);
  }
  
  multiplyNumbers(a, b){
    if(typeof b === 'object'){
      return Number(a);
    }

    return Number(a) * Number(b);
  }

  divideNumbers(a, b){
    if(typeof b === 'object'){
      return Number(a);
    }

    return Number(a) / Number(b);
  }

  calculatePercentage(){
    this.percentage.addEventListener('click', () => {
      const percentageAmount = Number(this.screen.innerHTML) / 100;
      const totalAmount = Number(this.previousValue) 
      this.screen.innerHTML = this.multiplyNumbers(totalAmount, percentageAmount);
      this.currentValue = this.screen.innerHTML;
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
        return 'Invalid operation'
    }
  }

  showResult(result) {
    this.screen.innerHTML = result;
  }
}

const calculatorTs = new Calculator()
