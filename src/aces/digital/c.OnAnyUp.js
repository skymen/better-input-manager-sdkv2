export const config = {
  highlight: false,
  deprecated: false,
  isTrigger: true,
  listName: "On Any Up",
  displayText: "On any input up for player [i]{0}[/i]",
  description: "Trigger an event when any input is released",
  params: [
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "0" },
  ],
};
export const expose = true;
export default function (player) {
  return this.lastPlayer === player || player < 0;
}
