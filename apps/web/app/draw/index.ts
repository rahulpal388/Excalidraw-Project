import { RefObject } from "react";
import axios from "axios";
import { HTTP_BACKEND, Token } from "../../config";
import { Joan, Romanesco } from "next/font/google";
import { json } from "stream/consumers";
import { IShapeType } from "../components/MainCanva";


type Shapes = {
    type: "rect",
    startX: number,
    startY: number;
    height: number;
    width: number
} | {
    type: "circle",
    startX: number,
    startY: number,
    radius: number
}

export async function initDraw(current: HTMLCanvasElement, roomId: string, socket: WebSocket, canvas: HTMLCanvasElement, shapeType: IShapeType) {
    // store all the shapes and its dimension

    const exsistingShapes: Shapes[] = await getExistingStrokes("chats");
    // console.log(exsistingShapes)
    const ctx = canvas.getContext("2d");

    if (!ctx) return

    socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        const message = JSON.parse(data.stroke)
        if (data.type == "CHAT") {
            const shape = message
            exsistingShapes.push(shape);
            clearCanvas(exsistingShapes, ctx, canvas);
        }
    }

    // render the data come from http Server
    clearCanvas(exsistingShapes, ctx, canvas);

    let clicked = false;
    let startX = 0;
    let startY = 0;
    canvas.addEventListener("mousedown", (e) => {
        console.log(shapeType.type)
        clicked = true
        startX = e.clientX;
        startY = e.clientY
        // console.log(e.currentTarget)

    })
    canvas.addEventListener("click", (e) => {
        // console.log(e.)
    })
    canvas.addEventListener("mousemove", (e) => {
        if (shapeType.type === "cursor") return;
        if (clicked) {
            if (shapeType.type === "rect") {
                const height = e.clientY - startY;
                const width = e.clientX - startX
                clearCanvas(exsistingShapes, ctx, canvas)
                ctx.strokeStyle = "rgba(225,225,225)"
                ctx.strokeRect(startX, startY, width, height)
            }
            if (shapeType.type === "circle") {
                const radius = Math.abs(e.clientX - startX);
                clearCanvas(exsistingShapes, ctx, canvas)
                ctx.beginPath();
                ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }

    })
    canvas.addEventListener("mouseup", (e) => {
        clicked = false
        if (shapeType.type === "cursor") return;
        const height = e.clientY - startY;
        const width = e.clientX - startX;
        const radius = Math.abs(e.clientX - startX);
        if (shapeType.type === "rect") {
            exsistingShapes.push({
                type: "rect",
                startX,
                startY,
                height,
                width
            })
        }
        if (shapeType.type === "circle") {
            exsistingShapes.push({
                type: "circle",
                startX,
                startY,
                radius
            })
        }

        // socket.send(JSON.stringify({
        //     type: "CHAT",
        //     payload: {
        //         message: JSON.stringify(shape),
        //         roomId: Number(roomId)
        //     }
        // }))
    })

}


function clearCanvas(exsistingShapes: Shapes[], ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgb(18,18,18)"
    ctx.strokeStyle = "rgba(225,225,255)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    exsistingShapes.map(shape => {
        if (shape.type === "rect") {
            ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height)
        }
        if (shape.type === "circle") {
            ctx.beginPath();
            ctx.arc(shape.startX, shape.startY, shape.radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
    })

}

async function getExistingStrokes(roomname: string) {
    const response = await axios.post(`${HTTP_BACKEND}/strokes`,
        { roomname: `${roomname}` }, // Data goes here
        {
            headers: {
                token: `${Token}`,
                "Content-Type": "application/json"
            }
        }
    );

    const data = response.data.strokes
    const shape = data.map((x: { stroke: string }) => {
        const messageData = JSON.parse(x.stroke);
        return messageData
    })

    return shape

}
