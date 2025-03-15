import { Shapes } from "../drawCanvas/getShapes"



export function inserText(ctx: CanvasRenderingContext2D, text: string, top: number, left: number) {
    ctx.font = "30px Poppins Arial";
    ctx.fillStyle = "white"
    ctx.fillText(text, left, top + 5)
}