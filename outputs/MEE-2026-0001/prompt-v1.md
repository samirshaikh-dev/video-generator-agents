# meelTe Video Prompt Package: Reel 1 (The 60-Second Flash Deal)
## Bespoke 2D Vector Illustration Edition

* **Request ID:** `MEE-2026-0001`
* **Version:** `2.0.0`
* **Updated:** 2026-11-13
* **Platform Target:** Instagram Reels / YouTube Shorts / TikTok (9:16 Vertical)
* **Target Duration:** Exactly 25 Seconds (750 frames at 30 fps)
* **Visual Reference Assets:**
  * Primary Style Reference: `Warm Bakery Bag Exchange.png` (Canonical meelTe editorial vector style)
  * Secondary Character & Tone Reference: `image.png` (Warm community dialogue & clean flat vectors)
  * Scene 1 Keyframe: `outputs/MEE-2026-0001/scenes/scene-1.jpg`
  * Scene 2 Keyframe: `outputs/MEE-2026-0001/scenes/scene-2.jpg`
  * Scene 3 Keyframe: `outputs/MEE-2026-0001/scenes/scene-3.jpg`
  * Scene 4 Keyframe: `outputs/MEE-2026-0001/scenes/scene-4.jpg`
* **Status:** QA Approved (Bespoke Illustrated Pipeline)

---

## 1. Executive Brief & Creative Intent

* **Objective:** Show local retail owners and shopkeepers how easy and fast it is to create a Single Item deal with instant discount badges and direct neighborhood discovery on meelTe.
* **Target Audience:** Local small-business owners, retail shopkeepers, bakery owners, and boutique managers.
* **Art Direction:** Warm, rich **2D commercial vector illustration** with expressive characters, clean lines, and inviting lighting (strictly matching *Warm Bakery Bag Exchange*).
* **Brand Palette:**
  * Dominant Brand Pair: **meelTe Purple (`#743BAA`)** and **meelTe Orange (`#FEA711`)**
  * Supporting: **Lavender (`#F4EFFD`)**, **Charcoal (`#171923`)**, and **White (`#FFFFFF`)**

---

## 2. Character & Environment Consistency Locks

* **Protagonist (The Shopkeeper):**
  * Friendly Indian bakery owner, neat short black beard, warm approachable smile, dark hair.
  * Wardrobe: Crisp white rolled-up sleeve shirt, deep purple apron (`#743BAA`) with subtle orange stitching (`#FEA711`).
* **Customer:**
  * Friendly local woman with dark wavy hair, warm mustard/orange top (`#FEA711`), cream scarf/dupatta, purple handbag.
* **Bakery Setting:**
  * Warm artisanal neighborhood bakery with wooden display shelves, golden breads, purple tea/coffee boxes, hanging purple dome pendant lights, hanging indoor potted plants, glass pastry counter filled with croissants, purple-glazed donuts, and muffins.

---

## 3. Shot-by-Shot Motion & Prompt Specification

### Shot 1: The Hook (0:00 – 4:00 | 120 frames)
* **Reference Asset:** `outputs/MEE-2026-0001/scenes/scene-1.jpg`
* **Subject & Setting:** Inside the warm bakery. The friendly shopkeeper stands behind the wooden counter and glass pastry case, holding up a golden croissant with both hands toward the camera with an inviting smile.
* **Motion & Camera:** Slow 3% push-in camera move with subtle breathing and eye-blink micro-animations.
* **Voiceover:** *"Got a product you want to sell fast today? Don't wait for foot traffic."*
* **On-Screen Karaoke Caption (Y: 1220px):** `Got a deal to share today?`

### Shot 2: Snapping the Photo (4:00 – 9:00 | 150 frames)
* **Reference Asset:** `outputs/MEE-2026-0001/scenes/scene-2.jpg`
* **Subject & Setting:** First-person POV over the wooden counter. The shopkeeper's hands hold a smartphone, pointing the camera at the croissant display tray.
* **Motion & Camera:** The phone camera autofocus box pulses once over the golden croissants. At 0:07, a bright shutter flash fires with an audible camera click.
* **Voiceover:** *"Open meelTe, tap the plus sign, and snap a clear photo."*
* **On-Screen Karaoke Caption (Y: 1220px):** `Tap + ➔ Single Item`
* **SFX Cue:** Shutter click at 0:07 (frame 210).

