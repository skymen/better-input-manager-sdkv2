export const config = {
  highlight: false,
  deprecated: false,
  listName: "Is Any Axis Outside Deadzone",
  displayText: "Is any axis outside deadzone for player [i]{0}[/i]",
  description: "Test if any axis is outside its deadzone",
  params: [
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "0" },
  ],
};
export const expose = true;
export default function (player) {
  if (player >= 0) {
    return this.IsAnyAxisOutsideDeadzone(player);
  }
  for (const [key] of this.playerData) {
    if (this.IsAnyAxisOutsideDeadzone(key)) {
      return true;
    }
  }
  return false;
}
