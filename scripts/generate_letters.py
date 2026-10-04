import os
import re
import zipfile
import gc
import sys
from datetime import datetime
from pathlib import Path

import openpyxl
from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT, TA_RIGHT, TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import (
    Paragraph,
    Table,
    TableStyle,
    Image,
    Spacer,
    BaseDocTemplate,
    PageTemplate,
    Frame,
)


EXCEL_PATH = r"d:\offer\Internship Form Kodefort  (Responses).xlsx"
LOGO_PATH = r"d:\offer\logo.png"
SIGN_PATH = r"d:\offer\sign.jpeg"

OUTPUT_DIR = r"d:\offer\offer_letters_pdf"
ZIP_PATH = r"d:\offer\Kodefort_Internship_Offer_Letters.zip"


COMPANY = {
    "name": "KODEFORT",
    "website": "www.kodefort.com",
    "phone": "+91 6207525287",
    "email": "kundan@kodefort.com",
    "location": "Gaya, Bihar, India",
    "signatory": "Kundan Kumar",
    "tagline": "Build. Learn. Deploy.",
}


# ---- Palette: Navy + muted accent, corporate HR feel ----
NAVY        = HexColor("#12294D")   # deep navy, primary text/headings
BLUE        = HexColor("#2A5AA6")   # accent (links, highlights)
GREY_900    = HexColor("#1F2937")   # body text
GREY_700    = HexColor("#374151")   # secondary text
GREY_500    = HexColor("#6B7280")   # muted labels
GREY_300    = HexColor("#D1D5DB")   # divider
GREY_100    = HexColor("#F3F4F6")   # table stripe / card
GREY_050    = HexColor("#F8FAFC")   # subtle background
WHITE       = colors.white


PAGE_W, PAGE_H = A4

LEFT   = 16 * mm
RIGHT  = 16 * mm
TOP    = 18 * mm
BOTTOM = 13 * mm

CONTENT_W = PAGE_W - LEFT - RIGHT


# ---- Fonts: prefer Inter/Aptos/Calibri/Helvetica, fall back ----
FONT_REG_CANDIDATES = [
    r"C:\Windows\Fonts\calibri.ttf",
    r"C:\Windows\Fonts\segoeui.ttf",
    r"C:\Windows\Fonts\arial.ttf",
    r"C:\Windows\Fonts\aptos.ttf",
]
FONT_BOLD_CANDIDATES = [
    r"C:\Windows\Fonts\calibrib.ttf",
    r"C:\Windows\Fonts\segoeuib.ttf",
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\aptos-bold.ttf",
]
FONT_ITALIC_CANDIDATES = [
    r"C:\Windows\Fonts\calibrii.ttf",
    r"C:\Windows\Fonts\segoeuii.ttf",
    r"C:\Windows\Fonts\ariali.ttf",
    r"C:\Windows\Fonts\aptos-italic.ttf",
]

def _reg(name, paths, fallback):
    for p in paths:
        if os.path.exists(p):
            try:
                pdfmetrics.registerFont(TTFont(name, p))
                return name
            except Exception:
                continue
    return fallback

FONT      = _reg("KF_Reg",    FONT_REG_CANDIDATES,    "Helvetica")
FONT_BOLD = _reg("KF_Bold",   FONT_BOLD_CANDIDATES,   "Helvetica-Bold")
FONT_ITAL = _reg("KF_Italic", FONT_ITALIC_CANDIDATES, "Helvetica-Oblique")


# ---- Helpers ----
def clean_filename(value):
    value = str(value or "Unknown_Student").strip()
    value = re.sub(r'[\\/:*?"<>|]', "_", value)
    value = re.sub(r"\s+", "_", value)
    value = value.strip("._-")
    return value[:100] or "Unknown_Student"


def fmt(value):
    if value is None:
        return "[NOT PROVIDED]"
    if isinstance(value, float) and value.is_integer():
        return str(int(value))
    value = str(value).strip()
    return value if value else "[NOT PROVIDED]"


def is_empty_row(values):
    return all(v is None or str(v).strip() == "" for v in values)


def esc(value):
    value = fmt(value)
    value = value.replace("&", "&amp;")
    value = value.replace("<", "&lt;")
    value = value.replace(">", "&gt;")
    return value


