


export function dimond(startX: number, startY: number, distance: number, strokeStyle: string, ctx: CanvasRenderingContext2D,) {
    ctx.strokeStyle = strokeStyle
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX + (distance / 2), startY + (distance / 2))
    ctx.lineTo(startX, startY + distance)
    ctx.lineTo(startX - (distance / 2), startY + (distance / 2))
    ctx.lineTo(startX, startY)
    ctx.stroke()
    ctx.closePath()
}