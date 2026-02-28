# 🛠️ Multietools — Your Smart Toolkit

> **65+ free, fast, private online tools** for images, PDFs, text, code, AI, calculators and more. No sign-up required. Everything runs in your browser.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white)

---

## ✨ Features

- **65+ Tools** across 9 categories
- **Zero server-side processing** — all tools run 100% in the browser
- **Dark / Light mode** with system preference detection
- **Mobile responsive** — works on any device
- **PWA ready** — installable as a standalone app
- **No sign-up, no ads, no tracking** — completely free & private

---

## 📂 Tool Categories

### 🖼️ Image Tools (7)
| Tool | Description |
|------|-------------|
| Image Converter | Convert between PNG, JPEG, WebP, BMP, SVG |
| Image Compressor | Reduce image file size with quality control |
| Image Resizer | Resize images by pixel, percentage, or preset |
| Image Cropper | Crop images with custom aspect ratios |
| Image Rotator | Rotate & flip images with EXIF handling |
| Image OCR | Extract text from images using Tesseract.js |
| Image Color Picker | Pick colors from uploaded images |

### 📄 PDF Tools (8)
| Tool | Description |
|------|-------------|
| PDF Merger & Splitter | Combine or split PDF documents |
| PDF Compressor | Reduce PDF file size |
| PDF Converter | Convert PDF to/from other formats |
| PDF to Word | Extract text from PDFs to DOCX |
| PDF to Image | Convert PDF pages to images |
| PDF Lock / Unlock | Add or remove PDF password protection |
| PDF Page Deleter | Remove specific pages from PDFs |
| eSign PDF | Draw or type signatures on PDFs |

### 🎨 Color Tools (5)
| Tool | Description |
|------|-------------|
| Color Picker | Pick and convert colors (HEX, RGB, HSL) |
| HEX ↔ RGB | Convert between color formats |
| Contrast Checker | WCAG accessibility contrast ratio checker |
| Gradient Generator | Design CSS gradients visually |
| Palette Generator | Generate harmonious color palettes |

### 🔢 Calculators (9)
| Tool | Description |
|------|-------------|
| Age Calculator | Calculate exact age from birthdate |
| BMI Calculator | Body Mass Index with health categories |
| Percentage Calculator | Multi-mode percentage calculations |
| GST Calculator | Goods & Services Tax calculator |
| Loan EMI Calculator | Amortization & EMI breakdown |
| Scientific Calculator | Full scientific calculator with history |
| Currency Converter | Real-time exchange rates |
| Unit Converter | Length, weight, temperature, area, volume, speed |
| Stopwatch & Timer | Lap tracking, countdown timer |

### 📝 Text Tools (7)
| Tool | Description |
|------|-------------|
| Word Counter | Character, word, sentence, paragraph stats |
| Case Converter | Upper, lower, title, sentence, toggle case |
| Text Reverser | Reverse text, words, or lines |
| Lorem Ipsum Generator | Generate placeholder text |
| Text Shorter | URL shortener & text condenser |
| Speech to Text | Voice dictation with language support |
| Text to Speech | Multi-voice and rate text reader |

### 💻 Developer Tools (14)
| Tool | Description |
|------|-------------|
| JSON Formatter | Format, validate & minify JSON |
| Regex Tester | Real-time regex testing with match highlights |
| Minifier | Minify HTML, CSS & JavaScript |
| Markdown to HTML | Live Markdown preview & conversion |
| Base64 Encoder/Decoder | Encode/decode Base64 strings |
| Hash Generator | MD5, SHA-1, SHA-256, SHA-512 hashing |
| URL Encoder/Decoder | Encode/decode URL components |
| CSV ↔ JSON | Convert between CSV and JSON |
| Encryptor / Decryptor | AES encryption & decryption |
| Binary Converter | Binary ↔ decimal ↔ hex ↔ octal |
| Password Generator | Strong password generator with strength meter |
| UUID Generator | Generate v4 UUIDs in bulk |
| Remove Duplicates | Deduplicate text lines |
| IP Lookup | Geolocation & ISP info from IP address |

### 🤖 AI Tools (8)
| Tool | Description |
|------|-------------|
| AI Detector | Detect AI-generated text with 8 heuristic metrics |
| AI Paraphraser | 5 rewriting modes with 120+ synonym pairs |
| AI Grammar Checker | 130+ spelling fixes, 20+ grammar rules |
| AI Summarizer | Extractive TF-scoring summarization |
| AI Chatbot | 100+ response patterns, math engine, jokes & facts |
| AI Sentiment Analyzer | 420+ word lexicon, emotion detection |
| AI Story Generator | 8 genres, 5 tones, typewriter animation |
| Keyword Density Checker | N-gram keyword analysis |

### 🧰 Utility Tools (8)
| Tool | Description |
|------|-------------|
| QR Scanner | Scan QR codes from camera or image |
| Barcode Scanner | Scan barcodes with camera |
| QR / Barcode Generator | Generate QR codes & barcodes |
| Time Zone Converter | Convert time between world zones |
| Notepad | Rich text notepad with local save |
| Invoice Generator | Create professional invoices |
| JSON to CSV | Convert JSON arrays to CSV |
| Meta Tag Analyzer | Analyze SEO meta tags of any URL |

---

## 🚀 Tech Stack

| Technology | Usage |
|-----------|-------|
| **HTML5 / CSS3 / JavaScript** | Core — all tools are single-file, self-contained |
| **CSS Custom Properties** | Theming (Soft Violet), dark/light mode |
| **Service Worker** | Offline caching (PWA) |
| **Font Awesome 6.4** | Icons |
| **pdf.js / pdf-lib** | PDF rendering & manipulation |
| **Tesseract.js** | OCR (Optical Character Recognition) |
| **html5-qrcode / jsQR** | QR & barcode scanning |
| **JSZip** | ZIP archive handling |
| **EmailJS** | Contact form delivery |

---

## 📦 Project Structure

```
multietools/
├── htdocs/
│   ├── index.html          # Landing page
│   ├── home.html            # Mirror of index
│   ├── tools.html           # Tool directory (9 categories)
│   ├── contact.html         # Contact form with OTP
│   ├── 404.html             # Custom error page
│   ├── css/global.css       # Global stylesheet v3.0
│   ├── js/global.js         # Global script v3.0 (navbar, theme, footer)
│   ├── favicon.svg          # SVG favicon (gear icon)
│   ├── manifest.json        # PWA manifest
│   ├── sw.js                # Service worker
│   ├── sitemap.xml          # XML sitemap
│   ├── robots.txt           # Crawler rules
│   └── [65 tool pages]      # Individual tool HTML files
└── README.md
```

---

## 🏃 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/ranjit-15/multietools.git
   ```
2. **Open locally** — serve `htdocs/` with any static server:
   ```bash
   cd multietools/htdocs
   npx serve .
   ```
   Or simply open `index.html` in your browser.

3. **Deploy** — works on GitHub Pages, Netlify, Vercel, or any static host.

---

## 🎨 Theme

The site uses a **Soft Violet** color system:

| Token | Value |
|-------|-------|
| Primary | `#7c3aed` |
| Secondary | `#ec4899` |
| Accent | `#8b5cf6` |
| Background | `#faf9ff` |
| Surface | `#ffffff` |

Dark mode toggles via `body.dark` class (persisted in `localStorage`).

---

## 📄 License

This project is open source and available for personal and educational use.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/ranjit-15">ranjit-15</a>
</p>
