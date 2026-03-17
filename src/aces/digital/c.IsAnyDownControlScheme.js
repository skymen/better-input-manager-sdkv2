export const config = {
  highlight: false,
  deprecated: false,
  listName: "Is Any Down For Control Scheme",
  displayText:
    "Is any input down for player [i]{0}[/i] with control scheme [i]{1}[/i]",
  description: "Test if any input is down for a specific control scheme",
  params: [
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
export default function (player, scheme) {
  if (player >= 0) {
    return this.IsAnyDigitalInputDown(player, scheme);
  }
  for (const [key] of this.playerData) {
    if (this.IsAnyDigitalInputDown(key, scheme)) {
      return true;
    }
  }
  return false;
}
