import { Sensor_1 } from "./Sensor_1";
import { Sensor_2 } from "./Sensor_2";
import { Sensor_3 } from "./Sensor_3";

type SvgPropsType = {
  icon: number | undefined;
  color: string;
  size: string;
};

export function Icons({ icon, color, size }: SvgPropsType) {
  switch (icon) {
    case 1:
      return <Sensor_1 color={color} size={size} />;
    case 2:
      return <Sensor_2 color={color} size={size} />;
    case 3:
      return <Sensor_3 color={color} size={size} />;
    default:
      return null;
  }
}
