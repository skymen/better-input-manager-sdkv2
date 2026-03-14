export const config = {
  highlight: false,
  deprecated: false,
  isAsync: false,
  listName: "Set Default Joystick Deadzone",
  displayText: "Set default joystick deadzone to [i]{0}[/i]",
  description: "Set the default deadzone for all joysticks that don't have a custom deadzone set",
  params: [
    { id: "deadzone", name: "Deadzone", desc: "The default deadzone for all joysticks", type: "number", initialValue: "0.2" },
  ],
};
export const expose = true;
export default function (value) {
  this._SetDefaultJoystickDeadzone(value);
}
