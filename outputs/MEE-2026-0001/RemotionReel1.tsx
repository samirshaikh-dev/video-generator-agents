import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  Sequence,
} from "remotion";

// --- BRAND TOKENS (from brand/meelte-brand.json) ---
const BRAND = {
  orange: "#FEA711",
  purple: "#743BAA",
  lavender: "#F4EFFD",
  charcoal: "#171923",
  white: "#FFFFFF",
  fontFamily: "Poppins, 'Plus Jakarta Sans', sans-serif",
};

// --- CAPTION DATA WITH WORD TIMESTAMPS ---
interface CaptionWord {
  word: string;
  start: number; // in seconds
  end: number;
}

interface CaptionPhrase {
  phrase: string;
  startSec: number;
  endSec: number;
  words: CaptionWord[];
}

const CAPTIONS: CaptionPhrase[] = [
  {
    phrase: "Got a deal to share today?",
    startSec: 0.2,
    endSec: 3.6,
    words: [
      { word: "Got", start: 0.2, end: 0.6 },
      { word: "a", start: 0.6, end: 0.8 },
      { word: "deal", start: 0.8, end: 1.4 },
      { word: "to", start: 1.4, end: 1.7 },
      { word: "share", start: 1.7, end: 2.4 },
      { word: "today?", start: 2.4, end: 3.4 },
    ],
  },
  {
    phrase: "Tap + ➔ Single Item",
    startSec: 4.2,
    endSec: 8.5,
    words: [
      { word: "Open", start: 4.2, end: 4.7 },
      { word: "meelTe,", start: 4.7, end: 5.4 },
      { word: "tap", start: 5.4, end: 5.9 },
      { word: "the", start: 5.9, end: 6.1 },
      { word: "plus", start: 6.1, end: 6.7 },
      { word: "sign", start: 6.7, end: 7.3 },
    ],
  },
  {
    phrase: "Pick your discount badge",
    startSec: 9.2,
    endSec: 15.5,
    words: [
      { word: "Add", start: 9.2, end: 9.6 },
      { word: "your", start: 9.6, end: 9.9 },
      { word: "price,", start: 9.9, end: 10.6 },
      { word: "pick", start: 10.6, end: 11.1 },
      { word: "your", start: 11.1, end: 11.4 },
      { word: "discount", start: 11.4, end: 12.2 },
      { word: "badge", start: 12.2, end: 13.0 },
    ],
  },
  {
    phrase: "Instantly live to nearby neighbors!",
    startSec: 16.2,
    endSec: 20.6,
    words: [
      { word: "Hit", start: 16.2, end: 16.6 },
      { word: "create!", start: 16.6, end: 17.3 },
      { word: "No", start: 17.3, end: 17.6 },
      { word: "waiting", start: 17.6, end: 18.2 },
      { word: "for", start: 18.2, end: 18.5 },
      { word: "approvals", start: 18.5, end: 19.4 },
    ],
  },
  {
    phrase: "Grow your store free",
    startSec: 21.2,
    endSec: 24.8,
    words: [
      { word: "Put", start: 21.2, end: 21.6 },
      { word: "your", start: 21.6, end: 21.9 },
      { word: "shop", start: 21.9, end: 22.5 },
      { word: "on", start: 22.5, end: 22.8 },
      { word: "the", start: 22.8, end: 23.0 },
      { word: "map!", start: 23.0, end: 23.8 },
    ],
  },
];

