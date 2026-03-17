export const config = {
  highlight: false,
  deprecated: false,
  listName: "Is Any Joystick Outside Deadzone For Control Scheme",
  displayText:
    "Is any joystick outside deadzone for player [i]{0}[/i] and control scheme [i]{1}[/i]",
  description:
    "Test if any joystick is outside its deadzone for a control scheme",
  params: [
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
      autocompleteId: "control-scheme",
    },
  ],
};
export const expose = false;
export default function (player, scheme) {
  if (player >= 0) {
    return this.IsAnyJoystickOutsideDeadzone(player, scheme);
  }
  for (const [key] of this.playerData) {
    if (this.IsAnyJoystickOutsideDeadzone(key, scheme)) {
      return true;
    }
  }
  return false;
}
