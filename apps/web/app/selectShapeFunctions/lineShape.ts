import { findDistance } from "../drawCanvas/findDistance";
import { Shapes } from "../drawCanvas/getShapes";


export function onLineShape(shape: Shapes, clientX: number, clientY: number, onClick: () => void) {
    if (shape.type === "line") {
        const length = findDistance(shape.startX, shape.startY, shape.endX, shape.endY)
        const rigthLenght = findDistance(shape.startX, shape.startY, clientX, clientY)
        const leftLenght = findDistance(shape.endX, shape.endY, clientX, clientY)
        const onLine = Math.ceil(length) === Math.ceil(rigthLenght + leftLenght)


        if (onLine) {
            onClick()
        }
    }

}