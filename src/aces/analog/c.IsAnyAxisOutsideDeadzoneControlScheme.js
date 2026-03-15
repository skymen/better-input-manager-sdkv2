export const config = {
  highlight: false,
  deprecated: false,
  listName: "Is Any Axis Outside Deadzone For Control Scheme",
  displayText: "Is any axis outside deadzone for player [i]{0}[/i] and control scheme [i]{1}[/i]",
  description: "Test if any axis is outside its deadzone for a control scheme",
  params: [
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "0" },
    { id: "controlScheme", name: "Control Scheme", desc: "The control scheme to test", type: "string", initialValue: '""' },
  ],
};
export const expose = true;
export default function (player, scheme) {
  if (player >= 0) {
    return this.IsAnyAxisOutsideDeadzone(player, scheme);
  }
  for (const [key] of this.playerData) {
    if (this.IsAnyAxisOutsideDeadzone(key, scheme)) {
      return true;
    }
  }
  return false;
}
