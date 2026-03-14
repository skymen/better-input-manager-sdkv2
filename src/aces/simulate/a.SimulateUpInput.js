export const config = {
  highlight: false,
  deprecated: false,
  isAsync: false,
  listName: "Simulate Up Input",
  displayText: "Simulate up input [i]{0}[/i] for player [i]{1}[/i]",
  description: "This only triggers the up event, it does not set the input to an up state",
  params: [
    { id: "name", name: "Name", desc: "The name of the input", type: "string", initialValue: '""' },
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "0" },
  ],
};
export const expose = true;
export default function (name, player) {
  this._SimulateUpInput(name, player);
}
