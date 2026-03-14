export const config = {
  highlight: false,
  deprecated: false,
  isAsync: false,
  listName: "Map Wire To Player",
  displayText: "Map wire [i]{0}[/i] to player [i]{1}[/i]",
  description: "Map a wire to a player",
  params: [
    { id: "name", name: "Name", desc: "The name of the wire", type: "string", initialValue: '""' },
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "0" },
  ],
};
export const expose = true;
export default function (name, player) {
  this._WireTo(name, player);
}
