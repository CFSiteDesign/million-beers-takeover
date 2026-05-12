/* Foam overflow divider — cartoon beer foam with floating bubbles. */

export function FoamOverflowDivider({
  fillFrom,
  foamColor,
}: {
  fillFrom?: string;
  foamColor?: string;
}) {
  // params kept for backwards compat but unused — divider is transparent
  void fillFrom;
  void foamColor;
  return (
    <div
      aria-hidden
      className="relative z-30 h-0 w-full overflow-visible leading-[0]"
      style={{ pointerEvents: "none" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1600 400"
        preserveAspectRatio="none"
        className="absolute left-0 top-0 block h-[clamp(80px,16vw,260px)] w-full -translate-y-[18%]"
      >
        <defs>
          <linearGradient id="foamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#FFF8E0" />
            <stop offset="100%" stopColor="#EFD79A" />
          </linearGradient>
          <linearGradient id="bubbleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF1C2" />
          </linearGradient>
        </defs>
        <path
          d="M 0,140 C 20,105 50,75 95,95 C 130,113 165,80 210,98 C 250,115 290,75 335,95 C 375,113 415,82 460,100 C 500,116 540,72 590,92 C 630,110 670,80 720,98 C 760,114 800,70 855,93 C 895,113 935,82 985,100 C 1025,116 1065,80 1115,98 C 1155,114 1195,82 1245,100 C 1285,116 1325,75 1375,95 C 1415,114 1455,88 1505,103 C 1545,114 1585,118 1600,140 L 1600,210 C 1590,232 1565,288 1540,255 C 1518,235 1492,275 1470,245 C 1448,225 1418,335 1388,260 C 1365,235 1335,275 1310,245 C 1285,225 1255,265 1225,240 C 1198,225 1168,318 1130,252 C 1105,228 1078,265 1052,240 C 1028,225 998,275 972,245 C 945,225 915,360 880,262 C 855,235 828,275 802,245 C 778,225 748,275 720,245 C 692,225 662,290 632,255 C 608,235 578,275 548,245 C 520,225 490,322 458,260 C 432,235 408,275 378,245 C 352,225 322,265 292,240 C 268,225 238,290 208,250 C 182,232 158,275 128,245 C 102,225 72,290 42,250 C 22,232 8,260 0,210 Z"
          fill="url(#foamGrad)"
          stroke="#1F140A"
          strokeWidth="5.5"
          strokeLinejoin="round"
        />
        <g fill="#FFFFFF" opacity="0.65">
          <ellipse cx="105" cy="148" rx="38" ry="14" transform="rotate(-12 105 148)" />
          <ellipse cx="375" cy="158" rx="42" ry="13" transform="rotate(-8 375 158)" />
          <ellipse cx="690" cy="152" rx="48" ry="16" transform="rotate(-10 690 152)" />
          <ellipse cx="1010" cy="158" rx="40" ry="13" transform="rotate(-7 1010 158)" />
          <ellipse cx="1325" cy="155" rx="44" ry="15" transform="rotate(-12 1325 155)" />
        </g>
        <g fill="none" stroke="#B8943C" strokeWidth="2.5" opacity="0.55">
          <circle cx="240" cy="155" r="9" />
          <circle cx="455" cy="170" r="7" />
          <circle cx="555" cy="160" r="11" />
          <circle cx="800" cy="165" r="8" />
          <circle cx="1075" cy="168" r="10" />
          <circle cx="1180" cy="155" r="8" />
          <circle cx="1430" cy="172" r="9" />
        </g>
        <g fill="#B8943C" opacity="0.45">
          <circle cx="180" cy="175" r="2" />
          <circle cx="320" cy="160" r="2.5" />
          <circle cx="510" cy="180" r="2" />
          <circle cx="710" cy="170" r="2.5" />
          <circle cx="900" cy="175" r="2" />
          <circle cx="1130" cy="180" r="2.5" />
          <circle cx="1380" cy="160" r="2" />
          <circle cx="1500" cy="175" r="2.5" />
        </g>
      </svg>
    </div>
  );
}
