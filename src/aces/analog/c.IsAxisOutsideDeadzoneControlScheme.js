export const config = {
  highlight: false,
  deprecated: false,
  listName: "Is Axis Outside Deadzone For Control Scheme",
  displayText:
    "Is axis [i]{0}[/i] outside deadzone for player [i]{1}[/i] and control scheme [i]{2}[/i]",
  description: "Test if an axis is outside its deadzone for a control scheme",
  params: [
    {
      id: "name",
      name: "Name",
      desc: "The name of the axis",
      type: "string",
      initialValue: '""',
      autocompleteId: "axis-name",
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
      autocompleteId: "control-scheme",
    },
  ],
};
export const expose = false;
export default function (name, player, scheme) {
  if (player >= 0) {
    return this.IsAxisOutsideDeadzone(name, player, scheme);
  }
  for (const [key] of this.playerData) {
    if (this.IsAxisOutsideDeadzone(name, key, scheme)) {
      return true;
    }
  }
  return false;
}
