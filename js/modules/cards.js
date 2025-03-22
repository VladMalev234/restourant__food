

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