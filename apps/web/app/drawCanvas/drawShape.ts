import { rectangle } from "../drawShape/rectangle";
import { clearCanvas } from "./clearCanva";
import { Shapes } from "./getShapes";
import { circle } from "../drawShape/circle";
import { arrow } from "../drawShape/line";
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

export type IActionType = "move" | "l-resize" | "r-resize" | "t-resize" | "b-resize" | "none"


export interface IselectedShape {
    currentShape: Shapes[],
    currentSelectedShape: Shapes | undefined,
    isSeletedShape: boolean,
    actionType: IActionType
}

let clicked = false;
let startX = 0;
let startY = 0;
export let selectedShape: IselectedShape = {
    currentShape: [],
    currentSelectedShape: undefined,
    isSeletedShape: false,
    actionType: "none"
}
let shapeType: IAction
let moveX: number;
let moveY: number;
let distanceMoveClick = { a: 0, b: 0 };  // distance between starting point and point where clicked happen to move the shape 

export function drawShape(dCanvas: HTMLCanvasElement, sCanvas: HTMLCanvasElement, dCtx: CanvasRenderingContext2D, sCtx: CanvasRenderingContext2D, socket: WebSocket, action: React.RefObject<IAction>, existingShapes: Shapes[], textAreaRef: React.RefObject<HTMLTextAreaElement | null>, setSelectedTool: React.Dispatch<React.SetStateAction<IAction>>, style: IStyles, styleRef: HTMLDivElement) {

    shapeType = action.current
    console.log("after callin the setSelectedTool this function is called again")

    dCanvas.addEventListener("mousedown", (e) => {
        clicked = true

        // when click happen set the starting value 
        startX = e.clientX + Math.ceil(window.scrollX)
        startY = e.clientY + Math.ceil(window.scrollY)


        // if (shapeType.type === "pencile") {
        //     dCtx.beginPath()
        //     dCtx.strokestyle = "rgb(211,211,211)"
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
                console.log(style.stroke)
                clearCanvas(dCtx, dCanvas, "dymanic")
                rectangle(startX, startY, width, height, dCtx, style.stroke, style.strokeWidth, style.background, "rounded")

            }

            if (shapeType.type === "circle") {
                const radiusX = Math.abs(clientX - startX);
                const radiusY = Math.abs(clientY - startY);
                clearCanvas(dCtx, dCanvas, "dymanic")
                circle(startX, startY, radiusX, radiusY, dCtx, style.stroke, style.strokeWidth, style.background)
            }


            if (shapeType.type === "line") {
                clearCanvas(dCtx, dCanvas, "dymanic")
                arrow(startX, startY, clientX, clientY, style.stroke, style.strokeWidth, dCtx)
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
                    rectangle(startX, startY, width, height, dCtx, shape.stroke, shape.strokeWidth, shape.background, "rounded")
                    markSelectedShape(dCtx, {
                        type: "rect",
                        startX,
                        startY,
                        height,
                        width,
                        selected: true,
                        display: true,
                        stroke: style.stroke,
                        background: style.background,
                        strokeWidth: style.strokeWidth,
                    })
                }

                // broken login in moving the shape
                if (shape.type === "circle") {
                    const dimension = circleDimension(shape.startX, shape.startY, shape.radiusX, shape.radiusY, clientX, clientY, selectedShape.actionType, distanceMoveClick)
                    if (!dimension) return
                    const { startX, startY, radiusX, radiusY, cursorType } = dimension
                    dCanvas.style.cursor = cursorType
                    clearCanvas(dCtx, dCanvas, "dymanic")
                    circle(startX, startY, radiusX, radiusY, dCtx, shape.stroke, shape.strokeWidth, shape.background)
                    markSelectedShape(dCtx, {
                        type: "circle",
                        startX,
                        startY,
                        radiusX,
                        radiusY,
                        selected: true,
                        display: true,
                        stroke: style.stroke,
                        background: style.background,
                        strokeWidth: style.strokeWidth,
                    })
                }

                if (shape.type === "line") {

                    if (selectedShape.actionType === "move") {
                        const startX = clientX - distanceMoveClick.b
                        const startY = clientY - distanceMoveClick.a
                        const lx = shape.endX - shape.startX
                        const ly = shape.endY - shape.startY
                        dCanvas.style.cursor = "move"
                        clearCanvas(dCtx, dCanvas, "dymanic")
                        arrow(startX, startY, startX + lx, startY + ly, shape.stroke, shape.strokeWidth, dCtx)
                    }

                }

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
                stroke: style.stroke,
                background: style.background,
                strokeWidth: style.strokeWidth,
                selected: false,
                display: true
            }, selectedShape, style)
            setSelectedTool({ type: "pointer" })
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
                stroke: style.stroke,
                background: style.background,
                strokeWidth: style.strokeWidth,
                selected: false,
                display: true
            }, selectedShape, style)

            setSelectedTool({ type: "pointer" })
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
                stroke: style.stroke,
                strokeWidth: style.strokeWidth,
                selected: false,
                display: true
            }, selectedShape, style)
            setSelectedTool({ type: "pointer" })
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
                stroke: style.stroke,
                background: style.background,
                strokeWidth: style.strokeWidth,
                selected: false,
                display: true
            }, selectedShape, style)
            setSelectedTool({ type: "pointer" })
            return

        }


        // mosue up after the moving or resizing 
        // send and update the shape
        if (selectedShape.isSeletedShape && selectedShape.currentSelectedShape) {

            if (selectedShape.currentSelectedShape.type === "rect") {
                const { startX, startY, width, height, stroke, background, strokeWidth } = selectedShape.currentSelectedShape

                const dimension = rectangleDimension(startX, startY, width, height, clientX, clientY, selectedShape.actionType, distanceMoveClick)
                if (!dimension) return

                // update the existingShapes and render to static canva and make intractive canva disable
                CanvaChangeShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, existingShapes, selectedShape, {
                    type: "rect",
                    startX: dimension.startX,
                    startY: dimension.startY,
                    height: dimension.height,
                    width: dimension.width,
                    stroke,
                    background,
                    strokeWidth,
                    selected: false,
                    display: true
                }, style)
                setSelectedTool({ type: "pointer" })
                return
            }
            if (selectedShape.currentSelectedShape.type === "circle") {

                const { startX, startY, radiusX, radiusY, stroke, strokeWidth, background } = selectedShape.currentSelectedShape

                const dimension = circleDimension(startX, startY, radiusX, radiusY, moveX, moveY, selectedShape.actionType, distanceMoveClick)
                if (!dimension) return
                // update the existingShapes and render to static canva and make intractive canva disable
                CanvaChangeShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, existingShapes, selectedShape, {
                    type: "circle",
                    startX: dimension.startX,
                    startY: dimension.startY,
                    radiusX: dimension.radiusX,
                    radiusY: dimension.radiusY,
                    stroke,
                    background,
                    strokeWidth,
                    selected: false,
                    display: true
                }, style)
                setSelectedTool({ type: "pointer" })
                return
            }

            if (selectedShape.currentSelectedShape.type === "line") {
                const shape = selectedShape.currentSelectedShape
                const startX = clientX - distanceMoveClick.b
                const startY = clientY - distanceMoveClick.a
                const lx = shape.endX - shape.startX
                const ly = shape.endY - shape.startY
                CanvaChangeShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, existingShapes, selectedShape, {
                    type: "line",
                    startX,
                    startY,
                    endX: startX + lx,
                    endY: startY + ly,
                    stroke: shape.stroke,
                    strokeWidth: shape.strokeWidth,
                    display: true,
                    selected: false
                }, style)
                setSelectedTool({ type: "pointer" })
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
            //         strokestyle: "rgb(225,0,0)",
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
        //         strokestyle: "rgb(225,0,0)",
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

        // console.log([...existingShapes])
        const shape = selectedShape.currentSelectedShape
        console.log(selectedShape.actionType)
        if (selectedShape.isSeletedShape && shape) {
            if (selectedShape.actionType !== "none") {
                // console.log([...existingShapes])
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
                    if (shape.type === "line") {
                        distanceMoveClick.b = clientX - shape.startX
                        distanceMoveClick.a = clientY - shape.startY
                    }
                }
                clicked = true
                // find the element and make display false so that it will be not visible on the static canva when changing
                dCanvas.style.display = "block"
                console.log(`shape display ${shape.display}`)
                shape.display = true
                console.log(`shape display ${shape.display}`)
                clearCanvas(dCtx, dCanvas, "dymanic")
                console.log(shape.display)
                drawExistingShape([shape], dCtx, style)
                markSelectedShape(dCtx, shape)
                existingShapes.forEach(x => {
                    if (x === selectedShape.currentSelectedShape) {
                        x.display = false
                    }
                })
                clearCanvas(sCtx, sCanvas, "static")
                drawExistingShape(existingShapes, sCtx, style)
            }
        }
    })


    sCanvas.addEventListener("mousemove", (e) => {
        const clientX = e.clientX + Math.ceil(window.scrollX)
        const clientY = e.clientY + Math.ceil(window.scrollY)
        console.log(selectedShape.isSeletedShape)
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
                    console.log(`on the line where are you`)
                    sCanvas.style.cursor = "move"
                    selectedShape.actionType = "move"
                } else {
                    selectedShape.actionType = "none"
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
            drawExistingShape(existingShapes, sCtx, style)
            selectedShape.isSeletedShape = false
            styleRef.style.display = "none"
            selectedShape.currentSelectedShape = undefined
        } else {
            console.log([...selectedShape.currentShape])
            // mark the selected shape
            selectedShape.isSeletedShape = true
            styleRef.style.display = "block"
            clearCanvas(sCtx, sCanvas, "static")
            existingShapes.forEach(x => {
                drawExistingShape(existingShapes, sCtx, style)
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


// function dynamicMouseDown(e: MouseEvent) {
//     clicked = true

//     // when click happen set the starting value 
//     startX = e.clientX + Math.ceil(window.scrollX)
//     startY = e.clientY + Math.ceil(window.scrollY)


//     // if (shapeType.type === "pencile") {
//     //     dCtx.beginPath()
//     //     dCtx.strokestyle = "rgb(211,211,211)"
//     //     dCtx.lineWidth = 5
//     //     dCtx.lineJoin = "round"
//     //     dCtx.moveTo(startX, startY)
//     // }
// }

// function dynamicMouseUp(e: MouseEvent, sCtx: CanvasRenderingContext2D, dCtx: CanvasRenderingContext2D, sCanvas: HTMLCanvasElement, dCanvas: HTMLCanvasElement, socket: WebSocket, existingShapes: Shapes[], setSelectedTool: React.Dispatch<React.SetStateAction<IAction>>, Style: IStyles) {
//     clicked = false
//     const clientX = e.clientX + Math.ceil(window.scrollX)
//     const clientY = e.clientY + Math.ceil(window.scrollY)

//     let shape: Shapes
//     if (shapeType.type === "rect") {
//         const height = clientY - startY;
//         const width = clientX - startX
//         const x = width > 0 ? startX : startX + width
//         const y = height > 0 ? startY : startY + height

//         // update and send the shape to websocket server
//         CanvaShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, socket, existingShapes, {
//             type: "rect",
//             startX: x,
//             startY: y,
//             height: Math.abs(height),
//             width: Math.abs(width),
//             stroke: Style.stroke,
//             background: Style.background,
//             strokeWidth: Style.strokeWidth,
//             selected: false,
//             display: true
//         }, selectedShape, Style)
//         setSelectedTool({ type: "pointer" })
//         return

//     }
//     if (shapeType.type === "circle") {
//         const radiusX = Math.abs(clientX - startX);
//         const radiusY = Math.abs(clientY - startY);
//         // update and send the shape to websocket server
//         CanvaShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, socket, existingShapes, {
//             type: "circle",
//             startX,
//             startY,
//             radiusX,
//             radiusY,
//             stroke: Style.stroke,
//             background: Style.background,
//             strokeWidth: Style.strokeWidth,
//             selected: false,
//             display: true
//         }, selectedShape, Style)

//         setSelectedTool({ type: "pointer" })
//         return
//     }

//     if (shapeType.type === "line") {
//         // update and send the shape to websocket server
//         CanvaShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, socket, existingShapes, {
//             type: "line",
//             startX,
//             startY,
//             endX: clientX,
//             endY: clientY,
//             stroke: Style.stroke,
//             selected: false,
//             display: true
//         }, selectedShape, Style)
//         setSelectedTool({ type: "pointer" })
//         return
//     }
//     if (shapeType.type === "dimond ") {
//         const distance = Math.sqrt(Math.pow(clientX - startX, 2) + Math.pow(clientY - startY, 2))
//         // update and send the shape to websocket server
//         CanvaShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, socket, existingShapes, {
//             type: "dimond",
//             startX,
//             startY,
//             distance,
//             stroke: Style.stroke,
//             background: Style.background,
//             strokeWidth: Style.strokeWidth,
//             selected: false,
//             display: true
//         }, selectedShape, Style)
//         setSelectedTool({ type: "pointer" })
//         return

//     }


//     // mosue up after the moving or resizing 
//     // send and update the shape
//     if (selectedShape.isSeletedShape && selectedShape.currentSelectedShape) {

//         if (selectedShape.currentSelectedShape.type === "rect") {
//             const { startX, startY, width, height } = selectedShape.currentSelectedShape

//             const dimension = rectangleDimension(startX, startY, width, height, clientX, clientY, selectedShape.actionType, distanceMoveClick)
//             if (!dimension) return

//             // update the existingShapes and render to static canva and make intractive canva disable
//             CanvaChangeShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, existingShapes, selectedShape, {
//                 type: "rect",
//                 startX: dimension.startX,
//                 startY: dimension.startY,
//                 height: dimension.height,
//                 width: dimension.width,
//                 stroke: Style.stroke,
//                 background: Style.background,
//                 strokeWidth: Style.strokeWidth,
//                 selected: false,
//                 display: true
//             }, Style)
//             setSelectedTool({ type: "pointer" })
//             return
//         }
//         if (selectedShape.currentSelectedShape.type === "circle") {

//             const { startX, startY, radiusX, radiusY } = selectedShape.currentSelectedShape

//             const dimension = circleDimension(startX, startY, radiusX, radiusY, moveX, moveY, selectedShape.actionType, distanceMoveClick)
//             if (!dimension) return
//             // update the existingShapes and render to static canva and make intractive canva disable
//             CanvaChangeShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, existingShapes, selectedShape, {
//                 type: "circle",
//                 startX: dimension.startX,
//                 startY: dimension.startY,
//                 radiusX: dimension.radiusX,
//                 radiusY: dimension.radiusY,
//                 stroke: Style.stroke,
//                 background: Style.background,
//                 strokeWidth: Style.strokeWidth,
//                 selected: false,
//                 display: true
//             }, Style)
//             setSelectedTool({ type: "pointer" })
//             return
//         }
//         // if (selectedShape.currentSelectedShape.type === "text") {
//         //     const { top, left, text, textSize, width } = selectedShape.currentSelectedShape
//         //     const dimension = textDimension(top, left, width, 28, moveX, moveY, selectedShape.actionType, distanceMoveClick)
//         //     if (!dimension) return
//         //     CanvaChangeShapeUpdate(sCtx, sCanvas, dCtx, dCanvas, existingShapes, selectedShape, {
//         //         type: "text",
//         //         top: dimension.top,
//         //         left: dimension.left,
//         //         text,
//         //         width,
//         //         textSize,
//         //         strokestyle: "rgb(225,0,0)",
//         //         selected: false,
//         //         display: true

//         //     })
//         //     return
//         // }


//     }
// }


// function dynamicMouseMove(e: MouseEvent, dCtx: CanvasRenderingContext2D, dCanvas: HTMLCanvasElement, style: IStyles) {
//     const clientX = e.clientX + Math.ceil(window.scrollX)
//     const clientY = e.clientY + Math.ceil(window.scrollY)
//     dCanvas.style.cursor = "crosshair";
//     console.log(shapeType.type)
//     // draw the shape on the dymanic canva and clear the dynamic canva whenever the points changes
//     if (clicked) {
//         if (shapeType.type === "rect") {
//             const height = (clientY) - startY;
//             const width = (clientX) - startX
//             clearCanvas(dCtx, dCanvas, "dymanic")
//             rectangle(startX, startY, width, height, dCtx, style.stroke, style.strokeWidth, style.background, "rounded")

//         }

//         if (shapeType.type === "circle") {
//             const radiusX = Math.abs(clientX - startX);
//             const radiusY = Math.abs(clientY - startY);
//             clearCanvas(dCtx, dCanvas, "dymanic")
//             circle(startX, startY, radiusX, radiusY, dCtx, style.stroke, style.strokeWidth, style.background)
//         }


//         if (shapeType.type === "line") {
//             clearCanvas(dCtx, dCanvas, "dymanic")
//             line(startX, startY, clientX, clientY, "rgb(211, 211, 211)", dCtx)
//         }

//         if (shapeType.type === "dimond ") {
//             const d = Math.sqrt(Math.pow(clientX - startX, 2) + Math.pow(clientY - startY, 2))
//             clearCanvas(dCtx, dCanvas, "dymanic")
//             dimond(startX, startY, d, "rgb(211, 211, 211)", dCtx)

//         }

//         // continue the starting line that started when the clicked happen
//         if (shapeType.type === "pencile") {
//             // dCtx.lineTo(clientX, clientY)
//             // dCtx.stroke()
//             // pencileArray.push({ endX: clientX, endY: clientY })
//         }

//         // when the shape is moving or resizing
//         if (selectedShape.isSeletedShape && selectedShape.currentSelectedShape && selectedShape.actionType !== "none") {
//             const shape = selectedShape.currentSelectedShape
//             moveX = clientX;
//             moveY = clientY
//             if (shape.type === "rect") {
//                 // changing the dimension of the rectangle
//                 const dimension = rectangleDimension(shape.startX, shape.startY, shape.width, shape.height, clientX, clientY, selectedShape.actionType, distanceMoveClick)
//                 if (!dimension) return
//                 const { startX, startY, height, width, cursorType } = dimension
//                 dCanvas.style.cursor = cursorType
//                 clearCanvas(dCtx, dCanvas, "dymanic")
//                 rectangle(startX, startY, width, height, dCtx, style.stroke, style.strokeWidth, style.background, "rounded")
//                 markSelectedShape(dCtx, {
//                     type: "rect",
//                     startX,
//                     startY,
//                     height,
//                     width,
//                     selected: true,
//                     display: true,
//                     stroke: style.stroke,
//                     background: style.background,
//                     strokeWidth: style.strokeWidth,
//                 })
//             }

//             // broken login in moving the shape
//             if (shape.type === "circle") {
//                 const dimension = circleDimension(shape.startX, shape.startY, shape.radiusX, shape.radiusY, clientX, clientY, selectedShape.actionType, distanceMoveClick)
//                 if (!dimension) return
//                 const { startX, startY, radiusX, radiusY, cursorType } = dimension
//                 dCanvas.style.cursor = cursorType
//                 clearCanvas(dCtx, dCanvas, "dymanic")
//                 circle(startX, startY, radiusX, radiusY, dCtx, style.stroke, style.strokeWidth, style.background)
//                 markSelectedShape(dCtx, {
//                     type: "circle",
//                     startX,
//                     startY,
//                     radiusX,
//                     radiusY,
//                     selected: true,
//                     display: true,
//                     stroke: style.stroke,
//                     background: style.background,
//                     strokeWidth: style.strokeWidth,
//                 })
//             }

//             // if (shape.type === "text") {
//             //     const dimension = textDimension(shape.top, shape.left, shape.width, 28, clientX, clientY, selectedShape.actionType, distanceMoveClick)
//             //     if (!dimension) return
//             //     const { top, left } = dimension
//             //     dCanvas.style.cursor = "move"
//             //     clearCanvas(dCtx, dCanvas, "dymanic")
//             //     inserText(dCtx, shape.text, left, top)
//             // }

//         }

//     }
// }

// function staticMouseDown(e: MouseEvent, dCtx: CanvasRenderingContext2D, dCanvas: HTMLCanvasElement, sCtx: CanvasRenderingContext2D, sCanvas: HTMLCanvasElement, style: IStyles, existingShapes: Shapes[],) {
//     const clientX = e.clientX + Math.ceil(window.scrollX)
//     const clientY = e.clientY + Math.ceil(window.scrollY)
//     // if (shapeType.type === "text") {
//     //     if (!textAreaRef.current) return
//     //     let text = sCtx.measureText(textAreaRef.current.value)
//     //     const shape: Shapes = {
//     //         type: "text",
//     //         top: top,
//     //         left: left,
//     //         textSize: 24,
//     //         width: text.width,
//     //         text: textAreaRef.current.value,
//     //         strokestyle: "rgb(225,0,0)",
//     //         selected: false,
//     //         display: true
//     //     }
//     //     console.log(textAreaRef.current.value)
//     //     existingShapes.push(shape)
//     //     clearCanvas(sCtx, sCanvas, "static")
//     //     drawExistingShape(existingShapes, sCtx)
//     //     textAreaRef.current.style.display = "none"
//     // }
//     // console.log(selectedShape.actionType)

//     // when the click happen on the selected shape 

//     const shape = selectedShape.currentSelectedShape
//     if (selectedShape.isSeletedShape && shape) {
//         if (selectedShape.actionType !== "none") {
//             if (selectedShape.actionType === "move") {
//                 if (shape.type === "rect") {
//                     distanceMoveClick.a = clientY - shape.startY
//                     distanceMoveClick.b = clientX - shape.startX
//                 }
//                 if (shape.type === "text") {
//                     distanceMoveClick.a = clientY - shape.top
//                     distanceMoveClick.b = clientX - shape.left
//                 }
//                 if (shape.type === "circle") {
//                     distanceMoveClick.a = shape.startY - clientY
//                     distanceMoveClick.b = shape.startX - clientX
//                 }
//             }
//             clicked = true
//             // find the element and make display false so that it will be not visible on the static canva when changing
//             dCanvas.style.display = "block"
//             clearCanvas(dCtx, dCanvas, "dymanic")
//             console.log(shape.display)
//             drawExistingShape([shape], dCtx, style)
//             markSelectedShape(dCtx, shape)
//             const index = existingShapes.findIndex(x => x === selectedShape.currentSelectedShape)
//             existingShapes.splice(index, 1)
//             clearCanvas(sCtx, sCanvas, "static")
//             drawExistingShape(existingShapes, sCtx, style)
//         }
//     }
// }


// function staticMouseMove(e: MouseEvent, sCanvas: HTMLCanvasElement, existingShapes: Shapes[]) {
//     const clientX = e.clientX + Math.ceil(window.scrollX)
//     const clientY = e.clientY + Math.ceil(window.scrollY)

//     if (shapeType.type === "pointer") {
//         // console.log("on static canva")
//         // console.log(shapeType.type)
//         sCanvas.style.cursor = "default";
//         // keep checking that the mouse is on the shape and make the cursor type  move
//         onShape(sCanvas, existingShapes, clientX, clientY, selectedShape.currentShape)


//     }

//     // 1. corner mouse is remaining

//     // depending upon the selected shape check whether the mouse is inside or on which side of the marked shape and according to that change the actionType 
//     if (selectedShape.isSeletedShape && selectedShape.currentSelectedShape) {
//         const x = selectedShape.currentSelectedShape
//         if (x.type === "rect") {
//             // depending on the where mouse is on markedShape it set the actionType
//             selectedShape.actionType = onMarkedShape(x.startX - 9, x.startY - 9, x.width + 1, x.height + 1, clientX, clientY, sCanvas)
//             // console.log(a)
//         }

//         if (x.type === "circle") {
//             selectedShape.actionType = onMarkedShape(x.startX - x.radiusX - 7, x.startY - x.radiusY - 7, 2 * x.radiusX - 2, 2 * x.radiusY - 2, clientX, clientY, sCanvas)

//         }
//         if (x.type === "dimond") {
//             selectedShape.actionType = onMarkedShape(x.startX - (x.distance / 2) - 4, x.startY - 4, x.distance - 5, x.distance - 5, clientX, clientY, sCanvas)
//         }

//         if (x.type === "line") {
//             const onLine = onLineShape(x.startX, x.startY, x.endX, x.endY, clientX, clientY)
//             if (onLine) {
//                 sCanvas.style.cursor = "move"
//                 selectedShape.actionType = "move"
//             }
//         }

//         if (x.type === "text") {
//             selectedShape.actionType = onMarkedShape(x.left - 10, x.top - 15, x.width + 14, 23, clientX, clientY, sCanvas)

//         }


//     }

// }


// function staticMouseUp(sCtx: CanvasRenderingContext2D, sCanvas: HTMLCanvasElement, existingShapes: Shapes[], style: IStyles) {
//     clicked = false
//     if (shapeType.type === "text") {
//         shapeType.type = "pointer"
//     }


//     // selecting and de-selecting the shape
//     if (!selectedShape.currentShape[0]) {
//         console.log([...selectedShape.currentShape])
//         clearCanvas(sCtx, sCanvas, "static")
//         drawExistingShape(existingShapes, sCtx, style)

//         selectedShape.isSeletedShape = false
//         selectedShape.currentSelectedShape = undefined
//     } else {
//         console.log([...selectedShape.currentShape])
//         // mark the selected shape
//         selectedShape.isSeletedShape = true
//         existingShapes.forEach(x => {
//             clearCanvas(sCtx, sCanvas, "static")
//             drawExistingShape(existingShapes, sCtx, style)
//             if (x === selectedShape.currentShape[0]) {
//                 selectedShape.currentSelectedShape = x
//             }
//         })
//         markSelectedShape(sCtx, selectedShape.currentShape[0])
//     }

// }



