import React from 'react'

export function LogoSvg(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 60 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6ee7b7" /> {/* emerald-300 - brighter */}
          <stop offset="50%" stopColor="#34d399" /> {/* emerald-400 */}
          <stop offset="100%" stopColor="#10b981" /> {/* emerald-500 */}
        </linearGradient>
        <style>
          {`
            .hippo-path-base {
              fill: none;
              stroke: #059669; /* emerald-600 - darker base for contrast */
              stroke-width: 30;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-miterlimit: 10;
            }
            .hippo-path-shimmer {
              fill: none;
              stroke: url(#emerald-gradient);
              stroke-width: 32; /* Slightly thicker for visibility */
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-miterlimit: 10;
              stroke-dasharray: 498.6 1994.4; /* 20% visible, 80% gap */
              stroke-dashoffset: 2493;
              animation: trace 3s linear infinite;
              opacity: 1;
            }
            @keyframes trace {
              0% {
                stroke-dashoffset: 2493; /* Start at end */
              }
              100% {
                stroke-dashoffset: 0; /* End at start - seamless loop */
              }
            }
          `}
        </style>
      </defs>
      
      {/* Hippo SVG - scaled to fit logo size */}
      <g transform="translate(0, 3.6) scale(0.08)">
        {/* Base path - always visible */}
        <path
          className="hippo-path-base"
          d="M259 154C372 154 447 115 447 115M259 154C259 154 291 193 291 284.5C291 342.883 296 412 296 412M259 154C152.5 96.5 15.0006 223.5 15 346C14.9996 426.103 87.9995 513.5 87.9995 513.5H157C157 513.5 162.255 448.83 190.5 425C222.228 398.231 296 412 296 412M447 115C447 115 465.748 99.1599 469 85C474.316 61.8478 443 24 443 24C443 24 411.347 63.0653 418 85C422.729 100.593 447 115 447 115ZM447 115C447 115 551 129 551 174C620.5 180.5 696.5 142 696.5 257.5C696.5 373 525.741 295.622 476 335.5C405.215 392.25 425 519.5 425 519.5C425 519.5 368.5 519.5 339.5 519.5C302 489 296 412 296 412"
        />
        {/* Shimmer path - animated gradient traveling along */}
        <path
          className="hippo-path-shimmer"
          d="M259 154C372 154 447 115 447 115M259 154C259 154 291 193 291 284.5C291 342.883 296 412 296 412M259 154C152.5 96.5 15.0006 223.5 15 346C14.9996 426.103 87.9995 513.5 87.9995 513.5H157C157 513.5 162.255 448.83 190.5 425C222.228 398.231 296 412 296 412M447 115C447 115 465.748 99.1599 469 85C474.316 61.8478 443 24 443 24C443 24 411.347 63.0653 418 85C422.729 100.593 447 115 447 115ZM447 115C447 115 551 129 551 174C620.5 180.5 696.5 142 696.5 257.5C696.5 373 525.741 295.622 476 335.5C405.215 392.25 425 519.5 425 519.5C425 519.5 368.5 519.5 339.5 519.5C302 489 296 412 296 412"
        />
      </g>
    </svg>
  )
}
