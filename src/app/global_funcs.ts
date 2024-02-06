import { PowerSettingsForDeviceType, SensorType } from "@/types/types";
import { globalVars } from "./global_vars";

export const getStatusByPowerSupply = (
  powerSettings: PowerSettingsForDeviceType | null,
  sensors: SensorType[],
  request: string
) => {
  let result: Array<number> = [];
  let response: string = "";

  if (powerSettings?.powerSettings.length) {
    powerSettings?.powerSettings.forEach((ps) => {
      let value = sensors.find((s) => ps.sensorId === s.id)?.value;

      if (ps.setValue.includes("-")) {
        const rangeVal = ps.setValue.split("-");
        if (value) {
          Number(value) >= Number(rangeVal[0]) &&
          Number(value) <= Number(rangeVal[1])
            ? result.push(1)
            : result.push(0);
        }
      } else if (ps.setValue.startsWith("<")) {
        const val = ps.setValue.slice(1);
        if (value) {
          Number(value) < Number(val) ? result.push(1) : result.push(0);
        }
      } else if (ps.setValue.startsWith(">")) {
        const val = ps.setValue.slice(1);
        if (value) {
          Number(value) > Number(val) ? result.push(1) : result.push(0);
        }
      } else {
        if (value) {
          Number(value) === Number(ps.setValue)
            ? result.push(1)
            : result.push(0);
        }
      }
    });

    console.log(result.includes(0));

    if (result.includes(0)) {
      request === "hex"
        ? (response = globalVars.colorNegativeHEX)
        : request === "status"
        ? (response = "notmain")
        : request === "color"
        ? (response = globalVars.colorNegative)
        : null;
    } else {
      request === "hex"
        ? (response = globalVars.colorPositiveHEX)
        : request === "status"
        ? (response = "main")
        : request === "color"
        ? (response = globalVars.colorPositive)
        : null;
    }
  } else {
    request === "hex"
      ? (response = globalVars.colorUndefinedHEX)
      : request === "status"
      ? (response = "notset")
      : request === "color"
      ? (response = globalVars.colorUndefined)
      : null;
  }
  return response;
};
