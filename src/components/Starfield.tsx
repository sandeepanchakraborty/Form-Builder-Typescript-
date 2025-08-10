import React, { useEffect } from "react";

const NUM_STARS = 350;

function randomBetween(a: number, b: number): number {
  return Math.random() * (b - a) + a;
}

const Starfield: React.FC = () => {
  useEffect(() => {
    // No-op, just for possible future effects
  }, []);

  return (
    <>
      {/* Blinking stars */}
      {Array.from({ length: NUM_STARS }).map((_, i) => {
        const top = randomBetween(0, 100);
        const left = randomBetween(0, 100);
        const size = randomBetween(1, 2.5);
        const duration = randomBetween(1.5, 3.5);
        const delay = randomBetween(0, 3);
        // Beautiful star colors: white, blue, yellow, pink, cyan
        const colors = [
          "#fff", // white
          "#aee9ff", // blue
          "#ffe066", // yellow
          "#ffd6fa", // pink
          "#baffc9", // cyan-green
          "#ffd700", // gold
          "#b39ddb", // lavender
          "#ffb347", // orange
          "#c1f0f6", // light cyan
          "#f8bbd0", // light pink
          "#e1bee7", // light purple
          "#b2dfdb", // teal
        ];
        const color = colors[Math.floor(randomBetween(0, colors.length))];
        return (
          <div
            key={"star-" + i}
            className="starfield-star"
            style={{
              top: `${top}vh`,
              left: `${left}vw`,
              width: size,
              height: size,
              background: color,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </>
  );
};

export default Starfield;
