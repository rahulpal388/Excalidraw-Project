import { circle } from "../drawShape/circle"
import { line } from "../drawShape/line"
import { rectangle } from "../drawShape/rectangle"
import { Shapes } from "./getShapes"
import { dimond } from "../drawShape/dimond"

export function clearCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, ctxType: "static" | "dymanic") {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = ctxType === "static" ? "rgba(18,18,18,1)" : "rgba(255, 255, 255, 0)"
    // ctx.strokeStyle = "rgb(211, 211, 211)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)


}
