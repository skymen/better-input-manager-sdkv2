export const config = {
  highlight: false,
  deprecated: false,
  returnType: "number",
  description: "Get the raw x value of a joystick",
  params: [
    { id: "name", name: "Name", desc: "The name of the joystick", type: "string" },
    { id: "player", name: "Player", desc: "The player ID", type: "number" },
  ],
};
export const expose = true;
export default function (name, player) {
  if (player >= 0) {
    return this.GetJoystickInputState(name, player).x;
  }
  return 0;
}
