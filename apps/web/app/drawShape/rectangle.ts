

export function rectangle(startX: number, startY: number, width: number, height: number, strokeStyle: string, ctx: CanvasRenderingContext2D,) {

    ctx.strokeStyle = strokeStyle
    ctx.strokeRect(startX, startY, width, height)

}