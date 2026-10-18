import { ImageResponse } from "next/og";

export const alt = "Nafis Islam Nitol: electrical engineering student building robots, drones and control systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The cutting mat, the name and the PID law: the hero's idea at share-card size.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#1c4234",
          backgroundImage:
            "linear-gradient(to right, rgba(238,240,230,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(238,240,230,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          color: "#eef0e6",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#e39a62" }}>u(t) = Kp·e(t) + Ki∫e(t)dt + Kd·de/dt</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -2, lineHeight: 1, textTransform: "uppercase" }}>
            Nafis Islam Nitol
          </div>
          <div style={{ marginTop: 24, fontSize: 36, color: "#b8c7bc" }}>
            Electrical engineering · robots, drones and control systems
          </div>
        </div>
      </div>
    ),
    size,
  );
}
