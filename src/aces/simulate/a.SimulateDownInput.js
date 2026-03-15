export const config = {
  highlight: false,
  deprecated: false,
  isAsync: false,
  listName: "Simulate Down Input",
  displayText: "Simulate down input [i]{0}[/i] for player [i]{1}[/i]",
  description: "This only triggers the down event, it does not set the input to a down state",
  params: [
    { id: "name", name: "Name", desc: "The name of the input", type: "string", initialValue: '""' },
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "0" },
  ],
};
export const expose = true;
export default function (name, player) {
  const doSim = (p) => {
    this.lastDigitalInput = name;
    this.lastPlayer = p;
    this._trigger("OnDown");
    this._trigger("OnAnyDown");
  };
  if (player >= 0) {
    doSim(player);
  } else {
    this.ForEveryPlayer((key) => doSim(key));
  }
}
