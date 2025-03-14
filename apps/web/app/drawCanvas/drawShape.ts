import { rectangle } from "../drawShape/rectangle";
import { clearCanvas } from "./clearCanva";
import { IPencileEndDimension, Shapes } from "./getShapes";
import { circle } from "../drawShape/circle";
import { drawArrowhead, line } from "../drawShape/line";
import { dimond } from "../drawShape/dimond";
import { IAction, IStyles } from "../components/MainComponent";
import { drawExistingShape } from "./drawExistingShape";
import { onShape } from "./onShapes";
import { markSelectedShape } from "./markSelectedShape";
import { onLineShape } from "../selectShapeFunctions/lineShape";
import { CanvaChangeShapeUpdate, CanvaShapeUpdate } from "../shapeUpdates/shapeUpdate";
import { rectangleDimension } from "../findDimension/rectangleDimension";
import { onMarkedShape } from "../selectShapeFunctions/markedShape";
import { circleDimension } from "../findDimension/circleDimension";
import { styleText } from "util";
import { ST } from "next/dist/shared/lib/utils";

export type IActionType = "move" | "l-resize" | "r-resize" | "t-resize" | "b-resize" | "none"


export interface IselectedShape {
    currentShape: Shapes[],
    currentSelectedShape: Shapes | undefined,
    isSeletedShape: boolean,
    actionType: IActionType
}

