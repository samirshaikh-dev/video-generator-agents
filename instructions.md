# meelTe Video Creation Master Guide (End-to-End Pipeline)

This document is the authoritative instruction manual for AI agents, creative strategists, and motion graphics engineers producing short-form video reels for **meelTe**. It outlines the complete process from creative brief to final 1080×1920 MP4 video deliverable.

---

## 1. Brand Identity & Art Direction Standard

All visual assets must strictly follow the canonical meelTe brand identity established in `brand/meelte-brand.json` and demonstrated in reference assets:
- **Primary Reference:** `Warm Bakery Bag Exchange.png` (warm commercial narrative)
- **Secondary Reference:** `image.png` (flat vector community dialogue)

### Palette Tokens
| Token | Hex | Role | Usage |
| :--- | :--- | :--- | :--- |
| **Orange** | `#FEA711` | Primary Accent | CTAs, discount badges, active caption highlights, pins. |
| **Purple** | `#743BAA` | Primary Anchor | Headlines, brand lockups, buttons, shop aprons, key shapes. |
| **Lavender** | `#F4EFFD` | Supporting Neutral | Backgrounds, soft panels, card surfaces, ambient walls. |
| **Charcoal** | `#171923` | High Contrast | Typography, outlines, phone bezels, deep shadows. |
| **White** | `#FFFFFF` | Clarity | Negative space, text on purple, card fills. |

> **Hard Rule:** Orange and purple must remain the dominant brand pair. Never use generic corporate blue, teal, or neon greens.

### Visual Style Requirements
- **Style Name:** *Playful Modern Branding + Flat Vector Illustration + Bold Editorial Advertising*.
- **Style Attributes:** Polished 2D commercial vector illustration, clean bold contour lines, soft lighting highlights, smooth subtle gradients.
- **Strictly Banned:** Photorealism, 3D/clay render, AI plastic sheen, generic stock photography, and wireframe emoji placeholders.
- **Character Continuity:** When recurring characters appear across a reel, their hair, skin tone, facial features, wardrobe, and screen direction must remain 100% continuous across all cuts.

---

## 2. Technical Format & Timing Specifications

* **Platform:** Instagram Reels, YouTube Shorts, TikTok.
* **Canvas:** `1080 × 1920` (9:16 Vertical).
* **Frame Rate:** `30 fps`.
* **Standard Duration:** **Exactly 25.0 seconds** (`750 frames`).
* **Shot Arithmetic Formula:**
  * **Shot 1 (The Hook):** `0:00 – 0:04` (4.0s / 120 frames)
  * **Shot 2 (The App Action):** `0:04 – 0:09` (5.0s / 150 frames)
  * **Shot 3 (The Key Feature):** `0:09 – 0:16` (7.0s / 210 frames)
  * **Shot 4 (Direct Result / Foot Traffic):** `0:16 – 0:21` (5.0s / 150 frames)
  * **Shot 5 (Brand Outro & CTA):** `0:21 – 0:25` (4.0s / 120 frames)
  * *Total:* `120 + 150 + 210 + 150 + 120 = 750 frames (25.0s)`.
* **Platform Safe Areas:**
  * Keep top `220px` clear of essential graphics (reserved for platform UI header).
  * Keep bottom `340px` clear of essential graphics (reserved for engagement buttons/captions).
  * Center dynamic captions at `Y: 1240px` inside a dark rounded card (`rgba(23, 25, 35, 0.88)`).

---

## 3. End-to-End Blueprints for Reels 1 to 6

---

### Reel 1: The 60-Second Flash Deal
* **Objective:** Show how fast a merchant can post a single product deal with discount badges and reach nearby customers.
* **Target Audience:** Boutiques, retail shops, bakeries, grocery clearances.
* **Character Lock:** Friendly Indian bakery shopkeeper with short black beard, white rolled-up shirt, purple apron (`#743BAA`).

