document.addEventListener('DOMContentLoaded', function (e) {

  const canvas = document.getElementById('paint');
  const ctx = canvas.getContext('2d');
  const toolbarWidth = document.querySelector('.toolbar').offsetWidth;
  canvas.width = (window.innerWidth - toolbarWidth);
  canvas.height = 500;

  ctx.lineCap = 'round';

  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;

  let drawing = false;
  let getStroke = null;


  const stopDrawing = () => {
    drawing = false;
  }
  const getPosition = e => {
    let pos = {
      x: e.offsetX,
      y: e.offsetY
    };
    return pos;
  }


  canvas.addEventListener('mousedown', event => {
    drawing = true;
    let pos = getPosition(event);
    [startX, startY] = [pos.x, pos.y];
  });

  canvas.addEventListener('mouseup', event => {
    let pos = getPosition(event);
    [endX, endY] = [pos.x, pos.y];

    getTool();
    drawing = false;

  });


  const getCoords = () => {
    let coords = {
      x: Math.min(endX, startX),
      y: Math.min(endY, startY),
      w: Math.abs(endX - startX),
      h: Math.abs(endY - startY),
    }
    return coords;
  }

  const draw = event => {
    let pos = getPosition(event);
    //mousemove coords -> do usuniecia 
    // const coors = document.getElementById("coords");
    // coors.innerHTML = `(X, Y) : ${pos.x} , ${pos.y}`;

    const pencil = document.getElementById('pencil');
    if (drawing && pencil.checked === true) {
      ctx.lineWidth = 3;
      const newX = event.offsetX;
      const newY = event.offsetY;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(newX, newY);
      ctx.stroke();
      [startX, startY] = [newX, newY];
    }
  }

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseout', stopDrawing);

  function drawLine() {
    if (drawing) {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  }

  function drawCricle() {
    getStroke = filler();
    let coords = getCoords();
    const halfWidth = coords.w / 2;
    const halfHeight = coords.h / 2
    const radius = Math.ceil(Math.sqrt(Math.pow(halfWidth, 2) + Math.pow(halfHeight, 2)));
    const centerX = coords.x + halfWidth;
    const centerY = coords.y + halfHeight;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

    if (getStroke) {
      ctx.stroke();
    } else {
      ctx.fill();
    }
  }

  let draws = [];

  function drawRect() {
    getStroke = filler();
    let coords = getCoords();

    if (drawing) {
      ctx.lineWidth = 1;

      if (!coords.w || !coords.h) {
        return;
      }

      if (getStroke) {
        ctx.strokeRect(coords.x, coords.y, coords.w, coords.h);
        draws.push({
          name: 'strokeRect',
          color: ctx.strokeStyle,
          ...coords
        });
      } else {
        ctx.fillRect(coords.x, coords.y, coords.w, coords.h);
        draws.push({
          name: 'fillRect',
          color: ctx.fillStyle,
          ...coords
        });
      }
    }
  };


  function replayActions(draws, clearCanvas) {
    if (clearCanvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    draws.forEach(function (draw) {
      if (draw.name === 'strokeRect') {
        ctx.strokeStyle = draw.color;
        ctx.strokeRect(draw.x, draw.y, draw.w, draw.h);
      }
      if (draw.name === 'fillRect') {
        ctx.fillStyle = draw.color;
        ctx.fillRect(draw.x, draw.y, draw.w, draw.h);
      }
    });
  }

  //UNDO ACTION
  const undoButton = document.querySelector('.button--undo');
  undoButton.addEventListener('click', event => {
    draws.pop();
    replayActions(draws, true);
  });


  //COLOR PICKER 
  const colors = document.getElementsByClassName('colors')[0];
  const colorPicker = document.querySelector('.color-picker');

  colors.addEventListener('click', event => {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;

    if (colorPicker === event.target) {
      colorPicker.addEventListener('change', event => {
        ctx.strokeStyle = event.target.value;
        ctx.fillStyle = event.target.value;
      });
    }
  });

  //FILL/STORKE PICKER
  function filler() {
    let stroke = document.getElementById('background--nofill');
    stroke = stroke.checked;
    return stroke ? true : false;
  }

  //TOOL PICKER
  function getTool() {
    const line = document.getElementById('line');
    const circle = document.getElementById('circle');
    const rect = document.getElementById('rect');

    if (line.checked === true) {
      drawLine();
      return;
    }

    if (circle.checked === true) {
      drawCricle();
      return;
    }

    if (rect.checked === true) {
      drawRect();
      return;
    }
  }
});