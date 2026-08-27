import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Motionlee — Bookings and websites in Stoke-on-Trent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0B0C",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ color: "#fff", fontSize: 32, fontWeight: 700 }}>Motionlee</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#fff",
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
            }}
          >
            Take bookings. Keep
          </div>
          <div
            style={{
              color: "#D6FF3F",
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
            }}
          >
            every penny of them.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 28,
            color: "rgba(255,255,255,0.6)",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>
            Bookings · Websites · No booking fees
          </div>
          <div style={{ display: "flex", color: "#D6FF3F" }}>Stoke-on-Trent, UK</div>
        </div>
      </div>
    ),
    size,
  );
}
