export const config = {
  highlight: false,
  deprecated: false,
  isAsync: false,
  listName: "Set Joystick Value Y",
  displayText:
    "Set joystick [i]{0}[/i] Y to [i]{1}[/i] for player [i]{2}[/i] with control scheme [i]{3}[/i] (prevent auto switch: [i]{4}[/i])",
  description: "Set a joystick Y value",
  params: [
    {
      id: "name",
      name: "Name",
      desc: "The name of the input",
      type: "string",
      initialValue: '""',
      autocompleteId: "joystick-name",
    },
    {
      id: "value",
      name: "Value",
      desc: "The value of the joystick from -1 to 1",
      type: "number",
      initialValue: "0",
    },
    {
      id: "player",
      name: "Player",
      desc: "The player ID, -1 for all players",
      type: "number",
      initialValue: "0",
    },
    {
      id: "control-scheme",
      name: "Control Scheme",
      desc: "The control scheme ID",
      type: "string",
      initialValue: '""',
      autocompleteId: "control-scheme",
    },
    {
      id: "prevent-auto-switch",
      name: "Prevent Auto Switch",
      desc: "Whether to prevent the control scheme from automatically switching",
      type: "boolean",
      initialValue: "false",
    },
  ],
};
export const expose = false;
export default function (name, y, player, scheme, preventAutoSwitch) {
  y = this.Clamp(y, -1, 1);
  const doSet = (p) => {
    this.SetJoystickInputStateY(name, p, scheme, y, preventAutoSwitch);
  };
  if (player >= 0) {
    doSet(player);
  } else {
    this.ForEveryPlayer((key) => doSet(key));
  }
}
