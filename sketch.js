let piPP;
let piDDA;
let piBH;
let partes,angulo,step,xp,yp,pPP,pDDA,pBH;
let diametro = 200;

let i;
let pfPP,pfDDA,pfBH;

let pintarCirculo=0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	console.log(windowWidth)
	input = createInput();
	input.position(windowWidth/2-105, 250);

	button = createButton('Dividir');
	button.position(input.x + input.width, 250);
	button.mousePressed(greet);

	titulo = createElement('h2', 'Dividir circulos');
	titulo.position(windowWidth/2-80, 190);
	etiquetaPP = createElement('h3', 'Punto Pendiente');
	etiquetaPP.position(windowWidth/4-55, 700);
	etiquetaDDA = createElement('h3', 'DDA');
	etiquetaDDA.position(windowWidth/4*2-15, 700);
	etiquetaBH = createElement('h3', 'Bresenham');
	etiquetaBH.position(windowWidth/4*3-40, 700);
	circle(windowWidth/4, 600,diametro);
	circle(windowWidth/4*2, 600,diametro);
	circle(windowWidth/4*3, 600,diametro);

	pPP = {x:0,y:0};
	pDDA = {x:0,y:0};
	pBH = {x:0,y:0};

	frameRate(60);
}

function draw() {
	

	if(angulo < radians(360) && partes > 1){
		piPP = {x: windowWidth/4, y:600};
		piDDA = {x: (windowWidth/4)*2, y:600};
		piBH = {x: (windowWidth/4)*3, y:600};
		if (pintarCirculo<1) {
			circle(piPP.x, piPP.y,diametro);
			circle(piDDA.x, piDDA.y,diametro);
			circle(piBH.x, piBH.y,diametro);
		}
		pintarCirculo++;
		xp = Math.floor(diametro/2 * cos(angulo));
		yp = Math.floor(diametro/2 * sin(angulo));
		pfPP = {x:Math.floor(piPP.x+xp),y:Math.floor(piPP.y+yp)};
		pfDDA = {x:Math.floor(piDDA.x+xp),y:Math.floor(piDDA.y+yp)};
		pfBH = {x:Math.floor(piBH.x+xp),y:Math.floor(piBH.y+yp)};

		ecuaDDA(piDDA,pfDDA);
		ecuaDDA(pfDDA,piDDA);
		ecuaPP(piPP,pfPP);
		ecuaBH(piBH,pfBH);
		line(piPP.x,piPP.y,piPP.x+xp,piPP.y+yp);

		angulo+= step;

	}
	
}

function ecuaPP(p1,p2) {
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;

	let x;
    let m, b, y;
    
    m = dy / dx;
    b = p1.y - m * p1.x;

    x = p1.x;
    y = p1.y;
     
    while (x < (p2.x + 1)) {
        
        point(x, p1.y)
        x++;
        y = m * x + b; 
    }
}

function ecuaDDA(p1, p2) {
	var p,xi,yi,k;
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;

	point(p1.x, p1.y)

	let y=p1.y,x=p1.x;
	
	if (dx > dy || dy == 0) {
		p = dx;
	} else {
		p = dy;
	}

	xi = dx / p;
    yi = dy / p;

	for(k = 0;k < p;k++){
		x += xi;
		y += yi;
		point(x, y);
	}
}


function ecuaBH(p1, p2){
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;

	point(p1.x, p1.y)

	var m,b;
	let y,x,xEnd,stepx,stepy,p,incE,incNE;
	console.log(dx+"&"+dy)

	  if (dy < 0) { 
	    dy = -dy;
	    stepy = -1; 
	  } 
	  else{
	  	stepy = 1;
	  }  
	  if (dx < 0) {  
	    dx = -dx; 
	    stepx = -1; 
	  } 
	  else{
	  	stepx = 1;
	  } 
	    
	  x = p1.x;
	  y = p1.y;
	  point(p1.x, y)


	  if(dx>dy){
	    p = 2*dy - dx;
	    incE = 2*dy;
	    incNE = 2*(dy-dx);
	    while (x != p2.x){
	      x += stepx;
	      if (p < 0){
	        p += incE;
	      }
	      else {
	        y += stepy;
	        p += incNE;
	      }
	      point(x,y)
	    }
	  }else{
	    p = 2*dx - dy;
	    incE = 2*dx;
	    incNE = 2*(dx-dy);
	    while (y != p2.y){
	      y += stepy;
	      if (p < 0){
	        p += incE;
	      }
	      else {
	        x += stepx;
	        p += incNE;
	      }
	      point(x,y);
	    }
	  }
	}


function greet() {
	background('white');
	pintarCirculo =0;
	piPP = {x: windowWidth/4, y:400};
	piDDA = {x: (windowWidth/4)*2, y:400};
	piBH = {x: (windowWidth/4)*3, y:400};
	partes = input.value();
	step = radians(360/partes);
	angulo= 0;
}
	
