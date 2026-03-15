export const config = {
  highlight: false,
  deprecated: false,
  isAsync: false,
  listName: "Set Axis Deadzone",
  displayText: "Set axis [i]{0}[/i] deadzone to [i]{1}[/i]",
  description: "Set the deadzone for an axis",
  params: [
    {
      id: "name",
      name: "Name",
      desc: "The name of the input",
      type: "string",
      initialValue: '""',
    },
    {
      id: "deadzone",
      name: "Deadzone",
      desc: "The deadzone for the axis (0-1). Negative value to use default deadzone",
      type: "number",
      initialValue: "0.2",
    },
  ],
};
export const expose = false;
export default function (name, value) {
  value = this.Clamp(value, -1, 1);
  this.SetAxisInputDeadzone(name, value);
}
