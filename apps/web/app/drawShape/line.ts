

export function line(startX: number, startY: number, endX: number, endY: number, Strokecolor: string, ctx: CanvasRenderingContext2D) {

    ctx.strokeStyle = Strokecolor
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke();
    ctx.closePath();
}