# ---- Style factory ----
def P(text, size=11.0, leading=None, color=GREY_900, bold=False,
      italic=False, align=TA_LEFT):
    if leading is None:
        leading = size * 1.42
    if bold and italic:
        fn = FONT_BOLD  # most TTF combos not reg'd, use bold
    elif bold:
        fn = FONT_BOLD
    elif italic:
        fn = FONT_ITAL
    else:
        fn = FONT
    style = ParagraphStyle(
        f"st_{size}_{bold}_{italic}_{align}_{int(color.red*10000)}",
        fontName=fn,
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=align,
        spaceAfter=0,
        spaceBefore=0,
    )
    return Paragraph(text, style)


def _measure(text, w, size, leading=None, color=GREY_900, bold=False,
             italic=False, align=TA_LEFT):
    p = P(text, size, leading, color, bold, italic, align)
    _, h = p.wrap(w, PAGE_H)
    return p, h


# ---- Logo / Signature images ----
def _load_img(path):
    if not os.path.exists(path):
        return None
    try:
        from reportlab.lib.utils import ImageReader
        return ImageReader(path)
    except Exception:
        return None

LOGO_IMG = _load_img(LOGO_PATH)
SIGN_IMG = _load_img(SIGN_PATH)


# ============================================================
# PAGE DECOR (very subtle, not oversized)
# ============================================================

def draw_page_frame(canvas_obj, doc):
    """Per-page: header bar with logo/name, thin divider, tiny top-right accent, footer."""
    c = canvas_obj
    c.saveState()

    # --- Top: thin navy band (small) plus tiny accent triangles, not overwhelming ---
    # A 4mm navy strip across the full top, adds a frame of professionalism.
    c.setFillColor(NAVY)
    c.rect(0, PAGE_H - 4 * mm, PAGE_W, 4 * mm, stroke=0, fill=1)

    # Minimal right-top accent: 2 narrow chevrons, very small, clipped to top-right corner
    _minimal_corner(c, x0=PAGE_W, y0=PAGE_H, flip_x=False, flip_y=False)
    # Minimal left-bottom accent: mirror
    _minimal_corner(c, x0=0,      y0=0,      flip_x=True,  flip_y=True)

    # --- Header block (logo + company details + divider) drawn inside top margin area ---
    logo_w = 13 * mm
    logo_h = 11 * mm
    logo_x = LEFT
    logo_y = PAGE_H - TOP - 1.5 * mm  # within the area above title
    if LOGO_IMG:
        try:
            c.drawImage(
                LOGO_IMG, logo_x, logo_y,
                width=logo_w, height=logo_h,
                preserveAspectRatio=True, mask="auto", anchor="sw",
            )
        except Exception:
            pass

    # Company info to the right of logo
    cx = logo_x + logo_w + 5 * mm
    cy_title = logo_y + logo_h - 2 * mm
    cy_tag   = logo_y + logo_h - 5.6 * mm
    cy_sub   = logo_y + logo_h - 8.2 * mm

    c.setFillColor(NAVY)
    c.setFont(FONT_BOLD, 15)
    c.drawString(cx, cy_title, COMPANY["name"])

    c.setFillColor(BLUE)
    c.setFont(FONT_ITAL, 8.2)
    c.drawString(cx, cy_tag, COMPANY["tagline"])

    c.setFillColor(GREY_500)
    c.setFont(FONT, 8.2)
    c.drawString(
        cx, cy_sub,
        f"{COMPANY['location']}   |   {COMPANY['email']}   |   {COMPANY['website']}",
    )

    # Thin navy divider under header — spans content width
    div_y = logo_y - 1.5 * mm
    c.setStrokeColor(NAVY)
    c.setLineWidth(1.2)
    c.line(LEFT, div_y, PAGE_W - RIGHT, div_y)

    # ---- Footer — subtle (line + centered small text, right page number if wanted) ----
    c.setStrokeColor(GREY_700)
    c.setLineWidth(0.8)
    c.line(LEFT, BOTTOM + 4.5 * mm, PAGE_W - RIGHT, BOTTOM + 4.5 * mm)

    c.setFillColor(GREY_500)
    c.setFont(FONT, 7.8)
    c.drawString(LEFT, BOTTOM + 2 * mm,
                 f"{COMPANY['name']}   |   {COMPANY['location']}")
    c.drawRightString(PAGE_W - RIGHT, BOTTOM + 2 * mm,
                      f"{COMPANY['email']}   |   {COMPANY['website']}")

    c.restoreState()


