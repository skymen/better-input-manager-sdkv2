export const config = {
  highlight: false,
  deprecated: false,
  returnType: "number",
  description: "Get the raw value of an axis",
  params: [
    { id: "name", name: "Name", desc: "The name of the axis", type: "string" },
    { id: "player", name: "Player", desc: "The player ID", type: "number" },
  ],
};
export const expose = false;
export default function (name, player) {
  return this._GetRawAxis(name, player);
}
