import { clearCanvas } from ".";
import { IAction, IShapeType } from "../components/MainCanva";
import { Shapes } from "./getShapes";
import { resizeShape } from "./resizeShape";



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
            resizeShape(canvas, existingShapes, ctx, e.clientX, e.clientY, selectedShape)
        } else {
            canvas.style.cursor = "crosshair";
        }


        if (clicked) {
            if (shapeType.type === "rect") {
                const height = e.clientY - startY;
                const width = e.clientX - startX
                clearCanvas(existingShapes, ctx, canvas)
                ctx.strokeStyle = "rgba(225,225,225)"
                ctx.strokeRect(startX, startY, width, height)

            }
            if (shapeType.type === "circle") {
                const radius = Math.abs(e.clientX - startX);
                clearCanvas(existingShapes, ctx, canvas)
                ctx.beginPath();
                ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
                ctx.stroke();
            }
            if (shapeType.type === "line") {
                const length = Math.sqrt(Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2));

                clearCanvas(existingShapes, ctx, canvas)
                ctx.beginPath();
                ctx.moveTo(startX, startY)

                ctx.lineTo(e.clientX, e.clientY)
                ctx.stroke();

                ctx.closePath();
            }

        }


    })
    canvas.addEventListener("mouseup", (e) => {

        clicked = false
        const height = e.clientY - startY;
        const width = e.clientX - startX;
        const radius = Math.abs(e.clientX - startX);

        if (shapeType.type === "resize") {
            if (!selectedShape.length) return;
            console.log(selectedShape[0])
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
                radius,
                display: true
            }
            existingShapes.push(shape)
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

        }





    })

}