import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function Image({
  params
}: {
  params: { slug: string };
}) {
  const title = titleFromSlug(params.slug);
  const asset = params.slug.includes("gold") ? "Gold" : "NQ";
  const bias = params.slug.includes("reversion") ? "Bearish" : "Bullish";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(150deg, #0a0a0a 0%, #111111 60%, #1d1d1d 100%)",
          color: "#fff",
          padding: "52px",
          fontFamily: "Inter, sans-serif"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#FFD700", fontSize: 40, fontWeight: 800 }}>GoldQ</div>
          <div
            style={{
              color: "#0a0a0a",
              background: "#FFD700",
              fontSize: 22,
              fontWeight: 700,
              borderRadius: "999px",
              padding: "8px 18px"
            }}
          >
            {asset}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "94%" }}>
          <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.08 }}>{title}</div>
          <div style={{ fontSize: 28, color: "#d4d4d8" }}>
            Bias: {bias} | GoldQ Research Desk
          </div>
        </div>
      </div>
    ),
    size
  );
}
