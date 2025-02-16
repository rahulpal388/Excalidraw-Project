
import { IShapeType } from "../components/MainCanva";
import { rectangle } from "../drawShape/rectangle";
import { clearCanvas } from "./clearCanva";
import { Shapes } from "./getShapes";
import { selectShape } from "./selectShape";
import { markSelecteShape } from "./markSelectedShape";
import { circle } from "../drawShape/circle";
import { line } from "../drawShape/line";
import { dimond } from "../drawShape/dimond";



export function drawShape({ canvas, ctx, shapeType, existingShapes, socket, roomId }: {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    shapeType: IShapeType,
    existingShapes: Shapes[],
    socket: WebSocket,
    roomId: string,
}) {
    let clicked = false;
    let startX = 0;
    let startY = 0;
    let selectedShape: Shapes[] = [];

    canvas.addEventListener("mousedown", (e) => {
        clicked = true
        startX = e.clientX + Math.ceil(window.scrollX)
        startY = e.clientY + Math.ceil(window.scrollY)
    })

    canvas.addEventListener("mousemove", (e) => {
        const clientX = e.clientX + Math.ceil(window.scrollX)
        const clientY = e.clientY + Math.ceil(window.scrollY)

        if (shapeType.type === "resize") {
            canvas.style.cursor = "default";
            selectShape(canvas, existingShapes, ctx, clientX, clientY, selectedShape)
        } else {
            canvas.style.cursor = "crosshair";
        }


        if (clicked) {
            if (shapeType.type === "rect") {
                const height = (clientY) - startY;
                const width = (clientX) - startX
                clearCanvas(existingShapes, ctx, canvas)
                rectangle(startX, startY, width, height, "rgb(211, 211, 211)", ctx)
            }

            if (shapeType.type === "circle") {
                const radiusX = Math.abs(clientX - startX);
                const radiusY = Math.abs(clientY - startY);
                clearCanvas(existingShapes, ctx, canvas)
                circle(startX, startY, radiusX, radiusY, ctx)
            }

            if (shapeType.type === "line") {
                clearCanvas(existingShapes, ctx, canvas)
                line(startX, startY, clientX, clientY, ctx)
            }

            if (shapeType.type === "dimond ") {
                const d = Math.sqrt(Math.pow(clientX - startX, 2) + Math.pow(clientY - startY, 2))
                clearCanvas(existingShapes, ctx, canvas)
                dimond(startX, startY, d, "rgb(211, 211, 211)", ctx)
            }

        }


    })

    canvas.addEventListener("mouseup", (e) => {
        clicked = false
        const clientX = e.clientX + Math.ceil(window.scrollX)
        const clientY = e.clientY + Math.ceil(window.scrollY)

        if (shapeType.type === "resize") {
            if (!selectedShape.length) return;
            markSelecteShape(canvas, ctx, selectedShape, existingShapes)
        };

        let shape: Shapes
        if (shapeType.type === "rect") {
            const height = clientY - startY;
            const width = clientX - startX
            shape = {
                type: "rect",
                startX,
                startY,
                height,
                width,
                display: true
            }
            existingShapes.push(shape)
            socket.send(JSON.stringify({
                type: "CHAT",
                payload: {
                    message: JSON.stringify(shape),
                    roomId: Number(roomId)
                }
            }))
        }
        if (shapeType.type === "circle") {
            const radiusX = Math.abs(clientX - startX);
            const radiusY = Math.abs(clientY - startY);
            shape = {
                type: "circle",
                startX,
                startY,
                radiusX,
                radiusY,
                display: true
            }
            existingShapes.push(shape)
            socket.send(JSON.stringify({
                type: "CHAT",
                payload: {
                    message: JSON.stringify(shape),
                    roomId: Number(roomId)
                }
            }))
        }

        if (shapeType.type === "line") {
            shape = {
                type: "line",
                startX,
                startY,
                endX: clientX,
                endY: clientY,
                display: true
            }
            existingShapes.push(shape)
            // socket.send(JSON.stringify({
            //     type: "CHAT",
            //     payload: {
            //         message: JSON.stringify(shape),
            //         roomId: Number(roomId)
            //     }
            // }))
        }
        if (shapeType.type === "dimond ") {
            const distance = Math.sqrt(Math.pow(clientX - startX, 2) + Math.pow(clientY - startY, 2))
            shape = {
                type: "dimond",
                startX,
                startY,
                distance,
                display: true
            }
            existingShapes.push(shape)
            socket.send(JSON.stringify({
                type: "CHAT",
                payload: {
                    message: JSON.stringify(shape),
                    roomId: Number(roomId)
                }
            }))
        }





    })

}