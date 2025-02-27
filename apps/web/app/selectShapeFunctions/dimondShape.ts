import { Shapes } from "../drawCanvas/getShapes";



export function onDimondShape(shape: Shapes, clientX: number, clientY: number, where: "inside" | "outside" | "both"): boolean {
    if (shape.type === "dimond") {
        const Cy = shape.startY + shape.distance / 2
        const inDimond = Math.abs(clientX - shape.startX) + Math.abs(clientY - Cy) <= (shape.distance + 10) / 2
        const outDimond = Math.abs(clientX - shape.startX) + Math.abs(clientY - Cy) > (shape.distance - 10) / 2

        const onDimond = where === "both" ? inDimond && outDimond : where === "inside" ? inDimond : outDimond
        if (onDimond) {
            return true
        }
    }
    return false
}