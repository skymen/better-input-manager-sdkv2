export const config = {
  highlight: true,
  deprecated: false,
  listName: "Is Input Enabled",
  displayText: "Is input [i]{0}[/i] enabled for player [i]{1}[/i]",
  description:
    "Test whether an input is effectively enabled (both the master toggle and its per-input flag allow it)",
  params: [
    {
      id: "name",
      name: "Name",
      desc: "The name of the input",
      type: "string",
      initialValue: '""',
      autocompleteId: "input-name",
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
export const expose = true;
export default function (name, player) {
  if (player >= 0) {
    return this.GetInputEnabled(name, player);
  }
  for (const [key] of this.playerData) {
    if (this.GetInputEnabled(name, key)) {
      return true;
    }
  }
  return false;
}
