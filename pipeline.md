# meelTe Video Prompt & Illustrated Video Pipeline

The canonical workflow for turning a meelTe marketing brief into a brand-safe, time-aware video concept, time-coded shot plan, bespoke 2D vector scene keyframes, and model-ready prompt package. 

```
rough brief → normalize → load brand rules → plan message & story 
            → generate bespoke 9:16 scene illustrations (outputs/<id>/scenes/)
            → author provider-neutral / image-to-video prompt package
            → generate AI voiceover (HTTPS / SAPI) & audio ducking specs
            → configure animated karaoke captions inside 9:16 safe areas
            → self-check & prompt QA
            → deliver prompt package & illustrated storyboard
            → render via Remotion (render_reel.bat) or AI video provider
```

---

## 0. Non-negotiables

1. **Never invent campaign facts.** Do not add prices, discounts, deadlines, statistics, guarantees, testimonials, product capabilities, or claims the user did not supply.
2. **Never fabricate the meelTe logo.** Use only an approved supplied asset. Without one, reserve a clean zone and mark `logo pending`.
3. **Never change approved copy silently.** Preserve exact user-supplied text.
4. **Never claim a video was rendered unless it was actually generated.** A prompt package, scene storyboard, and rendered video file are distinct deliverables. State status truthfully.
5. **Read the brand source of truth; never recall it.** Always use `brand/meelte-brand.json`.
6. **Keep prompts temporal.** Describe actions, camera movements, and their order over time; do not stop at static image descriptions.
7. **Preserve visual continuity.** Character design (clothing, hair, beard), props, environment, and brand color palette (`#FEA711` orange & `#743BAA` purple) must remain strictly locked across all shots.
8. **Keep every version.** Do not overwrite approved prompts or scene assets; version them (`v1`, `v2`).

---

## 1. Normalize the Request (VideoBrief)

Normalize each user request into a structured `VideoBrief`:

| Field | Default if missing |
|---|---|
| `objective` | Infer from the prompt; if unclear, ask |
| `audience` | Local small-business owners / shoppers |
| `platform` | Instagram Reels / YouTube Shorts / TikTok |
| `duration` | 25 seconds for tutorial reels; 15 seconds for flash announcements |
| `aspect_ratio` | 9:16 vertical (1080×1920) |
| `key_message` | Derived from brief; keep factual and supportive of local owners |
| `copy` | None; use only supplied exact strings |
| `visual_reference` | `Warm Bakery Bag Exchange.png`, `image.png` |
| `logo_asset` | `brand/assets/logo/primary-full-colour` or `reverse-white` |
| `approval_mode` | Automatic prompt review; rendering is not implied |

Ask at most one clarification question, and only if a missing detail materially changes the creative.

---

## 2. Load Brand System & Continuity Locks

Read `brand/meelte-brand.json`. Apply:
- **Palette Tokens:** Dominant pair: **meelTe Orange (`#FEA711`)** and **meelTe Purple (`#743BAA`)**, supported by Lavender (`#F4EFFD`), Charcoal (`#171923`), and White (`#FFFFFF`).
- **Art Direction:** Polished **2D commercial vector illustration** with smooth shading and clean contours (as seen in `Warm Bakery Bag Exchange.png` and `image.png`).
- **Banned Styles:** Photorealism, 3D/clay render, AI plastic sheen, generic stock photography, and wireframe emoji placeholders.
- **Character Continuity:** When recurring characters appear (e.g., the bearded Indian bakery shopkeeper in purple apron, or the customer in mustard top), their wardrobe, skin tone, hair, and facial features must remain locked across all shots.

---

## 3. Plan the Story, Timing & Audio Architecture

1. **Duration Arithmetic:** Split the target duration into a small number of readable shots whose durations sum **exactly** to the requested total duration (e.g., 4s + 5s + 7s + 5s + 4s = 25.0s / 750 frames at 30 fps).
2. **Audio & Voiceover Pacing:**
   - Spoken rate: 130–145 words per minute (~2.3 words/sec).
   - Word count target for 25s: 50–60 words total.
   - Music ducking: Duck background music by -10dB to -14dB during voiceover lines.
3. **Sound Design (SFX):** Plan motivated sound effects at exact timecodes (e.g., camera shutter click on photo snap, bouncy pop on discount badge, cash chime on publish).
4. **Captions & Safe Areas:**
   - 9:16 Safe Area: Keep captions inside the vertical band (Y: 1200px – 1360px), clear of social platform headers (top 220px) and bottom engagement buttons (bottom 340px).
   - Word-level karaoke timing: Active word highlights in brand orange (`#FEA711`).

---

## 4. Bespoke Illustrated Keyframe Generation

For high-production illustrated reels, generate bespoke 9:16 vertical keyframe images for each narrative beat to serve as the visual anchor:

1. **Storage Location:** Save scene assets under `outputs/<request_id>/scenes/scene-<N>.jpg`.
2. **Prompting the Image Generator:**
   - Reference the canonical style images (`Warm Bakery Bag Exchange.png`, `image.png`).
   - Specify character wardrobe, facial features, bakery/shop environment, and brand color tokens.
   - Generate in vertical 9:16 format (1080×1920).
