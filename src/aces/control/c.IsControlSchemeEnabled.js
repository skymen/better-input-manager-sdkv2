export const config = {
  highlight: true,
  deprecated: false,
  listName: "Is Control Scheme Enabled",
  displayText: "Is control scheme [i]{0}[/i] enabled for player [i]{1}[/i]",
  description: "Test if a control scheme is enabled",
  params: [
    {
      id: "name",
      name: "Name",
      desc: "The name of the control scheme",
      type: "string",
      initialValue: '""',
      autocompleteId: "control-scheme",
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
    return this.GetControlSchemeEnabled(player, name);
  }
  for (const [key] of this.playerData) {
    if (this.GetControlSchemeEnabled(key, name)) {
      return true;
    }
  }
  return false;
}
