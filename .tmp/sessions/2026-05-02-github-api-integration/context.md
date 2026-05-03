# Task Context: GitHub API Integration for Dynamic Downloads

Session ID: 2026-05-02-github-api-integration
Created: 2026-05-02T00:00:00Z
Status: in_progress

## Current Request
Implement GitHub API integration to dynamically fetch and display the latest Hisaab-Pro release version and download link from the SolarisXD/Hisaab-Pro repository. Replace hardcoded values (v1.0.0) across the website with dynamic content fetched via GitHub API.

## Context Files (Standards to Follow)
- `.opencode/context/core/standards/code-quality.md` - Core code quality standards (modular, functional, pure functions, <50 lines per function)
- `.opencode/context/ui/web/ui-styling-standards.md` - UI styling standards (Tailwind CSS, Flowbite, responsive design)
- `.opencode/context/development/principles/clean-code.md` - Clean code principles

## Reference Files (Source Material to Look At)
- `index.html` - Homepage with download CTA buttons
- `changelog.html` - Download page with version history
- `features.html`, `contact.html`, `issue.html`, `privacy.html`, `terms.html`, `security.html` - Pages with header CTA buttons
- `WEBSITE_INTEGRATION.md` - Original specification document

## External Docs Fetched
- GitHub API endpoint: `https://api.github.com/repos/SolarisXD/Hisaab-Pro/releases/latest`
- No authentication required for public repos
- Response includes: tag_name, assets[].browser_download_url, html_url, body (release notes)

## Components
1. **js/github-release.js** - New JavaScript module
   - Pure functions for API fetching
   - UI update functions
   - Fallback handling
   - Auto-initialize on DOM ready

2. **index.html updates**
   - Add `id="download-btn"` to hero download button
   - Add `id="version-badge"` for version display
   - Add script tag for github-release.js

3. **changelog.html updates**
   - Add `id="download-btn"` to download button
   - Add `id="version-badge"` to version badge
   - Make version text dynamic
   - Add script tag

4. **Header CTA updates** (all pages)
   - Update download button href from `changelog.html` to dynamic GitHub release URL
   - Add IDs for JS targeting

## Constraints
- Follow code-quality.md: pure functions, immutability, composition
- File naming: lowercase-with-dashes.js
- Functions: verbPhrases (fetchLatestRelease, updateDownloadSection)
- Keep functions < 50 lines
- Use Tailwind CSS classes (no custom CSS for functionality)
- Mobile-first responsive design
- Fallback to current hardcoded values if API fails
- No external dependencies (use native fetch API)

## Exit Criteria
- [x] `js/github-release.js` created with modular, functional code
- [x] `index.html` updated with dynamic version/download
- [x] `changelog.html` updated with dynamic version/download
- [x] Header CTA buttons on all pages updated
- [x] Tested locally with a server (not file:// protocol)
- [x] Browser console shows: `[Hisaab Pro] Release loaded: v1.0.2`
- [ ] Download button click downloads latest zip from GitHub
- [ ] Fallback works when API is unavailable
- [ ] Changes committed and pushed

## Notes
- GitHub API returns v1.0.2 as latest release
- Download button on homepage working
- Changelog page download button updated to <a> tag
- Added dynamic date updating for changelog "Updated" field
- JavaScript syntax verified with `node -c`