def _minimal_corner(c, x0, y0, flip_x, flip_y):
    """Two small right-triangle chevrons in the corner, ~15mm total footprint."""
    c.saveState()
    if flip_x:
        c.translate(x0, 0)
        c.scale(-1, 1)
    else:
        c.translate(x0, 0)
        c.scale(1, 1)
    if flip_y:
        c.translate(0, y0)
        c.scale(1, -1)
    else:
        c.translate(0, y0)
        c.scale(1, 1)

    # Offset so triangles point into the page, not outside
    off = 0
    # Outer triangle (navy), footprint ~13 mm
    t1 = 13 * mm
    p1 = c.beginPath()
    p1.moveTo(off,              off)
    p1.lineTo(off - t1,         off)
    p1.lineTo(off,              off - t1)
    p1.close()
    c.setFillColor(NAVY)
    c.drawPath(p1, fill=1, stroke=0)

    # Inner triangle (blue), smaller, offset inward
    t2 = 8 * mm
    in_x = 2.8 * mm
    in_y = 2.8 * mm
    p2 = c.beginPath()
    p2.moveTo(off - in_x,              off - in_y)
    p2.lineTo(off - in_x - t2,         off - in_y)
    p2.lineTo(off - in_x,              off - in_y - t2)
    p2.close()
    c.setFillColor(BLUE)
    c.drawPath(p2, fill=1, stroke=0)

    c.restoreState()


# ============================================================
# STYLED TABLES HELPERS
# ============================================================

