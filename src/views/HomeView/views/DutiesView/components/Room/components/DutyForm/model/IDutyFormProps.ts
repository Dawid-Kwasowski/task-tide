import { IDuty } from "@/stores/RoomStore/model/IDuty";

type TDuty = Omit<IDuty, "room_id">;

export interface IDutyFormProps {
  room_id: string;
  edit_mode?: boolean;
  duty?: TDuty;
}
