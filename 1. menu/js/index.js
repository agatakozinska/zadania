const button = document.querySelector('.hamburger__button');
const buttonClose = 'hamburger__button--close';
const menu = document.querySelector('.menu__wrapper');
const menuVisible = 'menu__wrapper--visible';
let listItems = document.querySelectorAll('.nav__list__item');
listItems = [...listItems];
const firstItem = listItems[0];
const sublist = document.querySelector('.nav__sublist');
const sublistOpen = 'nav__sublist--open';

let isMenuOpen = false;

button.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;

  button.classList.toggle(buttonClose);
  button.setAttribute('aria-expanded', String(isMenuOpen));
  menu.classList.toggle(menuVisible);

  if (!(button.classList.contains(buttonClose))) {
    sublist.classList.remove(sublistOpen);
    firstItem.classList.remove('nav__list__item--active');
  }
});

document.addEventListener('click', event => {
  const background = document.querySelector('.header')
  const navBar = document.querySelector('.header__menu')

  if (event.target === background || event.target === navBar) {
    button.classList.remove(buttonClose);
    menu.classList.remove(menuVisible);
  }
});

firstItem.addEventListener('click', event => {
  event.preventDefault();
  firstItem.classList.toggle('nav__list__item--active');
  sublist.classList.toggle(sublistOpen);
});


window.addEventListener('resize', () => {
  if (window.screen.innerWidth >= 1200) {

    if (sublist.classList.contains(sublistOpen)) {
      button.classList.remove(buttonClose);
      menu.classList.remove(menuVisible);
      firstItem.classList.remove('nav__list__item--active');
      sublist.classList.remove(sublistOpen);
    }
  }
});
