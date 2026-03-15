export const config = {
  highlight: false,
  deprecated: false,
  returnType: "string",
  description: "Get the name of the current control scheme",
  params: [
    { id: "player", name: "Player", desc: "The player ID", type: "number" },
  ],
};
export const expose = true;
export default function (player) {
  if (player >= 0) {
    return this.GetPlayerActiveControlScheme(player);
  }
  return "";
}
