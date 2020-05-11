let piPP = {x: 500, y:600};
let piDDA = {x: 900, y:600};
let piBH = {x: 1300, y:600};
let pfPP,x,y;
let partes,angulo,step,xp,yp,pDDA,pBH,xpp,ypp;
let radio = 200;

let i;


function setup() {
	createCanvas(windowWidth, windowHeight);
	input = createInput();
	input.position(windowWidth/2, 85);

	button = createButton('Dividir');
	button.position(input.x + input.width, 85);
	button.mousePressed(greet);

	greeting = createElement('h2', 'En cuantas partes?');
	greeting.position(windowWidth/2, 25);
	textAlign(CENTER);
	textSize(50);
	i=0;
	circle(piPP.x, piPP.y,radio);
	circle(piDDA.x, piDDA.y,radio);
	circle(piBH.x, piBH.y,radio);
}

function draw() {

	xp = floor(radio/2 * cos(angulo));//console.log("xp: "+xp)
	yp = floor(radio/2 * sin(angulo));//console.log("yp: "+yp)
	x=500+xp;
	y=600+yp;
	/*console.log("x: "+x);
	console.log("y: "+y);*/
	if(angulo<radians(360) && partes >=2){
		pfPP = {x:x,y:y};

		ecuaPP(piPP,pfPP);
		x=500;
		y=600;
		pfPP = {x:x,y:y};
		ecuaPP(piPP,pfPP);
		/*console.log("xp: "+xp)
		console.log("yp: "+yp)
		console.log("pfx: "+pfPP.x)
		console.log("pfy: "+pfPP.y)
		console.log("partes: "+ partes)*/
		console.log("ANGULO: "+angulo)
		console.log("---------------------------------------")
		
		/*line(500,600,500+xp,600+yp);
		line(900,600,900+xp,600+yp);
		line(1300,600,1300+xp,600+yp);*/
		
		angulo+= step;
		xp = 0;
		yp = 0;
		x=0;
		y=0;

	}
	
}

function ecuaPP(p1,p2) {
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;
	console.log("p1X: "+p1.x)
	console.log("p1Y: "+p1.y)
	console.log("p2X: "+p2.x)
	console.log("p2Y: "+p2.y)
	console.log("dx: "+dx+" YYYYY"+"  dy: "+dy)
	point(p1.x, p1.y)
	console.log("POINT")
	var m,b;
	let y,x;

	if (dx >dy || dy ==0) {
		m = dy / dx;
		b = p1.y - m * p1.x
		console.log("m: "+m+" & "+"b: "+b)
		if (dx < 0) {
			dx = -1;
		}else{
			dx = 1
		}
		console.log("dx: "+dx)
		while(p1.x !=  p2.x){
			
			p1.x += dx;
			y = m * p1.x + b;
			point(p1.x, y)
		}
	}else if (dy !=0 ) {
		m= dx / dy;
		b = p1.x - m*p1.y;
		console.log("ELSEIF"+"  m: "+m+" & "+"b: "+b)
		if (p1.y < 0) {
			dy = -1;
		}else{
			dy = 1;
		}
		while(p1.y !=  p2.y){
		p1.y += dy;
		x = m * p1.y + b;
		point(x, p1.y)
		}
	}
	console.log("FIIIIIIIN")
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

	/* determinar que punto usar para empezar, cual para terminar */
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
	circle(500, 600,radio);
	circle(900, 600,radio);
	circle(1300, 600,radio);
	partes = input.value();
	step = radians(360/partes);
	angulo= 0;
}
	
