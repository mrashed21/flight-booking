const LineWithDots = ({ size = 20, stroke = "currentColor" }) => (
  <svg
    width={size}
    height={size / 2}
    viewBox="0 0 100 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="10"
      y1="10"
      x2="90"
      y2="10"
      stroke={stroke}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="10" cy="10" r="5" fill={stroke} />
    <circle cx="90" cy="10" r="5" fill={stroke} />
  </svg>
);

export default LineWithDots;
