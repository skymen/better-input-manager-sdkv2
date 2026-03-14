import {
  ADDON_CATEGORY,
  ADDON_TYPE,
  PLUGIN_TYPE,
  PROPERTY_TYPE,
} from "./template/enums.js";
import _version from "./version.js";
export const addonType = ADDON_TYPE.PLUGIN;
export const type = PLUGIN_TYPE.OBJECT;
export const id = "skymen_better_input_manager";
export const name = "Better Input Manager";
export const version = _version;
export const minConstructVersion = undefined;
export const author = "skymen";
export const website = "https://www.construct.net";
export const documentation = "https://www.construct.net";
export const description = "An improved input manager";
export const category = ADDON_CATEGORY.INPUT;

export const hasDomside = false;
export const files = {
  extensionScript: {
    enabled: false,
    watch: true,
    targets: ["x86", "x64"],
    name: "MyExtension",
  },
  fileDependencies: [],
  remoteFileDependencies: [],
  cordovaPluginReferences: [],
  cordovaResourceFiles: [],
};

export const aceCategories = {
  digital: "Digital",
  analog: "Analog",
  simulate: "Simulate",
  control: "Control Scheme",
  general: "General",
  wire: "Wire",
};

export const info = {
  Set: {
    CanBeBundled: true,
    IsDeprecated: false,
    GooglePlayServicesEnabled: false,
    IsOnlyOneAllowed: false,
    IsResizable: false,
    IsRotatable: false,
    Is3D: false,
    HasImage: false,
    IsTiled: false,
    SupportsZElevation: false,
    SupportsColor: false,
    SupportsEffects: false,
    MustPreDraw: false,
    IsSingleGlobal: true,
  },
  AddCommonACEs: {
    Position: false,
    SceneGraph: false,
    Size: false,
    Angle: false,
    Appearance: false,
    ZOrder: false,
  },
};

export const properties = [
  {
    type: PROPERTY_TYPE.FLOAT,
    id: "default-axis-deadzone",
    options: {
      initialValue: 0.2,
      interpolatable: false,
    },
    name: "Default Axis Deadzone",
    desc: "A value between 0 and 1 that determines the default deadzone for all axes",
  },
  {
    type: PROPERTY_TYPE.FLOAT,
    id: "default-joystick-deadzone",
    options: {
      initialValue: 0.2,
      interpolatable: false,
    },
    name: "Default Joystick Deadzone",
    desc: "A value between 0 and 1 that determines the default deadzone for all joysticks",
  },
  {
    type: PROPERTY_TYPE.TEXT,
    id: "default-control-scheme",
    options: {
      initialValue: "",
      interpolatable: false,
    },
    name: "Default Control Scheme",
    desc: "The default control scheme to use",
  },
  {
    type: PROPERTY_TYPE.CHECK,
    id: "auto-switch-control-scheme",
    options: {
      initialValue: true,
      interpolatable: false,
    },
    name: "Auto Switch Control Scheme",
    desc: "Whether to automatically switch control schemes when the user inputs a new control scheme",
  },
];
