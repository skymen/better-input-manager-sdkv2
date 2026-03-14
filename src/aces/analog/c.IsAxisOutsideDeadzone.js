export const config = {
  highlight: true,
  deprecated: false,
  listName: "Is Axis Outside Deadzone",
  displayText: "Is axis [i]{0}[/i] outside deadzone for player [i]{1}[/i]",
  description: "Test if an axis is outside its deadzone",
  params: [
    { id: "name", name: "Name", desc: "The name of the axis", type: "string", initialValue: '""' },
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "0" },
  ],
};
export const expose = true;
export default function (name, player) {
  return this._IsAxisOutsideDeadzone(name, player);
}
