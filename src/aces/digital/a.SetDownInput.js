export const config = {
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Set Down Input",
  displayText: "Set down input [i]{0}[/i] for player [i]{1}[/i] with control scheme [i]{2}[/i] (prevent auto switch: [i]{3}[/i])",
  description: "Set an input to a down state",
  params: [
    { id: "name", name: "Name", desc: "The name of the input", type: "string", initialValue: '""' },
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "0" },
    { id: "control-scheme", name: "Control Scheme", desc: "The control scheme ID", type: "string", initialValue: '""' },
    { id: "prevent-auto-switch", name: "Prevent Auto Switch", desc: "Whether to prevent the control scheme from automatically switching", type: "boolean", initialValue: "false" },
  ],
};
export const expose = true;
export default function (name, player, scheme, preventAutoSwitch) {
  this._SetDownInput(name, player, scheme, preventAutoSwitch);
}
