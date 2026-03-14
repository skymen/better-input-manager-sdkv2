export const config = {
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Set Up Input",
  displayText: "Set up input [i]{0}[/i] for player [i]{1}[/i] with control scheme [i]{2}[/i]",
  description: "Set an input to an up state",
  params: [
    { id: "name", name: "Name", desc: "The name of the input", type: "string", initialValue: '""' },
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "0" },
    { id: "control-scheme", name: "Control Scheme", desc: "The control scheme ID", type: "string", initialValue: '""' },
  ],
};
export const expose = true;
export default function (name, player, scheme) {
  this._SetUpInput(name, player, scheme);
}
