import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
    // Forms

        const forms = document.querySelectorAll(formSelector);
                
        const message = {
            loading: 'img/form/spinner.svg',
            succes: 'Дякую! Ми скоро звяжемось з вами.',
            failure: 'Щось пішло не так... '
        };

        forms.forEach(item => {
            bindPpostData(item)
        });

       

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
            openModal('.modal', modalTimerId);
            const thaksModal = document.createElement('div');
            thaksModal.classList.add('modal__dialog');
            thaksModal.innerHTML =`
            <div class="modal__content">
                    
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>   
                    
            </div>
            `;

            document.querySelector('.modal').append(thaksModal);

            setTimeout(()=> {
                thaksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal('.modal');
                }, 4000);

        }

        fetch('http://localhost:3000/menu')
        // data.json() -перетворюємо в обєкт
        .then(data => data.json())
        // .then(res => console.log(res))
    }

    export default  forms;