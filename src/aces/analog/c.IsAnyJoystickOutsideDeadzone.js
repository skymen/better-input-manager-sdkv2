export const config = {
  highlight: false,
  deprecated: false,
  listName: "Is Any Joystick Outside Deadzone",
  displayText: "Is any joystick outside deadzone for player [i]{0}[/i]",
  description: "Test if any joystick is outside its deadzone",
  params: [
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "0" },
  ],
};
export const expose = true;
export default function (player) {
  return this._IsAnyJoystickOutsideDeadzone(player);
}
