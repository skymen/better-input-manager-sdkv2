export const config = {
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Set Joystick From Inputs",
  displayText:
    "Set joystick [i]{0}[/i] from inputs X- [i]{1}[/i] X+ [i]{2}[/i] Y- [i]{3}[/i] Y+ [i]{4}[/i] for player [i]{5}[/i] with control scheme [i]{6}[/i] (prevent auto switch: [i]{7}[/i])",
  description:
    "Set a joystick value from four digital inputs (positive - negative per axis, normalized to length 1)",
  params: [
    {
      id: "name",
      name: "Name",
      desc: "The name of the joystick to set",
      type: "string",
      initialValue: '""',
      autocompleteId: "joystick-name",
    },
    {
      id: "x-negative",
      name: "X Negative",
      desc: "The digital input name for the negative X direction (left)",
      type: "string",
      initialValue: '""',
      autocompleteId: "input-name",
    },
    {
      id: "x-positive",
      name: "X Positive",
      desc: "The digital input name for the positive X direction (right)",
      type: "string",
      initialValue: '""',
      autocompleteId: "input-name",
    },
    {
      id: "y-negative",
      name: "Y Negative",
      desc: "The digital input name for the negative Y direction (up)",
      type: "string",
      initialValue: '""',
      autocompleteId: "input-name",
    },
    {
      id: "y-positive",
      name: "Y Positive",
      desc: "The digital input name for the positive Y direction (down)",
      type: "string",
      initialValue: '""',
      autocompleteId: "input-name",
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
export default function (
  name,
  xNegative,
  xPositive,
  yNegative,
  yPositive,
  player,
  scheme,
  preventAutoSwitch,
) {
  const doSet = (p) => {
    const xPos = this.GetDigitalInputState(xPositive, p, scheme) ? 1 : 0;
    const xNeg = this.GetDigitalInputState(xNegative, p, scheme) ? 1 : 0;
    const yPos = this.GetDigitalInputState(yPositive, p, scheme) ? 1 : 0;
    const yNeg = this.GetDigitalInputState(yNegative, p, scheme) ? 1 : 0;

    let x = xPos - xNeg;
    let y = yPos - yNeg;

    // Normalize to length 1 if magnitude exceeds 1 (prevents faster diagonal movement)
    const magnitude = Math.sqrt(x * x + y * y);
    if (magnitude > 1) {
      x /= magnitude;
      y /= magnitude;
    }

    this.SetJoystickInputState(name, p, scheme, x, y, preventAutoSwitch);
  };
  if (player >= 0) {
    doSet(player);
  } else {
    this.ForEveryPlayer((key) => doSet(key));
  }
}
