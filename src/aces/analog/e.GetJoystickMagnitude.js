export const config = {
  highlight: false,
  deprecated: false,
  returnType: "number",
  description: "Get the magnitude of a joystick",
  params: [
    {
      id: "name",
      name: "Name",
      desc: "The name of the joystick",
      type: "string",
    },
    { id: "player", name: "Player", desc: "The player ID", type: "number" },
  ],
};
export const expose = true;
export default function (name, player) {
  if (player >= 0 && this.IsJoystickOutsideDeadzone(name, player)) {
    const joystick = this.GetJoystickInputState(name, player);
    return Math.sqrt(joystick.x * joystick.x + joystick.y * joystick.y);
  }
  return 0;
}
