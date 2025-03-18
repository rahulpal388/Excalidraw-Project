import { Shapes } from "./getShapes";
import { isRectangleShape } from "../selectShapeFunctions/rectangleShape";
import { onCircleShape } from "../selectShapeFunctions/circleShape";
import { onDimondShape } from "../selectShapeFunctions/dimondShape";
import { onLineShape } from "../selectShapeFunctions/lineShape";



export function onShape(sCanvas: HTMLCanvasElement, existingShapes: Shapes[], clientX: number, clientY: number, currentShape: Shapes[]): boolean {
    currentShape.length = 0
    existingShapes.forEach(x => {
        if (x.type === "rect") {
            const onRectangle = isRectangleShape(x.startX - 4, x.startY - 4, x.width + 8, x.height + 8, clientX, clientY, "inside") && isRectangleShape(x.startX + 4, x.startY + 4, x.width - 8, x.height - 8, clientX, clientY, "outside")
            if (onRectangle) {
                console.log("on rectangel shape")
                sCanvas.style.cursor = "move"
                currentShape.push(x)
                return true

            }

        }
        if (x.type === "circle") {
            // console.log(x)
            const onCircle = onCircleShape(x, clientX, clientY, "both")
            if (onCircle) {
                console.log("on circle")
                sCanvas.style.cursor = "move"
                currentShape.push(x)
                return true
            }
        }


        if (x.type === "dimond") {
            const onDimond = onDimondShape(x, clientX, clientY, "both")
            if (onDimond && !x.selected) {
                sCanvas.style.cursor = "move"
                currentShape.push(x)
                return true
            }

        }


        if (x.type === "line") {
            const onLine = onLineShape(x.startX, x.startY, x.endX, x.endY, clientX, clientY)
            if (onLine && !x.selected) {
                sCanvas.style.cursor = "move"
                currentShape.push(x)
                return true
            }
        }

        if (x.type === "text") {
            const onText = isRectangleShape(x.left - 10, x.top - 15, x.width + 16, 28, clientX, clientY, "inside")
            if (onText) {
                sCanvas.style.cursor = "move"
                currentShape.push(x)
                return true
                // console.log("on the text")
            }
        }

    })
    return false

}


