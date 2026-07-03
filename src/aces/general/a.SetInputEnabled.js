export const config = {
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Set Input Enabled",
  displayText: "Set input [i]{0}[/i] enabled [i]{2}[/i] for player [i]{1}[/i]",
  description:
    "Enable or disable a single input for a player. While disabled, its triggers don't fire and its values read as 0.",
  params: [
    {
      id: "name",
      name: "Name",
      desc: "The name of the input",
      type: "string",
      initialValue: '""',
      autocompleteId: "input-name",
    },
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
      desc: "Whether the input is enabled",
      type: "boolean",
      initialValue: "true",
    },
  ],
};
export const expose = true;
export default function (name, player, enabled) {
  const doSet = (p) => {
    this.AssertPlayerExists(p);
    const disabled = this.playerData.get(p).disabledInputs;
    if (enabled) {
      disabled.delete(name);
    } else {
      disabled.add(name);
    }
  };
  if (player >= 0) {
    doSet(player);
  } else {
    this.ForEveryPlayer((key) => doSet(key));
  }
}
