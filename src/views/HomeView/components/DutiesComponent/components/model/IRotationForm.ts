export interface IRotationForm {
  assignedDuties: IAssignedDuties[];
}
export interface IAssignedDuties {
  duties: IUserDuty[];
  username: string;
  avatar: string | undefined;
  id: string;
  user_id: string;
}

interface IUserDuty {
  title: string;
  description: string;
}
