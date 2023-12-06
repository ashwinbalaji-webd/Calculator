`use strict`;
console.log(`Sanity check!`);

function calculate(event) {
    const value = event.target.value;

    console.log(event);
}

function init() {
    console.log('form submitted!')
    const keyPadEl = document.getElementById('keypad-container');

    const buttonEls = keyPadEl.querySelectorAll('button');

    buttonEls.forEach((buttonEL)=>{
        buttonEL.addEventListener('click', calculate);
    })
}

init();
