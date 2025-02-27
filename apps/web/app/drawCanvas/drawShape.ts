
import { rectangle } from "../drawShape/rectangle";
import { clearCanvas } from "./clearCanva";
import { IPencileEndDimension, Shapes } from "./getShapes";
import { circle } from "../drawShape/circle";
import { line } from "../drawShape/line";
import { dimond } from "../drawShape/dimond";
import { IAction } from "../components/MainComponent";
import { drawExistingShape } from "./drawExistingShape";
import { onShape } from "./onShapes";
import { markSelectedShape } from "./markSelectedShape";
import { isRectangleShape, onRectangleShape } from "../selectShapeFunctions/rectangleShape";
import { stringify } from "querystring";
import { act } from "react";
import { onCircleShape } from "../selectShapeFunctions/circleShape";
import { onLineShape } from "../selectShapeFunctions/lineShape";
import { onDimondShape } from "../selectShapeFunctions/dimondShape";
import { clear } from "console";
import { findDistance } from "./findDistance";

export interface IActionType {
    type: "move" | "drag" | "none"
}

export function drawShape(dCanvas: HTMLCanvasElement, sCanvas: HTMLCanvasElement, dCtx: CanvasRenderingContext2D, sCtx: CanvasRenderingContext2D, shapeType: IAction, existingShapes: Shapes[], textAreaRef: HTMLTextAreaElement) {
    let clicked = false;
    let startX = 0;
    let startY = 0;
    let selectedShape: Shapes[] = [];
    let movingShape: Shapes[] = [];
    let isSelectedShape = false
    let action: IActionType = { type: "none" }
    let isAction = false;
    let distanceMoveClick = { a: 0, b: 0 };  // distance between starting point and point where clicked happen to move the shape 
    let pencileArray: IPencileEndDimension[] = []



    dCanvas.addEventListener("mousedown", (e) => {
        clicked = true

        // when click happen set the starting value 
        startX = e.clientX + Math.ceil(window.scrollX)
        startY = e.clientY + Math.ceil(window.scrollY)


    })


    dCanvas.addEventListener("mousemove", (e) => {
        const clientX = e.clientX + Math.ceil(window.scrollX)
        const clientY = e.clientY + Math.ceil(window.scrollY)
        dCanvas.style.cursor = "crosshair";

        // draw the shape on the dymanic canva and clear the dynamic canva whenever the points changes
        if (clicked) {
            if (shapeType.type === "rect") {
                const height = (clientY) - startY;
                const width = (clientX) - startX
                clearCanvas(dCtx, dCanvas, "dymanic")
                rectangle(startX, startY, width, height, "rgb(211, 211, 211)", dCtx)
            }

            if (shapeType.type === "circle") {
                const radiusX = Math.abs(clientX - startX);
                const radiusY = Math.abs(clientY - startY);
                clearCanvas(dCtx, dCanvas, "dymanic")
                circle(startX, startY, radiusX, radiusY, "rgb(211, 211, 211)", dCtx)
            }

            // continue the starting line that started when the clicked happen
            if (shapeType.type === "line") {
                clearCanvas(dCtx, dCanvas, "dymanic")
                line(startX, startY, clientX, clientY, "rgb(211, 211, 211)", dCtx)
            }

            if (shapeType.type === "dimond ") {
                const d = Math.sqrt(Math.pow(clientX - startX, 2) + Math.pow(clientY - startY, 2))
                clearCanvas(dCtx, dCanvas, "dymanic")
                dimond(startX, startY, d, "rgb(211, 211, 211)", dCtx)
            }

            if (shapeType.type === "pencile") {
                dCtx.lineTo(clientX, clientY)
                dCtx.stroke()
                pencileArray.push({ endX: clientX, endY: clientY })
            }

            // when the shape is moving
            if (isSelectedShape && action.type === "move" && movingShape[0]?.selected) {
                if (movingShape[0].type === "rect") {
                    dCanvas.style.cursor = "move"
                    clearCanvas(dCtx, dCanvas, "dymanic")
                    rectangle(clientX - distanceMoveClick.b, clientY - distanceMoveClick.a, movingShape[0].width, movingShape[0].height, "rgb(211, 211, 211)", dCtx)
                }
                if (movingShape[0].type === "circle") {
                    dCanvas.style.cursor = "move"
                    clearCanvas(dCtx, dCanvas, "dymanic")
                    circle(clientX - distanceMoveClick.b, clientY - distanceMoveClick.a, movingShape[0].radiusX, movingShape[0].radiusY, "rgb(211, 211, 211)", dCtx)
                }

            }

        }
    })

    dCanvas.addEventListener("mouseup", (e) => {
        clicked = false
        isAction = false
        const clientX = e.clientX + Math.ceil(window.scrollX)
        const clientY = e.clientY + Math.ceil(window.scrollY)

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
                strokeStyle: "rgb(225,0,0)",
                selected: false,
                display: true
            }
            existingShapes.push(shape)
            clearCanvas(sCtx, sCanvas, "static")
            clearCanvas(dCtx, dCanvas, "dymanic")
            drawExistingShape(existingShapes, sCtx)
            // socket.send(JSON.stringify({
            //     type: "CHAT",
            //     payload: {
            //         message: JSON.stringify(shape),
            //         roomId: Number(roomId)
            //     }
            // }))
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
                strokeStyle: "rgb(225,0,0)",
                selected: false,
                display: true
            }
            existingShapes.push(shape)
            clearCanvas(sCtx, sCanvas, "static")
            clearCanvas(dCtx, dCanvas, "dymanic")
            drawExistingShape(existingShapes, sCtx)

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
                endX: clientX,
                endY: clientY,
                strokeStyle: "rgb(225,0,0)",
                selected: false,
                display: true
            }
            existingShapes.push(shape)
            clearCanvas(sCtx, sCanvas, "static")
            clearCanvas(dCtx, dCanvas, "dymanic")
            drawExistingShape(existingShapes, sCtx)
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
                strokeStyle: "rgb(225,0,0)",
                selected: false,
                display: true
            }
            existingShapes.push(shape)
            clearCanvas(sCtx, sCanvas, "static")
            clearCanvas(dCtx, dCanvas, "dymanic")
            drawExistingShape(existingShapes, sCtx)
            // socket.send(JSON.stringify({
            //     type: "CHAT",
            //     payload: {
            //         message: JSON.stringify(shape),
            //         roomId: Number(roomId)
            //     }
            // }))
        }

        // mouse up after moving shape
        if (!movingShape[0]) return
        if (isSelectedShape && action.type === "move" && movingShape[0].selected) {
            if (movingShape[0].type === "rect") {
                const startX = clientX - distanceMoveClick.b
                const startY = clientY - distanceMoveClick.a
                const height = movingShape[0].height
                const width = movingShape[0].width
                shape = {
                    type: "rect",
                    startX,
                    startY,
                    height,
                    width,
                    strokeStyle: "rgb(225,0,0)",
                    selected: false,
                    display: true
                }
                existingShapes.push(shape)
                clearCanvas(sCtx, sCanvas, "static")
                clearCanvas(dCtx, dCanvas, "dymanic")
                dCanvas.style.display = "none"
                drawExistingShape(existingShapes, sCtx)
                action.type = "none"
                isSelectedShape = false
                movingShape.length = 0
                return
            }
            if (movingShape[0].type === "circle") {
                const startX = clientX - distanceMoveClick.b
                const startY = clientY - distanceMoveClick.a
                const radiusX = movingShape[0].radiusX;
                const radiusY = movingShape[0].radiusY;
                shape = {
                    type: "circle",
                    startX,
                    startY,
                    radiusX,
                    radiusY,
                    strokeStyle: "rgb(225,0,0)",
                    selected: false,
                    display: true
                }
                existingShapes.push(shape)
                clearCanvas(sCtx, sCanvas, "static")
                clearCanvas(dCtx, dCanvas, "dymanic")
                dCanvas.style.display = "none"
                drawExistingShape(existingShapes, sCtx)
                action.type = "none"
                isSelectedShape = false
                movingShape.length = 0
                return
            }

        }
    })




    // static canva 


    sCanvas.addEventListener("mousemove", (e) => {
        const clientX = e.clientX + Math.ceil(window.scrollX)
        const clientY = e.clientY + Math.ceil(window.scrollY)


        if (shapeType.type === "pointer") {
            sCanvas.style.cursor = "default";
            onShape(sCanvas, existingShapes, clientX, clientY, selectedShape)
        }


        if (isSelectedShape) {
            existingShapes.forEach(x => {
                if (x.selected === true) {

                    // find the point is inside the shapes and make action type to move
                    if (x.type === "rect") {
                        const insideRectangle = isRectangleShape(x.startX, x.startY, x.width, x.height, clientX, clientY, "inside")
                        if (insideRectangle) {
                            sCanvas.style.cursor = "move"
                            action.type = "move"
                        }
                    }
                    if (x.type === "circle") {
                        const onInnerCircle = onCircleShape(x, clientX, clientY, "inside")
                        if (onInnerCircle) {
                            sCanvas.style.cursor = "move"
                            action.type = "move"
                        }
                    }

                    if (x.type === "line") {
                        const onLine = onLineShape(x, clientX, clientY)
                        if (onLine) {
                            sCanvas.style.cursor = "move"
                            action.type = "move"
                        }
                    }
                    if (x.type === "dimond") {
                        const insideDimond = onDimondShape(x, clientX, clientY, "inside")
                        if (insideDimond) {
                            sCanvas.style.cursor = "move"
                            action.type = "move"
                        }
                    }
                }
            })
        }


    })

    sCanvas.addEventListener("mousedown", (e) => {
        const clientX = e.clientX + Math.ceil(window.scrollX)
        const clientY = e.clientY + Math.ceil(window.scrollY)

        const shape = existingShapes.find(x => x.selected === true)

        if (!shape) return

        if (shape.selected && action.type === "move") {
            clicked = true
            if (shape.type === "rect") {
                distanceMoveClick.a = clientY - shape.startY
                distanceMoveClick.b = clientX - shape.startX
            }
            if (shape.type === "circle") {
                distanceMoveClick.a = shape.startY - clientY
                distanceMoveClick.b = shape.startX - clientX
            }

            movingShape = [shape]
            const index = existingShapes.findIndex(x => x.selected === true)
            existingShapes.splice(index, 1)
            clearCanvas(sCtx, sCanvas, "static")
            drawExistingShape(existingShapes, sCtx)
            dCanvas.style.display = "block"
            clearCanvas(dCtx, dCanvas, "dymanic")
            movingShape.forEach(x => x.strokeStyle = "rgb(211, 211, 211)")
            drawExistingShape(movingShape, dCtx)
            markSelectedShape(dCtx, movingShape)
        }

    })

    sCanvas.addEventListener("mouseup", (e) => {
        clicked = false
        clearCanvas(sCtx, sCanvas, "static")
        drawExistingShape(existingShapes, sCtx)
        if (!selectedShape[0]) {
            isSelectedShape = false
            existingShapes.forEach(x => {
                x.selected = false
            })
        } else {
            // mark the selected shape
            isSelectedShape = true
            existingShapes.forEach(x => {
                if (x === selectedShape[0]) {
                    x.selected = true
                } else {
                    x.selected = false
                }
            })
            markSelectedShape(sCtx, selectedShape)
        }


    })















    // canvas.addEventListener("mouseleave", (e) => {
    //     if (shapeType.type === "erase") {
    //         clearCanvas(existingShapes, ctx, canvas)
    //     }
    // })




    //     canvas.addEventListener("dblclick", (e) => {
    //         if (shapeType.type === "text") {
    //             x = e.clientX + Math.ceil(window.scrollX)
    //             y = e.clientY + Math.ceil(window.scrollY) + 24 / 2
    //             textAreaRef.style.display = "block";
    //             textAreaRef.value = ""
    //             textAreaRef.focus();
    //             textAreaRef.style.top = `${e.clientY}px`
    //             textAreaRef.style.left = `${e.clientX}px`
    //         }
    //     })

    // }
}