export const config = {
  highlight: true,
  deprecated: false,
  listName: "Is Joystick Outside Deadzone",
  displayText: "Is joystick [i]{0}[/i] outside deadzone for player [i]{1}[/i]",
  description: "Test if a joystick is outside its deadzone",
  params: [
    {
      id: "name",
      name: "Name",
      desc: "The name of the joystick",
      type: "string",
      initialValue: '""',
      autocompleteId: "joystick-name",
    },
    {
      id: "player",
      name: "Player",
      desc: "The player ID, -1 for all players",
      type: "number",
      initialValue: "0",
    },
  ],
};
export const expose = false;
export default function (name, player) {
  if (player >= 0) {
    return this.IsJoystickOutsideDeadzone(name, player);
  }
  for (const [key] of this.playerData) {
    if (this.IsJoystickOutsideDeadzone(name, key)) {
      return true;
    }
  }
  return false;
}
