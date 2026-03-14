export const config = {
  highlight: false,
  deprecated: false,
  isAsync: false,
  listName: "Set Auto Switch Control Scheme",
  displayText: "Set auto switch to [i]{1}[/i] for player [i]{0}[/i]",
  description: "Enable or disable auto switch",
  params: [
    { id: "player", name: "Player", desc: "The player ID, -1 for all players", type: "number", initialValue: "-1" },
    { id: "enabled", name: "Enabled", desc: "Whether auto switch is enabled", type: "boolean", initialValue: "true" },
  ],
};
export const expose = true;
export default function (player, value) {
  this._SetAutoSwitchControlScheme(player, value);
}
