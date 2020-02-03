// All the control points are saved in an array
var controlPoints =[];

// This function is used to create the circles that represent the control points
function createCircle(x,y,s) {
    ctx.beginPath();
    ctx.arc(x, y, s, 0, Math.PI * 2, true);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
}

// setting up the canvas
var canvas = document.getElementById("canvasID");
canvas.width=window.innerWidth;
if (window.innerHeight > window.innerWidth){
    canvas.height=window.innerHeight*.8;
}else{
    canvas.height=window.innerHeight*.85;
}


var ctx =canvas.getContext("2d");

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  controlPoints =[];
}

// Event listener set up to add a control point on click
var mouse={x:undefined, y:undefined};

window.addEventListener("mousedown",function (event) {
    //Check Whether
    if (event.clientY<canvas.height){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mouse.x=event.clientX;
        mouse.y=event.clientY;

        //every click saves the coordinates into the control points array

        controlPoints.push({"x":mouse.x,"y":mouse.y});
        ctx.beginPath();
        ctx.moveTo(controlPoints[0].x, controlPoints[0].y);

        //This is the connect the control points with a small black line sequencially
        for(var i=1;i<controlPoints.length;i++) {
            ctx.lineTo(controlPoints[i].x, controlPoints[i].y);
            ctx.strokeStyle = "#000000";
            ctx.stroke();
        }

        //This is for representing each control point with small circles
        for(var i=0;i<controlPoints.length;i++){
            createCircle(controlPoints[i].x,controlPoints[i].y,7);
        }

        //This is where we are drawing the Bezier curve
        var drawxCoordinate,drawyCoordinate;
        for (t=0;t<=1;t=t+0.0001) {
            [drawxCoordinate, drawyCoordinate] = bezierCurve(t);
            ctx.fillRect(drawxCoordinate,drawyCoordinate,5,5);
        }}
    }
    );

//Calculating the factorial
function factorial(x) {
    if(x==0) {return 1;}
    return x * factorial(x-1);
}

//Calculating the Binomial Coefficient
function combination(n,i){
    return (factorial(n)/(factorial(i)*factorial(n-i)));
}

//This is where the actual magic happen, the bezier curve is calculated with this
function bezierCurve(t) {
    var xCoordinate=0;
    var yCoordinate =0;
    var n=controlPoints.length-1;
    for(i=0;i<=n;i++){
        xCoordinate = xCoordinate + (combination(n,i)* Math.pow((1-t),(n-i))*Math.pow(t,i)*controlPoints[i].x);
        yCoordinate = yCoordinate + (combination(n,i)* Math.pow((1-t),(n-i))*Math.pow(t,i)*controlPoints[i].y);
    }
    return [xCoordinate,yCoordinate];
}

function randomize(numberOfControlPoints) {
    clearCanvas();
    for(i=0;i<numberOfControlPoints;i++){
       controlPoints.push({"x":(Math.random () * (window.innerWidth)),"y":(Math.random () * (window.innerHeight*.8))});
    }
    ctx.beginPath();
    ctx.moveTo(controlPoints[0].x, controlPoints[0].y);
    for(var l=1;l<controlPoints.length;l++) {

        ctx.lineTo(controlPoints[l].x, controlPoints[l].y);
        ctx.strokeStyle = "#000000";
        ctx.stroke();
    }
    for(var le=0;le<controlPoints.length;le++){
        createCircle(controlPoints[le].x,controlPoints[le].y,7)
    }
    var xv,yv;
    for (t=0;t<=1;t=t+0.0001) {
        [xv, yv] = bezierCurve(t);
        ctx.fillRect(xv,yv,5,5);
    }
}

randomize(10);
