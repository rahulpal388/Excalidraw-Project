import { findDistance } from "../drawCanvas/findDistance";
import { Shapes } from "../drawCanvas/getShapes";


export function onLineShape(startX: number, startY: number, endX: number, endY: number, clientX: number, clientY: number): boolean {

    const length = findDistance(startX, startY, endX, endY)
    const rigthLenght = findDistance(startX, startY, clientX, clientY)
    const leftLenght = findDistance(endX, endY, clientX, clientY)
    const onLine = Math.ceil(length) === Math.ceil(rigthLenght + leftLenght)

    if (onLine) {

        return true
    }
    return false

}