export const config = {
  highlight: false,
  deprecated: false,
  listName: "Is Joystick Outside Deadzone For Control Scheme",
  displayText:
    "Is joystick [i]{0}[/i] outside deadzone for player [i]{1}[/i] and control scheme [i]{2}[/i]",
  description:
    "Test if a joystick is outside its deadzone for a control scheme",
  params: [
    {
      id: "name",
      name: "Name",
      desc: "The name of the joystick",
      type: "string",
      initialValue: '""',
    },
    {
      id: "player",
      name: "Player",
      desc: "The player ID, -1 for all players",
      type: "number",
      initialValue: "0",
    },
    {
      id: "controlScheme",
      name: "Control Scheme",
      desc: "The control scheme to test",
      type: "string",
      initialValue: '""',
    },
  ],
};
export const expose = false;
export default function (name, player, scheme) {
  if (player >= 0) {
    return this.IsJoystickOutsideDeadzone(name, player, scheme);
  }
  for (const [key] of this.playerData) {
    if (this.IsJoystickOutsideDeadzone(name, key, scheme)) {
      return true;
    }
  }
  return false;
}
