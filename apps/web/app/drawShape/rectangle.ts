import { IStyles } from "../components/MainComponent";


export function rectangle(startX: number, startY: number, width: number, height: number, ctx: CanvasRenderingContext2D, stroke: IStyles['stroke'],strokeWidth:IStyles["strokeWidth"],background:IStyles["background"] ,type: "rounded" | "default") {
    ctx.strokeStyle = stroke
    ctx.beginPath();
    ctx.lineWidth = strokeWidth
    background==="rgba(18,18,18,1)" ?"":ctx.fillStyle=background
    type === "rounded" ? ctx.roundRect(startX, startY, width, height, [10]) : ctx.strokeRect(startX, startY, width, height)
    ctx.fill()
    ctx.stroke();

}