### Shot 3: Instant Discount & Store Pin (9:00 – 16:00 | 210 frames)
* **Reference Asset:** `outputs/MEE-2026-0001/scenes/scene-3.jpg`
* **Subject & Setting:** Close-up of the smartphone screen in the bakery. The screen displays the captured croissant photo.
* **Motion & Camera:** A vibrant orange badge reading `FLAT 25% OFF` springs onto the top-right corner of the image with a bouncy pop. Below it, an orange location pin drops onto the mini map card with a soft pulse ring. At 0:15, a finger taps the purple `Create Ad` button.
* **Voiceover:** *"Add your price, pick your discount badge, and pin your store on the map."*
* **On-Screen Karaoke Caption (Y: 1220px):** `Pick your discount badge`
* **SFX Cue:** Bouncy UI pop at 0:12 (frame 360).

### Shot 4: Direct Foot Traffic & Delivery (16:00 – 21:00 | 150 frames)
* **Reference Asset:** `outputs/MEE-2026-0001/scenes/scene-4.jpg`
* **Subject & Setting:** Eye-level view across the bakery counter. The smiling customer from *Warm Bakery Bag Exchange* receives a fresh brown bakery paper bag handed by the shopkeeper.
* **Motion & Camera:** Subtle parallax camera drift. A green pill notification slides in at the top: `✓ Advertisement Created • 50m away`. Both characters smile warmly.
* **Voiceover:** *"Hit create! No waiting for approvals—your deal goes live to nearby shoppers right now."*
* **On-Screen Karaoke Caption (Y: 1220px):** `Instantly live to nearby neighbors!`
* **SFX Cue:** Upward success chime at 0:18 (frame 540).

### Shot 5: Outro & Call to Action (21:00 – 25:00 | 120 frames)
* **Subject & Setting:** Canonical meelTe brand closing card on a solid deep purple background (`#743BAA`) with an organic lavender curved wave.
* **Motion & Camera:** The official reverse-white meelTe logo pops into center with a gentle spring scale. Bold white headline: "Grow your store free" with a vibrant orange button "Try meelTe free".
* **Voiceover:** *"Put your shop on the map. Try meelTe free today!"*
* **On-Screen Text (Y: 1220px):** `Grow your store free`
* **SFX Cue:** Warm acoustic resolve chord at 0:22.5 (frame 675).

---

## 4. Master Prompt for Image-to-Video / AI Video Generators

If passing this pipeline into an AI video model (e.g. Runway Gen-3, Kling AI, Luma Dream Machine, Sora) using image-to-video mode:

```
Animate this 25-second vertical 9:16 video in a polished 2D commercial vector illustration style with warm lighting and rich colors, strictly preserving the visual style of 'Warm Bakery Bag Exchange.png'. 

Sequence:
1. Start with the friendly Indian bakery shopkeeper (short black beard, purple apron #743BAA over a white shirt) behind the wooden counter holding up a golden croissant with an inviting smile (0–4s).
2. Cut to first-person POV of the shopkeeper holding a smartphone over the counter, snapping a photo of the croissant display with an active camera viewfinder and purple '+' button (4–9s).
3. The phone displays the meelTe ad creation screen; a bright orange 'FLAT 25% OFF' badge pops onto the photo with a spring bounce, and an orange pin drops onto a local street map (9–16s).
4. Cut to the smiling shopkeeper handing a brown bakery bag across the counter to a happy Indian woman customer in a mustard top (#FEA711) and cream scarf (16–21s).
5. Settle smoothly onto a clean deep purple (#743BAA) brand end-card with the white meelTe wordmark and orange CTA button 'Try meelTe free' (21–25s).

Style: Clean flat vector forms, smooth subtle gradients, warm bakery atmosphere, zero 3D sheen, zero photorealism. Maintain strict character and setting continuity across all shots.
```

---

## 5. Negative Constraints

`No photorealism, no 3D clay, no generic corporate stock photos, no plastic textures, no distorted fingers or missing thumbs, no neon or teal colors, no unapproved text or watermarks, no jittery camera.`