#### Scene-by-Scene Visual Prompts & Actions
1. **Scene 1 (The Hook | 0–4s):**
   * *Asset:* `outputs/MEE-2026-0001/scenes/scene-1.jpg`
   * *Visual Prompt:* 9:16 vertical 2D commercial vector illustration of a friendly Indian bakery shopkeeper with short black beard and warm smile behind wooden counter holding up a fresh golden croissant. Warm bakery background, purple dome lamps, lavender walls.
   * *Camera:* Slow 3% push-in.
   * *VO:* *"Got a product you want to sell fast today? Don't wait for foot traffic."*
   * *Caption:* `Got a deal to share today?`
2. **Scene 2 (Photo Snap | 4–9s):**
   * *Asset:* `outputs/MEE-2026-0001/scenes/scene-2.jpg`
   * *Visual Prompt:* First-person POV holding smartphone over bakery counter framing croissant display with meelTe camera viewfinder and purple '+' button.
   * *Camera:* Micro-tilt down.
   * *VO:* *"Open meelTe, tap the plus sign, and snap a clear photo."*
   * *Caption:* `Tap + ➔ Single Item`
   * *SFX Cue:* Camera shutter snap at 0:07 (frame 210).
3. **Scene 3 (Discount & Map Setup | 9–16s):**
   * *Asset:* `outputs/MEE-2026-0001/scenes/scene-3.jpg`
   * *Visual Prompt:* Phone screen showing ad creation form; vibrant orange 'FLAT 25% OFF' badge springs onto croissant photo; map card pins bakery location with glowing orange marker.
   * *Camera:* Smooth pan down form.
   * *VO:* *"Add your price, pick your discount badge, and pin your store on the map."*
   * *Caption:* `Pick your discount badge`
   * *SFX Cue:* Bouncy UI pop at 0:12 (frame 360).
4. **Scene 4 (Customer Delivery | 16–21s):**
   * *Asset:* `outputs/MEE-2026-0001/scenes/scene-4.jpg`
   * *Visual Prompt:* Shopkeeper handing brown bakery bag across counter to smiling customer in mustard top and cream scarf. Floating green toast: '✓ Advertisement Created • 50m away'.
   * *Camera:* Subtle parallax drift.
   * *VO:* *"Hit create! No waiting for approvals—your deal goes live to nearby shoppers right now."*
   * *Caption:* `Instantly live to nearby neighbors!`
   * *SFX Cue:* Completion chime at 0:18 (frame 540).
