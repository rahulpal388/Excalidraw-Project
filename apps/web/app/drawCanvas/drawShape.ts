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
import { isRectangleShape } from "../selectShapeFunctions/rectangleShape";
import { onCircleShape } from "../selectShapeFunctions/circleShape";
import { onLineShape } from "../selectShapeFunctions/lineShape";
import { onDimondShape } from "../selectShapeFunctions/dimondShape";
import { CanvaChangeShapeUpdate, CanvaShapeUpdate } from "../shapeUpdates/shapeUpdate";
import { rectangleDimension } from "../findDimension/rectangleDimension";
import { onMarkedShape } from "../selectShapeFunctions/markedShape";
import { findDistance } from "./findDistance";
import { clear } from "console";
import { circleDimension } from "../findDimension/circleDimension";
import { isSymbolObject } from "util/types";
import { ClientRequest } from "http";
import { deprecate } from "util";
import { ScatterChart } from "lucide-react";
import { Ref } from "react";

export type IActionType = "move" | "l-resize" | "r-resize" | "t-resize" | "b-resize" | "none"


export interface IselectedShape {
    currentShape: Shapes[],
    currentSelectedShape: Shapes | undefined,
    isSeletedShape: boolean,
    actionType: IActionType
}

export function drawShape(dCanvas: HTMLCanvasElement, sCanvas: HTMLCanvasElement, dCtx: CanvasRenderingContext2D, sCtx: CanvasRenderingContext2D, socket: WebSocket, shapeType: IAction, existingShapes: Shapes[], textAreaRef: React.RefObject<HTMLTextAreaElement | null>) {
    let clicked = false;
    let startX = 0;
    let startY = 0;
    let selectedShape: IselectedShape = {
        currentShape: [],
        currentSelectedShape: undefined,
        isSeletedShape: false,
        actionType: "none"
    }
    let top = 0
    let left = 0
    let movingShape: Shapes[] = [];
    let moveX: number;
    let moveY: number;
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
        console.log(shapeType.type)
        // draw the shape on the dymanic canva and clear the dynamic canva whenever the points changes
        if (clicked) {
            if (shapeType.type === "rect") {
                const height = (clientY) - startY;
                const width = (clientX) - startX
                clearCanvas(dCtx, dCanvas, "dymanic")
                rectangle(startX, startY, width, height, "rgb(211, 211, 211)", dCtx, "rounded")
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

            // when the shape is moving or resizing
            if (selectedShape.isSeletedShape && selectedShape.currentSelectedShape && selectedShape.actionType !== "none") {
                const shape = selectedShape.currentSelectedShape
                moveX = clientX;
                moveY = clientY
                console.log(selectedShape.currentSelectedShape)
                console.log(selectedShape.actionType)
                if (shape.type === "rect") {
                    // changing the dimension of the rectangle
                    const dimension = rectangleDimension(shape.startX, shape.startY, shape.width, shape.height, clientX, clientY, selectedShape.actionType, distanceMoveClick)
                    if (!dimension) return
                    const { startX, startY, height, width, cursorType } = dimension
                    dCanvas.style.cursor = cursorType
                    clearCanvas(dCtx, dCanvas, "dymanic")
                    rectangle(startX, startY, width, height, "rgb(211, 211, 211)", dCtx, "rounded")

                }


                // moving and resize of circle logic
                if (shape.type === "circle") {
                    const dimension = circleDimension(shape.startX, shape.startY, shape.radiusX, shape.radiusY, clientX, clientY, selectedShape.actionType, distanceMoveClick)
                    if (!dimension) return
                    const { startX, startY, radiusX, radiusY, cursorType } = dimension
                    dCanvas.style.cursor = cursorType
                    clearCanvas(dCtx, dCanvas, "dymanic")
                    clearCanvas(dCtx, dCanvas, "dymanic")
                    circle(startX, startY, radiusX, radiusY, "rgb(211, 211, 211)", dCtx)

                }

                // if (shape.type === "line") {
                //     const dStart_X = Math.abs(clientX - shape.startX)
                //     const dStart_Y = Math.abs(clientY - shape.startY)
                //     const d = findDistance(shape.startX, shape.startY, shape.endX, shape.endY)
                //     const eStart_Y = clientY + shape.startY
                //     const eStart_X = clientX + shape.startX
                //     console.log(dStart_X, dStart_Y, eStart_X, eStart_Y)
                //     clearCanvas(dCtx, dCanvas, "dymanic")
                //     dCanvas.style.cursor = "move"
                //     line(clientX - dStart_X, clientY - dStart_Y, clientX + eStart_X, clientY + eStart_Y, "rgb(211,211,211)", dCtx)
                // }

            }

        }
    })

    dCanvas.addEventListener("mouseup", (e) => {
        clicked = false
        const clientX = e.clientX + Math.ceil(window.scrollX)
        const clientY = e.clientY + Math.ceil(window.scrollY)

        let shape: Shapes
        if (shapeType.type === "rect") {
            const height = clientY - startY;
            const width = clientX - startX
            const x = width > 0 ? startX : startX + width
            const y = height > 0 ? startY : startY + height

            // update and send the shape to websocket server
            CanvaShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, socket, existingShapes, {
                type: "rect",
                startX: x,
                startY: y,
                height: Math.abs(height),
                width: Math.abs(width),
                strokeStyle: "rgb(225,0,0)",
                selected: false,
                display: true
            })

        }
        if (shapeType.type === "circle") {
            const radiusX = Math.abs(clientX - startX);
            const radiusY = Math.abs(clientY - startY);
            // update and send the shape to websocket server
            CanvaShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, socket, existingShapes, {
                type: "circle",
                startX,
                startY,
                radiusX,
                radiusY,
                strokeStyle: "rgb(225,0,0)",
                selected: false,
                display: true
            })


        }

        if (shapeType.type === "line") {
            // update and send the shape to websocket server
            CanvaShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, socket, existingShapes, {
                type: "line",
                startX,
                startY,
                endX: clientX,
                endY: clientY,
                strokeStyle: "rgb(225,0,0)",
                selected: false,
                display: true
            })



        }
        if (shapeType.type === "dimond ") {
            const distance = Math.sqrt(Math.pow(clientX - startX, 2) + Math.pow(clientY - startY, 2))
            // update and send the shape to websocket server
            CanvaShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, socket, existingShapes, {
                type: "dimond",
                startX,
                startY,
                distance,
                strokeStyle: "rgb(225,0,0)",
                selected: false,
                display: true
            })

        }




        // mouse up after moving shape


        // when the shape is moving or resize
        if (selectedShape.isSeletedShape && selectedShape.currentSelectedShape) {


            if (selectedShape.currentSelectedShape.type === "rect") {
                const { startX, startY, width, height } = selectedShape.currentSelectedShape

                const dimension = rectangleDimension(startX, startY, width, height, clientX, clientY, selectedShape.actionType, distanceMoveClick)
                if (!dimension) return

                // update the existingShapes and render to static canva and make intractive canva disable
                CanvaChangeShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, existingShapes, selectedShape, {
                    type: "rect",
                    startX: dimension.startX,
                    startY: dimension.startY,
                    height: dimension.height,
                    width: dimension.width,
                    strokeStyle: "rgb(225,0,0)",
                    selected: false,
                    display: true
                })
                return
            }
            if (selectedShape.currentSelectedShape.type === "circle") {

                const { startX, startY, radiusX, radiusY } = selectedShape.currentSelectedShape

                const dimension = circleDimension(startX, startY, radiusX, radiusY, moveX, moveY, selectedShape.actionType, distanceMoveClick)
                if (!dimension) return
                // update the existingShapes and render to static canva and make intractive canva disable
                console.log("00000000000000000000000000")
                console.log(dimension)
                CanvaChangeShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, existingShapes, selectedShape, {
                    type: "circle",
                    startX: dimension.startX,
                    startY: dimension.startY,
                    radiusX: dimension.radiusX,
                    radiusY: dimension.radiusY,
                    strokeStyle: "rgb(225,0,0)",
                    selected: false,
                    display: true
                })
                return
            }

        }




    })



    // static canva 

    sCanvas.addEventListener("mousedown", (e) => {
        const clientX = e.clientX + Math.ceil(window.scrollX)
        const clientY = e.clientY + Math.ceil(window.scrollY)
        if (shapeType.type === "text") {
            if (!textAreaRef.current) return
            let text = sCtx.measureText(textAreaRef.current.value)
            const shape: Shapes = {
                type: "text",
                top: top,
                left: left,
                textSize: 24,
                width: text.width,
                text: textAreaRef.current.value,
                strokeStyle: "rgb(225,0,0)",
                selected: false,
                display: true
            }
            console.log(textAreaRef.current.value)
            existingShapes.push(shape)
            clearCanvas(sCtx, sCanvas, "static")
            drawExistingShape(existingShapes, sCtx)
            textAreaRef.current.style.display = "none"
        }
        const shape = selectedShape.currentSelectedShape
        if (selectedShape.isSeletedShape && shape) {
            if (selectedShape.actionType !== "none") {
                if (selectedShape.actionType === "move") {
                    if (shape.type === "rect") {
                        distanceMoveClick.a = clientY - shape.startY
                        distanceMoveClick.b = clientX - shape.startX
                    }
                    if (shape.type === "circle") {
                        distanceMoveClick.a = shape.startY - clientY
                        distanceMoveClick.b = shape.startX - clientX
                    }
                }
                clicked = true
                // find the element and make display false so that it will be not visible on the static canva when changing
                dCanvas.style.display = "block"
                clearCanvas(dCtx, dCanvas, "dymanic")
                shape.strokeStyle = "rgb(211, 211, 211)"
                console.log(shape.display)
                drawExistingShape([shape], dCtx)
                markSelectedShape(dCtx, shape)
                const index = existingShapes.findIndex(x => x === selectedShape.currentSelectedShape)
                existingShapes.splice(index, 1)
                clearCanvas(sCtx, sCanvas, "static")
                drawExistingShape(existingShapes, sCtx)
            }
        }

    })


    sCanvas.addEventListener("mousemove", (e) => {
        const clientX = e.clientX + Math.ceil(window.scrollX)
        const clientY = e.clientY + Math.ceil(window.scrollY)
        // console.log(selectedShape.actionType)
        if (shapeType.type === "pointer") {
            sCanvas.style.cursor = "default";
            // keep checking that the mouse is on the shape and make the cursor type is move
            onShape(sCanvas, existingShapes, clientX, clientY, selectedShape.currentShape)
        }

        // 1. corner mouse is remaining

        // depending upon the selected shape check whether the mouse is inside or on which side of the marked shape and according to that change the actionType 
        if (selectedShape.isSeletedShape && selectedShape.currentSelectedShape) {
            const x = selectedShape.currentSelectedShape
            if (x.type === "rect") {
                // depending on the where mouse is on markedShape it set the actionType
                selectedShape.actionType = onMarkedShape(x.startX - 9, x.startY - 9, x.width + 1, x.height + 1, clientX, clientY, sCanvas)
                // console.log(a)
            }

            if (x.type === "circle") {
                selectedShape.actionType = onMarkedShape(x.startX - x.radiusX - 7, x.startY - x.radiusY - 7, 2 * x.radiusX - 2, 2 * x.radiusY - 2, clientX, clientY, sCanvas)

            }
            if (x.type === "dimond") {
                selectedShape.actionType = onMarkedShape(x.startX - (x.distance / 2) - 4, x.startY - 4, x.distance - 5, x.distance - 5, clientX, clientY, sCanvas)
            }

            if (x.type === "line") {
                const onLine = onLineShape(x.startX, x.startY, x.endX, x.endY, clientX, clientY)
                if (onLine) {
                    sCanvas.style.cursor = "move"
                    selectedShape.actionType = "move"
                }
            }


        }


    })


    // when the mouse is on the shape and mouseup happen select the shape
    sCanvas.addEventListener("mouseup", (e) => {
        clicked = false
        if (shapeType.type === "text") {
            shapeType.type = "pointer"
        }

        if (!selectedShape.currentShape[0]) {
            // clearCanvas(sCtx, sCanvas, "static")
            // drawExistingShape(existingShapes, sCtx)
            selectedShape.isSeletedShape = false
            selectedShape.currentSelectedShape = undefined
        } else {
            // mark the selected shape
            selectedShape.isSeletedShape = true
            existingShapes.forEach(x => {
                clearCanvas(sCtx, sCanvas, "static")
                drawExistingShape(existingShapes, sCtx)
                if (x === selectedShape.currentShape[0]) {
                    selectedShape.currentSelectedShape = x
                }
            })
            markSelectedShape(sCtx, selectedShape.currentShape[0])
        }


    })


    sCanvas.addEventListener("dblclick", (e) => {
        left = e.clientX + Math.ceil(window.scrollX)
        top = e.clientY + Math.ceil(window.scrollY)
        if (!textAreaRef.current) return
        shapeType.type = "text"
        textAreaRef.current.style.display = "block"
        textAreaRef.current.value = ""
        textAreaRef.current.style.top = `${top}px`
        textAreaRef.current.style.left = `${left}px`
        textAreaRef.current.focus()

    })


}
