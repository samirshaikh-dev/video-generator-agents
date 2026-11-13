// Robust Multi-Engine AI Voice Generator (HTTPS + Windows Offline Fallback)
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const OUTPUT_DIR = path.join(__dirname, "remotion-project", "public", "audio");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "voiceover.mp3");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const PHRASES = [
  "Got a product you want to sell today?",
  "Don't wait for foot traffic.",
  "Open meelTe, tap the plus sign",
  "Add your price, pick your discount badge",
  "Hit create! No waiting for approvals,",
  "Put your shop on the map.",
  "Try meelTe free today!"
];

async function tryGoogleTTS() {
  console.log("Attempting Neural Speech via standard HTTPS...");
  const buffers = [];

  for (const phrase of PHRASES) {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en-in&client=tw-ob&q=${encodeURIComponent(phrase)}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "http://translate.google.com/"
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} from TTS service`);
    }

    const arrayBuffer = await res.arrayBuffer();
    buffers.push(Buffer.from(arrayBuffer));
  }

  const combined = Buffer.concat(buffers);
  fs.writeFileSync(OUTPUT_FILE, combined);
  console.log(`[SUCCESS] Generated voiceover via HTTPS (${combined.length} bytes)`);
  return true;
}

function fallbackWindowsTTS() {
  console.log("Falling back to Windows Native Speech Synthesis...");
  const fullText = PHRASES.join(" ");
  const tempWav = path.join(OUTPUT_DIR, "voiceover.wav");

  const psScript = `
    Add-Type -AssemblyName System.Speech
    $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
    $synth.Rate = 0
    $synth.SetOutputToWaveFile('${tempWav.replace(/\\/g, "\\\\")}')
    $synth.Speak('${fullText.replace(/'/g, "''")}')
    $synth.Dispose()
  `;

  execSync(`powershell -NoProfile -Command "${psScript.replace(/\n/g, " ")}"`, {
    stdio: "inherit"
  });

  // Copy or rename WAV to MP3 path so Remotion finds it
  if (fs.existsSync(tempWav)) {
    fs.copyFileSync(tempWav, OUTPUT_FILE);
    console.log(`[SUCCESS] Generated offline voiceover via Windows Speech: ${OUTPUT_FILE}`);
  }
}

async function main() {
  try {
    await tryGoogleTTS();
  } catch (err) {
    console.warn("HTTPS TTS failed:", err.message);
    try {
      fallbackWindowsTTS();
    } catch (err2) {
      console.error("Windows TTS fallback failed:", err2.message);
      // Create a dummy silent MP3 so Remotion render never crashes with 404
      const dummyHeader = Buffer.from([0xFF, 0xFB, 0x90, 0x64]);
      fs.writeFileSync(OUTPUT_FILE, dummyHeader);
      console.log("Created placeholder audio to prevent render crash.");
    }
  }
}

main();
