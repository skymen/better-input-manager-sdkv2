export const config = {
  highlight: false,
  deprecated: false,
  returnType: "number",
  description: "Get the angle of a joystick",
  params: [
    { id: "name", name: "Name", desc: "The name of the joystick", type: "string" },
    { id: "player", name: "Player", desc: "The player ID", type: "number" },
  ],
};
export const expose = true;
export default function (name, player) {
  if (player >= 0) {
    const joystick = this.GetJoystickInputState(name, player);
    return Math.atan2(joystick.y, joystick.x) * (180 / Math.PI);
  }
  return 0;
}