// --- ANIMATED CAPTION OVERLAY COMPONENT ---
const AnimatedCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = frame / fps;

  // Find active phrase
  const activePhrase = CAPTIONS.find(
    (c) => currentSec >= c.startSec && currentSec <= c.endSec
  );

  if (!activePhrase) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 1220,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "rgba(23, 25, 35, 0.82)",
          padding: "16px 36px",
          borderRadius: 24,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "center",
          maxWidth: 900,
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          backdropFilter: "blur(8px)",
        }}
      >
        {activePhrase.words.map((w, idx) => {
          const isWordActive = currentSec >= w.start && currentSec <= w.end;
          const wordPassed = currentSec > w.end;

          const wordSpring = spring({
            frame: frame - w.start * fps,
            fps,
            config: { damping: 12, stiffness: 180 },
          });

          return (
            <span
              key={idx}
              style={{
                fontFamily: BRAND.fontFamily,
                fontWeight: 800,
                fontSize: 52,
                color: isWordActive
                  ? BRAND.orange
                  : wordPassed
                  ? BRAND.white
                  : "rgba(255,255,255,0.6)",
                transform: isWordActive ? `scale(${1 + wordSpring * 0.15})` : "scale(1)",
                display: "inline-block",
                transition: "color 0.1s ease",
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// --- SCENE 1: THE HOOK (0 - 4s | 0 - 120 frames) ---
const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = interpolate(frame, [0, 120], [1, 1.05]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.lavender,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: BRAND.fontFamily,
      }}
    >
      {/* Friendly Shop Environment Mockup */}
      <div
        style={{
          width: 820,
          height: 980,
          backgroundColor: BRAND.white,
          borderRadius: 36,
          boxShadow: "0 20px 50px rgba(116, 59, 170, 0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 60,
          border: `4px solid ${BRAND.purple}`,
        }}
      >
        {/* Shopkeeper Badge */}
        <div
          style={{
            background: BRAND.purple,
            color: BRAND.white,
            padding: "12px 32px",
            borderRadius: 30,
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          Special Deal Alert
        </div>

        {/* Product Illustration */}
        <div
          style={{
            width: 440,
            height: 440,
            borderRadius: 32,
            background: "linear-gradient(135deg, #FFE8C2 0%, #FEA711 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 160,
          }}
        >
          🎁
        </div>

        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 52, color: BRAND.charcoal, margin: "0 0 10px 0", fontWeight: 800 }}>
            Featured Today
          </h2>
          <p style={{ fontSize: 32, color: BRAND.purple, margin: 0, fontWeight: 600 }}>
            Don't wait for foot traffic
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- SCENE 2: THE PLUS ACTION (4 - 9s | 120 - 270 frames) ---
const Scene2PlusAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame;

  const tapSpring = spring({
    frame: relativeFrame - 45, // tap at ~1.5s into scene
    fps,
    config: { damping: 10, stiffness: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#EFE8FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: BRAND.fontFamily,
      }}
    >
      {/* Smartphone Mockup */}
      <div
        style={{
          width: 780,
          height: 1400,
          backgroundColor: BRAND.charcoal,
          borderRadius: 54,
          padding: 24,
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: BRAND.white,
            borderRadius: 40,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* App Header */}
          <div
            style={{
              padding: "40px 30px 20px",
              background: BRAND.purple,
              color: BRAND.white,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 800 }}>meelTe</span>
            <span style={{ fontSize: 28, background: BRAND.orange, padding: "6px 16px", borderRadius: 16 }}>
              Local Ads
            </span>
          </div>

          {/* Feed Mockup Content */}
          <div style={{ padding: 30, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ height: 180, background: BRAND.lavender, borderRadius: 20 }} />
            <div style={{ height: 260, background: BRAND.lavender, borderRadius: 20 }} />
          </div>

          {/* Purple Floating '+' Action Button */}
          <div
            style={{
              position: "absolute",
              bottom: 60,
              right: 60,
              width: 120,
              height: 120,
              borderRadius: 60,
              background: `linear-gradient(135deg, ${BRAND.purple} 0%, #9B51E0 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: BRAND.white,
              fontSize: 68,
              fontWeight: 800,
              boxShadow: "0 12px 30px rgba(116, 59, 170, 0.4)",
              transform: `scale(${1 + tapSpring * 0.2})`,
            }}
          >
            +
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- SCENE 3: DISCOUNT & MAP PINNING (9 - 16s | 270 - 480 frames) ---
const Scene3DiscountMap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 10, stiffness: 160 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.lavender,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: BRAND.fontFamily,
      }}
    >
      <div
        style={{
          width: 860,
          backgroundColor: BRAND.white,
          borderRadius: 36,
          padding: 40,
          boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <div style={{ position: "relative", width: "100%", height: 420, borderRadius: 24, overflow: "hidden" }}>
          {/* Product Banner */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #FEA711 0%, #E68A00 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 140,
            }}
          >
            🛍️
          </div>

          {/* Popping Orange Discount Badge */}
          <div
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              backgroundColor: BRAND.charcoal,
              color: BRAND.orange,
              padding: "16px 28px",
              borderRadius: 20,
              fontSize: 34,
              fontWeight: 900,
              transform: `scale(${Math.max(0, badgeSpring)}) rotate(-4deg)`,
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            }}
          >
            FLAT 25% OFF
          </div>
        </div>

        {/* Map Preview Card */}
        <div
          style={{
            background: "#E8F4FD",
            borderRadius: 24,
            padding: 30,
            display: "flex",
            alignItems: "center",
            gap: 24,
            border: `2px dashed ${BRAND.purple}`,
          }}
        >
          <span style={{ fontSize: 50 }}>📍</span>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: BRAND.charcoal }}>
              Store Location Pinned
            </div>
            <div style={{ fontSize: 24, color: BRAND.purple }}>
              Nearby customers will see you first
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- SCENE 4: INSTANT LIVE FEED (16 - 21s | 480 - 630 frames) ---
const Scene4LiveFeed: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const toastSlide = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.lavender,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: BRAND.fontFamily,
      }}
    >
      {/* Success Green Toast */}
      <div
        style={{
          position: "absolute",
          top: 260,
          background: "#10B981",
          color: BRAND.white,
          padding: "20px 48px",
          borderRadius: 30,
          fontSize: 36,
          fontWeight: 800,
          boxShadow: "0 15px 40px rgba(16, 185, 129, 0.35)",
          transform: `translateY(${interpolate(toastSlide, [0, 1], [-80, 0])}px)`,
          zIndex: 40,
        }}
      >
        ✓ Advertisement Created!
      </div>

      {/* Live Feed Card */}
      <div
        style={{
          width: 860,
          backgroundColor: BRAND.white,
          borderRadius: 36,
          padding: 36,
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 30, fontWeight: 700, color: BRAND.charcoal }}>Your Shop</span>
          <span
            style={{
              background: BRAND.orange,
              color: BRAND.charcoal,
              padding: "8px 20px",
              borderRadius: 14,
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            50m away • LIVE
          </span>
        </div>
        <div
          style={{
            height: 380,
            background: "linear-gradient(135deg, #FEA711 0%, #743BAA 100%)",
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 120,
          }}
        >
          🎁
        </div>
        <div style={{ fontSize: 28, color: "#666", fontWeight: 600 }}>
          Direct foot traffic starting now
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- SCENE 5: BRAND OUTRO (21 - 25s | 630 - 750 frames) ---
const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.purple,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: BRAND.fontFamily,
        color: BRAND.white,
      }}
    >
      <div style={{ transform: `scale(${pop})`, textAlign: "center" }}>
        {/* Brand Wordmark */}
        <h1
          style={{
            fontSize: 120,
            margin: "0 0 20px 0",
            fontWeight: 800,
            letterSpacing: "-2px",
          }}
        >
          meelTe
        </h1>

        <p style={{ fontSize: 44, margin: "0 0 60px 0", fontWeight: 600, color: BRAND.lavender }}>
          Grow your store free
        </p>

        {/* Action Button */}
        <div
          style={{
            background: BRAND.orange,
            color: BRAND.charcoal,
            padding: "24px 64px",
            borderRadius: 40,
            fontSize: 40,
            fontWeight: 800,
            display: "inline-block",
            boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
          }}
        >
          Try meelTe free
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- MAIN REMOTION REEL 1 COMPOSITION ---
export const Reel1FlashDeal: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.charcoal, overflow: "hidden" }}>
      {/* SHOT 1: The Hook (0 - 4s) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Hook />
      </Sequence>

      {/* SHOT 2: The Plus Action (4 - 9s) */}
      <Sequence from={120} durationInFrames={150}>
        <Scene2PlusAction />
      </Sequence>

      {/* SHOT 3: Discount & Map Pinning (9 - 16s) */}
      <Sequence from={270} durationInFrames={210}>
        <Scene3DiscountMap />
      </Sequence>

      {/* SHOT 4: Instant Live Activation (16 - 21s) */}
      <Sequence from={480} durationInFrames={150}>
        <Scene4LiveFeed />
      </Sequence>

      {/* SHOT 5: Outro & Call to Action (21 - 25s) */}
      <Sequence from={630} durationInFrames={120}>
        <Scene5Outro />
      </Sequence>

      {/* Dynamic Animated Karaoke Captions (Safe Area: Y 1220px) */}
      <AnimatedCaptions />
    </AbsoluteFill>
  );
};

export default Reel1FlashDeal;

