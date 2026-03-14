export const config = {
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Set Joystick Value",
  displayText: "Set joystick [i]{0}[/i] to [i]{1}[/i], [i]{2}[/i] for player [i]{3}[/i] with control scheme [i]{4}[/i] (prevent auto switch: [i]{5}[/i])",
  description: "Set a joystick to a value",
  params: [
    { id: "name", name: "Name", desc: "The name of the input", type: "string", initialValue: '""' },
    { id: "x", name: "X", desc: "The X value of the joystick from -1 to 1", type: "number", initialValue: "0" },
    { id: "y", name: "Y", desc: "The Y value of the joystick from -1 to 1", type: "number", initialValue: "0" },
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "0" },
    { id: "control-scheme", name: "Control Scheme", desc: "The control scheme ID", type: "string", initialValue: '""' },
    { id: "prevent-auto-switch", name: "Prevent Auto Switch", desc: "Whether to prevent the control scheme from automatically switching", type: "boolean", initialValue: "false" },
  ],
};
export const expose = true;
export default function (name, x, y, player, scheme, preventAutoSwitch) {
  this._SetJoystickValue(name, x, y, player, scheme, preventAutoSwitch);
}
