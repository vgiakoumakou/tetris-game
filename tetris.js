// Access the canvas element
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

// Scale canvas items 20 times
context.scale(20, 20);

const matrix = [
	[0, 0 , 0],	//3 rows for 'T' in order to determine easily the center of it and rotate it
	[1, 1, 1],
	[0, 1 , 0],
];

function draw() {

	context.fillStyle = '#000';
	context.fillRect(0, 0, canvas.width, canvas.height);

	drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				context.fillStyle = 'red';
				context.fillRect(x + offset.x,
								 y + offset.y, 
								 1, 1);
			}
		});
	});
}


let dropCounter = 0;
let dropInterval = 1000; //Drop the piece every 1s

let lastTime = 0;

function update(time = 0) {

	const deltaTime = time - lastTime;
	lastTime = time;

	dropCounter += deltaTime;
	if (dropCounter > dropInterval) {
		player.pos.y++;
		dropCounter = 0;
	}

	draw();
	requestAnimationFrame(update);
}

const player = {
	pos: {x:5, y: 5},
	matrix: matrix,
}

document.addEventListener('keydown', event => {

	// Arrow Left (piece moves left)
	if (event.keyCode === 37) {
		player.pos.x--;
	}
	// Arrow Right (piece moves right)
	else if (event.keyCode === 39) {
		player.pos.x++;
	}
	// Arrow Down (piece moves down manually)
	else if (event.keyCode === 40) {
		player.pos.y++;
		dropCounter = 0; //we don't want another immediate drop
	}

});


update();