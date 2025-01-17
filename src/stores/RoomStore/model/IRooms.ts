interface IDuty {
  id: string;
  title: string;
  description: string | undefined;
}

interface IProfile {
  username: string;
  avatar_url: string;
}

export interface IRooms {
  room_id: string;
  name: string;
  state: boolean;
  user_id: string;
  duties: IDuty[];
  profiles: IProfile;
}

export type TRoomPayload = Pick<IRooms, "name" | "user_id">;
export type TEditRoomPayload = Pick<IRooms, "name" | "user_id" | "room_id">;
