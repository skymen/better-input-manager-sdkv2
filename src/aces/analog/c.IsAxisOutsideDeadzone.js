export const config = {
  highlight: true,
  deprecated: false,
  listName: "Is Axis Outside Deadzone",
  displayText: "Is axis [i]{0}[/i] outside deadzone for player [i]{1}[/i]",
  description: "Test if an axis is outside its deadzone",
  params: [
    {
      id: "name",
      name: "Name",
      desc: "The name of the axis",
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
  ],
};
export const expose = false;
export default function (name, player) {
  if (player >= 0) {
    return this.IsAxisOutsideDeadzone(name, player);
  }
  for (const [key] of this.playerData) {
    if (this.IsAxisOutsideDeadzone(name, key)) {
      return true;
    }
  }
  return false;
}
