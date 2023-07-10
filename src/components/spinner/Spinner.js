const Spinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "auto", background: "none", display: "block" }}
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g>
        <circle cx="60" cy="50" r="4" fill="#ff0000">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="0.7462686567164178s"
            values="95;35"
            keyTimes="0;1"
            begin="-0.8978000000000002s"
          ></animate>
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="0.7462686567164178s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="-0.8978000000000002s"
          ></animate>
        </circle>
        <circle cx="60" cy="50" r="4" fill="#ff0000">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="0.7462686567164178s"
            values="95;35"
            keyTimes="0;1"
            begin="-0.44220000000000004s"
          ></animate>
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="0.7462686567164178s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="-0.44220000000000004s"
          ></animate>
        </circle>
        <circle cx="60" cy="50" r="4" fill="#ff0000">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="0.7462686567164178s"
            values="95;35"
            keyTimes="0;1"
            begin="0s"
          ></animate>
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="0.7462686567164178s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="0s"
          ></animate>
        </circle>
      </g>
      <g transform="translate(-15 0)">
        <path
          d="M50 50L20 50A30 30 0 0 0 80 50Z"
          fill="#fff900"
          transform="rotate(90 50 50)"
        ></path>
        <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#fff900">
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="0.7462686567164178s"
            values="0 50 50;45 50 50;0 50 50"
            keyTimes="0;0.5;1"
          ></animateTransform>
        </path>
        <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#fff900">
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="0.7462686567164178s"
            values="0 50 50;-45 50 50;0 50 50"
            keyTimes="0;0.5;1"
          ></animateTransform>
        </path>
      </g>
    </svg>
  );
};
export default Spinner;
