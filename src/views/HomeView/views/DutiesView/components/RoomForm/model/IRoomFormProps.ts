import { TEditRoomPayload } from "@/stores/RoomStore/model/IRooms";

export interface IRoomFormProps {
  editMode: boolean;
  room?: TEditRoomPayload;
}
