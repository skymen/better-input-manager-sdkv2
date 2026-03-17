export const config = {
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Set Down Input",
  displayText: "Set down input [i]{0}[/i] for player [i]{1}[/i] with control scheme [i]{2}[/i] (prevent auto switch: [i]{3}[/i])",
  description: "Set an input to a down state",
  params: [
    { id: "name", name: "Name", desc: "The name of the input", type: "string", initialValue: '""', autocompleteId: "input-name" },
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "0" },
    { id: "control-scheme", name: "Control Scheme", desc: "The control scheme ID", type: "string", initialValue: '""', autocompleteId: "control-scheme" },
    { id: "prevent-auto-switch", name: "Prevent Auto Switch", desc: "Whether to prevent the control scheme from automatically switching", type: "boolean", initialValue: "false" },
  ],
};
export const expose = true;
export default function (name, player, scheme, preventAutoSwitch) {
  const doSet = (p) => {
    const curValue = this.GetDigitalInputState(name, p, scheme);
    if (!curValue) {
      this.SetDigitalInputState(name, p, scheme, true, preventAutoSwitch);
      if (this.GetControlSchemeEnabled(p, scheme)) {
        this.lastDigitalInput = name;
        this.lastPlayer = p;
        this._trigger("OnDown");
        this._trigger("OnAnyDown");
      }
    }
  };
  if (player >= 0) {
    doSet(player);
  } else {
    this.ForEveryPlayer((key) => doSet(key));
  }
}
