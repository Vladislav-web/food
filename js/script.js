'use strict';

window.addEventListener('DOMContentLoaded', () => {

  //! Tabs

  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

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
    }
  });

  //! Timer

  const deadline = '2020-12-25 20:19';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor(t / (1000 * 60 * 60) % 24),
      minutes = Math.floor(t / (1000 * 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else if (num <= 0) {
      return `00`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
        document.querySelectorAll('.clock-title').forEach(item => {
          item.textContent = 'Акция закончилась!!!';
          item.style.color = 'red';
          item.style.fontWeight = '700';
        });
      }
    }
  }

  setClock('.timer', deadline);

  //! Modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');
  // modalTimerId = setTimeout(openModal, 5000);

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    // clearTimeout(modalTimerId);
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  modalTrigger.forEach(item => {
    item.addEventListener('click', openModal);
  });

  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  });

  window.addEventListener('scroll', showModalByScroll);


  //!! Используем классы для карточек

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {}
      this.classes.forEach(className => element.classList.add(className));

      element.innerHTML = `
        <img src =${this.src} alt =${this.alt}>
        <h3 class = "menu__item-subtitle">${this.title}</h3>
        <div class = "menu__item-descr">${this.descr}</div> 
        <div class = "menu__item-divider"></div>
        <div class = "menu__item-price">
              <div class = "menu__item-cost"> Цена: </div>
              <div class = "menu__item-total"><span>${this.price}</span> грн/день </div>
        </div> 
      `;
      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container'
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню "Премиум"',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu .container',
    'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
    21,
    '.menu .container',
    'menu__item'
  ).render();

  //! Forms 

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      request.setRequestHeader('Content-type', 'application/json');
      const formData = new FormData(form);  

      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      }); 

      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          statusMessage.textContent = message.success;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          statusMessage.textContent = message.failure;
        }
      });
    });
  }
});


// //!! Используем классы для карточек - 2

// class MenuCard {
//   constructor(src, alt, title, descr, price, parentSelector, ...classes) {
//     this.src = src;
//     this.alt = alt;
//     this.title = title;
//     this.descr = descr;
//     this.price = price;
//     this.classes = classes;
//     this.parent = document.querySelector(parentSelector);
//     this.transfer = 27;
//     this.changeToUAH();
//   }

//   changeToUAH() {
//     this.price = this.price * this.transfer;
//   }

//   render() {
//     const element = document.createElement('div');

//     if (this.classes.length === 0) {
//       this.element = 'menu__item';
//       element.classList.add(this.element);
//     } else {
//       this.classes.forEach(className => element.classList.add(className));
//     }

//     element.innerHTML = `
//       <img src =${this.src} alt =${this.alt}>
//       <h3 class = "menu__item-subtitle">${this.title}</h3>
//       <div class = "menu__item-descr">${this.descr}</div> 
//       <div class = "menu__item-divider"></div>
//       <div class = "menu__item-price">
//             <div class = "menu__item-cost"> Цена: </div>
//             <div class = "menu__item-total"><span>${this.price}</span> грн/день </div>
//       </div> 
//     `;
//     this.parent.append(element);
//   }
// }

// new MenuCard(
//   "img/tabs/vegy.jpg",
//   "vegy",
//   'Меню "Фитнес"',
//   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
//   9,
//   '.menu .container'
// ).render();

// new MenuCard(
//   "img/tabs/elite.jpg",
//   "elite",
//   'Меню "Премиум"',
//   'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
//   14,
//   '.menu .container',
//   'menu__item',
// ).render();

// new MenuCard(
//   "img/tabs/post.jpg",
//   "post",
//   'Меню "Постное"',
//   'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
//   21,
//   '.menu .container',
//   'menu__item',
// ).render();

//!! Используем классы для карточек

// class MenuCard {
//   constructor(src, alt, title, descr, price, parentSelector) {
//     this.src = src;
//     this.alt = alt;
//     this.title = title;
//     this.descr = descr;
//     this.price = price;
//     this.parent = document.querySelector(parentSelector);
//     this.transfer = 27;
//     this.changeToUAH();
//   }

//   changeToUAH() {
//     this.price = this.price * this.transfer;
//   }

//   render() {
//     const element = document.createElement('div');
//     element.innerHTML = `
//       <div class = "menu__item">
//             <img src =${this.src} alt =${this.alt}>
//             <h3 class = "menu__item-subtitle">${this.title}</h3>
//             <div class = "menu__item-descr">${this.descr}</div> 
//             <div class = "menu__item-divider"></div>
//             <div class = "menu__item-price">
//                   <div class = "menu__item-cost"> Цена: </div>
//                   <div class = "menu__item-total"><span>${this.price}</span> грн/день </div>
//             </div> 
//       </div>
//       `;
//     this.parent.append(element);
//   }
// }

// new MenuCard(
//   "img/tabs/vegy.jpg",
//   "vegy",
//   'Меню "Фитнес"',
//   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
//   9,
//   '.menu .container'
// ).render();

// new MenuCard(
//   "img/tabs/elite.jpg",
//   "elite",
//   'Меню "Премиум"',
//   'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
//   14,
//   '.menu .container'
// ).render();

