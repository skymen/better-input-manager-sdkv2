export const config = {
  highlight: false,
  deprecated: false,
  isTrigger: true,
  listName: "On Down",
  displayText: "On [i]{0}[/i] down for player [i]{1}[/i]",
  description: "Trigger an event when an input is pressed down",
  params: [
    { id: "name", name: "Name", desc: "The name of the input", type: "string", initialValue: '""', autocompleteId: "input-name" },
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "0" },
  ],
};
export const expose = true;
export default function (name, player) {
  return (
    this.lastDigitalInput === name &&
    (this.lastPlayer === player || player < 0)
  );
}
