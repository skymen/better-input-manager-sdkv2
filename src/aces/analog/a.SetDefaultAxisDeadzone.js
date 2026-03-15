export const config = {
  highlight: false,
  deprecated: false,
  isAsync: false,
  listName: "Set Default Axis Deadzone",
  displayText: "Set default axis deadzone to [i]{0}[/i]",
  description:
    "Set the default deadzone for all axes that don't have a custom deadzone set",
  params: [
    {
      id: "deadzone",
      name: "Deadzone",
      desc: "The default deadzone for all axes",
      type: "number",
      initialValue: "0.2",
    },
  ],
};
export const expose = false;
export default function (value) {
  value = this.Clamp(value, 0, 1);
  this.defaultAxisDeadzone = value;
}
