import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GoldQ - Precision Analysis for NQ Futures & Gold";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(140deg, #0a0a0a 0%, #111111 55%, #151515 100%)",
          color: "#ffffff",
          padding: "54px",
          fontFamily: "Inter, sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 42, color: "#FFD700", fontWeight: 800 }}>GoldQ</div>
          <div style={{ fontSize: 22, color: "#F5A623", letterSpacing: 1.5 }}>NQ + XAUUSD</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "88%" }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.06 }}>
            Precision Analysis for NQ Futures & Gold
          </div>
          <div style={{ fontSize: 30, color: "#d4d4d8" }}>
            Institutional-level zones, bias, and execution context
          </div>
        </div>
      </div>
    ),
    size
  );
}
