var button = document.querySelector('.hamburger__button');
var buttonClose = 'hamburger__button--close'; 
var menu = document.querySelector('.menu__wrapper');
var menuVisible = 'menu__wrapper--visible';


button.addEventListener('click', () => { 
  button.classList.toggle(buttonClose);
  menu.classList.toggle(menuVisible);

  if (!(button.classList.contains(buttonClose))) {
    sublist.classList.remove(sublistOpen);
  }
});

document.addEventListener('click', e => {
  var background = document.querySelector('.header')
  var navBar = document.querySelector('.header__menu')

  if (e.target === background || e.target === navBar ) {
    button.classList.remove(buttonClose);
    menu.classList.remove(menuVisible);
  }
});

var listItems = document.querySelectorAll('.nav__list__item');
listItems = [...listItems];
var firstItem = listItems[0];
var sublist = document.querySelector('.nav__sublist');
var sublistOpen = 'nav__sublist--open';

firstItem.addEventListener('click', () => { 
  firstItem.classList.toggle('nav__list__item--active');
  sublist.classList.toggle(sublistOpen);
});

window.addEventListener('resize', () => {
  if (window.screen.width >= 1200) {
    if (sublist.classList.contains(sublistOpen)) {
      button.classList.remove(buttonClose);
      menu.classList.remove(menuVisible);
      firstItem.classList.remove('nav__list__item--active');
      sublist.classList.remove(sublistOpen);
    }
  }
})
