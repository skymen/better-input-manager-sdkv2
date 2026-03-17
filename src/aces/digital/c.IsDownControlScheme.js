export const config = {
  highlight: false,
  deprecated: false,
  listName: "Is Down For Control Scheme",
  displayText:
    "Is [i]{0}[/i] down for player [i]{1}[/i] with control scheme [i]{2}[/i]",
  description: "Test if an input is down for a specific control scheme",
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
    return this.GetDigitalInputState(name, player, scheme);
  }
  for (const [key] of this.playerData) {
    if (this.GetDigitalInputState(name, key, scheme)) {
      return true;
    }
  }
  return false;
}
