let canvas = document.querySelector("canvas");
let points = [{x: 0, y: window.innerHeight*0.92 - 128},{x: window.innerWidth - 6, y: window.innerHeight*0.92 - 128}];

canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight*0.92 - 64;

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth - 6;
    canvas.height = window.innerHeight*0.92 - 64;
});

//draw initial points
let context = canvas.getContext("2d");
context.beginPath();
context.moveTo(points[0].x, points[0].y);
context.lineTo(points[1].x, points[1].y);
context.stroke();

const startToggle = () =>{
    let startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", ()=>{
        //start button was clicked
        //Update points
        for (let i=0; i<points.length-1; i++)
        {
            let a = points[i];
            let f = points[i+1];
            let dist = Math.sqrt((a.x - f.x) * (a.x - f.x) + (a.y - f.y) * (a.y - f.y));
            let b = { x: (a.x + (f.x - a.x) / 3), y: (a.y + (f.y - a.y) / 3)};
            let c = { x: (a.x + (f.x - a.x) / 3), y: (a.y + (f.y - a.y) / 3)};
            let d = { x: (a.x + 2 * (f.x - a.x) / 3), y: (a.y + 2 * (f.y - a.y) / 3)};
            let e = { x: (a.x + 2 * (f.x - a.x) / 3), y: (a.y + 2 * (f.y - a.y) / 3)};
            let dir = -1; //1 for N, 2 for S, 3 for E, 4 for W
			if (a.x == f.x)
			{
				if (a.x > (window.innerWidth/2)-3) //Extend to +x
				{
					c.x += (dist / 3);
					d.x += (dist / 3);
				}
				if (a.x <= (window.innerWidth/2)-3) //Extend to -x
				{
					c.x -= (dist / 3);
					d.x -= (dist / 3);
				}
			}
			else if (a.y == f.y)
			{
				if (a.y > window.innerHeight*0.92 - 128) //Extend to +y
				{
					c.y += (dist / 3);
					d.y += (dist / 3);
				}
				if (a.y <= window.innerHeight*0.92 - 128) //Extend to -y
				{
					c.y -= (dist / 3);
					d.y -= (dist / 3);
				}
			}
			else
			{
				console.log("error occured");
            }
            points.splice(i+1, 0, e);
            points.splice(i+1, 0, d);
            points.splice(i+1, 0, c);
            points.splice(i+1, 0, b);
            i+=4;
        }
        //Draw points
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (let i=1; i<points.length; i++)
        {
            context.lineTo(points[i].x, points[i].y);
        }
        context.stroke();
    });
}

const stopToggle = () =>{
    let stopButton = document.querySelector(".stop-button");
    stopButton.addEventListener("click", ()=>{
        //stop button was clicked
        //reset points
        points = [{x: 0, y: window.innerHeight*0.92 - 128}, {x: window.innerWidth - 6, y: window.innerHeight*0.92 - 128}];
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        context.lineTo(points[1].x, points[1].y);
        context.stroke();
    });
}

const startProgram = () => {
    startToggle();
    stopToggle();
}

startProgram();