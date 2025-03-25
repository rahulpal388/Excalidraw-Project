import { IStyles } from "../components/MainComponent"
import { rectangle } from "./rectangle"



// export function dimond(startX: number, startY: number, distance: number, strokeStyle: string, ctx: CanvasRenderingContext2D,) {
//     ctx.strokeStyle = strokeStyle
//     ctx.beginPath()
//     ctx.moveTo(startX, startY)
//     ctx.lineTo(startX + (distance / 2), startY + (distance / 2))
//     ctx.lineTo(startX, startY + distance)
//     ctx.lineTo(startX - (distance / 2), startY + (distance / 2))
//     ctx.lineTo(startX, startY)
//     ctx.stroke()
//     ctx.closePath()

// }


export function dimond(startX: number, startY: number, width: number, height: number, stroke: IStyles['stroke'], strokeWidth: IStyles["strokeWidth"], background: IStyles["background"], ctx: CanvasRenderingContext2D) {

    ctx.strokeStyle = stroke
    ctx.lineWidth = strokeWidth
    ctx.fillStyle = background
    ctx.lineCap = "round"
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX + width, startY + height)
    ctx.lineTo(startX, startY + height * 2)
    ctx.lineTo(startX - width, startY + height)
    ctx.lineTo(startX, startY)
    ctx.stroke()
    ctx.closePath()




}