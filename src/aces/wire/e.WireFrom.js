export const config = {
  highlight: false,
  deprecated: false,
  returnType: "number",
  description: "Wire a control scheme to a player using an id",
  params: [
    { id: "name", name: "Name", desc: "The name of the wire", type: "string" },
  ],
};
export const expose = false;
export default function (name) {
  return this._WireFrom(name);
}
