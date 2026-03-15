export const config = {
  highlight: false,
  deprecated: false,
  returnType: "number",
  description: "Get the value of an axis",
  params: [
    { id: "name", name: "Name", desc: "The name of the axis", type: "string" },
    { id: "player", name: "Player", desc: "The player ID", type: "number" },
  ],
};
export const expose = true;
export default function (name, player) {
  if (player >= 0 && this.IsAxisOutsideDeadzone(name, player)) {
    return this.GetAxisInputState(name, player);
  }
  return 0;
}
