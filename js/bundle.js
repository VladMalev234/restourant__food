/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {



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

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {



function cards() {


    // Create menu card

    const menuField = document.querySelector('.menu__field'),
        container = menuField.querySelector('.container')




        class MenuCard{
        constructor(img, alt, title, description, price, parentSelector, ...classes){
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 41.5;
            this.changeToUAN();
        }

        changeToUAN() {
            this.price *= this.transfer;
        }

        createNewCard(){
            
            
        // card
        const element = document.createElement('div');
        // console.log(this.element);
        

        if(this.classes.length === 0) {
            this.element = 'menu__item'
            element.classList.add(this.element)
        } else {
            this.classes.forEach(className => element.classList.add(`${className}`));
        }
        // element.classList.add('creative');
        element.innerHTML = `  
                    <img src="${this.img}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>          
            `;
            this.parent.append(element);
        }

        }

        
        const getResource = async (url) => {
            const res = await fetch(url);

            if(!res.ok){
                throw new Error(`Coul not fetch ${url}, status ${res.status}`);
            }
            return await res.json();
        };


        getResource('http://localhost:3000/menu')
        .then((data)=> {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu__field .container').createNewCard()
            });
        });


        // axios.get('http://localhost:3000/menu')
        // .then(data=> {
        //     data.data.forEach(({img, altimg, title, descr, price}) => {
        //         new MenuCard(img, altimg, title, descr, price, '.menu__field .container').createNewCard()
        //     });
        // });


        // const firstCard = new MenuCard(
        //     'img/tabs/vegy.jpg', 
        //     'vegy',
        //     'Фитнес',
        //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        //     '229', 
        //     ".menu__field .container");
        // firstCard.createNewCard();

        // const secondCard = new MenuCard('img/tabs/elite.jpg', 
        //     'elite', 
        //     'Премиум', 
        //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
        //     '550', 
        //     '.menu__field .container');
        // secondCard.createNewCard();

        // new MenuCard('img/tabs/post.jpg', 
        //     'post', 
        //     'Постное', 
        //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 
        //     '430', 
        //     '.menu__field .container').createNewCard();



}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {



function forms() {
    // Forms

    const forms = document.querySelectorAll('form');
            
    const message = {
        loading: 'img/form/spinner.svg',
        succes: 'Дякую! Ми скоро звяжемось з вами.',
        failure: 'Щось пішло не так... '
    };

    forms.forEach(item => {
        bindPpostData(item)
    });

    // функція для феча відправки данних
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type':'application/json'
            }
        });

        return await res.json()
    };

    function bindPpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();

    // Отримуємо данні з форми
            const formData = new FormData(form);

            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // })
    // перетворюємо formData в масив масивів, з нього отримуємо звичайний ОБЄКТ який перетворюємо в джейсон для передачі на сервер
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            
            


            // fetch('server.php', {
            //     method: 'POST',
            //     body: JSON.stringify(object),
            //     headers: {
            //         'Content-type':'application/json'
            //     }
            // })
            postData('http://localhost:3000/requests', json)
            // .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.succes);
                
                statusMessage.remove()
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() =>{
                form.reset();
            })

            // request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'application/json');


            

            // request.send(json);

    // Відслідковуємо отримання данних при загрузці
            // request.addEventListener('load', () => {

            //     if(request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.succes);
            //         form.reset();
            //         statusMessage.remove()
                    
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // })

        });
    }


    // Modal dialog with spin

    function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();
    const thaksModal = document.createElement('div');
    thaksModal.classList.add('modal__dialog');
    thaksModal.innerHTML =`
    <div class="modal__content">
            
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>   
            
    </div>
    `;

    modal.append(thaksModal);

    setTimeout(()=> {
    thaksModal.remove();
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    closeModal();
    }, 4000);

    }

    fetch('http://localhost:3000/menu')
    // data.json() -перетворюємо в обєкт
    .then(data => data.json())
    // .then(res => console.log(res))
    }

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

 function modal() {
    // Modal Widow
    const openModalButtons = document.querySelectorAll('[data-modal]'),
        //   closeModalButton = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');


    function openModal() {
        modal.classList.remove('hide');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    openModalButtons.forEach(button => {
        button.addEventListener('click', openModal)
    });

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    // closeModalButton.addEventListener('click', closeModal)
   

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });


    document.addEventListener('keydown', (e) => {
        // if(e.which === 27){
        //     closeModal();
        // };
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
        
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        // порівнюємо суму висоти прокрученого сайту і висоти екрану клієнта з висотою встого сайту
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);



 }

 module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {



function slider() {

    // slider

    const offerSlider = document.querySelector('.offer__slider');
    const currentNumber = offerSlider.querySelector('#current');
    const totaltNumber = offerSlider.querySelector('#total');
    const sliderSlides = offerSlider.querySelectorAll('.offer__slide'); 
    // const sliderCounterWrap = offerSlider.querySelector('.offer__slider-counter');
    const sliderPrevArrow = offerSlider.querySelector('.offer__slider-prev');
    const sliderNextArrow = offerSlider.querySelector('.offer__slider-next');
    const sliderWrapper = offerSlider.querySelector('.offer__slider-wrapper');
    const sliderField = offerSlider.querySelector('.offer__slider-inner');
    // Ширина одного слайду відносно обгортки
    const width = window.getComputedStyle(sliderWrapper).width;





    let currentIndex = 1;
    let offset = 0;

    if(sliderSlides.length < 10) {
        totaltNumber.textContent = `0${sliderSlides.length}`;
        currentNumber.textContent = `0${currentIndex}`; 
    } else {
        totaltNumber.textContent = sliderSlides.length;
        currentNumber.textContent = currentIndex;
    }

    //  sliderField -  встановлюємо ширину блоку 100% * 4
    sliderField.style.width = 100 * sliderSlides.length + '%';
    sliderField.style.display = 'flex';
    sliderField.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden';




    // Щоб кожен слайд займав ширину обертки визначени попереду
    sliderSlides.forEach(slide => {
        slide.style.width = width
    });

    offerSlider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots =[];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    offerSlider.append(indicators);

    for (let i = 0; i < sliderSlides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if(i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function makeDigit (str) {
        return +str.replace(/\D/g, '');
    }

    sliderNextArrow.addEventListener('click', () => {
        // перевіряємо якщо  ми дійшли до кінця ширини всіх слайдів, то починаємо спочвтку
        if(offset ==  makeDigit(width) * (sliderSlides.length - 1)) {
            offset = 0
        } else {
            //  добавляємо до offset ширину слайду
            offset += makeDigit(width);
        }
        sliderField.style.transform = `translateX(-${offset}px)`;

        if(currentIndex == sliderSlides.length) {
            currentIndex = 1;
        } else {
            currentIndex += 1;
        }

        if(sliderSlides.length < 10) {
            currentNumber.textContent = `0${currentIndex}`; 
        } else {
            currentNumber.textContent = currentIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentIndex -1].style.opacity = 1;

    
    });



    sliderPrevArrow.addEventListener('click', () => {
        // перевіряємо якщо  ми дійшли до початку ширини всіх слайдів - 1, то переходимо в кінець
        if(offset == 0) {
        
            offset = makeDigit(width) * (sliderSlides.length - 1);
        } else {
            //  добавляємо до offset ширину слайду
            offset -= makeDigit(width);
        }
        sliderField.style.transform = `translateX(-${offset}px)`;

        if(currentIndex <= 1) {
            currentIndex = sliderSlides.length;
        } else {
            currentIndex -= 1;
        }

        if(sliderSlides.length < 10) {
            currentNumber.textContent = `0${currentIndex}`; 
        } else {
            currentNumber.textContent = currentIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentIndex -1].style.opacity = 1;
    });


    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            // Записуємо індекс навігаційної крапки в змінну slideTo
            const slideTo = e.target.getAttribute('data-slide-to');
            
            currentIndex = slideTo;

            offset = makeDigit(width) * (slideTo - 1);
            sliderField.style.transform = `translateX(-${offset}px)`;


            if(sliderSlides.length < 10) {
                currentNumber.textContent = `0${currentIndex}`; 
            } else {
                currentNumber.textContent = currentIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[currentIndex -1].style.opacity = 1;
            
        });
    });




    // function hideSlide() {
    //     sliderSlides.forEach( item => {
    //         item.classList.add('hide');
    //         item.classList.remove('show', 'fade');
    //     });
    // }


    // function showSlide (i = 0) {  
    //     currentIndex >=10 ? currentNumber.textContent = `${currentIndex}` : currentNumber.textContent = `0${currentIndex}`;
    //     sliderSlides.length >= 10 ? totaltNumber.textContent = `${sliderSlides.length}` : totaltNumber.textContent = `0${sliderSlides.length}`;

    //     sliderSlides[i].classList.add('show', 'fade');
    //     sliderSlides[i].classList.remove('hide');
        
    // };

    // hideSlide();
    // showSlide();


    // function currentSlide() {
    //     sliderSlides.forEach((slide, index) => {
    //         if(index == currentIndex-1) {
    //             hideSlide();
    //             showSlide(index);
    //         }
    //     });
    // }


    // function showCurrentSlideNumber(target) {

    //     if(target.parentElement.classList.contains('offer__slider-prev')) {
    //         currentIndex -= 1;
    //         // currentNumber.textContent = `0${currentIndex}`;
    //         currentSlide();
    //         if(currentIndex <= 0) {
    //             currentIndex = sliderSlides.length;
    //             // currentNumber.textContent = `0${currentIndex}` ;
    //             currentSlide();
    //         }
    //     } else if (target.parentElement.classList.contains('offer__slider-next')) {
    //         currentIndex += 1;
    //         // currentNumber.textContent = `0${currentIndex}`;
    //         currentSlide();
    //         if(currentIndex > sliderSlides.length) {
    //             currentIndex = 1;
    //             // currentNumber.textContent = `0${currentIndex}`;
    //             currentSlide(); 
    //         }
    //     }

        
    // }


    // sliderCounterWrap.addEventListener('click', (event) => {
    //     const target = event.target;
    //     showCurrentSlideNumber(target);
        
    // });


}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {



function tabs() {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
    tabsContent.forEach( item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    })
    }


    function showTabContent (i = 0) {   
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
    };


    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            } 
        });
    };
    
    });
}


