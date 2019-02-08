document.addEventListener('DOMContentLoaded', function(e) {

  const canvas = document.getElementById('paint');
  const ctx = canvas.getContext('2d');
  const toolbarWidth = document.querySelector('.toolbar').offsetWidth;
  canvas.width = (window.innerWidth - toolbarWidth) ;
  canvas.height = 500;
  
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  
  let isMouseDown = false;
  
  const stopDrawing = () => { isMouseDown = false; console.log('stop'); }
  const startDrawing = e => {
      isMouseDown = true; 
      console.log('start');
     [x, y] = [e.offsetX, e.offsetY];  

     const coors = document.getElementById("coords");
     coors.innerHTML = `(X, Y) : ${x} , ${y}`;
  }
  
  const pencil = document.getElementById('pencil');
  const line = document.getElementById('line');
  
  const draw = event => {

    if ( isMouseDown && pencil.checked === true) {
        const newX = event.offsetX;
        const newY = event.offsetY;
        ctx.beginPath();
        ctx.moveTo( x, y );
        ctx.lineTo( newX, newY );
        ctx.stroke();
        [x, y] = [newX, newY];
    }
  
  }
  
  canvas.addEventListener( 'mouseup', stopDrawing );
  canvas.addEventListener( 'mouseout', stopDrawing );
  canvas.addEventListener( 'mousedown', startDrawing );
  canvas.addEventListener( 'mousemove', draw );
  
  
  
  
  //COLOR PICKER 
  const colors = document.getElementsByClassName('colors')[0];
  const colorPicker = document.querySelector( '.color-picker');
  
  colors.addEventListener( 'click', event => {
    ctx.strokeStyle = event.target.value; 

    if (colorPicker === event.target) {
        colorPicker.addEventListener( 'change', event => {
        ctx.strokeStyle = event.target.value; 
      });
    }
  });
  
  
  //TOOL PICKER
  let tools = document.querySelectorAll('input[type=radio][name="tool"]');
  tools = [...tools];
  
  let tool = [];
    
  let getTool = () => {
    let value = event.target.value; 
      
    switch (value) {
      case 'pencil':
        draw;
        console.log(value);
        break;
      case 'line':
        stopDrawing;
        break;
      case 'circle':
        stopDrawing;
        break;
      case 'rect':
        stopDrawing;
        break;
    }
  }
  
  tools.forEach((el) => {
    el.addEventListener('change', getTool)
  });
  

  

  
  
  // tools.forEach((el) => {
    
  //   el.addEventListener('change', event => {
  //     let value = event.target.value; 
      
  //     switch (value) {
  //       case 'pencil':
  //         tool.push(value);
          
  //         break;
  //       case 'line':
  //         return value;
  //       case 'circle':
  //         return 'halo';
  //       case 'rect':
  //         stopDrawing;
  //         break;
  //     }
  //   });
  // });
  
  
  
  
  
  
  
  });