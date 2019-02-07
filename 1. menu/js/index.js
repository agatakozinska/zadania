var button = document.querySelector('.hamburger__button');
var nav = document.querySelector('.nav');
var navVisible = 'nav--visible';

button.addEventListener('click', () => { 
  //sprobowac z this
  button.classList.toggle('hamburger__button--close');
  nav.classList.toggle(navVisible);
});