// new MenuCard(
//   "img/tabs/post.jpg",
//   "post",
//   'Меню "Постное"',
//   'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
//   21,
//   '.menu .container'
// ).render();


//! Modal NEW 

// const modalTrigger = document.querySelectorAll('[data-modal]'),
//   modal = document.querySelector('.modal'),
//   modalCloseBtn = document.querySelector('[data-close]'),
//   modalTimerId = setTimeout(openModal, 5000);

// function openModal() {
//   modal.classList.add('show');
//   modal.classList.remove('hide');
//   document.body.style.overflow = 'hidden';
//   clearInterval(modalTimerId);
// }

// function closeModal() {
//   modal.classList.add('hide');
//   modal.classList.remove('show');
//   document.body.style.overflow = '';
// }


// function showModalByScroll() {
//   if (window.pageYOffset + document.documentElement.clientHeight >= 
//    document.documentElement.scrollHeight) {
//     openModal();
//     window.removeEventListener('scroll', showModalByScroll);
//   }
// }

// modalTrigger.forEach(btn => {
//   btn.addEventListener('click', openModal);
// });

// modalCloseBtn.addEventListener('click', closeModal);

// modal.addEventListener('click', (e) => {
//   if (e.target === modal) {
//     closeModal();
//   }
// });

// document.addEventListener('keydown', (e) => {
//   if (e.code === "Escape" && modal.classList.contains('show')) {
//     closeModal();
//   }
// });

// window.addEventListener('scroll', showModalByScroll);

//! Modal Старый

// const modalTrigger = document.querySelectorAll('[data-modal]'),
//   modal = document.querySelector('.modal'),
//   modalCloseBtn = document.querySelector('[data-close]');

// modalTrigger.forEach(btn => {
//   btn.addEventListener('click', () => {
//     modal.classList.add('show');
//     modal.classList.remove('hide');
//     document.body.style.overflow = 'hidden';
//   });
// });

// function closeModal(params) {
//   modal.classList.add('hide');
//   modal.classList.remove('show');
//   document.body.style.overflow = '';
// }

// modalCloseBtn.addEventListener('click', closeModal);

// modal.addEventListener('click', (e) => {
//   if (e.target === modal) {
//     closeModal();
//   }
// });

// document.addEventListener('keydown', (e) => {
//   if (e.code === "Escape" && modal.classList.contains('show')) {
//     closeModal();
//   }
// });


// //! Timer
// const deadline = '2020-12-16 23:59';

// function getTimeRemaining(endtime) {
//   const t = Date.parse(endtime) - Date.parse(new Date()),
//     days = Math.floor(t / (1000 * 60 * 60 * 24)),
//     hours = Math.floor(t / (1000 * 60 * 60) % 24),
//     minutes = Math.floor(t / (1000 * 60) % 60),
//     seconds = Math.floor((t / 1000) % 60);

//   return {
//     'total': t,
//     'days': days,
//     'hours': hours,
//     'minutes': minutes,
//     'seconds': seconds
//   };
// }

// function getZero(num) {
//   if (num >= 0 && num < 10) {
//     return `0${num}`;
//   } else if (num <= 0) {
//     return `00`;
//   } else {
//     return num;
//   }
// }


// function setClock(selector, endtime) {
//   const timer = document.querySelector(selector),
//     days = timer.querySelector('#days'),
//     hours = timer.querySelector('#hours'),
//     minutes = timer.querySelector('#minutes'),
//     seconds = timer.querySelector('#seconds'),
//     timeInterval = setInterval(updateClock, 1000);

//   updateClock();

//   function updateClock() {
//     const t = getTimeRemaining(endtime);

//     days.innerHTML = getZero(t.days);
//     hours.innerHTML = getZero(t.hours);
//     minutes.innerHTML = getZero(t.minutes);
//     seconds.innerHTML = getZero(t.seconds);

//     if (t.total <= 0) {
//       clearInterval(timeInterval);
//       document.querySelectorAll('.clock-title').forEach(item => {
//         item.textContent = 'Акция закончилась!!!';
//         item.style.color = 'red';
//         item.style.fontWeight = '700';
//       });
//     }
//   }
// }

// setClock('.timer', deadline);

//! Tabs
// window.addEventListener('DOMContentLoaded', () => {

//     const tabs = document.querySelectorAll('.tabheader__item'),
//         tabsContent = document.querySelectorAll('.tabcontent'),
//         tabsParent = document.querySelector('.tabheader__items');

//     function hideTabContent() {
//         tabsContent.forEach(item => {
//             item.classList.add('hide');
//             item.classList.remove('show', 'fade');
//         });

//         tabs.forEach(item => {
//             item.classList.remove('tabheader__item_active');
//         });
//     }

//     function showTabContent(i = 0) {
//         tabsContent[i].classList.add('show', 'fade');
//         tabsContent[i].classList.remove('hide');
//         tabs[i].classList.add('tabheader__item_active');
//     }

//     hideTabContent();
//     showTabContent();

//     tabsParent.addEventListener('click', (event) => {
//         const target = event.target;

//         if (target && target.classList.contains('tabheader__item')) {
//             tabs.forEach((item, i) => {
//                 if (target == item) {
//                     hideTabContent();
//                     showTabContent(i);
//                 }
//             });
//         }
//     });
// });