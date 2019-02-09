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


  const draw = event => {
    let pos = getPosition(event);
    //mousemove coords -> do usuniecia 
    const coors = document.getElementById("coords");
    coors.innerHTML = `(X, Y) : ${pos.x} , ${pos.y}`;

    const pencil = document.getElementById('pencil');
    if (drawing && pencil.checked === true) {
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

  function drawRect() {
    if (drawing) {
      ctx.lineWidth = 1;
      let x = Math.min(endX, startX);
      let y = Math.min(endY, startY);
      let w = Math.abs(endX - startX);
      let h = Math.abs(endY - startY);

      if (!w || !h) {
        return;
      }
      ctx.strokeRect(x, y, w, h);
    }
  };


  //COLOR PICKER 
  const colors = document.getElementsByClassName('colors')[0];
  const colorPicker = document.querySelector('.color-picker');

  colors.addEventListener('click', event => {
    ctx.strokeStyle = event.target.value;

    if (colorPicker === event.target) {
      colorPicker.addEventListener('change', event => {
        ctx.strokeStyle = event.target.value;
      });
    }
  });

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