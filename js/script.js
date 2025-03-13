'use strict'

window.addEventListener('DOMContentLoaded', () => {

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


    // getResource('http://localhost:3000/menu')
    // .then((data)=> {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu__field .container').createNewCard()
    //     });
    // });


    axios.get('http://localhost:3000/menu')
    .then(data=> {
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu__field .container').createNewCard()
        });
    });


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
.then(res => console.log(res))

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
    })

    sliderNextArrow.addEventListener('click', () => {
        // перевіряємо якщо  ми дійшли до кінця ширини всіх слайдів, то починаємо спочвтку
        if(offset == +width.slice(0, width.length - 2) * (sliderSlides.length - 1)) {
            offset = 0
        } else {
            //  добавляємо до offset ширину слайду
            offset += +width.slice(0, width.length - 2);
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

    });


    sliderPrevArrow.addEventListener('click', () => {
        // перевіряємо якщо  ми дійшли до початку ширини всіх слайдів - 1, то переходимо в кінець
        if(offset == 0) {
          
            offset = +width.slice(0, width.length - 2) * (sliderSlides.length - 1);
        } else {
            //  добавляємо до offset ширину слайду
            offset -= +width.slice(0, width.length - 2);
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


});


