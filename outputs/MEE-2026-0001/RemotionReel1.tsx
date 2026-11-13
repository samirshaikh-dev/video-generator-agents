import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
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

// --- SCENE IMAGE PATHS ---
// Place scene images into your public folder or reference directly
const SCENES = {
  scene1: "scenes/scene-1.jpg",
  scene2: "scenes/scene-2.jpg",
  scene3: "scenes/scene-3.jpg",
  scene4: "scenes/scene-4.jpg",
};

// --- CAPTION DATA WITH WORD TIMESTAMPS ---
interface CaptionWord {
  word: string;
  start: number;
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

// --- ANIMATED KARAOKE CAPTIONS ---
const AnimatedCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = frame / fps;

  const activePhrase = CAPTIONS.find(
    (c) => currentSec >= c.startSec && currentSec <= c.endSec
  );

  if (!activePhrase) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 1240,
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
          background: "rgba(23, 25, 35, 0.85)",
          padding: "16px 36px",
          borderRadius: 24,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "center",
          maxWidth: 920,
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
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

// --- SHOT 1: THE HOOK (0 - 4s | 0 - 120 frames) ---
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 120], [1, 1.06]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: BRAND.charcoal }}>
      <Img
        src={SCENES.scene1}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

// --- SHOT 2: PHOTO SNAP (4 - 9s | 120 - 270 frames) ---
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 150], [1, 1.05]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: BRAND.charcoal }}>
      <Img
        src={SCENES.scene2}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

// --- SHOT 3: DISCOUNT & MAP SETUP (9 - 16s | 270 - 480 frames) ---
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 210], [1.05, 1.0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: BRAND.charcoal }}>
      <Img
        src={SCENES.scene3}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

// --- SHOT 4: DIRECT FOOT TRAFFIC & DELIVERY (16 - 21s | 480 - 630 frames) ---
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = interpolate(frame, [0, 150], [1, 1.05]);

  const toastSlide = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: BRAND.charcoal }}>
      <Img
        src={SCENES.scene4}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />

      {/* Floating Success Notification */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          transform: `translateY(${interpolate(toastSlide, [0, 1], [-60, 0])}px)`,
          zIndex: 40,
        }}
      >
        <div
          style={{
            background: "#10B981",
            color: BRAND.white,
            padding: "18px 42px",
            borderRadius: 30,
            fontSize: 34,
            fontWeight: 800,
            fontFamily: BRAND.fontFamily,
            boxShadow: "0 15px 40px rgba(16, 185, 129, 0.4)",
          }}
        >
          ✓ Advertisement Created • 50m away
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- SHOT 5: BRAND OUTRO (21 - 25s | 630 - 750 frames) ---
const Scene5: React.FC = () => {
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
        <Scene1 />
      </Sequence>

      {/* SHOT 2: Photo Snap (4 - 9s) */}
      <Sequence from={120} durationInFrames={150}>
        <Scene2 />
      </Sequence>

      {/* SHOT 3: Discount & Map Setup (9 - 16s) */}
      <Sequence from={270} durationInFrames={210}>
        <Scene3 />
      </Sequence>

      {/* SHOT 4: Direct Foot Traffic & Delivery (16 - 21s) */}
      <Sequence from={480} durationInFrames={150}>
        <Scene4 />
      </Sequence>

      {/* SHOT 5: Brand Outro (21 - 25s) */}
      <Sequence from={630} durationInFrames={120}>
        <Scene5 />
      </Sequence>

      {/* Dynamic Animated Karaoke Captions */}
      <AnimatedCaptions />
    </AbsoluteFill>
  );
};

export default Reel1FlashDeal;
