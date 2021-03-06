

window.addEventListener('DOMContentLoaded', () => {
    const en = document.querySelector('.header__buttons-lang_en'),
          ru = document.querySelector('.header__buttons-lang_ru');

    ru.addEventListener('click', () => {
        ru.classList.toggle('header__buttons-lang_ru_active');
        en.classList.toggle('header__buttons-lang_en_active');
    });

        // Modal (Модальное окно)

    const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');
    const scrollHide = calcScroll();

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scrollHide}px`;
        clearInterval(modalTimerId);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);


    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }

        // FORMS
    const forms = document.querySelectorAll('form');
    const message = document.querySelector('.overlay');

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                ThanksOpenModal(message);
            }).catch(() => {
                ThanksOpenModal();
            }).finally(() => {
                document.body.style.overflow = '';
                form.reset();
            });
        });
    }

    function ThanksOpenModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        message.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(ThanksCloseModal, 3000);
    }

    function ThanksCloseModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        message.style.display = 'none';
        clearInterval(modalTimerId);
    }



    // Гамбургер меню

    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.hamburger__list-item'),
    hamburger = document.querySelector('.hamburger'),
    bodyScroll = document.querySelector('body');

    menu.addEventListener('click', () => {
        menu.classList.toggle('menu_active');
        hamburger.classList.toggle('hamburger_active');
        bodyScroll.classList.toggle('menu_scroll');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.toggle('menu_active');
            hamburger.classList.toggle('hamburger_active');
        });
    });

    hamburger.addEventListener('click', (e) => {
        if (e.target === hamburger) {
            menu.classList.toggle('menu_active');
            hamburger.classList.toggle('hamburger_active');
            bodyScroll.classList.toggle('menu_scroll');
        }
    });


});
