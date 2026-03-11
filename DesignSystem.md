This Design System serves as the definitive visual and structural guide for the **Iris Bots Showcase** application. It translates the core requirements of the PRD into a cohesive, high-tech, and cinematic user experience.

---

## I. Brand Identity & Visual Vision

The "Iris" brand is defined by **Cinematic Immersion** and **High-Tech Clarity**. The application is designed to feel like a digital laboratory—a dark, expansive space where knowledge is illuminated through glowing holographic interfaces. The visual goal is to minimize UI clutter, allowing the large-scale bot imagery and rich backgrounds to create an emotional connection with students and educators.

---

## II. The Color Palette: "Luminous Knowledge"

The palette uses a high-contrast relationship between deep, "blue-black" shadows and vibrant, neon-inspired light beams to simulate a dark-mode environment.

**1. Foundation Colors**

* **Blue-Black Base (#020617)**: The primary background color. It provides the "infinite space" feel and ensures that neon accents remain legible and striking.
* **Deep Shadow (#05091E)**: Used for subtle UI depth, such as the tray for the audio player or card backgrounds.
* **Pure White (#FFFFFF)**: Reserved for primary titles and active CTA text to ensure maximum contrast.
* **Muted Slate (rgba(255, 255, 255, 0.7))**: Used for subtitles and secondary descriptions to reduce cognitive load.

**2. Accent Beams (The Knowledge Spectrum)**
These colors are derived from the animated beams in the background architecture.

* **Knowledge Cyan (HSL 190, 85%, 65%)**: Represents clarity and tutorial support. Used for "Hear Iris" buttons and secondary navigation.
* **Insight Purple (HSL 260, 85%, 65%)**: Represents creative thinking and problem-solving. Used for holographic overlays and bot-specific highlights.
* **Conversion Magenta (HSL 320, 85%, 65%)**: The most urgent accent. Used for the "Get Access" call-to-action and critical conversion points.

---

## III. Typography: Geometric Clarity

The typography system prioritizes precision and a "tech-forward" aesthetic. It utilizes the **Geist Sans** or **Inter** font families for their clean, geometric lines.

**1. Heading 1 (The Hero Title)**

* **Style**: 6xl to 8xl, Bold, Tracking-tighter.
* **Usage**: Bot names (e.g., "Digital Iris").
* **Effect**: Should feel massive and grounded, occasionally using a subtle gradient from White to Knowledge Cyan.

**2. Heading 2 (Functional Labels)**

* **Style**: 3xl, Medium, Tracking-tight.
* **Usage**: Top navigation links and form section headers.

**3. Body & Subtitles**

* **Style**: LG (18px) for subtitles, SM (14px) for detailed physics book titles or minor notes.
* **Color**: Muted Slate for improved readability in dark environments.

**4. Signature Font (Iris Script)**

* **Style**: A custom, flowing, but highly legible script.
* **Usage**: Used only for the "Digital Iris" artistic logo overlay to represent the personalized, human touch of the tutor.

---

## IV. Spacing & Grid System

The layout is governed by a 4px geometric grid to ensure pixel-perfect alignment, common in high-end software interfaces.

* **Micro-Spacing (4px - 8px)**: Between icons and their labels, or titles and their immediate subtitles.
* **Functional Spacing (16px - 24px)**: Between distinct UI elements, such as the Audio Player and the CTA button.
* **Macro-Spacing (64px+)**: Padding between the edge of the screen and the primary content to maintain the "cinematic" focus.

---

## V. UI Components & Interactive Logic

**1. The "Aura" Bot Display**
Each bot image is not simply placed; it is "integrated." The bot character should feature a **Pink/Magenta Glow (Stroke)** to separate her from the dark background and create a sense of depth. The character's bottom should be "unclipped" to allow her to overlap the UI, enhancing the 3D effect.

**2. The Audio Playback Button**

* **Visual**: A pill-shaped translucent button with a Knowledge Cyan border.
* **Icon**: Volume-2 (Lucide).
* **Label**: "Hear [Bot Name] explain.".

**3. The "Get Access" CTA**

* **Visual**: A solid White or Light Gray rectangular button with sharp corners (High-Tech style).
* **Interaction**: On hover, the button emits a soft Magenta glow, signaling that this is the primary action of the page.

---

## VI. Layout Structure: Horizontal Immersion

Following the PRD's requirement for a horizontal scroll, the home page is divided into full-screen panels (16:9 ratio).

* **Panel Transition**: Smooth, momentum-based scrolling that snaps each bot into the center of the viewport.
* **The "Visual Layering"**:
* **Layer 1 (Background)**: The animated "Beams" canvas.
* **Layer 2 (Environment)**: The cinematic room (e.g., the night study desk or physics lab).
* **Layer 3 (The Bot)**: The high-resolution character with her neon aura.
* **Layer 4 (UI)**: The text, buttons, and navigation menu.


