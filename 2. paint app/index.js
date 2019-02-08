document.addEventListener('DOMContentLoaded', function(e) {

  const canvas = document.getElementById('paint');
  const ctx = canvas.getContext('2d');
  const toolbarWidth = document.querySelector('.toolbar').offsetWidth;
  canvas.width = (window.innerWidth - toolbarWidth) ;
  canvas.height = 500;
 
  
  
  
  });