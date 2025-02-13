import { RoomCanva } from "../../components/Roomcanva";



export default async function CanvaPage({ params }: {
    params: {
        roomId: string
    }
}) {
    const roomId = (await params).roomId
    console.log(roomId)
    return < RoomCanva roomId={roomId} />
}