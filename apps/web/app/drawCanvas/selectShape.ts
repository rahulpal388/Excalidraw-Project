import { Shapes } from "./getShapes";
import { onRectangleShape } from "../selectShapeFunctions/rectangleShape";
import { onLineShape } from "../selectShapeFunctions/lineShape";
import { onCircleShape } from "../selectShapeFunctions/circleShape";
import { onDimondShape } from "../selectShapeFunctions/dimondShape";
import { clearCanvas } from "./clearCanva";
import { rectangle } from "../drawShape/rectangle";



export function selectShape(canvas: HTMLCanvasElement, existingShapes: Shapes[], ctx: CanvasRenderingContext2D, clientX: number, clientY: number, selectedShape: Shapes[], cursorType: "move" | "none") {

    existingShapes.forEach(x => {
        if (x.type === "rect") {
            onRectangleShape(x, clientX, clientY, () => {
                canvas.style.cursor = cursorType

                if (!selectedShape.includes(x)) {
                    selectedShape.push(x);
                    if (cursorType === "none") {
                        selectedShape.forEach(shape => {
                            shape.strokeStyle = "rgb(49, 48, 59)"
                        })
                        clearCanvas(existingShapes, ctx, canvas)
                    }
                }
            })


        }
        if (x.type === "line") {
            onLineShape(x, clientX, clientY, () => {
                canvas.style.cursor = cursorType
                if (!selectedShape.includes(x)) {
                    selectedShape.push(x);
                    if (cursorType === "none") {
                        selectedShape.forEach(shape => {
                            shape.strokeStyle = "rgb(49, 48, 59)"
                        })
                        clearCanvas(existingShapes, ctx, canvas)
                    }
                }

            })
        }
        if (x.type === "circle") {
            onCircleShape(x, clientX, clientY, () => {
                canvas.style.cursor = cursorType
                if (!selectedShape.includes(x)) {
                    selectedShape.push(x);
                    if (cursorType === "none") {
                        selectedShape.forEach(shape => {
                            shape.strokeStyle = "rgb(49, 48, 59)"
                        })
                        clearCanvas(existingShapes, ctx, canvas)
                    }
                }
            })
        }


        if (x.type === "dimond") {
            onDimondShape(x, clientX, clientY, () => {
                canvas.style.cursor = cursorType

                if (!selectedShape.includes(x)) {
                    selectedShape.push(x);
                    if (cursorType === "none") {
                        selectedShape.forEach(shape => {
                            shape.strokeStyle = "rgb(49, 48, 59)"
                        })
                        clearCanvas(existingShapes, ctx, canvas)
                    }
                }
            })

        }



    })

}


