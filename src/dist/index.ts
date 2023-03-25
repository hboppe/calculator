"use strict";
class Calculator {
    #screen;
    #numbers;
    constructor() {
        this.#screen = document.getElementsByClassName('result')[0];
        this.#numbers = Array.from(document.getElementsByClassName('number'));
    }
    numberClicked() {
        this.#numbers.map(button => {
            button.addEventListener('click', () => {
                this.#screen.innerHTML += button.innerHTML;
            });
        });
    }
}
const calculatorTs = new Calculator();
//# sourceMappingURL=index.js.map