export const config = {
  highlight: false,
  deprecated: false,
  returnType: "string",
  description: "Get the name of the last input from trigger",
  params: [],
};
export const expose = true;
export default function () {
  return this.lastDigitalInput;
}