def make_student_details_table(student, width):
    """Elegant compact 2-col, 4-row table for 8 fields."""
    items = [
        ("Registration No.", student["regno"]),
        ("Degree",            student["degree"]),
        ("Session",           student["session"]),
        ("Subject",           student["subject"]),
        ("Internship Topic",  student["topic"]),
        ("Internship Period", "20 July 2026 – 10 August 2026"),
        ("Mode",              "Hybrid (Online)"),
        ("Duration",          "22 Days"),
    ]
    # Arrange as 4 rows × 4 cols: (Label, Value, Label, Value)
    rows = []
    header = [
        P("<b>FIELD</b>", size=8.6, color=WHITE, bold=True),
        P("<b>VALUE</b>", size=9, color=WHITE, bold=True),
        P("<b>FIELD</b>", size=8.6, color=WHITE, bold=True),
        P("<b>VALUE</b>", size=9, color=WHITE, bold=True),
    ]
    rows.append(header)
    for i in range(0, len(items), 2):
        row = []
        lab1, val1 = items[i]
        row.append(P(f"<b>{lab1.upper()}</b>", size=8.4, color=GREY_700, bold=True))
        row.append(P(esc(val1), size=9.8, color=GREY_900))
        if i + 1 < len(items):
            lab2, val2 = items[i+1]
            row.append(P(f"<b>{lab2.upper()}</b>", size=8.4, color=GREY_700, bold=True))
            row.append(P(esc(val2), size=9.8, color=GREY_900))
        else:
            row.append(P("", size=8.4))
            row.append(P("", size=9.8))
        rows.append(row)

    cw = [width * 0.17, width * 0.33, width * 0.17, width * 0.33]
    t = Table(rows, colWidths=cw, hAlign="LEFT")
    ts = TableStyle([
        # Header row: navy background
        ("BACKGROUND",  (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR",   (0, 0), (-1, 0), WHITE),
        ("BOTTOMPADDING",(0, 0), (-1, 0), 3.5),
        ("TOPPADDING",   (0, 0), (-1, 0), 3.5),
        ("LEFTPADDING",  (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),

        # Body rows: subtle row striping
        ("BACKGROUND",  (0, 1), (-1, 1), WHITE),
        ("BACKGROUND",  (0, 2), (-1, 2), GREY_050),
        ("BACKGROUND",  (0, 3), (-1, 3), WHITE),
        ("BACKGROUND",  (0, 4), (-1, 4), GREY_050),

        # Border: single thin frame + interior verticals
        ("BOX",         (0, 0), (-1, -1), 1.1, NAVY),
        ("INNERGRID",   (0, 0), (-1, -1), 0.5, GREY_700),

        # Alignment
        ("VALIGN",      (0, 0), (-1, -1), "MIDDLE"),
    ])
    t.setStyle(ts)
    return t


def make_terms_table(terms, width):
    """Professional-looking terms: 2-col table, left = accent pill + No., right = text."""
    rows = []
    header = [
        P("<b>#</b>", size=8.6, color=WHITE, bold=True),
        P("<b>TERMS &amp; CONDITIONS</b>", size=9, color=WHITE, bold=True),
    ]
    rows.append(header)
    for i, t in enumerate(terms, 1):
        no_text = (
            f'<font color="{BLUE.hexval()}"><b>{i:02d}</b></font>'
        )
        rows.append([
            P(no_text, size=10.8, bold=True, align=TA_CENTER, color=BLUE),
            P(esc(t), size=9.8, color=GREY_900),
        ])
    cw = [width * 0.08, width * 0.92]
    tbl = Table(rows, colWidths=cw, hAlign="LEFT")
    ts = TableStyle([
        ("BACKGROUND",  (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR",   (0, 0), (-1, 0), WHITE),
        ("BOTTOMPADDING",(0, 0), (-1, 0), 3.5),
        ("TOPPADDING",   (0, 0), (-1, 0), 3.5),

        ("LEFTPADDING",  (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING",   (0, 1), (-1, -1), 3.5),
        ("BOTTOMPADDING",(0, 1), (-1, -1), 3.5),

        ("BACKGROUND",  (0, 1), (0, -1), GREY_050),
        ("BOX",         (0, 0), (-1, -1), 1.1, NAVY),
        ("INNERGRID",   (0, 0), (-1, -1), 0.5, GREY_700),
        ("VALIGN",      (0, 0), (-1, -1), "TOP"),

        # subtle left accent bar on number column
        ("LINEAFTER",   (0, 1), (0, -1), 1.6, BLUE),
    ])
    tbl.setStyle(ts)
    return tbl


def _sig_image():
    if not SIGN_IMG:
        return None
    # Wrap as platypus Image with fixed w/h
    try:
        import io
        from reportlab.lib.utils import ImageReader
        img = Image(SIGN_PATH, width=58 * mm, height=21 * mm,
                    hAlign="LEFT")
        return img
    except Exception:
        return None


def make_signature_block(width):
    """Clean, aligned signature block."""
    # Left side: "Acceptance confirmation" note
    note = P(
        ("Please confirm your acceptance by signing and returning a copy of this "
         "offer letter, or contacting us via email."),
        size=8.6, color=GREY_500, italic=True,
    )
    pad_note = [note, Spacer(1, 1.2 * mm)]

    # Right side: Regards + signature + signatory
    reg = P("With best regards,", size=9, color=GREY_700)
    sig_row_content = []
    sig = _sig_image()
    if sig:
        sig_row_content.append(sig)
    # Signature line (always drawn, regardless of image, via small table underline trick below)
    sign_line = Table(
        [[""]],
        colWidths=[62 * mm],
        rowHeights=[0.1 * mm],
    )
    sign_line.setStyle(TableStyle([
        ("LINEABOVE", (0, 0), (-1, 0), 1.0, NAVY),
        ("TOPPADDING", (0, 0), (-1, 0), 0),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 0),
    ]))
    name = P(f"<b>{COMPANY['signatory']}</b>", size=9.8, color=NAVY, bold=True)
    des  = P("Authorized Signatory", size=8.4, color=GREY_500)
    org  = P(COMPANY["name"], size=8.4, color=GREY_700, bold=True)

    right_col_content = [reg, Spacer(1, 0.8 * mm)]
    if sig:
        right_col_content.append(sig)
        right_col_content.append(Spacer(1, 0.2 * mm))
    else:
        right_col_content.append(Spacer(1, 18 * mm))
    right_col_content.append(sign_line)
    right_col_content.append(Spacer(1, 1 * mm))
    right_col_content.append(name)
    right_col_content.append(des)
    right_col_content.append(org)

    # Outer 2-col table (left note, right sig)
    outer = Table(
        [[pad_note, right_col_content]],
        colWidths=[width * 0.55, width * 0.45],
    )
    outer.setStyle(TableStyle([
        ("VALIGN",      (0, 0), (-1, -1), "BOTTOM"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",(0, 0), (-1, -1), 0),
        ("TOPPADDING",  (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING",(0, 0), (-1, -1), 0),
        # Vertical divider
        ("LINEAFTER",   (0, 0), (0, 0), 0.9, NAVY),
        ("LEFTPADDING", (1, 0), (1, 0), 10),
    ]))
    return outer


# ============================================================
# GENERATE ONE LETTER — flow-based (platypus) for cleaner layout
# ============================================================

def build_doc(student, output_path):
    doc = BaseDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=LEFT,
        rightMargin=RIGHT,
        topMargin=TOP + 15 * mm,
        bottomMargin=BOTTOM + 3 * mm,
        title=f"Internship Offer Letter - {student['name']}",
        author=COMPANY["name"],
    )
    frame_w = PAGE_W - doc.leftMargin - doc.rightMargin
    frame_h = PAGE_H - doc.topMargin - doc.bottomMargin
    frame = Frame(doc.leftMargin, doc.bottomMargin, frame_w, frame_h,
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="main")
    doc.addPageTemplates([
        PageTemplate(id="only", frames=frame, onPage=draw_page_frame)
    ])
    return doc, frame_w


def generate_letter(student, output_path):
    doc, W = build_doc(student, output_path)
    story = []

    today = datetime(2026, 7, 20)
    date_long = today.strftime("%d %B %Y")
    ref_no = f"KDF/INT/{today.strftime('%Y%m')}/{student['row_number']:05d}"

    # -------------------- Meta row (issue date + ref no.) --------------------
    meta_l = P(f"<b>Date of Issue:</b> {date_long}", size=9, color=GREY_700)
    meta_r = P(f"<b>Reference No:</b> {ref_no}", size=9, color=BLUE, align=TA_RIGHT)
    meta_table = Table([[meta_l, meta_r]], colWidths=[W * 0.5, W * 0.5])
    meta_table.setStyle(TableStyle([
        ("VALIGN", (0,0),(-1,-1), "TOP"),
        ("LEFTPADDING", (0,0),(-1,-1), 0),
        ("RIGHTPADDING",(0,0),(-1,-1), 0),
        ("TOPPADDING",  (0,0),(-1,-1), 0),
        ("BOTTOMPADDING",(0,0),(-1,-1), 0),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 1 * mm))

    # -------------------- DOCUMENT TITLE --------------------
    story.append(P(
        "INTERNSHIP OFFER LETTER",
        size=16.5, color=NAVY, bold=True, align=TA_CENTER,
    ))
    # underline accent
    accent = Table([[""]], colWidths=[28 * mm], rowHeights=[1.1 * mm])
    accent.setStyle(TableStyle([
        ("BACKGROUND", (0,0),(-1,-1), BLUE),
        ("LEFTPADDING",(0,0),(-1,-1), 0),
        ("RIGHTPADDING",(0,0),(-1,-1), 0),
        ("TOPPADDING",(0,0),(-1,-1), 0),
        ("BOTTOMPADDING",(0,0),(-1,-1), 0),
    ]))
    story.append(Spacer(1, 0.6 * mm))
    story.append(Table([[accent]], colWidths=[W], rowHeights=[1.1 * mm],
                       hAlign=TA_CENTER))
    story.append(Spacer(1, 2.4 * mm))

    # -------------------- RECIPIENT block (visually separated: bg box) --------------------
    to_label = P("TO,", size=8, color=BLUE, bold=True)
    name     = P(esc(student["name"]), size=11, color=NAVY, bold=True)
    role     = P("Internship Candidate", size=8.6, color=GREY_500, italic=True)
    college  = P(esc(student["college"]), size=9.4, color=GREY_900)

    contact_lines = [
        f"<b>Email:</b> {esc(student['email'])}",
        f"<b>Mobile:</b> {esc(student['mobile'])}",
    ]
    # Short address inline here; full address will appear in a dedicated box below.
    contact_html = "&nbsp;&nbsp;|&nbsp;&nbsp;".join(contact_lines)
    contact = P(contact_html, size=8.6, color=GREY_700)

    recipient_inner = [
        [to_label],
        [name],
        [role],
        [college],
        [Spacer(1, 0.2 * mm)],
        [contact],
    ]
    # Wrap inside a one-cell table with background
    recip_cell = Table(
        [[recipient_inner]],
        colWidths=[W],
    )
    recip_cell.setStyle(TableStyle([
        ("BACKGROUND", (0,0),(-1,-1), GREY_050),
        ("BOX",        (0,0),(-1,-1), 1.1, NAVY),
        ("LEFTPADDING",(0,0),(-1,-1), 7),
        ("RIGHTPADDING",(0,0),(-1,-1), 7),
        ("TOPPADDING", (0,0),(-1,-1), 5),
        ("BOTTOMPADDING",(0,0),(-1,-1), 5),
        # thick left accent bar
        ("LINEBEFORE",(0,0),(0,-1), 2.6, BLUE),
    ]))
    story.append(recip_cell)
    story.append(Spacer(1, 2.4 * mm))

    # -------------------- Subject line --------------------
    subject = P(
        f"<b>Subject:</b> Offer of Internship for {esc(student['topic'])}",
        size=9.8, color=NAVY, bold=False,
    )
    story.append(subject)
    story.append(Spacer(1, 1.4 * mm))

    # -------------------- Salutation + body paragraphs --------------------
    sal = P(f"Dear {esc(student['name'])},", size=10, color=NAVY, bold=True)
    story.append(sal)
    story.append(Spacer(1, 1.0 * mm))

    def B(text):
        return P(text, size=9.2, leading=12.6, color=GREY_900, align=TA_JUSTIFY)

    story.append(B(
        f"We are delighted to formally offer you an internship position at "
        f"<b>{COMPANY['name']}</b> for the <b>{esc(student['topic'])}</b> program. "
        f"This internship has been carefully designed to provide you with practical, "
        f"hands-on experience and equip you with industry-relevant skills in your "
        f"chosen field of study."
    ))
    story.append(Spacer(1, 1.3 * mm))

    story.append(B(
        f"Your registration details have been verified against the records submitted: "
        f"<b>{esc(student['degree'])} — {esc(student['session'])}</b> in "
        f"<b>{esc(student['subject'])}</b> at <b>{esc(student['college'])}</b>. "
        f"Your Registration No. is <b>{esc(student['regno'])}</b>. The internship will "
        f"be conducted in a <b>Hybrid (Online)</b> mode and includes access to "
        f"live projects, mentorship, and weekly progress reviews."
    ))
    story.append(Spacer(1, 1.3 * mm))

    story.append(B(
        "Upon successful completion of the internship, you will receive a course "
        "completion certificate and a performance-based letter of recommendation. "
        "Please review the Terms &amp; Conditions below and respond with "
        "your acceptance at your earliest convenience."
    ))
    story.append(Spacer(1, 2.0 * mm))

    # -------------------- STUDENT / INTERN DETAILS TABLE --------------------
    story.append(P("STUDENT / INTERN DETAILS", size=9.8, color=NAVY, bold=True))
    story.append(Spacer(1, 0.6 * mm))
    story.append(make_student_details_table(student, W))
    story.append(Spacer(1, 1.0 * mm))

    # Dedicated address sub-row (full width, so it's always shown — guarantees column 10 used)
    addr_wrap = Table(
        [[
            P("<b>ADDRESS</b>", size=8.2, color=BLUE, bold=True),
            P(esc(student["address"]), size=9, color=GREY_900),
        ]],
        colWidths=[W * 0.14, W * 0.86],
    )
    addr_wrap.setStyle(TableStyle([
        ("BOX", (0,0),(-1,-1), 1.1, NAVY),
        ("BACKGROUND", (0,0), (0,0), GREY_050),
        ("LEFTPADDING",  (0,0), (-1,-1), 7),
        ("RIGHTPADDING", (0,0), (-1,-1), 7),
        ("TOPPADDING",    (0,0), (-1,-1), 3.5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 3.5),
        ("VALIGN", (0,0),(-1,-1), "TOP"),
    ]))
    story.append(addr_wrap)
    story.append(Spacer(1, 2.0 * mm))

    # -------------------- TERMS & CONDITIONS --------------------
    story.append(P("TERMS &amp; CONDITIONS", size=9.8, color=NAVY, bold=True))
    story.append(Spacer(1, 0.6 * mm))
    terms = [
        "This internship provides a structured learning experience (stipend as per company policy, if applicable).",
        "Complete all assigned tasks within the specified timelines and in line with Kodefort quality standards.",
        "All study materials, credentials and project access provided remain for personal educational use only and are strictly confidential.",
        "Kodefort reserves the right to terminate the internship at any time for non-performance or breach of company policy.",
    ]
    story.append(make_terms_table(terms, W))
    story.append(Spacer(1, 2.4 * mm))

    # -------------------- SIGNATURE BLOCK --------------------
    story.append(make_signature_block(W))

    doc.build(story)


# ============================================================
# READ EXCEL + MAIN
# ============================================================

def read_students():
    wb = openpyxl.load_workbook(EXCEL_PATH, data_only=True)
    ws = wb.active
    students = []
    for rn in range(2, ws.max_row + 1):
        email   = ws.cell(rn, 2).value
        name    = ws.cell(rn, 3).value
        college = ws.cell(rn, 4).value
        regno   = ws.cell(rn, 5).value
        degree  = ws.cell(rn, 6).value
        session = ws.cell(rn, 7).value
        subject = ws.cell(rn, 8).value
        topic   = ws.cell(rn, 9).value
        mobile  = ws.cell(rn, 10).value
        address = ws.cell(rn, 11).value

        values = [email, name, college, regno, degree, session, subject, topic, mobile, address]
        if is_empty_row(values):
            continue

        students.append({
            "row_number": rn,
            "email":   fmt(email),
            "name":    fmt(name),
            "college": fmt(college),
            "regno":   fmt(regno),
            "degree":  fmt(degree),
            "session": fmt(session),
            "subject": fmt(subject),
            "topic":   fmt(topic),
            "mobile":  fmt(mobile),
            "address": fmt(address),
        })
    return students


def main():
    print("=" * 70)
    print("KODEFORT INTERNSHIP OFFER LETTER GENERATOR")
    print("=" * 70)

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("\nCleaning old generated PDFs...")
    for fn in os.listdir(OUTPUT_DIR):
        if fn.lower().endswith(".pdf"):
            try:
                os.remove(os.path.join(OUTPUT_DIR, fn))
            except Exception as e:
                print(f"Could not remove {fn}: {e}")

    print("Reading Excel...")
    students = read_students()
    print(f"Found {len(students)} non-empty student rows.")

    generated = []
    used_names = {}
    print("\nGenerating offer letters...\n")

    for index, student in enumerate(students, start=1):
        base_name = clean_filename(student["name"])
        if base_name in used_names:
            used_names[base_name] += 1
            filename = f"Internship_Offer_Letter_{base_name}_{used_names[base_name]}.pdf"
        else:
            used_names[base_name] = 1
            filename = f"Internship_Offer_Letter_{base_name}.pdf"
        output_path = os.path.join(OUTPUT_DIR, filename)

        try:
            generate_letter(student, output_path)
            generated.append((output_path, filename, student))
        except Exception as e:
            print(f"[FAILED] Row {student['row_number']} | {student['name']} | {e}")
            sys.stdout.flush()

        if index % 10 == 0:
            print(f"Progress: {index}/{len(students)}")
            sys.stdout.flush()
        if index % 100 == 0:
            gc.collect()

    print("\n" + "=" * 70)
    print(f"Successfully generated: {len(generated)} PDFs")
    print(f"Failed: {len(students) - len(generated)}")

    print("\nCreating ZIP...")
    if os.path.exists(ZIP_PATH):
        try:
            os.remove(ZIP_PATH)
        except Exception:
            pass

    with zipfile.ZipFile(ZIP_PATH, "w",
                         compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        for filepath, filename, _ in generated:
            zf.write(filepath, arcname=filename)

    zip_size = os.path.getsize(ZIP_PATH) / (1024 * 1024)
    print(f"ZIP created: {ZIP_PATH}")
    print(f"ZIP size: {zip_size:.2f} MB")

    print("\n" + "=" * 70)
    print("DONE")
    print("=" * 70)
    print(f"\nIndividual PDFs:\n{OUTPUT_DIR}")
    print(f"\nZIP:\n{ZIP_PATH}")

    if generated:
        first = generated[0][2]
        print("\nSample generated student:")
        print(f"Name    : {first['name']}")
        print(f"College : {first['college']}")
        print(f"Topic   : {first['topic']}")


if __name__ == "__main__":
    main()
