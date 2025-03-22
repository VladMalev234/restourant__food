

function slider({container, slide, nextArrow, prevArrow, 
    totalCounter, currentCounter, wrapper, field}) {

    // slider

    let currentIndex = 1;
    let offset = 0;

    const offerSlider = document.querySelector(container);
    const currentNumber = offerSlider.querySelector(currentCounter);
    const totaltNumber = offerSlider.querySelector(totalCounter);
    const sliderSlides = offerSlider.querySelectorAll(slide); 
    // const sliderCounterWrap = offerSlider.querySelector('.offer__slider-counter');
    const sliderPrevArrow = offerSlider.querySelector(prevArrow);
    const sliderNextArrow = offerSlider.querySelector(nextArrow);
    const sliderWrapper = offerSlider.querySelector(wrapper);
    const sliderField = offerSlider.querySelector(field);
    // Ширина одного слайду відносно обгортки
    const width = window.getComputedStyle(sliderWrapper).width;





  

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

export default  slider;