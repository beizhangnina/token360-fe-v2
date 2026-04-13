"""
Token360 Branding Guidelines PDF Generator
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, Color, white, black
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

W, H = A4  # 210mm x 297mm

# ── Brand Colors ──
COLORS = {
    "bg_primary_light": "#F4F7FB",
    "bg_elevated_light": "#FFFFFF",
    "bg_muted_light": "#E8EEF5",
    "text_primary_light": "#0F172A",
    "text_secondary_light": "#334155",
    "text_muted_light": "#64748B",
    "border_subtle_light": "#0F172A1F",

    "bg_primary_dark": "#0B0B0F",
    "bg_elevated_dark": "#13141A",
    "bg_muted_dark": "#1A1D24",
    "text_primary_dark": "#FFFFFF",
    "text_secondary_dark": "#FFFFFFB8",
    "text_muted_dark": "#FFFFFF94",

    "brand_blue_500": "#0EA5E9",
    "brand_blue_400": "#22D3EE",
    "brand_orange_400": "#FBBF24",
    "accent_hover": "#0284C7",
    "surface_glass_light": "#FFFFFFC7",
    "surface_glass_dark": "#FFFFFF0F",
}

DARK_BG = HexColor("#0B0B0F")
LIGHT_BG = HexColor("#F4F7FB")
BLUE = HexColor("#0EA5E9")
CYAN = HexColor("#22D3EE")
GOLD = HexColor("#FBBF24")
DARK_TEXT = HexColor("#0F172A")
MUTED = HexColor("#64748B")
ELEVATED = HexColor("#FFFFFF")
DARK_ELEVATED = HexColor("#13141A")


def draw_color_swatch(c, x, y, w, h, hex_color, label, sub_label="", dark_bg=False):
    """Draw a color swatch with label."""
    color = HexColor(hex_color) if isinstance(hex_color, str) else hex_color
    # Swatch
    c.setFillColor(color)
    c.setStrokeColor(HexColor("#E0E0E0") if not dark_bg else HexColor("#333333"))
    c.setLineWidth(0.5)
    c.roundRect(x, y, w, h, 4, fill=1, stroke=1)
    # Label
    label_color = DARK_TEXT if not dark_bg else white
    c.setFillColor(label_color)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(x, y - 13, label)
    c.setFont("Helvetica", 7)
    c.setFillColor(MUTED if not dark_bg else HexColor("#999999"))
    c.drawString(x, y - 23, hex_color if isinstance(hex_color, str) else "")
    if sub_label:
        c.drawString(x, y - 33, sub_label)


def draw_page_bg(c, dark=False):
    """Fill page background."""
    c.setFillColor(DARK_BG if dark else white)
    c.rect(0, 0, W, H, fill=1, stroke=0)


def draw_section_title(c, y, title, dark=False):
    """Draw a section title with accent line."""
    c.setStrokeColor(BLUE)
    c.setLineWidth(3)
    c.line(40, y, 100, y)
    c.setFillColor(white if dark else DARK_TEXT)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(40, y - 28, title)
    return y - 50


def draw_page_number(c, page_num, dark=False):
    c.setFillColor(MUTED if not dark else HexColor("#666666"))
    c.setFont("Helvetica", 8)
    c.drawCentredString(W / 2, 20, f"Token360 Branding Guidelines  |  Page {page_num}")


# ════════════════════════════════════════
# PAGE 1: COVER
# ════════════════════════════════════════
def page_cover(c):
    draw_page_bg(c, dark=True)

    # Decorative gradient bar at top
    for i in range(int(W)):
        ratio = i / W
        r = 14/255 + ratio * (251/255 - 14/255)
        g = 165/255 + ratio * (191/255 - 165/255)
        b = 233/255 + ratio * (36/255 - 233/255)
        c.setStrokeColor(Color(r, g, b))
        c.setLineWidth(4)
        c.line(i, H - 2, i + 1, H - 2)

    # Logo area
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 48)
    c.drawString(40, H - 140, "Token360")

    # Subtitle
    c.setFillColor(HexColor("#FFFFFFB8"))
    c.setFont("Helvetica", 16)
    c.drawString(40, H - 175, "Brand Guidelines")

    # Divider
    c.setStrokeColor(HexColor("#FFFFFF1F"))
    c.setLineWidth(0.5)
    c.line(40, H - 200, W - 40, H - 200)

    # Description
    c.setFillColor(HexColor("#FFFFFF94"))
    c.setFont("Helvetica", 11)
    lines = [
        "This document defines the visual identity of Token360,",
        "including color palette, typography, spacing, and",
        "component design guidelines for both light and dark themes.",
    ]
    y = H - 240
    for line in lines:
        c.drawString(40, y, line)
        y -= 18

    # Version info
    c.setFillColor(HexColor("#FFFFFF60"))
    c.setFont("Helvetica", 9)
    c.drawString(40, 60, "Version 1.0  |  April 2026")
    c.drawString(40, 45, "Confidential — For internal use only")

    # Brand colors preview circles at bottom right
    colors_preview = [BLUE, CYAN, GOLD]
    for i, col in enumerate(colors_preview):
        c.setFillColor(col)
        c.circle(W - 80 + i * 30, 55, 10, fill=1, stroke=0)


# ════════════════════════════════════════
# PAGE 2: COLOR PALETTE - LIGHT
# ════════════════════════════════════════
def page_colors_light(c):
    draw_page_bg(c, dark=False)
    y = H - 40
    y = draw_section_title(c, y, "Color Palette — Light Mode")

    # Brand Colors
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Brand Colors")
    y -= 15

    sw, sh = 80, 50
    gap = 10
    x = 40
    brand_colors = [
        ("#0EA5E9", "Blue 500", "Primary accent"),
        ("#22D3EE", "Blue 400", "Gradient end"),
        ("#FBBF24", "Orange 400", "Warning / gold"),
        ("#0284C7", "Accent Hover", "Interactive"),
    ]
    for hex_c, label, sub in brand_colors:
        draw_color_swatch(c, x, y - sh, sw, sh, hex_c, label, sub)
        x += sw + gap

    y -= sh + 50

    # Background Colors
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Backgrounds")
    y -= 15
    x = 40
    bg_colors = [
        ("#F4F7FB", "Primary", "--bg-primary"),
        ("#FFFFFF", "Elevated", "--bg-elevated"),
        ("#E8EEF5", "Muted", "--bg-muted"),
        ("#FFFFFFC7", "Glass Surface", "--surface-glass"),
    ]
    for hex_c, label, sub in bg_colors:
        draw_color_swatch(c, x, y - sh, sw, sh, hex_c, label, sub)
        x += sw + gap

    y -= sh + 50

    # Text Colors
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Text Colors")
    y -= 15
    x = 40
    text_colors = [
        ("#0F172A", "Primary", "--text-primary"),
        ("#334155", "Secondary", "--text-secondary"),
        ("#64748B", "Muted", "--text-muted"),
    ]
    for hex_c, label, sub in text_colors:
        draw_color_swatch(c, x, y - sh, sw, sh, hex_c, label, sub)
        x += sw + gap

    y -= sh + 50

    # Border Colors
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Borders & Shadows")
    y -= 15
    x = 40
    border_colors = [
        ("#0F172A1F", "Subtle", "--border-subtle"),
        ("#0F172A3D", "Strong", "--border-strong"),
    ]
    for hex_c, label, sub in border_colors:
        draw_color_swatch(c, x, y - sh, sw, sh, hex_c, label, sub)
        x += sw + gap

    # Accent shadow note
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    c.drawString(x + 20, y - sh + 20, "Accent Shadow: 0 0 12px #0EA5E94D")

    # Gradient bar demo
    y -= sh + 50
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Gradient — Hero Text")
    y -= 8
    # Draw gradient bar
    bar_w = W - 80
    bar_h = 20
    for i in range(int(bar_w)):
        ratio = i / bar_w
        # from text-primary via brand-blue-400 to brand-orange-400
        if ratio < 0.5:
            r2 = ratio * 2
            r = 15/255 + r2 * (34/255 - 15/255)
            g = 23/255 + r2 * (211/255 - 23/255)
            b = 42/255 + r2 * (238/255 - 42/255)
        else:
            r2 = (ratio - 0.5) * 2
            r = 34/255 + r2 * (251/255 - 34/255)
            g = 211/255 + r2 * (191/255 - 211/255)
            b = 238/255 + r2 * (36/255 - 238/255)
        c.setStrokeColor(Color(r, g, b))
        c.setLineWidth(1)
        c.line(40 + i, y - bar_h, 40 + i, y)

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    c.drawString(40, y - bar_h - 14, "from-[--text-primary]  via-[--brand-blue-400]  to-[--brand-orange-400]")

    # CTA gradient
    y -= bar_h + 40
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Gradient — CTA Button")
    y -= 8
    for i in range(int(bar_w)):
        ratio = i / bar_w
        r = 14/255 + ratio * (251/255 - 14/255)
        g = 165/255 + ratio * (191/255 - 165/255)
        b = 233/255 + ratio * (36/255 - 233/255)
        c.setStrokeColor(Color(r, g, b))
        c.setLineWidth(1)
        c.line(40 + i, y - bar_h, 40 + i, y)

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    c.drawString(40, y - bar_h - 14, "from-[#0EA5E9]  to-[#FBBF24]  — used on Sign Up CTA")

    draw_page_number(c, 2)


# ════════════════════════════════════════
# PAGE 3: COLOR PALETTE - DARK
# ════════════════════════════════════════
def page_colors_dark(c):
    draw_page_bg(c, dark=True)
    y = H - 40
    y = draw_section_title(c, y, "Color Palette — Dark Mode")

    sw, sh = 80, 50
    gap = 10

    # Brand Colors (same)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Brand Colors (Unchanged)")
    y -= 15
    x = 40
    brand_colors = [
        ("#0EA5E9", "Blue 500"),
        ("#22D3EE", "Blue 400"),
        ("#FBBF24", "Orange 400"),
        ("#22D3EE", "Accent Hover"),
    ]
    for hex_c, label in brand_colors:
        draw_color_swatch(c, x, y - sh, sw, sh, hex_c, label, dark_bg=True)
        x += sw + gap

    y -= sh + 50

    # Background Colors
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Backgrounds")
    y -= 15
    x = 40
    bg_colors = [
        ("#0B0B0F", "Primary"),
        ("#13141A", "Elevated"),
        ("#1A1D24", "Muted"),
        ("#FFFFFF0F", "Glass Surface"),
    ]
    for hex_c, label in bg_colors:
        draw_color_swatch(c, x, y - sh, sw, sh, hex_c, label, dark_bg=True)
        x += sw + gap

    y -= sh + 50

    # Text Colors
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Text Colors")
    y -= 15
    x = 40
    text_colors = [
        ("#FFFFFF", "Primary"),
        ("#FFFFFFB8", "Secondary"),
        ("#FFFFFF94", "Muted"),
    ]
    for hex_c, label in text_colors:
        draw_color_swatch(c, x, y - sh, sw, sh, hex_c, label, dark_bg=True)
        x += sw + gap

    y -= sh + 50

    # Borders
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Borders & Shadows")
    y -= 15
    x = 40
    border_colors = [
        ("#FFFFFF1F", "Subtle"),
        ("#FFFFFF3D", "Strong"),
    ]
    for hex_c, label in border_colors:
        draw_color_swatch(c, x, y - sh, sw, sh, hex_c, label, dark_bg=True)
        x += sw + gap

    c.setFillColor(HexColor("#999999"))
    c.setFont("Helvetica", 8)
    c.drawString(x + 20, y - sh + 20, "Accent Shadow: 0 0 16px #0EA5E966")

    y -= sh + 50

    # Theme switching note
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Theme Mechanism")
    y -= 20
    c.setFillColor(HexColor("#FFFFFFB8"))
    c.setFont("Helvetica", 10)
    notes = [
        "Dark mode is activated by adding class=\"dark\" to the <html> element.",
        "All design tokens use CSS custom properties (--bg-primary, --text-primary, etc.)",
        "The .dark {} selector overrides these variables for dark theme.",
        "Theme preference is persisted in localStorage via next-themes.",
        "Toggle button in navbar switches between sun (dark) and moon (light) icons.",
    ]
    for note in notes:
        c.drawString(52, y, f"  {note}")
        c.setFillColor(BLUE)
        c.circle(46, y + 3, 2, fill=1, stroke=0)
        c.setFillColor(HexColor("#FFFFFFB8"))
        y -= 18

    draw_page_number(c, 3, dark=True)


# ════════════════════════════════════════
# PAGE 4: TYPOGRAPHY
# ════════════════════════════════════════
def page_typography(c):
    draw_page_bg(c, dark=False)
    y = H - 40
    y = draw_section_title(c, y, "Typography")

    # Display font
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Display Font — Space Grotesk")
    y -= 8
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 9)
    c.drawString(40, y, "Used for: Headings (H1-H3), stat values, section titles, hero text")
    y -= 5
    c.drawString(40, y, 'CSS: font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif')
    y -= 5
    c.drawString(40, y, "Variable: --font-display")
    y -= 20

    # Sample sizes
    samples = [
        ("Helvetica-Bold", 40, "Aa Bb Cc 123", "H1 — 56px (hero)"),
        ("Helvetica-Bold", 30, "Aa Bb Cc 123", "H2 — 48px (section)"),
        ("Helvetica-Bold", 20, "Aa Bb Cc 123", "H3 — 24px (card title)"),
    ]
    for font, size, text, label in samples:
        c.setFillColor(DARK_TEXT)
        c.setFont(font, size)
        c.drawString(40, y - size, text)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 8)
        c.drawString(350, y - size + 5, label)
        y -= size + 20

    y -= 15
    # Divider
    c.setStrokeColor(HexColor("#E8EEF5"))
    c.setLineWidth(1)
    c.line(40, y, W - 40, y)
    y -= 25

    # Body font
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Body Font — Manrope")
    y -= 8
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 9)
    c.drawString(40, y, "Used for: Body text, labels, descriptions, buttons, navigation")
    y -= 5
    c.drawString(40, y, 'CSS: font-family: "Manrope", ui-sans-serif, system-ui, sans-serif')
    y -= 5
    c.drawString(40, y, "Variable: --font-body")
    y -= 25

    body_samples = [
        ("Helvetica", 16, "The quick brown fox jumps over the lazy dog.", "Body — 18px"),
        ("Helvetica", 13, "The quick brown fox jumps over the lazy dog.", "Body sm — 14px"),
        ("Helvetica", 10, "The quick brown fox jumps over the lazy dog.", "Caption — 12px"),
        ("Helvetica-Bold", 13, "Explore Models    API Docs    Sign In", "Button / Nav — 14px semibold"),
    ]
    for font, size, text, label in body_samples:
        c.setFillColor(DARK_TEXT)
        c.setFont(font, size)
        c.drawString(40, y - size, text)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 8)
        c.drawString(350, y - size + 3, label)
        y -= size + 18

    y -= 15
    c.setStrokeColor(HexColor("#E8EEF5"))
    c.setLineWidth(1)
    c.line(40, y, W - 40, y)
    y -= 25

    # Monospace
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Monospace — System Stack")
    y -= 8
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 9)
    c.drawString(40, y, "Used for: Code blocks, API snippets, technical content")
    y -= 5
    c.drawString(40, y, "CSS: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace")
    y -= 25

    c.setFillColor(DARK_TEXT)
    c.setFont("Courier", 11)
    c.drawString(40, y, 'import { Token360 } from "@token360/sdk"')
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    c.drawString(350, y + 3, "Code — 14px mono")

    y -= 40

    # Font weights
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Font Weights")
    y -= 20
    weights = [
        ("Regular (400)", "Body text, descriptions, labels"),
        ("Medium (500)", "Navigation links, stat labels"),
        ("Semibold (600)", "Buttons, badges, footer column titles"),
        ("Bold (700)", "Headings, stat values, hero text"),
        ("Extrabold (800)", "Large display numerals (optional)"),
    ]
    for weight, usage in weights:
        c.setFillColor(DARK_TEXT)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(52, y, weight)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 9)
        c.drawString(170, y, usage)
        c.setFillColor(BLUE)
        c.circle(46, y + 3, 2, fill=1, stroke=0)
        y -= 16

    draw_page_number(c, 4)


# ════════════════════════════════════════
# PAGE 5: SPACING & LAYOUT
# ════════════════════════════════════════
def page_spacing(c):
    draw_page_bg(c, dark=False)
    y = H - 40
    y = draw_section_title(c, y, "Spacing & Layout")

    # Container
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Container")
    y -= 20
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 10)
    specs = [
        "Max-width: 1200px (main content), 1000px (Why Choose), 900px (CTA)",
        "Horizontal padding: 24px (px-6)",
        "Centered with mx-auto",
    ]
    for spec in specs:
        c.drawString(52, y, spec)
        c.setFillColor(BLUE)
        c.circle(46, y + 3, 2, fill=1, stroke=0)
        c.setFillColor(MUTED)
        y -= 16

    y -= 20

    # Section spacing
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Section Spacing")
    y -= 20

    sections = [
        ("Hero", "min-h-screen, content centered vertically"),
        ("Developer Section", "py-20 (80px vertical)"),
        ("Stats Section", "pt-20 pb-8"),
        ("Featured Models", "py-20"),
        ("Model Groups", "py-20"),
        ("Why Choose", "pt-10 pb-16"),
        ("AI Era", "py-20"),
        ("CTA", "py-32 (128px vertical)"),
        ("Footer", "py-16"),
    ]
    c.setFont("Helvetica", 9)
    for name, spacing in sections:
        c.setFillColor(DARK_TEXT)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(52, y, name)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 9)
        c.drawString(180, y, spacing)
        y -= 15

    y -= 20

    # Border Radius
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Border Radius")
    y -= 20

    radii = [
        ("Full (9999px)", "Buttons, badges, pills, search input, avatar circles"),
        ("2xl (16px)", "Code blocks, feature cards, Why Choose cards"),
        ("xl (12px)", "Model group cards, stat cards"),
        ("lg (8px)", "Hero badges, icon containers"),
    ]
    for radius, usage in radii:
        c.setFillColor(DARK_TEXT)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(52, y, radius)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 9)
        c.drawString(180, y, usage)
        c.setFillColor(BLUE)
        c.circle(46, y + 3, 2, fill=1, stroke=0)
        y -= 15

    # Draw radius examples
    y -= 25
    x = 50
    for r, label in [(30, "full"), (16, "2xl"), (12, "xl"), (8, "lg")]:
        c.setFillColor(HexColor("#E8EEF5"))
        c.setStrokeColor(BLUE)
        c.setLineWidth(1)
        c.roundRect(x, y - 40, 80, 40, r, fill=1, stroke=1)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 8)
        c.drawCentredString(x + 40, y - 55, label)
        x += 100

    y -= 80

    # Navbar
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Navbar")
    y -= 20
    navbar_specs = [
        "Height: 64px (h-16)",
        "Position: fixed, z-index 50",
        "Background: glass surface with backdrop-blur-md",
        "Border-bottom: 1px solid var(--border-subtle)",
    ]
    c.setFont("Helvetica", 9)
    for spec in navbar_specs:
        c.setFillColor(MUTED)
        c.drawString(52, y, spec)
        c.setFillColor(BLUE)
        c.circle(46, y + 3, 2, fill=1, stroke=0)
        y -= 15

    y -= 20

    # Buttons
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, y, "Button Specs")
    y -= 20

    btn_specs = [
        ("CTA Primary", "min-h: 52px, px-7, rounded-full, bg: --text-primary, text: --bg-primary"),
        ("CTA Secondary", "min-h: 52px, px-7, rounded-full, border: --border-subtle"),
        ("Nav Button", "px-5, py-2.5, rounded-full, text-sm, font-semibold"),
        ("Gradient CTA", "px-8, py-3, rounded-full, bg: linear-gradient(#0EA5E9 -> #FBBF24)"),
    ]
    for name, spec in btn_specs:
        c.setFillColor(DARK_TEXT)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(52, y, name)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 8)
        c.drawString(52, y - 12, spec)
        c.setFillColor(BLUE)
        c.circle(46, y + 2, 2, fill=1, stroke=0)
        y -= 28

    draw_page_number(c, 5)


# ════════════════════════════════════════
# PAGE 6: COMPONENT REFERENCE
# ════════════════════════════════════════
def page_components(c):
    draw_page_bg(c, dark=False)
    y = H - 40
    y = draw_section_title(c, y, "Component Reference")

    components = [
        ("Hero Carousel", [
            "3 slides, auto-rotate every 5 seconds",
            "Fade transition: opacity 500ms",
            "Dot indicators: active w-6 h-2, inactive w-2 h-2",
            "Left/right arrows: h-11 w-11, glass surface, rounded-full",
            "Bottom-right badges: h-12 w-12 (md: h-14 w-14), rounded-lg",
        ]),
        ("Code Block (Developer Section)", [
            "Container: rounded-2xl, border, bg-elevated",
            "Header: file icon + filename, border-bottom",
            "Tab bar: 3 tabs (TypeScript, Python, cURL)",
            "Active tab: border-b-2 accent color",
            "Code area: p-6, font-mono, text-sm",
            "Copy button: absolute top-right",
        ]),
        ("Stat Cards", [
            "Grid: 4 columns (2 on mobile)",
            "Card: rounded-xl, border, bg-elevated, p-6",
            "Value: font-display, text-3xl, font-bold",
            "Label: text-sm, text-muted",
        ]),
        ("Featured Model Cards", [
            "Horizontal scroll with snap",
            "Card: w-280/320px, h-384px, rounded-2xl",
            "Border: purple-500/20, hover: purple-500/50",
            "Image: fill with object-cover",
            "Bottom gradient: from-black/80 to transparent",
            "Text overlay: white on dark gradient",
        ]),
        ("Model Group Cards", [
            "Grid: 4x2 (2 on mobile)",
            "Card: rounded-xl, p-6, bg-muted (light) / gray-800/30 (dark)",
            "Border: purple-500/20, hover: purple-500/50",
            "Avatar: 48x48, rounded-full",
        ]),
        ("AI Era Feature Cards", [
            "Grid: 3 columns",
            "Card: rounded-2xl, p-8, glass surface, backdrop-blur",
            "Decorative glow: radial-gradient purple, opacity-20",
            "Icon: h-12 w-12, rounded-xl, accent/10 bg",
            "Stat value: gradient text (accent -> warning)",
            "Divider: border-t between content and stat",
        ]),
    ]

    for comp_name, specs in components:
        c.setFillColor(DARK_TEXT)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(40, y, comp_name)
        y -= 14
        for spec in specs:
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 8)
            c.drawString(52, y, spec)
            c.setFillColor(BLUE)
            c.circle(46, y + 2, 1.5, fill=1, stroke=0)
            y -= 12
        y -= 10

        if y < 60:
            break

    draw_page_number(c, 6)


# ════════════════════════════════════════
# GENERATE
# ════════════════════════════════════════
def main():
    output_path = os.path.join(os.path.dirname(__file__), "..", "Token360_Branding_Guidelines.pdf")
    output_path = os.path.abspath(output_path)

    c = canvas.Canvas(output_path, pagesize=A4)
    c.setTitle("Token360 Branding Guidelines")
    c.setAuthor("Token360")
    c.setSubject("Brand identity, color palette, typography, and component guidelines")

    page_cover(c)
    c.showPage()

    page_colors_light(c)
    c.showPage()

    page_colors_dark(c)
    c.showPage()

    page_typography(c)
    c.showPage()

    page_spacing(c)
    c.showPage()

    page_components(c)
    c.showPage()

    c.save()
    print(f"Generated: {output_path}")


if __name__ == "__main__":
    main()
