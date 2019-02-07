var button = document.querySelector('.hamburger__button');
var menu = document.querySelector('.menu__wrapper');
var menuVisible = 'menu__wrapper--visible';

button.addEventListener('click', () => { 
  //sprobowac z this
  button.classList.toggle('hamburger__button--close');
  menu.classList.toggle(menuVisible);
});

var listItems = document.querySelectorAll('.nav__list__item');
listItems = [...listItems];
var firstItem = listItems[0];
var sublist = document.querySelector('.nav__sublist')

firstItem.addEventListener('click', () => { 
  firstItem.classList.toggle('nav__list__item--active');
  sublist.classList.toggle('nav__sublist--open');
});
