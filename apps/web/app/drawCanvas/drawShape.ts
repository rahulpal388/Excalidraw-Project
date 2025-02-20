
import { IShapeType } from "../components/MainCanva";
import { rectangle } from "../drawShape/rectangle";
import { clearCanvas } from "./clearCanva";
import { IPencileEndDimension, Shapes } from "./getShapes";
import { selectShape } from "./selectShape";
import { markSelecteShape } from "./markSelectedShape";
import { circle } from "../drawShape/circle";
import { line } from "../drawShape/line";
import { dimond } from "../drawShape/dimond";


export function drawShape({ canvas, ctx, shapeType, existingShapes, socket, roomId, textAreaRef }: {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    shapeType: IShapeType,
    existingShapes: Shapes[],
    socket: WebSocket,
    roomId: string,
    textAreaRef: HTMLTextAreaElement
}) {
    let clicked = false;
    let startX = 0;
    let startY = 0;
    let x = 0;
    let y = 0;
    let selectedShape: Shapes[] = [];
    let deleteShape: Shapes[] = [];
    let pencileArray: IPencileEndDimension[] = []

    canvas.addEventListener("mousedown", (e) => {
        clicked = true
        startX = e.clientX + Math.ceil(window.scrollX)
        startY = e.clientY + Math.ceil(window.scrollY)

        if (shapeType.type === "pencile") {
            ctx.beginPath()
            ctx.moveTo(startX, startY)
        }



    })

    canvas.addEventListener("mousemove", (e) => {
        const clientX = e.clientX + Math.ceil(window.scrollX)
        const clientY = e.clientY + Math.ceil(window.scrollY)

        if (shapeType.type === "resize") {
            canvas.style.cursor = "default";
            selectedShape.length = 0
            selectShape(canvas, existingShapes, ctx, clientX, clientY, selectedShape, "move")
        } else if (shapeType.type === "erase") {
            canvas.style.cursor = "none";
            clearCanvas(existingShapes, ctx, canvas)
            circle(clientX, clientY, 5, 5, "rgb(211, 211, 211)", ctx)
            selectShape(canvas, existingShapes, ctx, clientX, clientY, deleteShape, "none")
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
                circle(startX, startY, radiusX, radiusY, "rgb(211, 211, 211)", ctx)
            }

            if (shapeType.type === "line") {
                clearCanvas(existingShapes, ctx, canvas)
                line(startX, startY, clientX, clientY, "rgb(211, 211, 211)", ctx)
            }

            if (shapeType.type === "dimond ") {
                const d = Math.sqrt(Math.pow(clientX - startX, 2) + Math.pow(clientY - startY, 2))
                clearCanvas(existingShapes, ctx, canvas)
                dimond(startX, startY, d, "rgb(211, 211, 211)", ctx)
            }

            if (shapeType.type === "pencile") {
                ctx.lineTo(clientX, clientY)
                ctx.stroke()
                pencileArray.push({ endX: clientX, endY: clientY })
            }

        }


    })

    canvas.addEventListener("mouseup", (e) => {
        clicked = false
        const clientX = e.clientX + Math.ceil(window.scrollX)
        const clientY = e.clientY + Math.ceil(window.scrollY)


        if (shapeType.type === "resize") {
            if (!selectedShape[0]) return;
            markSelecteShape(canvas, ctx, selectedShape, existingShapes)

        };

        if (shapeType.type === "erase") {
            existingShapes = existingShapes.filter(shape => {
                deleteShape.forEach(x => {
                    shape !== x
                })
            })
            clearCanvas(existingShapes, ctx, canvas)
        }

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
                strokeStyle: "rgb(211, 211, 211)",
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
                strokeStyle: "rgb(211, 211, 211)",
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
                strokeStyle: "rgb(211, 211, 211)",
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
                strokeStyle: "rgb(211, 211, 211)",
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

        if (shapeType.type === "text") {
            textAreaRef.style.display = "none"
            shape = {
                type: "text",
                x,
                y,
                textSize: 24,
                text: textAreaRef.value,
                display: true

            }
            console.log(textAreaRef.value)
            existingShapes.push(shape)
            clearCanvas(existingShapes, ctx, canvas)

        }

        if (shapeType.type === "pencile") {
            shape = {
                type: "pencile",
                startX,
                startY,
                endDimension: pencileArray,
                display: true
            }
            existingShapes.push(shape)
        }

    })

    canvas.addEventListener("mouseleave", (e) => {
        if (shapeType.type === "erase") {
            clearCanvas(existingShapes, ctx, canvas)
        }
    })




    canvas.addEventListener("dblclick", (e) => {
        if (shapeType.type === "text") {
            x = e.clientX + Math.ceil(window.scrollX)
            y = e.clientY + Math.ceil(window.scrollY) + 24 / 2
            textAreaRef.style.display = "block";
            textAreaRef.value = ""
            textAreaRef.focus();
            textAreaRef.style.top = `${e.clientY}px`
            textAreaRef.style.left = `${e.clientX}px`
        }
    })

}