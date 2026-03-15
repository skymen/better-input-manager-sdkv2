export const config = {
  highlight: false,
  deprecated: false,
  returnType: "number",
  description: "Get the ID of the last player from trigger",
  params: [],
};
export const expose = false;
export default function () {
  return this.lastPlayer;
}
