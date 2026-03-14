export const config = {
  highlight: true,
  deprecated: false,
  listName: "Is Down",
  displayText: "Is [i]{0}[/i] down for player [i]{1}[/i]",
  description: "Test if an input is down",
  params: [
    { id: "name", name: "Name", desc: "The name of the input", type: "string", initialValue: '""' },
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "0" },
  ],
};
export const expose = true;
export default function (name, player) {
  return this._IsDown(name, player);
}
