import { id, addonType } from "../../config.caw.js";
import AddonTypeMap from "../../template/addonTypeMap.js";

export default function (parentClass) {
  return class extends parentClass {
    constructor() {
      super();

      this.defaultAxisDeadzone = 0.2;
      this.defaultJoystickDeadzone = 0.2;
      this.defaultControlScheme = "";
      this.autoSwitchControlScheme = true;

      const properties = this._getInitProperties();
      if (properties) {
        this.defaultAxisDeadzone = properties[0];
        this.defaultJoystickDeadzone = properties[1];
        this.defaultControlScheme = properties[2];
        this.autoSwitchControlScheme = properties[3];
      }

      this.digitalInputData = new Map();
      this.axisInputData = new Map();
      this.joystickInputData = new Map();
      this.playerData = new Map();
      this.wireData = new Map();

      this.lastDigitalInput = "";
      this.lastPlayer = null;
    }

    _trigger(method) {
      this.dispatch(method);
      super._trigger(self.C3[AddonTypeMap[addonType]][id].Cnds[method]);
    }

    on(tag, callback, options) {
      if (!this.events[tag]) {
        this.events[tag] = [];
      }
      this.events[tag].push({ callback, options });
    }

    off(tag, callback) {
      if (this.events[tag]) {
        this.events[tag] = this.events[tag].filter(
          (event) => event.callback !== callback,
        );
      }
    }

    dispatch(tag) {
      if (this.events[tag]) {
        this.events[tag].forEach((event) => {
          if (event.options && event.options.params) {
            const fn = self.C3[AddonTypeMap[addonType]][id].Cnds[tag];
            if (fn && !fn.call(this, ...event.options.params)) {
              return;
            }
          }
          event.callback();
          if (event.options && event.options.once) {
            this.off(tag, event.callback);
          }
        });
      }
    }

    _release() {
      super._release();
    }

    _saveToJson() {
      return {
        // data to be saved for savegames
      };
    }

    _loadFromJson(o) {
      // load state for savegames
    }

    // ======= UTILS =======

    Clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    ForEveryPlayer(callback) {
      for (const [key, value] of this.playerData) {
        callback(key, value);
      }
    }

    // ======= PLAYERS =======

    AssertPlayerExists(player) {
      if (!this.playerData.has(player)) {
        this.playerData.set(player, {
          controlSchemes: new Map(),
          autoSwitchControlScheme: this.autoSwitchControlScheme,
        });
      }
    }

    SetAutoSwitchControlScheme(player, autoSwitch) {
      this.AssertPlayerExists(player);
      this.playerData.get(player).autoSwitchControlScheme = autoSwitch;
    }

    GetAutoSwitchControlScheme(player) {
      this.AssertPlayerExists(player);
      return this.playerData.get(player).autoSwitchControlScheme;
    }

    GetPlayerActiveControlScheme(player) {
      this.AssertPlayerExists(player);
      for (const [key, value] of this.playerData.get(player).controlSchemes) {
        if (this.GetControlSchemeEnabled(player, key)) {
          return key;
        }
      }
      return this.defaultControlScheme;
    }

    SchemeOrPlayerActiveControlScheme(controlScheme, player) {
      return typeof controlScheme === "string"
        ? controlScheme
        : this.GetPlayerActiveControlScheme(player);
    }

    // ======= DIGITAL INPUTS =======

    AssertDigitalInputExists(inputName) {
      if (!this.digitalInputData.has(inputName)) {
        this.digitalInputData.set(inputName, {
          statePerPlayer: new Map(),
        });
      }
    }

    AssertDigitalInputHasPlayer(inputName, player) {
      this.AssertDigitalInputExists(inputName);
      this.AssertPlayerExists(player);
      if (!this.digitalInputData.get(inputName).statePerPlayer.has(player)) {
        this.digitalInputData
          .get(inputName)
          .statePerPlayer.set(player, new Map());
      }
    }

    AssertDigitalInputPlayerHasControlScheme(inputName, player, controlScheme) {
      this.AssertDigitalInputHasPlayer(inputName, player);
      if (
        !this.digitalInputData
          .get(inputName)
          .statePerPlayer.get(player)
          .has(controlScheme)
      ) {
        this.digitalInputData
          .get(inputName)
          .statePerPlayer.get(player)
          .set(controlScheme, false);
      }
    }

    GetDigitalInputState(inputName, player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player,
      );
      this.AssertDigitalInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme,
      );
      return this.digitalInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .get(controlScheme);
    }

    IsAnyDigitalInputDown(player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player,
      );
      this.AssertPlayerExists(player);
      for (const [key, value] of this.digitalInputData) {
        if (this.GetDigitalInputState(key, player, controlScheme)) {
          return true;
        }
      }
      return false;
    }

    SetDigitalInputState(
      inputName,
      player,
      controlScheme,
      state,
      preventAutoSwitch = false,
    ) {
      this.AssertDigitalInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme,
      );
      this.digitalInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .set(controlScheme, state);

      if (this.GetAutoSwitchControlScheme(player) && !preventAutoSwitch) {
        if (state) {
          this.SwithToControlScheme(player, controlScheme);
        }
      }
    }

    // ======= AXIS INPUTS =======

    AssertAxisInputExists(inputName) {
      if (!this.axisInputData.has(inputName)) {
        this.axisInputData.set(inputName, {
          statePerPlayer: new Map(),
          usesDefaultDeadzone: true,
          deadzone: this.defaultAxisDeadzone,
        });
      }
    }

    AssertAxisInputHasPlayer(inputName, player) {
      this.AssertAxisInputExists(inputName);
      if (!this.axisInputData.get(inputName).statePerPlayer.has(player)) {
        this.axisInputData.get(inputName).statePerPlayer.set(player, new Map());
      }
    }

    AssertAxisInputPlayerHasControlScheme(inputName, player, controlScheme) {
      this.AssertAxisInputHasPlayer(inputName, player);
      if (
        !this.axisInputData
          .get(inputName)
          .statePerPlayer.get(player)
          .has(controlScheme)
      ) {
        this.axisInputData
          .get(inputName)
          .statePerPlayer.get(player)
          .set(controlScheme, 0);
      }
    }

    GetAxisInputState(inputName, player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player,
      );
      this.AssertAxisInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme,
      );
      return this.axisInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .get(controlScheme);
    }

    SetAxisInputState(
      inputName,
      player,
      controlScheme,
      state,
      preventAutoSwitch = false,
    ) {
      this.AssertAxisInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme,
      );
      this.axisInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .set(controlScheme, state);

      if (this.GetAutoSwitchControlScheme(player) && !preventAutoSwitch) {
        let deadzone = this.GetAxisInputDeadzone(inputName);
        if (Math.abs(state) > deadzone) {
          this.SwithToControlScheme(player, controlScheme);
        }
      }
    }

    SetAxisInputDeadzone(inputName, deadzone) {
      this.AssertAxisInputExists(inputName);
      let usesDefaultDeadzone = false;
      if (
        deadzone === null ||
        deadzone === undefined ||
        deadzone < 0 ||
        deadzone > 1
      ) {
        deadzone = this.defaultAxisDeadzone;
        usesDefaultDeadzone = true;
      }
      this.axisInputData.get(inputName).usesDefaultDeadzone =
        usesDefaultDeadzone;
      this.axisInputData.get(inputName).deadzone = deadzone;
    }

    GetAxisInputDeadzone(inputName) {
      this.AssertAxisInputExists(inputName);
      return this.axisInputData.get(inputName).deadzone;
    }

    GetAxisInputUsesDefaultDeadzone(inputName) {
      this.AssertAxisInputExists(inputName);
      return this.axisInputData.get(inputName).usesDefaultDeadzone;
    }

    IsAxisOutsideDeadzone(inputName, player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player,
      );
      this.AssertAxisInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme,
      );
      let deadzone = this.GetAxisInputDeadzone(inputName);
      let state = this.GetAxisInputState(inputName, player, controlScheme);
      return Math.abs(state) > deadzone;
    }

    IsAnyAxisOutsideDeadzone(player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player,
      );
      this.AssertPlayerExists(player);
      for (const [key, value] of this.axisInputData) {
        if (this.IsAxisOutsideDeadzone(key, player, controlScheme)) {
          return true;
        }
      }
      return false;
    }

    // ======= JOYSTICK INPUTS =======

    AssertJoystickInputExists(inputName) {
      if (!this.joystickInputData.has(inputName)) {
        this.joystickInputData.set(inputName, {
          statePerPlayer: new Map(),
          usesDefaultDeadzone: true,
          deadzone: this.defaultJoystickDeadzone,
        });
      }
    }

    AssertJoystickInputHasPlayer(inputName, player) {
      this.AssertJoystickInputExists(inputName);
      if (!this.joystickInputData.get(inputName).statePerPlayer.has(player)) {
        this.joystickInputData
          .get(inputName)
          .statePerPlayer.set(player, new Map());
      }
    }

    AssertJoystickInputPlayerHasControlScheme(
      inputName,
      player,
      controlScheme,
    ) {
      this.AssertJoystickInputHasPlayer(inputName, player);
      if (
        !this.joystickInputData
          .get(inputName)
          .statePerPlayer.get(player)
          .has(controlScheme)
      ) {
        this.joystickInputData
          .get(inputName)
          .statePerPlayer.get(player)
          .set(controlScheme, {
            x: 0,
            y: 0,
          });
      }
    }

    GetJoystickInputState(inputName, player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player,
      );
      this.AssertJoystickInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme,
      );
      return this.joystickInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .get(controlScheme);
    }

    SetJoystickInputState(
      inputName,
      player,
      controlScheme,
      x,
      y,
      preventAutoSwitch = false,
    ) {
      this.AssertJoystickInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme,
      );
      this.joystickInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .set(controlScheme, {
          x,
          y,
        });

      if (this.GetAutoSwitchControlScheme(player) && !preventAutoSwitch) {
        let deadzone = this.GetJoystickInputDeadzone(inputName);
        if (Math.sqrt(x * x + y * y) > deadzone) {
          this.SwithToControlScheme(player, controlScheme);
        }
      }
    }

    SetJoystickInputStateX(inputName, player, controlScheme, x) {
      this.AssertJoystickInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme,
      );
      let y = this.joystickInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .get(controlScheme).y;
      this.SetJoystickInputState(inputName, player, controlScheme, x, y);
    }

    SetJoystickInputStateY(inputName, player, controlScheme, y) {
      this.AssertJoystickInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme,
      );
      let x = this.joystickInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .get(controlScheme).x;
      this.SetJoystickInputState(inputName, player, controlScheme, x, y);
    }

    SetJoystickInputDeadzone(inputName, deadzone) {
      this.AssertJoystickInputExists(inputName);
      let usesDefaultDeadzone = false;
      if (
        deadzone === null ||
        deadzone === undefined ||
        deadzone < 0 ||
        deadzone > 1
      ) {
        deadzone = this.defaultJoystickDeadzone;
        usesDefaultDeadzone = true;
      }
      this.joystickInputData.get(inputName).usesDefaultDeadzone =
        usesDefaultDeadzone;
      this.joystickInputData.get(inputName).deadzone = deadzone;
    }

    GetJoystickInputDeadzone(inputName) {
      this.AssertJoystickInputExists(inputName);
      return this.joystickInputData.get(inputName).deadzone;
    }

    GetJoystickInputUsesDefaultDeadzone(inputName) {
      this.AssertJoystickInputExists(inputName);
      return this.joystickInputData.get(inputName).usesDefaultDeadzone;
    }

    IsJoystickOutsideDeadzone(inputName, player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player,
      );
      this.AssertJoystickInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme,
      );
      let deadzone = this.GetJoystickInputDeadzone(inputName);
      let state = this.GetJoystickInputState(inputName, player, controlScheme);
      return Math.sqrt(state.x * state.x + state.y * state.y) > deadzone;
    }

    IsAnyJoystickOutsideDeadzone(player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player,
      );
      for (let inputName of this.joystickInputData.keys()) {
        if (this.IsJoystickOutsideDeadzone(inputName, player, controlScheme)) {
          return true;
        }
      }
      return false;
    }

    // ======= CONTROL SCHEMES =======

    AssertControlSchemeExists(player, controlScheme) {
      this.AssertPlayerExists(player);
      let playerData = this.playerData.get(player);
      if (!playerData.controlSchemes.has(controlScheme)) {
        playerData.controlSchemes.set(controlScheme, {
          enabled: controlScheme === this.defaultControlScheme,
        });
      }
    }

    GetControlSchemeEnabled(player, controlScheme) {
      this.AssertControlSchemeExists(player, controlScheme);
      let playerData = this.playerData.get(player);
      return playerData.controlSchemes.get(controlScheme).enabled;
    }

    SetControlSchemeEnabled(player, controlScheme, enabled) {
      this.AssertControlSchemeExists(player, controlScheme);
      let playerData = this.playerData.get(player);
      playerData.controlSchemes.get(controlScheme).enabled = enabled;
    }

    // Script interface convenience method (matches V1 GetJoystick API)
    GetJoystick(name, player) {
      if (player >= 0) {
        return this.GetJoystickInputState(name, player);
      }
      return {
        x: 0,
        y: 0,
      };
    }

    SwithToControlScheme(player, controlScheme) {
      this.SetControlSchemeEnabled(player, controlScheme, true);
      let playerData = this.playerData.get(player);
      // Disable all other control schemes that are auto managed
      for (const [key, value] of playerData.controlSchemes) {
        if (key !== controlScheme) {
          this.SetControlSchemeEnabled(player, key, false);
        }
      }
    }
  };
}
