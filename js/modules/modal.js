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