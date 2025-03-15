

export function line(startX: number, startY: number, endX: number, endY: number, Strokecolor: string, ctx: CanvasRenderingContext2D) {
    // const angle = Math.atan2((endY - startY), (endX - startX))
    // const x = endX + (30 * (Math.cos(angle * (Math.PI / 180))))
    // const y = endY + (30 * (Math.sin(angle * (Math.PI / 180))))
    // const x2 = endX + (30 * (Math.cos(-angle * (Math.PI / 180))))
    // const y2 = endY + (30 * (Math.sin(-angle * (Math.PI / 180))))
    // console.log(x, y)
    ctx.strokeStyle = Strokecolor
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    // ctx.lineTo(x, y)
    // ctx.moveTo(endX, endY)
    // ctx.lineTo(x2, y2)
    ctx.stroke();
    ctx.closePath();



}


export function drawArrowhead(context: CanvasRenderingContext2D, from: { x: number, y: number }, to: { x: number, y: number }, radius: number) {
    let x_center = to.x;
    let y_center = to.y;

    let angle;
    let x;
    let y;


    context.beginPath();
    context.strokeStyle = "rgb(225,0,0)"
    angle = Math.atan2(to.y - from.y, to.x - from.x)
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;
    // console.log(x, y)
    context.moveTo(x, y);

    angle += (1.0 / 3.0) * (2 * Math.PI)
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;

    console.log(x, y)
    context.lineTo(x, y);

    angle += (1.0 / 3.0) * (2 * Math.PI)
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;

    context.lineTo(x, y);

    context.closePath();

    context.stroke();
}