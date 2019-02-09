document.addEventListener('DOMContentLoaded', function(e) {

  const canvas = document.getElementById('paint');
  const ctx = canvas.getContext('2d');
  const toolbarWidth = document.querySelector('.toolbar').offsetWidth;
  canvas.width = (window.innerWidth - toolbarWidth) ;
  canvas.height = 500;
  
  ctx.lineCap = 'round';

	let startX = 0;
	let startY = 0;
	let endX = 0;
	let endY = 0;

let drawing = false;

const stopDrawing = () => { drawing = false;  }
const getPosition = e => {
    // console.log('start');
   	let pos = {x: e.offsetX, y: e.offsetY}; 
		return pos;
}

const pencil = document.getElementById('pencil');
const line = document.getElementById('line');

	
canvas.addEventListener( 'mousedown', event => {
drawing = true;
	let pos = getPosition(event);
	startX = pos.x;
	startY = pos.y
console.log("start (" + startX + ", " + startY + ")");
});
	
canvas.addEventListener( 'mouseup', event => { 
		let pos = getPosition(event);
    endX = pos.x;
    endY = pos.y;
	
	console.log("end (" + endX + ", " + endY + ")");
	drawing = false;
});	
	
const draw = event => {
	let pos = getPosition(event);
	const coors = document.getElementById("coords");
   coors.innerHTML = `(X, Y) : ${pos.x} , ${pos.y}`;
	
  if ( drawing && pencil.checked === true) {
				const newX = event.offsetX;
        const newY = event.offsetY;
        ctx.beginPath();
        ctx.moveTo( startX, startY );
        ctx.lineTo( newX, newY );
        ctx.stroke();
        [startX, startY] = [newX, newY];	
  }
	
	if (drawing && line.checked === true) {
		console.log('tu jestem');
			drawLine();
	}
}

canvas.addEventListener( 'mousemove', draw );
canvas.addEventListener( 'mouseout', stopDrawing );

function drawLine () {
			let x = startX;
			let y = startY;
			
		console.log(`x: ${x}, y: ${y}`);
      ctx.beginPath();
      ctx.moveTo( startX, startY );
      ctx.lineTo( endX, endY );
	console.log(`end : x: ${endX}, y: ${endY}`);
      ctx.stroke();
	
}


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
  
  
  });