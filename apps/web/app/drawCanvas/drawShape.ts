
import { IAction, IShapeType } from "../components/MainCanva";
import { circle } from "../drawShape/circle";
import { dimond } from "../drawShape/dimond";
import { line } from "../drawShape/line";
import { rectangle } from "../drawShape/rectangle";
import { clearCanvas } from "./clearCanva";
import { Shapes } from "./getShapes";
import { selectShape } from "./selectShape";
import { markSelecteShape } from "./markSelectedShape";



export function drawShape({ canvas, ctx, shapeType, existingShapes, socket, roomId }: {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    shapeType: IShapeType,
    existingShapes: Shapes[],
    socket: WebSocket,
    roomId: string,
}) {
    // if (action === "resize") return;
    let clicked = false;
    let startX = 0;
    let startY = 0;
    let selectedShape: Shapes[] = [];

    canvas.addEventListener("mousedown", (e) => {
        clicked = true
        startX = e.clientX;
        startY = e.clientY





    })
    canvas.addEventListener("mousemove", (e) => {

        if (shapeType.type === "resize") {
            canvas.style.cursor = "default";
            selectShape(canvas, existingShapes, ctx, e.clientX, e.clientY, selectedShape)
        } else {
            canvas.style.cursor = "crosshair";
        }


        if (clicked) {
            if (shapeType.type === "rect") {
                const height = e.clientY - startY;
                const width = e.clientX - startX
                clearCanvas(existingShapes, ctx, canvas)
                rectangle(startX, startY, width, height, "rgb(211, 211, 211)", ctx)


            }
            if (shapeType.type === "circle") {
                const radiusX = Math.abs(e.clientX - startX);
                const radiusY = Math.abs(e.clientY - startY);
                clearCanvas(existingShapes, ctx, canvas)
                circle(startX, startY, radiusX, radiusY, ctx)
            }

            if (shapeType.type === "line") {
                clearCanvas(existingShapes, ctx, canvas)
                line(startX, startY, e.clientX, e.clientY, ctx)
            }

            if (shapeType.type === "dimond ") {
                const d = Math.sqrt(Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2))
                clearCanvas(existingShapes, ctx, canvas)
                dimond(startX, startY, d, "rgb(211, 211, 211)", ctx)
            }

        }


    })
    canvas.addEventListener("mouseup", (e) => {

        clicked = false
        const height = e.clientY - startY;
        const width = e.clientX - startX;
        const radiusX = Math.abs(e.clientX - startX);
        const radiusY = Math.abs(e.clientY - startY);

        if (shapeType.type === "resize") {
            if (!selectedShape.length) return;
            markSelecteShape(canvas, ctx, selectedShape, existingShapes)
        };

        let shape: Shapes
        if (shapeType.type === "rect") {
            shape = {
                type: "rect",
                startX,
                startY,
                height,
                width,
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
        if (shapeType.type === "circle") {
            shape = {
                type: "circle",
                startX,
                startY,
                radiusX,
                radiusY,
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

        if (shapeType.type === "line") {
            shape = {
                type: "line",
                startX,
                startY,
                endX: e.clientX,
                endY: e.clientY,
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
            const distance = Math.sqrt(Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2))
            shape = {
                type: "dimond",
                startX,
                startY,
                distance,
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





    })

}