var draw = (function() {

    //Get the height and width of the main we will use this set canvas to the full
    //size of the main element.
    var mWidth = document.querySelector('main').offsetWidth,
      mHeight = document.querySelector('main').offsetHeight,
  
      //Create the canvas
      canvas = document.createElement("canvas"),
  
      //Create the context
      ctx = canvas.getContext("2d"),
  
      //Create the initial bounding rectangle
      rect = canvas.getBoundingClientRect(),
  
      //current x,y position
      x=0,
      y=0,
  
      //starting x,y
      x1=0,
      y1=0,
  
      //ending x,y
      x2=0,
      y2=0,
  
      //Tracks the last x,y state
      lx = false,
      ly = false,
  
      //What shape are we drawing?
      shape='',

      scolor='',

      fcolor='',
  
      //Are we drawimg a path?
      isDrawing=false;
  
    return {
  
      //Set the x,y coords based on current event data
      setXY: function(evt) {
  
        //Track last x,y position before setting the current posiiton.
        lx=x;
        ly=y;
  
        //Set the current x,y position
        x = (evt.clientX - rect.left) - canvas.offsetLeft;
        y = (evt.clientY - rect.top) - canvas.offsetTop;
      },
  
      //Write the x,y coods to the target div
      writeXY: function() {
        document.getElementById('trackX').innerHTML = 'X: ' + x;
        document.getElementById('trackY').innerHTML = 'Y: ' + y;
      },

      setSColor: function() {
          scolor = this.value;
          console.log(scolor);
      },

      getSColor: function() {
          return scolor;
      },
  
      setFColor: function() {
        fcolor = this.value;
        console.log(fcolor);
      },

      getFColor: function() {
          return fcolor;
      },

      //Set the x1,y1
      setStart: function() {
        x1=x;
        y1=y;
      },
  
      //Set the x2,y2
      setEnd: function() {
        x2=x;
        y2=y;
      },
  
      //Sets the shape to be drawn
      setShape: function(shp) {
        shape = shp;
      },
  
      getShape: function() {
        return shape;
      },
  
      setIsDrawing: function(bool) {
        isDrawing = bool;
      },
  
      getIsDrawing: function() {
        return isDrawing;
      },
  
      //Draws the selected shape
      draw: function() {
        ctx.restore();
        if(shape==='rectangle')
        {
          this.drawRect();
        } else if( shape==='line' ) {
          this.drawLine();
        } else if( shape==='path' ) {
          this.drawPath();
        } else if( shape==='circle' ) {
          this.drawCircle();
        } else if( shape==='triangle' ) {     /* LAB: Can you figure out how to draw a triangle? */
            this.drawTriangle();    
        } else {
          alert('Please choose a shape');
        }
        ctx.save();
      },
  
      //Draw a circle
      drawCircle: function() {
  
        //ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
        ctx.strokeStyle = this.getSColor();
      
        ctx.lineWidth = 20;
      
        //ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
        ctx.fillStyle = this.getFColor();
  
        let a = (x1-x2)
        let b = (y1-y2)
        let radius = Math.sqrt( a*a + b*b );
  
        ctx.beginPath();
        ctx.arc(x1, y1, radius, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
      },
  
      //Draw a line
      drawLine: function() {
        //Start by using random fill colors.
        //ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
        ctx.strokeStyle = this.getSColor();
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      },
  
      //Draw a path
      drawPath: function() {
        //console.log({x1:x,y1:y,x2:x2,y2:y2});
        //Start by using random fill colors.
        //ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
        ctx.strokeStyle = this.getSColor();
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(x, y);
        ctx.stroke();
      },
  
      //Draw a rectangle
      drawRect: function() {
        //Start by using random fill colors.
        //ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
        ctx.fillStyle = this.getFColor();
        ctx.fillRect (x1,y1,(x2-x1),(y2-y1));
      },

      /* LAB: Can you figure out how to draw a triangle? */
      drawTriangle: function() {
        //Start by using random fill colors.
        //ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
        ctx.strokeStyle = this.getSColor();
        ctx.fillStyle = this.getFColor();
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(Math.random()*x1, Math.random()*y1);
        ctx.fill();
      },

      getCanvas: function(){
        return canvas;
      },
  
      //Initialize the object, this must be called before anything else
      init: function() {
        canvas.width = mWidth;
        canvas.height = mHeight;
        document.querySelector('main').appendChild(canvas);
        this.writeXY();   /* LAB: A value of 0 should load the the trackX and trackY elements on page render. */
        //document.querySelector("#favcolor").onchange = setColor;
      }
    };
  
  })();
  
  //Initialize draw
  draw.init();
  
  //Add a mousemove listener to the canvas
  //When the mouse reports a change of position use the event data to
  //set and report the x,y position on the mouse.
  draw.getCanvas().addEventListener('mousemove', function(evt) {
    draw.setXY(evt);
    draw.writeXY();
    if(draw.getShape()=='path' && draw.getIsDrawing()===true) {
      draw.draw();
    }
  }, false);
  
  //Add a mousedown listener to the canvas
  //Set the starting position
  draw.getCanvas().addEventListener('mousedown', function() {
    draw.setStart();
    draw.setIsDrawing(true);
  }, false);
  
  //Add a mouseup listener to the canvas
  //Set the end position and draw the rectangle
  draw.getCanvas().addEventListener('mouseup', function() {
    draw.setEnd();
    draw.draw();
    draw.setIsDrawing(false);
  }, false);
  
  // Vanilla JS version of code
  // document.getElementById('btnRect').addEventListener('click', function(){
  //     draw.setShape('rectangle');
  // }, false);
  $('#btnRect').on('click',function(){
    draw.setShape('rectangle');
  });

  // Vanilla JS version of code
  // document.getElementById('btnLine').addEventListener('click', function(){
  //     draw.setShape('line');
  // }, false);
  $('#btnLine').on('click',function(){
    draw.setShape('line');
  });


  // Vanilla JS version of code
  // document.getElementById('btnCircle').addEventListener('click', function(){
  //     draw.setShape('circle');
  // }, false);
  $('#btnCircle').on('click',function(){
    draw.setShape('circle');
  });
  
  /* LAB: Can you figure out how to draw a triangle? */
  // Vanilla JS version of code
  // document.getElementById('btnTriangle').addEventListener('click', function(){
  //     draw.setShape('triangle');
  // }, false);
  $('#btnTriangle').on('click',function(){
    draw.setShape('triangle');
  });
  
  // Vanilla JS version of code
  // document.getElementById('btnPath').addEventListener('click', function(){
  //     draw.setShape('path');
  // }, false);
  $('#btnPath').on('click',function(){
    draw.setShape('path');
  });


  //document.getElementById('favSColor').onchange = draw.setSColor;

  $('#favSColor').on('click',function(){
    draw.setSColor();
  });

  //document.getElementById('favFColor').onchange = draw.setFColor;

  $('#favFColor').on('click',function(){
    draw.setFColor();
  });