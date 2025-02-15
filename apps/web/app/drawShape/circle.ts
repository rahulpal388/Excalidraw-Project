

export function circle(startX: number, startY: number, radiusX: number, radiusY: number, ctx: CanvasRenderingContext2D) {

    ctx.beginPath();
    ctx.ellipse(startX, startY, radiusX, radiusY, 0, 0, 2 * Math.PI)
    ctx.stroke();

}