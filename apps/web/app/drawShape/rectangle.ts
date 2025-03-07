

export function rectangle(startX: number, startY: number, width: number, height: number, strokeStyle: string, ctx: CanvasRenderingContext2D, type: "rounded" | "default") {

    ctx.strokeStyle = strokeStyle
    ctx.beginPath();
    type === "rounded" ? ctx.roundRect(startX, startY, width, height, [10]) : ctx.strokeRect(startX, startY, width, height)
    ctx.stroke();

}