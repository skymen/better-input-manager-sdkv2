export const config = {
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Set Control Scheme",
  displayText: "Set control scheme [i]{0}[/i] for player [i]{1}[/i]",
  description: "Switch to a control scheme",
  params: [
    {
      id: "control-scheme",
      name: "Control Scheme",
      desc: "The control scheme ID",
      type: "string",
      initialValue: '""',
    },
    {
      id: "player",
      name: "Player",
      desc: "The player ID, -1 for all players",
      type: "number",
      initialValue: "0",
    },
  ],
};
export const expose = false;
export default function (scheme, player) {
  if (player >= 0) {
    this.SwithToControlScheme(player, scheme);
  } else {
    this.ForEveryPlayer((key) => {
      this.SwithToControlScheme(key, scheme);
    });
  }
}