3. **Scene Continuity:** Each scene must reuse the exact setting, characters, and props from previous scenes.

---

## 5. Master Campaign Blueprint: Detailed Instructions for Reels 1 to 6

Every reel must follow the strict 25-second, 5-shot structure, with distinct customer hooks, visual scene prompts, voiceover text, and sound cues:

### Reel 1: The 60-Second Flash Deal (Single Item Promotion)
* **Objective:** Show how fast a merchant can post a single product deal with discount badges.
* **Target Audience:** Boutiques, retail shops, bakeries, street sellers.
* **Scene 1 (0–4s):** Friendly shopkeeper holding up a fresh product behind counter. VO: *"Got a product you want to sell fast today? Don't wait for foot traffic."*
* **Scene 2 (4–9s):** First-person POV holding phone, tapping purple `+` FAB ➔ Single Item ➔ camera snaps photo. SFX: Shutter click at 0:07. VO: *"Open meelTe, tap the plus sign, and snap a clear photo."*
* **Scene 3 (9–16s):** meelTe form: orange `FLAT 25% OFF` badge springs onto photo; map drops orange pin. SFX: Badge pop at 0:12. VO: *"Add your price, pick your discount badge, and pin your store on the map."*
* **Scene 4 (16–21s):** Shopkeeper hands bakery bag to smiling customer; green `✓ Advertisement Created` toast appears. SFX: Chime at 0:18. VO: *"Hit create! No waiting for approvals—your deal goes live to nearby shoppers right now."*
* **Scene 5 (21–25s):** Purple brand end-card with white meelTe logo, orange CTA button *"Try meelTe free"*. VO: *"Put your shop on the map. Try meelTe free today!"*

### Reel 2: The Menu Magic (Catalog Ad with AI Photo Import)
* **Objective:** Digitize up to 100 items from paper menus in seconds using AI scanning.
* **Target Audience:** Cafes, restaurants, bakeries, salons, grocery stores.
* **Scene 1 (0–4s):** Cafe owner sitting at a wooden cafe table holding a printed paper menu, looking overwhelmed by typing. VO: *"Still typing your entire shop menu item by item on your phone?"*
* **Scene 2 (4–9s):** Close-up on phone: Tapping `+` ➔ Shop Ad ➔ tapping magic star button **"Import from Photos"**. VO: *"Stop! In meelTe, choose Shop Ad and tap 'Import from Photos'."*
* **Scene 3 (9–16s):** Camera scans paper menu; glowing purple/orange AI beam sweeps across; editable cards with item names and prices pop in automatically. SFX: Magic sparkle / swoosh at 0:13. VO: *"Just snap a photo of your paper menu or price board. meelTe automatically reads the items and prices for you!"*
* **Scene 4 (16–21s):** Owner scrolls through a rich 100-item digital catalog, taps create, and storefront pops up on neighborhood map. SFX: Success ding at 0:19. VO: *"Review your items, pin your location, and publish up to a hundred products in one tap."*
* **Scene 5 (21–25s):** Brand outro card: Headline *"Turn paper into customers"* with CTA *"Open your shop today"*. VO: *"Turn paper into customers. Start selling on meelTe free."*

### Reel 3: Walking Distance Deals (Shopper Discovery & Directions)
* **Objective:** Show how nearby shoppers discover local offers and walk into stores via Google Maps.
* **Target Audience:** Everyday shoppers, foodies, community members.
* **Scene 1 (0–4s):** Shopper walking along a lively neighborhood market street, looking at phone. VO: *"Ever wonder what secret discounts are happening right around your corner?"*
* **Scene 2 (4–9s):** Phone screen: meelTe Advertisements tab showing local ads sorted by distance (e.g. `150m away`, `300m away`). VO: *"Open meelTe and tap Advertisements. You’ll see real offers from local shops, sorted by who’s closest to you."*
* **Scene 3 (9–16s):** Shopper taps a bakery deal with `30% OFF`, double-taps to send a heart like. SFX: Heart pop at 0:12. VO: *"Fresh bread, boutique sales, or cafe combos—tap any ad to see real prices and customer photos."*
* **Scene 4 (16–21s):** Shopper taps blue **Directions** button; Google Maps opens with a 3-minute walking route; shopper walks straight through store door. SFX: Map pin drop at 0:17. VO: *"Love what you see? Tap Directions and walk straight to their door!"*
* **Scene 5 (21–25s):** Brand outro card: Headline *"Support local and save"* with CTA *"Discover your neighborhood"*. VO: *"Support local and save money. Discover your neighborhood on meelTe!"*

