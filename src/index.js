class Calculator {
  #screen
  #numbers

  constructor(){
    this.#screen = document.getElementsByClassName('result')[0];
    this.#numbers = [...document.getElementsByClassName('number')];
    this.#addEventListenersToNumbers()
  }

  #addEventListenersToNumbers() {
    this.#numbers.forEach(button => {
      button.addEventListener('click', () => {
        this.#addNumberToScreen(button.innerHTML)
      })
    })
  }

  #addNumberToScreen(number){
    if(this.#screen.innerHTML == 0){
      return this.#screen.innerHTML = number
    }
    this.#screen.innerHTML += number
  }

}

const calculatorTs = new Calculator()
