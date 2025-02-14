
import axios from "axios";
import { HTTP_BACKEND, Token } from "../../config";
import { IAction, IShapeType } from "../components/MainCanva";
import { drawShape } from "./drawShape";
import { getExistingStrokes, Shapes } from "./getShapes";
import { RefObject } from "react";








export async function initDraw(roomId: string, socket: WebSocket, canvas: HTMLCanvasElement, shapeType: IShapeType) {

    let existingShapes: Shapes[] = await getExistingStrokes("chats")

    const ctx = canvas.getContext("2d");

    if (!ctx) return

    socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        const message = JSON.parse(data.stroke)
        if (data.type == "CHAT") {
            const shape = message
            existingShapes.push(shape);
            clearCanvas(existingShapes, ctx, canvas);
        }
    }

    clearCanvas(existingShapes, ctx, canvas);
    drawShape({ canvas, ctx, shapeType, existingShapes, socket, roomId })

}


export function clearCanvas(existingShapes: Shapes[], ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgb(18,18,18)"
    ctx.strokeStyle = "rgba(225,225,255)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    existingShapes.map(shape => {
        if (shape.type === "rect" && shape.display) {
            ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height)
        }
        if (shape.type === "circle" && shape.display) {
            ctx.beginPath();
            ctx.arc(shape.startX, shape.startY, shape.radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
        if (shape.type === "line" && shape.display) {
            ctx.beginPath();
            ctx.moveTo(shape.startX, shape.startY)
            ctx.lineTo(shape.endX, shape.endY)
            ctx.stroke();
            ctx.closePath()
        }
    })

}