### Reel 4: Zero Fees, Zero Waiting (100% Free & Instant Publishing)
* **Objective:** Highlight that meelTe ads have no listing fees, no commission, and no approval delays.
* **Target Audience:** Cost-conscious entrepreneurs, street vendors, small retail owners.
* **Scene 1 (0–4s):** Shopkeeper staring at an ad bill or a frustrating "Under Review" spinner on an old platform. SFX: Dull buzzer at 0:02. VO: *"Tired of expensive ad fees and waiting days for someone to approve your post?"*
* **Scene 2 (4–9s):** Clean meelTe app interface showing "100% Free to Post" badge; owner enters details with ease. VO: *"On meelTe, sharing your deals with your community is completely free. Zero charges, zero cuts."*
* **Scene 3 (9–16s):** Finger taps **Create Advertisement**; instant green toast appears: `✓ Advertisement Created`. VO: *"And the best part? There’s no waiting queue. As soon as you hit create, your ad is live."*
* **Scene 4 (16–21s):** Neighbors walk into the physical store showing the ad on their phones; owner waves happily. SFX: Counter bell at 0:18. VO: *"Nearby neighbors see your offers right away and walk straight into your store."*
* **Scene 5 (21–25s):** Brand outro card: Headline *"No fees. No delays."* with CTA *"Grow your store free"*. VO: *"No fees. No delays. Start promoting your store on meelTe today!"*

### Reel 5: Schedule Your Weekend Rush (Scheduled Sales)
* **Objective:** Show how to plan seasonal or weekend flash sales in advance.
* **Target Audience:** Retailers, clothing boutiques, seasonal markets.
* **Scene 1 (0–4s):** Boutique owner hanging a "Weekend Special" sign in the window on Thursday evening. VO: *"Planning a big weekend sale or holiday offer? Don't stress about posting on the day."*
* **Scene 2 (4–9s):** meelTe form calendar: setting Start Date (Friday) and End Date (Sunday). SFX: Calendar page flip at 0:06. VO: *"With meelTe, you can schedule your promotion ahead of time. Pick your start date and end date."*
* **Scene 3 (9–16s):** Clock animation showing midnight: ad automatically activates to status `Live`. SFX: Clock chime at 0:12. VO: *"Your ad automatically wakes up at midnight when your sale begins, and wraps up when it ends."*
* **Scene 4 (16–21s):** Saturday morning: owner drinks coffee calmly as customers browse the sale racks. VO: *"Set it, forget it, and let your neighborhood know exactly when the deals are hot."*
* **Scene 5 (21–25s):** Brand outro card: Headline *"The smart partner for local shops"* with CTA *"Plan your next sale"*. VO: *"Plan your next sale with meelTe. Download and create today!"*

### Reel 6: Total Control in Your Pocket (Live Management & Sold Out)
* **Objective:** Demonstrate how owners edit prices on the fly, track likes, or delete ads when sold out.
* **Target Audience:** Fast-moving merchants, bakers with daily batches, busy store managers.
* **Scene 1 (0–4s):** Baker putting a "Sold Out!" sticker on an empty display shelf with a proud grin. VO: *"Sold out of your daily special faster than expected? Don't worry, you’re in total control."*
* **Scene 2 (4–9s):** Phone view: Opening meelTe Profile ➔ Advertisements tab showing live likes, comments, and views. VO: *"Go straight to your meelTe profile to see your active ads, real-time likes, and customer questions."*
* **Scene 3 (9–16s):** Tapping three dots (⋮) ➔ Edit: tweaking the price or updating store hours. SFX: Edit tap sound at 0:11. VO: *"Need to update a price or change your store hours? Tap Edit and save changes in seconds."*
* **Scene 4 (16–21s):** Tapping Delete: ad immediately clears from the community feed. SFX: Clean swoosh at 0:18. VO: *"Or tap Delete to remove it immediately once your stock is gone. No confusion, no outdated signs."*
* **Scene 5 (21–25s):** Brand outro card: Headline *"Your shop, your rules"* with CTA *"Try meelTe free"*. VO: *"Run your local promotions on your own terms. Try meelTe free today!"*

---

## 6. Self-Check & Prompt QA Gate

Verify all checks before delivery:
- [ ] Shot timings sum exactly to requested duration (25.0s).
- [ ] Visual style strictly follows 2D commercial vector illustration (no wireframes or raw emojis).
- [ ] Orange (`#FEA711`) and Purple (`#743BAA`) remain dominant.
- [ ] Characters and environments remain continuous across all scenes.
- [ ] No invented prices, offers, or unsubstantiated claims.
- [ ] Voiceover pacing fits comfortably within shot time windows (130–145 WPM).
- [ ] Captions adhere to 9:16 platform safe zones (Y: 1200px – 1360px).
- [ ] Deliverable status states plainly whether a video file was rendered or delivered as a prompt package + illustrated storyboard.

---

## 7. Rendering & Audio Execution

* **Audio Synthesis:** Run `generate_voice.js` to synthesize neural speech via standard HTTPS streaming (with Windows native speech synthesis fallback).
* **Remotion Video Rendering:** Execute `render_reel.bat` to compile 1080×1920 MP4 video at 30 fps directly to the project root.
* **Browser Preview:** Execute `preview_reel.bat` to inspect compositions interactively in Remotion Studio at `http://localhost:3000`.
