export const config = {
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Set All Inputs Enabled",
  displayText: "Set all inputs enabled [i]{1}[/i] for player [i]{0}[/i]",
  description:
    "Master enable/disable of every input for a player. Independent from per-input disables, so re-enabling all keeps individual disables.",
  params: [
    {
      id: "player",
      name: "Player",
      desc: "The player ID, -1 for all players",
      type: "number",
      initialValue: "0",
    },
    {
      id: "enabled",
      name: "Enabled",
      desc: "Whether all inputs are enabled",
      type: "boolean",
      initialValue: "true",
    },
  ],
};
export const expose = true;
export default function (player, enabled) {
  const doSet = (p) => {
    this.AssertPlayerExists(p);
    this.playerData.get(p).allInputsEnabled = enabled;
  };
  if (player >= 0) {
    doSet(player);
  } else {
    this.ForEveryPlayer((key) => doSet(key));
  }
}
