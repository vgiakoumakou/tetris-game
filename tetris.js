// Access the canvas element
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

// Scale canvas items 20 times
context.scale(20, 20);

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

const matrix = [
	[0, 0 , 0],	//3 rows for 'T' in order to determine easily the center of it and rotate it
	[1, 1, 1],
	[0, 1 , 0],
];

matrix.forEach((row, y) => {
	row.forEach((value, x) => {
		if (value !== 0) {
			context.fillStyle = 'red';
			context.fillRect(x, y, 1, 1);
		}
	});
});