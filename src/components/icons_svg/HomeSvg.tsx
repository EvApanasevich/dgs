type SvgPropsType = {
  color: string;
  size: string;
};

export function HomeSvg({ color, size }: SvgPropsType) {
  return (
    <svg
      fill={color}
      width={size}
      height={size}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4L3 24L17.449219 24L25 12.140625L32.550781 24L47 24L47 4L3 4 z M 25 15.859375L18.550781 
         26L6 26L6 46L21 46L21 35C21 32.79 22.79 31 25 31C27.21 31 29 32.79 29 35L29 46L44 46L44 26L31.449219 
         26L25 15.859375 z M 11 31L17 31L17 38L11 38L11 31 z M 33 31L39 31L39 38L33 38L33 31 z"
      />
    </svg>
  );
}