5. **Scene 5 (Brand Outro | 21–25s):**
   * *Asset:* `outputs/MEE-2026-0001/scenes/scene-5.jpg`
   * *Visual Prompt:* Deep purple card (#743BAA) with white meelTe wordmark, headline 'Grow your store free', and orange CTA button 'Try meelTe free'.
   * *VO:* *"Put your shop on the map. Try meelTe free today!"*
   * *Caption:* `Grow your store free`
   * *SFX Cue:* Warm acoustic resolve chord at 0:22.5 (frame 675).

---

### Reel 2: The Menu Magic (AI Bulk-Import)
* **Objective:** Digitize up to 100 items from paper menus in seconds using AI scanning.
* **Target Audience:** Cafes, restaurants, bakeries, salons, grocery stores.
* **Character Lock:** Cafe owner sitting at a wooden cafe table holding a printed paper menu.

#### Scene-by-Scene Visual Prompts & Actions
1. **Scene 1 (The Hook | 0–4s):**
   * *Visual:* Busy cafe owner sitting at a cafe table with a 3-page paper menu, looking tired at the thought of typing it all into a phone.
   * *VO:* *"Still typing your entire shop menu item by item on your phone?"*
   * *Caption:* `Stop typing 50 items by hand!`
2. **Scene 2 (The Tool | 4–9s):**
   * *Visual:* Phone close-up: meelTe ad creation modal, user selects "Multiple Item Advertisements" and taps "Import from Photos" with magic star badge.
   * *VO:* *"Stop! In meelTe, choose Shop Ad and tap 'Import from Photos'."*
   * *Caption:* `Tap + ➔ Import from Photos`
3. **Scene 3 (The AI Scan | 9–16s):**
   * *Visual:* Phone camera scans paper menu; glowing purple/orange AI beam sweeps across; editable cards with item names and prices pop in automatically.
   * *SFX Cue:* Magic sparkle / swoosh at 0:13 (frame 390).
   * *VO:* *"Just snap a photo of your paper menu or price board. meelTe automatically reads the items and prices for you!"*
   * *Caption:* `AI reads names & prices!`
4. **Scene 4 (Live Storefront | 16–21s):**
   * *Visual:* Owner scrolls through a rich 100-item digital catalog, taps create, and storefront pops up on neighborhood map.
   * *SFX Cue:* Success ding at 0:19 (frame 570).
   * *VO:* *"Review your items, pin your location, and publish up to a hundred products in one tap."*
   * *Caption:* `Digital shop live in 1 tap!`
5. **Scene 5 (Outro | 21–25s):**
   * *Visual:* Purple brand card, headline "Turn paper into customers", orange CTA "Open your shop today".
   * *VO:* *"Turn paper into customers. Start selling on meelTe free."*
   * *Caption:* `Open your shop today`

---

### Reel 3: Walking Distance Deals (Shopper Discovery)
* **Objective:** Show how nearby shoppers discover local offers and walk into stores via Google Maps.
* **Target Audience:** Everyday shoppers, foodies, community members.
* **Character Lock:** Enthusiastic local resident walking down a neighborhood street.

#### Scene-by-Scene Visual Prompts & Actions
1. **Scene 1 (The Hook | 0–4s):**
   * *Visual:* Shopper walking down a bustling street, glancing around curiously.
   * *VO:* *"Ever wonder what secret discounts are happening right around your corner?"*
   * *Caption:* `Deals right around the corner?`
2. **Scene 2 (Proximity Feed | 4–9s):**
   * *Visual:* Phone screen: meelTe Advertisements tab showing local ads sorted by distance (e.g. `150m away`, `300m away`).
   * *VO:* *"Open meelTe and tap Advertisements. You’ll see real offers from local shops, sorted by who’s closest to you."*
   * *Caption:* `Nearby deals, closest first!`
3. **Scene 3 (Deal Detail & Like | 9–16s):**
   * *Visual:* Tapping a bakery deal with `30% OFF`, double-tapping the photo to send a glowing orange heart like.
   * *SFX Cue:* Heart pop sound at 0:12 (frame 360).
   * *VO:* *"Fresh bread, boutique sales, or cafe combos—tap any ad to see real prices and customer photos."*
   * *Caption:* `Fresh offers from real shops`
4. **Scene 4 (1-Tap Directions | 16–21s):**
   * *Visual:* Tapping blue 'Directions' button; Google Maps opens with a 3-minute walking line; shopper steps right through the bakery doorway.
   * *SFX Cue:* Map pin drop at 0:17 (frame 510).
   * *VO:* *"Love what you see? Tap Directions and walk straight to their door!"*
   * *Caption:* `1-Tap Directions on Google Maps`
5. **Scene 5 (Outro | 21–25s):**
   * *Visual:* Brand card with community illustration, headline "Support local and save", CTA "Discover your neighborhood".
   * *VO:* *"Support local and save money. Discover your neighborhood on meelTe!"*
   * *Caption:* `Discover your neighborhood`

---

### Reel 4: Zero Fees, Zero Waiting (100% Free & Instant Publishing)
* **Objective:** Highlight that meelTe ads have no listing fees, no commission, and no approval delays.
* **Target Audience:** Small business owners, street vendors, home chefs.

#### Scene-by-Scene Visual Prompts & Actions
1. **Scene 1 (The Hook | 0–4s):**
   * *Visual:* Shopkeeper looking stressed at an expensive ad bill and a "Pending Approval" spinner on a competitor platform.
   * *SFX Cue:* Dull buzzer at 0:02 (frame 60).
   * *VO:* *"Tired of expensive ad fees and waiting days for someone to approve your post?"*
   * *Caption:* `Tired of ad fees & waiting days?`
2. **Scene 2 (100% Free | 4–9s):**
   * *Visual:* Bright meelTe form with a glowing badge reading "100% Free to Post"; owner effortlessly fills store name.
   * *VO:* *"On meelTe, sharing your deals with your community is completely free. Zero charges, zero cuts."*
   * *Caption:* `100% Free • No Commissions`
3. **Scene 3 (Instant Live | 9–16s):**
   * *Visual:* Finger taps 'Create Advertisement'; instant green banner flashes: '✓ Advertisement Created'.
   * *VO:* *"And the best part? There’s no waiting queue. As soon as you hit create, your ad is live."*
   * *Caption:* `Instant Live • No Waiting Queue`
4. **Scene 4 (Counter Traffic | 16–21s):**
   * *Visual:* Local shoppers walk into the physical store holding up the ad on their phones; owner waves cheerfully.
   * *SFX Cue:* Shop counter bell at 0:18 (frame 540).
   * *VO:* *"Nearby neighbors see your offers right away and walk straight into your store."*
   * *Caption:* `Real customers at your counter`
5. **Scene 5 (Outro | 21–25s):**
   * *Visual:* Brand card, headline "No fees. No delays.", orange CTA button "Grow your store free".
   * *VO:* *"No fees. No delays. Start promoting your store on meelTe today!"*
   * *Caption:* `Grow your store free`

---

### Reel 5: Schedule Your Weekend Rush (Scheduled Sales)
* **Objective:** Show how to plan seasonal or weekend flash sales in advance.
* **Target Audience:** Retailers, clothing boutiques, seasonal sellers.

#### Scene-by-Scene Visual Prompts & Actions
1. **Scene 1 (The Hook | 0–4s):**
   * *Visual:* Boutique owner hanging a "Weekend Sale" poster in the storefront window on Thursday evening.
   * *VO:* *"Planning a big weekend sale or holiday offer? Don't stress about posting on the day."*
   * *Caption:* `Planning a weekend sale?`
2. **Scene 2 (Calendar Pick | 4–9s):**
   * *Visual:* Phone form calendar picker: selecting Start Date (Friday 12:00 AM) and End Date (Sunday 11:59 PM).
   * *SFX Cue:* Calendar page flip sound at 0:06 (frame 180).
   * *VO:* *"With meelTe, you can schedule your promotion ahead of time. Pick your start date and end date."*
   * *Caption:* `Set start & end dates in advance`
3. **Scene 3 (Midnight Activation | 9–16s):**
   * *Visual:* Animated clock hands hit midnight; ad status transitions from 'Scheduled' to a glowing green 'Live'.
   * *SFX Cue:* Soft clock chime at 0:12 (frame 360).
   * *VO:* *"Your ad automatically wakes up at midnight when your sale begins, and wraps up when it ends."*
   * *Caption:* `Wakes up automatically!`
4. **Scene 4 (Relaxed Owner | 16–21s):**
   * *Visual:* Saturday morning: owner sips tea calmly while customers browse clothing racks.
   * *VO:* *"Set it, forget it, and let your neighborhood know exactly when the deals are hot."*
   * *Caption:* `Set it once & relax`
5. **Scene 5 (Outro | 21–25s):**
   * *Visual:* Brand card, headline "The smart partner for local shops", CTA "Plan your next sale".
   * *VO:* *"Plan your next sale with meelTe. Download and create today!"*
   * *Caption:* `Plan your next sale`

---

### Reel 6: Total Control In Your Pocket (Live Management & Sold Out)
* **Objective:** Demonstrate how owners edit prices on the fly, track likes, or delete ads when sold out.
* **Target Audience:** Fast-moving merchants, bakers with daily batches, busy store managers.

#### Scene-by-Scene Visual Prompts & Actions
1. **Scene 1 (The Hook | 0–4s):**
   * *Visual:* Baker proudly slapping a "Sold Out!" sticker onto an empty pastry display tray.
   * *VO:* *"Sold out of your daily special faster than expected? Don't worry, you’re in total control."*
   * *Caption:* `Sold out of your best-seller?`
2. **Scene 2 (Profile Tracking | 4–9s):**
   * *Visual:* User's meelTe Profile ➔ Advertisements tab showing live running ads with active like/comment counters.
   * *VO:* *"Go straight to your meelTe profile to see your active ads, real-time likes, and customer questions."*
   * *Caption:* `Manage right from your profile`
3. **Scene 3 (Live Edit | 9–16s):**
   * *Visual:* Tapping three-dot menu (⋮) ➔ Edit: quickly typing a new price or updating hours in 2 taps.
   * *SFX Cue:* Edit tap chime at 0:11 (frame 330).
   * *VO:* *"Need to update a price or change your store hours? Tap Edit and save changes in seconds."*
   * *Caption:* `Edit prices or details anytime`
4. **Scene 4 (Instant Delete | 16–21s):**
   * *Visual:* Tapping Delete: confirmation dialog confirms, and ad disappears immediately from the community feed.
   * *SFX Cue:* Clean swoosh at 0:18 (frame 540).
   * *VO:* *"Or tap Delete to remove it immediately once your stock is gone. No confusion, no outdated signs."*
   * *Caption:* `Or delete in 1 tap`
5. **Scene 5 (Outro | 21–25s):**
   * *Visual:* Brand card, headline "Your shop, your rules", CTA "Try meelTe free".
   * *VO:* *"Run your local promotions on your own terms. Try meelTe free today!"*
   * *Caption:* `Your shop, your rules`

---

## 4. Audio Generation & Ducking Architecture

### Zero-Dependency Speech Synthesis (`generate_voice.js`)
All AI voiceovers are produced using **pure Node.js** without external dependencies:
1. **Primary Engine:** Standard HTTPS audio streaming (`https://translate.google.com/translate_tts?ie=UTF-8&tl=en-in&client=tw-ob&q=...`) which bypasses firewall/WebSocket proxy issues.
2. **Offline Fallback Engine:** Windows Native Speech Synthesizer (`System.Speech.Synthesis.SpeechSynthesizer`) guaranteeing that a valid audio track is created even when completely offline.
3. **Voiceover Pacing:** Target **130–145 words per minute** (~2.3 words/sec).

### Music Ducking Curve
* Base music volume: `-6 dB` (or `0.35` in Remotion).
* Ducked volume during speech: `-16 dB` (or `0.12` in Remotion).
* Attack: `120 ms` | Release: `250 ms`.

---

## 5. Rendering Pipeline & Execution

### Folder Structure
```
outputs/<request_id>/
  ├── brief.json             (Normalized request)
  ├── video-plan.json        (5-shot timecode arithmetic & safe zones)
  ├── prompt-v1.md           (Provider-neutral & image-to-video prompt package)
  ├── reviews/
  │   └── prompt-v1.review.json
  └── scenes/
      ├── scene-1.jpg        (9:16 vertical 1080x1920)
      ├── scene-2.jpg
      ├── scene-3.jpg
      ├── scene-4.jpg
      └── scene-5.jpg
```

### Video Rendering Execution
* **To render the MP4 directly to root:** Run `render_reel.bat`.
* **To preview live in browser:** Run `preview_reel.bat`.
* **Remotion Composition:** `remotion-project/src/Composition.tsx` handles frame interpolation, spring animations, and karaoke subtitles.

