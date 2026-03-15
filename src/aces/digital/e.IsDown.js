export const config = {
  highlight: false,
  deprecated: false,
  returnType: "number",
  description: "Get whether an input is down (1) or up (0)",
  params: [
    {
      id: "name",
      name: "Name",
      desc: "The name of the input",
      type: "string",
    },
    { id: "player", name: "Player", desc: "The player ID", type: "number" },
  ],
};
export const expose = false;
export default function (name, player) {
  if (player >= 0) {
    return this.GetDigitalInputState(name, player) ? 1 : 0;
  }
  for (const [key] of this.playerData) {
    if (this.GetDigitalInputState(name, key)) {
      return 1;
    }
  }
  return 0;
}
