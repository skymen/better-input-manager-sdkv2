export const config = {
  highlight: false,
  deprecated: false,
  listName: "Is Any Down",
  displayText: "Is any input down for player [i]{0}[/i]",
  description: "Test if any input is down",
  params: [
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
export default function (player) {
  if (player >= 0) {
    return this.IsAnyDigitalInputDown(player);
  }
  for (const [key] of this.playerData) {
    if (this.IsAnyDigitalInputDown(key)) {
      return true;
    }
  }
  return false;
}
