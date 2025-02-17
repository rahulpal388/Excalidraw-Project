

export function circle(startX: number, startY: number, radiusX: number, radiusY: number, strokeStyle: string, ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = strokeStyle
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle
    ctx.ellipse(startX, startY, radiusX, radiusY, 0, 0, 2 * Math.PI)
    ctx.stroke();

}