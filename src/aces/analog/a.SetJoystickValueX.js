export const config = {
  highlight: false,
  deprecated: false,
  isAsync: false,
  listName: "Set Joystick Value X",
  displayText: "Set joystick [i]{0}[/i] X to [i]{1}[/i] for player [i]{2}[/i] with control scheme [i]{3}[/i] (prevent auto switch: [i]{4}[/i])",
  description: "Set a joystick X value",
  params: [
    { id: "name", name: "Name", desc: "The name of the input", type: "string", initialValue: '""' },
    { id: "value", name: "Value", desc: "The value of the joystick from -1 to 1", type: "number", initialValue: "0" },
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "0" },
    { id: "control-scheme", name: "Control Scheme", desc: "The control scheme ID", type: "string", initialValue: '""' },
    { id: "prevent-auto-switch", name: "Prevent Auto Switch", desc: "Whether to prevent the control scheme from automatically switching", type: "boolean", initialValue: "false" },
  ],
};
export const expose = true;
export default function (name, x, player, scheme, preventAutoSwitch) {
  this._SetJoystickValueX(name, x, player, scheme, preventAutoSwitch);
}
