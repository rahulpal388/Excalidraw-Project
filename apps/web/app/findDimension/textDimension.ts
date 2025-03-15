import { IActionType } from "../drawCanvas/drawShape";


// height need to be dynamic ====> remaining
export function textDimension(top: number, left: number, width: number, height: number, clientX: number, clientY: number, where: IActionType, distanceMoveClick: { a: number, b: number }): {
    top: number,
    left: number,
} | null {
    if (where === "move") {
        return {
            top: clientX - distanceMoveClick.a,
            left: clientY - distanceMoveClick.b

        }
    }




    return null
}