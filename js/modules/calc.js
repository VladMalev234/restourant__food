

function calc() {


     // Calculator Форма калорій

     const result = document.querySelector('.calculating__result span');

  

     let sex, 
     height, weight, age, 
     ratio = 1.375;
 
     if(localStorage.getItem('sex')) {
         sex = localStorage.getItem('sex');
     } else {
         sex ='female';
         sex = localStorage.setItem('sex', 'female');
     }
 
 
     if(localStorage.getItem('ratio')) {
         ratio = localStorage.getItem('ratio');
     } else {
         ratio = 1.375;
         ratio = localStorage.setItem('ratio', 1.375);
     }
 
     function initLocalStorageSettings (selector, activeClass) {
         const elements = document.querySelectorAll(selector)
 
         elements.forEach(elem => {
             elem.classList.remove(activeClass);
 
             if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                 elem.classList.add(activeClass);
             } 
             if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                 elem.classList.add(activeClass);
             }
         });
     }
 
     initLocalStorageSettings('#gender div', 'calculating__choose-item_active');
     initLocalStorageSettings('.calculating__choose_big div', 'calculating__choose-item_active');
 
 
     function calcTotal() {
         if(!sex || !height || !weight || !age || !ratio) {
             result.textContent = '____';
             return;
         }
 
         if(sex === 'female') {
             result.textContent = ((447.6 +(9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(2);
            
         } else {
             result.textContent = ((88.36 +(13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(2);
         }
     }
 
     calcTotal();
 
     function getStaticInformation (selector, activeClass) {
         const elements = document.querySelectorAll(selector);
 
         elements.forEach(elem => {
             elem.addEventListener('click',  (e) => {
             // якщо в елементі на який ми клікнули присутній дата атрибут
            if(e.target.getAttribute('data-ratio')) {
                 ratio = +e.target.getAttribute('data-ratio');
                 localStorage.setItem('ratio', ratio);
            } else {
                 sex = e.target.getAttribute('id');
                 localStorage.setItem('sex', sex);
            }
 
 
            elements.forEach(elem => {
                 elem.classList.remove(activeClass);
            })
            
            e.target.classList.add(activeClass);
 
            calcTotal();
         });
     });
 
     }
 
     getStaticInformation('#gender div', 'calculating__choose-item_active');
     getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
 
 
     function getDinamicInformation (selector) {
         const input = document.querySelector(selector);
         
 
         input.addEventListener('input', () => {
 
             if(input.value.match(/\D/g)){
                 input.style.border = '1px solid red';
             } else {
                 input.style.border = 'none';
             }
 
            switch(input.getAttribute('id')) {
             case 'height':
                 height = +input.value;
                 break;
             case 'weight':
                 weight = +input.value;
                 break;
             case 'age':
                 age = +input.value;
                 break;
            }
            calcTotal(); 
         });
 
     }
 
     getDinamicInformation('#height');
     getDinamicInformation('#weight');
     getDinamicInformation('#age');
 
}

module.exports = calc;