import { Shapes } from "./getShapes";
import { isRectangleShape } from "../selectShapeFunctions/rectangleShape";
import { onCircleShape } from "../selectShapeFunctions/circleShape";
import { onDimondShape } from "../selectShapeFunctions/dimondShape";
import { onLineShape } from "../selectShapeFunctions/lineShape";



export function onShape(existingShapes: Shapes[], clientX: number, clientY: number, currentShape: { value: Shapes }): boolean {
    for (let x of existingShapes) {
        if (x.type === "rect") {
            const onRectangle = isRectangleShape(x.startX - 4, x.startY - 4, x.width + 8, x.height + 8, clientX, clientY, "inside") && isRectangleShape(x.startX + 4, x.startY + 4, x.width - 8, x.height - 8, clientX, clientY, "outside")
            if (onRectangle) {
                currentShape.value = { ...x }
                return true;
            }

        }
        if (x.type === "circle") {
            const onCircle = onCircleShape(x, clientX, clientY, "both")
            if (onCircle) {
                currentShape.value = { ...x }
                return true
            }
        }
        if (x.type === "arrow") {
            const onLine = onLineShape(x.startX, x.startY, x.endX, x.endY, clientX, clientY)
            if (onLine) {
                currentShape.value = { ...x }
                return true

            }
        }

        if (x.type === "dimond") {
            const onDimond = onDimondShape(x, clientX, clientY, "both")
            if (onDimond) {
                return true
            }

        }
        // if (x.type === "text") {
        //     const onText = isRectangleShape(x.left - 10, x.top - 15, x.width + 16, 28, clientX, clientY, "inside")
        //     if (onText) {
        //         return true
        //     }
        // }

    }

    currentShape.value = {} as Shapes
    return false


}


