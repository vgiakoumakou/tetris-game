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

function createMatrix(w, h) {
	const matrix = [];
	while (h--) { // while h is not 0
		matrix.push(new Array(w).fill(0));
	}
	return matrix;
}

function collide(arena, player) {
	const [m, o] = [player.matrix, player.pos];
	for (let y = 0; y < m.length; ++y) {
		for (let x = 0; x < m[y].length; ++x) {
			if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
				return true;
			}
		}
	}
	return false;
}

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

function merge(arena, player) {
	player.matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				arena[y + player.pos.y][x + player.pos.x] = value;
			}
		})
		
	})
}

function playerDrop() {
	player.pos.y++;
	if (collide(arena, player)) {
		player.pos.y--;
		merge(arena, player);
		player.pos.y = 0;
	}
	dropCounter = 0; //we don't want another immediate drop
}

let dropCounter = 0;
let dropInterval = 1000; //Drop the piece every 1s

let lastTime = 0;

function update(time = 0) {

	const deltaTime = time - lastTime;
	lastTime = time;

	dropCounter += deltaTime;
	if (dropCounter > dropInterval) {
		playerDrop();
	}

	draw();
	requestAnimationFrame(update);
}

const arena = createMatrix(12, 20);


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
		playerDrop();
	}

});


update();