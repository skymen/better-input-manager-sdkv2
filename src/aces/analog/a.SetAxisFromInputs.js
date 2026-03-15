export const config = {
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Set Axis From Inputs",
  displayText:
    "Set axis [i]{0}[/i] from inputs negative [i]{1}[/i] positive [i]{2}[/i] for player [i]{3}[/i] with control scheme [i]{4}[/i] (prevent auto switch: [i]{5}[/i])",
  description:
    "Set an axis value from two digital inputs (positive - negative)",
  params: [
    {
      id: "name",
      name: "Name",
      desc: "The name of the axis to set",
      type: "string",
      initialValue: '""',
    },
    {
      id: "negative-input",
      name: "Negative Input",
      desc: "The digital input name for the negative direction",
      type: "string",
      initialValue: '""',
    },
    {
      id: "positive-input",
      name: "Positive Input",
      desc: "The digital input name for the positive direction",
      type: "string",
      initialValue: '""',
    },
    {
      id: "player",
      name: "Player",
      desc: "The player ID, -1 for all players",
      type: "number",
      initialValue: "0",
    },
    {
      id: "control-scheme",
      name: "Control Scheme",
      desc: "The control scheme ID",
      type: "string",
      initialValue: '""',
    },
    {
      id: "prevent-auto-switch",
      name: "Prevent Auto Switch",
      desc: "Whether to prevent the control scheme from automatically switching",
      type: "boolean",
      initialValue: "false",
    },
  ],
};
export const expose = false;
export default function (
  name,
  negativeInput,
  positiveInput,
  player,
  scheme,
  preventAutoSwitch,
) {
  const doSet = (p) => {
    const positive = this.GetDigitalInputState(positiveInput, p, scheme) ? 1 : 0;
    const negative = this.GetDigitalInputState(negativeInput, p, scheme) ? 1 : 0;
    const value = positive - negative;
    this.SetAxisInputState(name, p, scheme, value, preventAutoSwitch);
  };
  if (player >= 0) {
    doSet(player);
  } else {
    this.ForEveryPlayer((key) => doSet(key));
  }
}