module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {



function timer() {



    // Timer

    const deadline = '2025-02-12'

    // різниця між дедлайном і теперішім часом

        function getTimeRemaining(endtime) {
            let days, hours, minutes, seconds;
            const t = Date.parse(endtime)- Date.parse(new Date());

            if (t <= 0) {
                days =0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            } else {
                days = Math.floor(t / (1000 * 60 * 60 * 24));
                hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                minutes = Math.floor((t / 1000 / 60) % 60);
                seconds = Math.floor((t / 1000 ) % 60);
            }
        
            return {
                'total' : t,
                days,
                hours,
                minutes,
                seconds
            }

        }

        function addZero(num) {
            if( num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }


        function setClock (selector, endtime) {
            const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

                updateClock();

                function updateClock () {
                    const t = getTimeRemaining(endtime);
                    days.innerHTML = addZero(t.days);
                    hours.innerHTML = addZero(t.hours);
                    minutes.innerHTML = addZero(t.minutes);
                    seconds.innerHTML = addZero(t.seconds);

                    if (t.total <= 0) {
                        clearInterval(timeInterval);
                    }

                }
        }


        setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


window.addEventListener('DOMContentLoaded', () => {

 const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
       modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
       timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"), 
       cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"), 
       forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"), 
       slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"), 
       calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

       tabs();
       modal();
       timer();
       cards();
       forms();
       slider();
       calc();

});



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map