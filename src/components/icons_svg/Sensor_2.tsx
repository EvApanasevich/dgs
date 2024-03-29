type SvgPropsType = {
  color: string;
  size: string;
};

export function Sensor_2({ color, size }: SvgPropsType) {
  return (
    <svg fill={color} width={size} height={size} viewBox="0 0 64 64">
      <path
        d="M8,44h32.178l5.539-24H8V44z M31,31h6c0.553,0,1,0.447,1,1s-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1
           S30.447,31,31,31z M15,31h2v-2c0-0.553,0.447-1,1-1s1,0.447,1,1v2h2c0.553,0,1,0.447,1,1s-0.447,1-1,1h-2v2c0,0.553-0.447,1-1,1
           s-1-0.447-1-1v-2h-2c-0.553,0-1-0.447-1-1S14.447,31,15,31z"
      />
      <path
        d="M54,12H4c-2.211,0-4,1.789-4,4v32c0,2.211,1.789,4,4,4h50c2.211,0,4-1.789,4-4V16
               C58,13.789,56.211,12,54,12z M47.968,19.141L42,45c-0.199,0.596-0.575,1-1.128,1H7c-0.553,0-1-0.447-1-1V19c0-0.553,0.447-1,1-1
               h40.122C47.675,18,48.165,18.434,47.968,19.141z"
      />
      <path d="M60,22v20c2.211,0,4-1.789,4-4V26C64,23.789,62.211,22,60,22z" />
    </svg>
  );
}
