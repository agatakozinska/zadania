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

    getTool(); //to do!
    drawRect();

    // if (line.checked === true) {
    //     drawLine();
    // }
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
}

canvas.addEventListener( 'mousemove', draw );
canvas.addEventListener( 'mouseout', stopDrawing );

function drawLine () {
  console.log('elo');
  ctx.beginPath();
  ctx.moveTo( startX, startY );
  ctx.lineTo( endX, endY );
  ctx.stroke();
}

function drawRect() {
  let	x = Math.min(endX,  startX);
  let	y = Math.min(endY,  startY);
  let	w = Math.abs(endX - startX);
  let	h = Math.abs(endY - startY);

  if (!w || !h) {
      return;
    }
    ctx.strokeRect(x, y, w, h);
  };


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
  
  // let tool = [];
    

  tools.forEach((el) => {
    el.addEventListener('change', getTool)
  });

  
 function getTool() {
    let value = event.target.value; // z tym hest problem -> event
      
    switch (value) {
      case 'pencil':
        // draw;
        console.log(value);
        break;
      case 'line':
        drawLine();
        break;
      case 'circle':
        stopDrawing;
        break;
      case 'rect':
        drawRect()
        break;
    }
  }
  
  

  
  
  });