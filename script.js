const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const clearButton = document.getElementById("clear");
const eraserButton = document.getElementById("eraser");
const brushSizeInput = document.getElementById("brushSize");
const eraserSizeInput = document.getElementById("eraserSize");

canvas.width = 800;
canvas.height = 600;

let isDrawing = false;
let isErasing = false;
let lastX = 0;
let lastY = 0;
let brushColor = "#000000";
let brushSize = 5;
let eraserSize = 10;

function startDrawing(e) {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
}

function stopDrawing() {
    isDrawing = false;
}

function draw(e) {
    if (!isDrawing) return;

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = isErasing ? eraserSize : brushSize;
    ctx.strokeStyle = isErasing ? "#fff" : brushColor;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    lastX = e.offsetX;
    lastY = e.offsetY;
}

function activateEraser() {
    isErasing = !isErasing;
    if (isErasing) {
        eraserButton.style.backgroundColor = "#ddd";
    } else {
        eraserButton.style.backgroundColor = "#f4f4f4";
    }
}

function changeBrushColor(e) {
    brushColor = e.target.value;
}

function changeBrushSize(e) {
    brushSize = e.target.value;
}

function changeEraserSize(e) {
    eraserSize = e.target.value;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);

eraserButton.addEventListener("click", activateEraser);
colorPicker.addEventListener("input", changeBrushColor);
brushSizeInput.addEventListener("input", changeBrushSize);
eraserSizeInput.addEventListener("input", changeEraserSize);
clearButton.addEventListener("click", clearCanvas);
