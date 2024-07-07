export default interface IMenuItem {
  color: "error" | "success" | "warning";
  text: string;
  icon: string;
  action?: Function;
}
