

export function line(startX: number, startY: number, endX: number, endY: number, Strokecolor: string, ctx: CanvasRenderingContext2D) {

    ctx.strokeStyle = Strokecolor
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke();
    ctx.closePath();



}


export function arrow(startX: number, startY: number, endX: number, endY: number, Strokecolor: string, strokeWidth: number, ctx: CanvasRenderingContext2D) {
    const angle = Math.atan2((endY - startY), (endX - startX))

    const a = (angle * 180) / Math.PI

    const x = endX + (25 * (Math.cos((-160 + a) * (Math.PI / 180))))
    const y = endY + (25 * (Math.sin((-160 + a) * (Math.PI / 180))))
    const x2 = endX + (25 * (Math.cos((160 + a) * (Math.PI / 180))))
    const y2 = endY + (25 * (Math.sin((160 + a) * (Math.PI / 180))))
    ctx.strokeStyle = Strokecolor
    ctx.lineWidth = strokeWidth
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.lineTo(x, y)
    ctx.moveTo(endX, endY)
    ctx.lineTo(x2, y2)
    ctx.stroke();
    ctx.closePath();

}