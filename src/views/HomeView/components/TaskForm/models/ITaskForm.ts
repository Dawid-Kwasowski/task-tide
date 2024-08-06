export default interface ITaskForm {
  creator_id?: string;
  deadline: Date | string;
  description?: string;
  title?: string;
  editMode?: boolean;
  id?: string;
}
