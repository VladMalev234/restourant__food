function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);



    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    
    if(modalTimerId) {
        clearTimeout(modalTimerId);
    }
}



function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
} 
 
 function modal( triggerSelector, modalSelector, modalTimerId) {
    console.log(modalSelector);
    
    // Modal Widow
    const openModalButtons = document.querySelectorAll(triggerSelector),
        //   closeModalButton = document.querySelector('[data-close]'),
          modal = document.querySelector(modalSelector);


          openModalButtons.forEach(button => {
            // Щоб функція визвалася саме по кліку
            button.addEventListener('click', () => openModal(modalSelector, modalTimerId))
        });

    // closeModalButton.addEventListener('click', closeModal)
   

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });


    document.addEventListener('keydown', (e) => {
        // if(e.which === 27){
        //     closeModal();
        // };
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
        
    });



    function showModalByScroll() {
        // порівнюємо суму висоти прокрученого сайту і висоти екрану клієнта з висотою встого сайту
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);



 }

 export default  modal;

 export {closeModal};
 export {openModal};