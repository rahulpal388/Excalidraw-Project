import { IStyles } from "../components/MainComponent";


export function circle(startX: number, startY: number, radiusX: number, radiusY: number, ctx: CanvasRenderingContext2D,stroke:IStyles["stroke"],strokeWidth:IStyles["strokeWidth"],background:IStyles["background"]) {
    ctx.beginPath();
    ctx.lineWidth = strokeWidth
    background==="rgba(18,18,18,1)"?"":ctx.fillStyle=background
    ctx.strokeStyle = stroke
    ctx.ellipse(startX, startY, radiusX, radiusY, 0, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke();

}