export function drawShape(dCanvas: HTMLCanvasElement, sCanvas: HTMLCanvasElement, dCtx: CanvasRenderingContext2D, sCtx: CanvasRenderingContext2D, socket: WebSocket, action: React.RefObject<IAction>, existingShapes: Shapes[], textAreaRef: React.RefObject<HTMLTextAreaElement | null>, setSelectedTool: React.Dispatch<React.SetStateAction<IAction>>,Style:IStyles) {
    let clicked = false;
    let startX = 0;
    let startY = 0;
    let selectedShape: IselectedShape = {
        currentShape: [],
        currentSelectedShape: undefined,
        isSeletedShape: false,
        actionType: "none"
    }
    const shapeType = action.current
    let moveX: number;
    let moveY: number;
    let distanceMoveClick = { a: 0, b: 0 };  // distance between starting point and point where clicked happen to move the shape 


console.log("after callin the setSelectedTool this function is called again")

    dCanvas.addEventListener("mousedown", (e)=>{
        clicked = true

        // when click happen set the starting value 
        startX = e.clientX + Math.ceil(window.scrollX)
        startY = e.clientY + Math.ceil(window.scrollY)
    
    
        // if (shapeType.type === "pencile") {
        //     dCtx.beginPath()
        //     dCtx.strokeStyle = "rgb(211,211,211)"
        //     dCtx.lineWidth = 5
        //     dCtx.lineJoin = "round"
        //     dCtx.moveTo(startX, startY)
        // }
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
                rectangle(startX, startY, width, height, dCtx,Style.stroke,Style.strokeWidth,Style.background, "rounded")
               
            }

            if (shapeType.type === "circle") {
                const radiusX = Math.abs(clientX - startX);
                const radiusY = Math.abs(clientY - startY);
                clearCanvas(dCtx, dCanvas, "dymanic")
                circle(startX, startY, radiusX, radiusY,  dCtx,Style.stroke,Style.strokeWidth,Style.background)
            }


            if (shapeType.type === "line") {
                clearCanvas(dCtx, dCanvas, "dymanic")
                line(startX, startY, clientX, clientY, "rgb(211, 211, 211)", dCtx)
            }

            if (shapeType.type === "dimond ") {
                const d = Math.sqrt(Math.pow(clientX - startX, 2) + Math.pow(clientY - startY, 2))
                clearCanvas(dCtx, dCanvas, "dymanic")
                dimond(startX, startY, d, "rgb(211, 211, 211)", dCtx)

            }

            // continue the starting line that started when the clicked happen
            if (shapeType.type === "pencile") {
                // dCtx.lineTo(clientX, clientY)
                // dCtx.stroke()
                // pencileArray.push({ endX: clientX, endY: clientY })
            }

            // when the shape is moving or resizing
            if (selectedShape.isSeletedShape && selectedShape.currentSelectedShape && selectedShape.actionType !== "none") {
                const shape = selectedShape.currentSelectedShape
                moveX = clientX;
                moveY = clientY
                if (shape.type === "rect") {
                    // changing the dimension of the rectangle
                    const dimension = rectangleDimension(shape.startX, shape.startY, shape.width, shape.height, clientX, clientY, selectedShape.actionType, distanceMoveClick)
                    if (!dimension) return
                    const { startX, startY, height, width, cursorType } = dimension
                    dCanvas.style.cursor = cursorType
                    clearCanvas(dCtx, dCanvas, "dymanic")
                    rectangle(startX, startY, width, height, dCtx, Style.stroke,Style.strokeWidth,Style.background,"rounded")
                    markSelectedShape(dCtx, {
                        type: "rect",
                        startX,
                        startY,
                        height,
                        width,
                        selected: true,
                        display: true,
                        stroke:Style.stroke,
                        background:Style.background,
                        strokeWidth:Style.strokeWidth,
                    })
                }

                // broken login in moving the shape
                if (shape.type === "circle") {
                    const dimension = circleDimension(shape.startX, shape.startY, shape.radiusX, shape.radiusY, clientX, clientY, selectedShape.actionType, distanceMoveClick)
                    if (!dimension) return
                    const { startX, startY, radiusX, radiusY, cursorType } = dimension
                    dCanvas.style.cursor = cursorType
                    clearCanvas(dCtx, dCanvas, "dymanic")
                    circle(startX, startY, radiusX, radiusY, dCtx,Style.stroke,Style.strokeWidth,Style.background)
                    markSelectedShape(dCtx, {
                        type: "circle",
                        startX,
                        startY,
                        radiusX,
                        radiusY,
                        selected: true,
                        display: true,
                        stroke:Style.stroke,
                        background:Style.background,
                        strokeWidth:Style.strokeWidth,
                    })
                }

                // if (shape.type === "text") {
                //     const dimension = textDimension(shape.top, shape.left, shape.width, 28, clientX, clientY, selectedShape.actionType, distanceMoveClick)
                //     if (!dimension) return
                //     const { top, left } = dimension
                //     dCanvas.style.cursor = "move"
                //     clearCanvas(dCtx, dCanvas, "dymanic")
                //     inserText(dCtx, shape.text, left, top)
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
                stroke:Style.stroke,
                background:Style.background,
                strokeWidth:Style.strokeWidth,
                selected: false,
                display: true
            }, selectedShape,Style)
            setSelectedTool({type:"pointer"})
            return
            
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
                stroke:Style.stroke,
                background:Style.background,
                strokeWidth:Style.strokeWidth,
                selected: false,
                display: true
            }, selectedShape,Style)

            setSelectedTool({type:"pointer"})
            return
        }

        if (shapeType.type === "line") {
            // update and send the shape to websocket server
            CanvaShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, socket, existingShapes, {
                type: "line",
                startX,
                startY,
                endX: clientX,
                endY: clientY,
                stroke:Style.stroke,
                selected: false,
                display: true
            }, selectedShape,Style)
            setSelectedTool({type:"pointer"})
            return
        }
        if (shapeType.type === "dimond ") {
            const distance = Math.sqrt(Math.pow(clientX - startX, 2) + Math.pow(clientY - startY, 2))
            // update and send the shape to websocket server
            CanvaShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, socket, existingShapes, {
                type: "dimond",
                startX,
                startY,
                distance,
                stroke:Style.stroke,
                background:Style.background,
                strokeWidth:Style.strokeWidth,
                selected: false,
                display: true
            }, selectedShape,Style)
            setSelectedTool({type:"pointer"})
            return

        }


        // mosue up after the moving or resizing 
        // send and update the shape
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
                    stroke:Style.stroke,
                    background:Style.background,
                    strokeWidth:Style.strokeWidth,
                    selected: false,
                    display: true
                },Style)
                setSelectedTool({type:"pointer"})
                return
            }
            if (selectedShape.currentSelectedShape.type === "circle") {

                const { startX, startY, radiusX, radiusY } = selectedShape.currentSelectedShape

                const dimension = circleDimension(startX, startY, radiusX, radiusY, moveX, moveY, selectedShape.actionType, distanceMoveClick)
                if (!dimension) return
                // update the existingShapes and render to static canva and make intractive canva disable
                CanvaChangeShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, existingShapes, selectedShape, {
                    type: "circle",
                    startX: dimension.startX,
                    startY: dimension.startY,
                    radiusX: dimension.radiusX,
                    radiusY: dimension.radiusY,
                  stroke:Style.stroke,
                  background:Style.background,
                  strokeWidth:Style.strokeWidth,
                    selected: false,
                    display: true
                },Style)
                setSelectedTool({type:"pointer"})
                return
            }
            // if (selectedShape.currentSelectedShape.type === "text") {
            //     const { top, left, text, textSize, width } = selectedShape.currentSelectedShape
            //     const dimension = textDimension(top, left, width, 28, moveX, moveY, selectedShape.actionType, distanceMoveClick)
            //     if (!dimension) return
            //     CanvaChangeShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, existingShapes, selectedShape, {
            //         type: "text",
            //         top: dimension.top,
            //         left: dimension.left,
            //         text,
            //         width,
            //         textSize,
            //         strokeStyle: "rgb(225,0,0)",
            //         selected: false,
            //         display: true

            //     })
            //     return
            // }


        }
    })



    // static canva 

    sCanvas.addEventListener("mousedown", (e) => {
        const clientX = e.clientX + Math.ceil(window.scrollX)
        const clientY = e.clientY + Math.ceil(window.scrollY)
        // if (shapeType.type === "text") {
        //     if (!textAreaRef.current) return
        //     let text = sCtx.measureText(textAreaRef.current.value)
        //     const shape: Shapes = {
        //         type: "text",
        //         top: top,
        //         left: left,
        //         textSize: 24,
        //         width: text.width,
        //         text: textAreaRef.current.value,
        //         strokeStyle: "rgb(225,0,0)",
        //         selected: false,
        //         display: true
        //     }
        //     console.log(textAreaRef.current.value)
        //     existingShapes.push(shape)
        //     clearCanvas(sCtx, sCanvas, "static")
        //     drawExistingShape(existingShapes, sCtx)
        //     textAreaRef.current.style.display = "none"
        // }
        // console.log(selectedShape.actionType)

        // when the click happen on the selected shape 

        const shape = selectedShape.currentSelectedShape
        if (selectedShape.isSeletedShape && shape) {
            if (selectedShape.actionType !== "none") {
                if (selectedShape.actionType === "move") {
                    if (shape.type === "rect") {
                        distanceMoveClick.a = clientY - shape.startY
                        distanceMoveClick.b = clientX - shape.startX
                    }
                    if (shape.type === "text") {
                        distanceMoveClick.a = clientY - shape.top
                        distanceMoveClick.b = clientX - shape.left
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
                console.log(shape.display)
                drawExistingShape([shape], dCtx,Style)
                markSelectedShape(dCtx, shape)
                const index = existingShapes.findIndex(x => x === selectedShape.currentSelectedShape)
                existingShapes.splice(index, 1)
                clearCanvas(sCtx, sCanvas, "static")
                drawExistingShape(existingShapes, sCtx,Style)
            }
        }

    })


    sCanvas.addEventListener("mousemove", (e) => {
        const clientX = e.clientX + Math.ceil(window.scrollX)
        const clientY = e.clientY + Math.ceil(window.scrollY)
      
        if (shapeType.type === "pointer") {
            // console.log("on static canva")
            // console.log(shapeType.type)
            sCanvas.style.cursor = "default";
            // keep checking that the mouse is on the shape and make the cursor type  move
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

            if (x.type === "text") {
                selectedShape.actionType = onMarkedShape(x.left - 10, x.top - 15, x.width + 14, 23, clientX, clientY, sCanvas)

            }


        }


    })


    // when the mouse is on the shape and mouseup happen select the shape
    sCanvas.addEventListener("mouseup", (e) => {
        clicked = false
        if (shapeType.type === "text") {
            shapeType.type = "pointer"
        }


        // selecting and de-selecting the shape
        if (!selectedShape.currentShape[0]) {
            console.log([...selectedShape.currentShape])
            clearCanvas(sCtx, sCanvas, "static")
            drawExistingShape(existingShapes, sCtx,Style)

            selectedShape.isSeletedShape = false
            selectedShape.currentSelectedShape = undefined
        } else {
            console.log([...selectedShape.currentShape])
            // mark the selected shape
            selectedShape.isSeletedShape = true
            existingShapes.forEach(x => {
                clearCanvas(sCtx, sCanvas, "static")
                drawExistingShape(existingShapes, sCtx,Style)
                if (x === selectedShape.currentShape[0]) {
                    selectedShape.currentSelectedShape = x
                }
            })
            markSelectedShape(sCtx, selectedShape.currentShape[0])
        }


    })


    // sCanvas.addEventListener("dblclick", (e) => {
    //     left = e.clientX + Math.ceil(window.scrollX)
    //     top = e.clientY + Math.ceil(window.scrollY)
    //     if (!textAreaRef.current) return
    //     shapeType.type = "text"
    //     textAreaRef.current.style.display = "block"
    //     textAreaRef.current.value = " "
    //     textAreaRef.current.style.top = `${top}px`
    //     textAreaRef.current.style.left = `${left}px`
    //     textAreaRef.current.focus()

    // })


}


