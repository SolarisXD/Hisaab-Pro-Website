# Hisaab-Pro Website

Official product website for **Hisaab-Pro** - Professional offline-first business ledger system for Indian Chartered Accountants and small businesses.

[![GitHub stars](https://img.shields.io/github/stars/SolarisXD/Hisaab-Pro-Website?style=social)](https://github.com/SolarisXD/Hisaab-Pro-Website)
[![GitHub forks](https://img.shields.io/github/forks/SolarisXD/Hisaab-Pro-Website?style=social)](https://github.com/SolarisXD/Hisaab-Pro-Website)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## Table of Contents

1. [Overview](#overview)
2. [Core Repository](#core-repository)
3. [Website Features](#website-features)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Dynamic GitHub API Integration](#dynamic-github-api-integration)
7. [Development](#development)
8. [Deployment](#deployment)
9. [Contributing](#contributing)
10. [License](#license)

---

## Overview

This repository contains the **product website** for Hisaab-Pro, a professional accounting software designed for Indian CAs and small businesses. The website serves as the primary marketing and distribution channel, featuring:

- Product information and feature showcase
- **Dynamic download system** (fetches latest release from GitHub API)
- Documentation links (Privacy Policy, Terms of Service, Security)
- Contact and support channels
- Version history and changelog

---

## Core Repository

| Item | Details |
|------|---------|
| **Repository** | [SolarisXD/Hisaab-Pro](https://github.com/SolarisXD/Hisaab-Pro) |
| **Description** | Professional, offline-first business ledger and accounting system for retail shops |
| **Latest Version** | **v1.0.2** (Security Patch & Public Release Prep) |
| **Released** | May 3, 2026 |
| **Language** | JavaScript |
| **License** | MIT |
| **Stars** | 1 |
| **Features** | Double-entry accounting, GST-ready invoicing, payroll, AES-256 encryption |

### Recent Releases

| Version | Name | Release Date |
|---------|------|-------------|
| **v1.0.2** | Security Patch & Public Release Prep | May 3, 2026 |
| **v1.0.1** | Initial Release | May 2, 2026 |
| **v1.0.0** | Setup Wizard | May 2, 2026 |

**Note:** The website automatically displays the latest version using the GitHub API. No manual updates needed!

---

## Website Features

### Homepage (`index.html`)
- Hero section with professional branding
- Feature grid (Bento layout)
- High-density data grid preview
- Multi-financial year management highlight
- **Dynamic download button** (fetches latest from GitHub)

### Download Page (`changelog.html`)
- **Auto-updating version badge** (via GitHub API)
- System requirements display
- SHA-256 checksum for verification
- **Complete changelog** (dynamically generated from GitHub releases)
- Download buttons for Windows (primary), macOS & Linux (coming soon)

### Features Page (`features.html`)
- Detailed feature breakdown
- UI/UX highlights
- Professional use-cases

### Contact Page (`contact.html`)
- Contact form
- Email and address information
- Support team details

### Report Issue (`issue.html`)
- Bug report submission
- Technical support contact
- Secure issue reporting channel

### Legal Pages
- **Privacy Policy** (`privacy.html`) - Zero cloud, zero telemetry
- **Terms of Service** (`terms.html`) - License and usage terms
- **Security** (`security.html`) - AES-256, offline-first architecture

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup |
| **Tailwind CSS** | Utility-first styling (loaded via CDN) |
| **Flowbite** | Component library (optional) |
| **JavaScript (ES6+)** | GitHub API integration, dynamic content |
| **Google Fonts** | Inter, Public Sans (typography) |
| **Material Symbols** | Icon system |

### Key Characteristics
- **No build step** - Pure HTML/CSS/JS
- **No frameworks** - Vanilla JavaScript
- **CDN-based** - Tailwind CSS via script tag
- **Static hosting** - GitHub Pages compatible

---

## Project Structure

```
Hisaab-Pro-Website/
├── index.html              # Homepage
├── changelog.html         # Download page + version history
├── features.html          # Feature showcase
├── contact.html          # Contact page
├── issue.html             # Bug report page
├── privacy.html          # Privacy policy
├── terms.html            # Terms of service
├── security.html         # Security overview
├── js/
│   └── github-release.js # GitHub API integration (auto-updates downloads)
├── images/               # (optional) local images
├── .opencode/            # Context files for AI-assisted development
│   └── context/
│       ├── core/         # Code quality, standards
│       ├── ui/           # UI styling standards
│       └── development/  # Clean code principles
└── README.md            # This file
```

---

## Dynamic GitHub API Integration

The website features **automatic version detection** using the GitHub API. No manual updates required when you release a new version!

### How It Works

```
User visits website
    ↓
Page loads javascript (github-release.js)
    ↓
JS fetches: https://api.github.com/repos/SolarisXD/Hisaab-Pro/releases/latest
    ↓
GitHub API returns JSON (version, download URL, release notes)
    ↓
JS updates:
  - Download button href → Latest zip file
  - Version badge → Latest version number
  - Changelog date → Release date
  - All .version-display elements
    ↓
User clicks "Download" → Downloads latest Hisaab-Pro-vX.X.X.zip
```

### Files Involved

1. **`js/github-release.js`** - Core integration module
   - `fetchLatestRelease()` - Fetches latest release from API
   - `updateDownloadButton()` - Updates all download buttons
   - `updateVersionBadge()` - Updates version displays
   - `updateChangelogDate()` - Updates "Updated" date
   - `updateWithFallback()` - Fallback to v1.0.0 if API fails

2. **HTML Pages** - Include script and proper IDs
   - `id="download-btn"` - Main download button
   - `id="download-btn-hero"` - Hero section button
   - `id="download-btn-header"` - Header CTA button
   - `id="version-badge"` - Version display
   - `id="version-badge-btn"` - Version span inside button
   - `id="changelog-updated-date"` - Changelog date

### Fallback Behavior

If the GitHub API is unavailable:
- Download buttons point to: `https://github.com/SolarisXD/Hisaab-Pro/releases/latest`
- Version displays show: `v1.0.0`
- Console warning: `[Hisaab Pro] Using fallback values`

---

## Development

### Prerequisites
- Any local server (Python, Node.js, PHP, etc.)
- Modern browser (Chrome, Firefox, Edge, Safari)

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SolarisXD/Hisaab-Pro-Website.git
   cd Hisaab-Pro-Website
   ```

2. **Start a local server** (choose one):

   **Option A: Python (Recommended)**
   ```bash
   python -m http.server 8000
   # Visit: http://localhost:8000
   ```

   **Option B: Node.js**
   ```bash
   npx serve
   # OR
   npx http-server
   ```

   **Option C: PHP**
   ```bash
   php -S localhost:8000
   ```

3. **Test the GitHub API integration:**
   - Open browser console (F12)
   - Look for: `[Hisaab Pro] Release loaded: v1.0.2`
   - Click download buttons to verify they point to latest release.

### Important Notes
- **Do not open HTML files directly** (file:// protocol blocks API calls due to CORS)
- **Always use a local server** (http://localhost)

---

## Deployment

### GitHub Pages (Automatic)

This repository is configured for GitHub Pages:

1. Push changes to `main` branch
2. GitHub Pages auto-deploys to: `https://solarisxd.github.io/Hisaab-Pro-Website/`

### Manual Deployment

For other hosting providers (Netlify, Vercel, traditional hosting):

```bash
# Build step: None needed (static HTML)
# Just upload all files to your hosting provider
```

### Updating the Website

When you release a new version of Hisaab-Pro core:

1. **No manual updates needed!** The website automatically fetches the latest version via GitHub API.
2. Verify the website shows the new version after release.
3. Optionally, update the changelog section if you want to highlight specific features.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the [Code Quality Standards](.opencode/context/core/standards/code-quality.md)
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Test with a local server (not file:// protocol)
- Ensure GitHub API integration works after changes

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

The core Hisaab-Pro application is also licensed under MIT: [SolarisXD/Hisaab-Pro/LICENSE](https://github.com/SolarisXD/Hisaab-Pro/blob/main/LICENSE)

---

## Contact

- **Email:** support@hisaabpro.com
- **Issues:** [GitHub Issues](https://github.com/SolarisXD/Hisaab-Pro-Website/issues)
- **Core Repo:** [SolarisXD/Hisaab-Pro](https://github.com/SolarisXD/Hisaab-Pro)

---

## Acknowledgments

- **Tailwind CSS** - Utility-first CSS framework
- **Flowbite** - Component library
- **Google Fonts** - Inter & Public Sans typography
- **GitHub API** - For seamless release integration

---

<div align="center">

**Hisaab-Pro: Precision Accounting for Indian Professionals**

[Visit Website](https://solarisxd.github.io/Hisaab-Pro-Website/) • [Core Repository](https://github.com/SolarisXD/Hisaab-Pro) • [Report Issue](https://github.com/SolarisXD/Hisaab-Pro-Website/issues)

</div>
