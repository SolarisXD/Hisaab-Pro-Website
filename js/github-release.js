/**
 * Hisaab Pro - GitHub Release Integration
 *
 * Fetches latest release info from core repo using GitHub API
 * Repository: SolarisXD/Hisaab-Pro
 *
 * No authentication required for public repos.
 */

// ==================== CONFIGURATION ====================
const GITHUB_CONFIG = {
    owner: 'SolarisXD',
    repo: 'Hisaab-Pro',
    fallbackVersion: 'v1.0.0',
    fallbackUrl: 'https://github.com/SolarisXD/Hisaab-Pro/releases/latest',
    cacheTime: 60 * 60 * 1000 // 1 hour in milliseconds
};

/**
 * Cache Helpers
 */
function getCachedData(key) {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < GITHUB_CONFIG.cacheTime) {
            return data;
        }
        localStorage.removeItem(key);
    } catch (e) {
        localStorage.removeItem(key);
    }
    return null;
}

function setCachedData(key, data) {
    const cacheObject = {
        data: data,
        timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheObject));
}

// ==================== API FETCHER ====================

/**
 * Fetches all releases from GitHub API
 * @returns {Promise<Array|null>} Releases array or null on error
 */
async function fetchAllReleases() {
    const cacheKey = 'hisaab_pro_releases_cache';
    const cachedData = getCachedData(cacheKey);
    if (cachedData) return cachedData;

    const apiUrl = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/releases`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setCachedData(cacheKey, data);
        return data;
    } catch (error) {
        console.error('[Hisaab Pro] Failed to fetch releases info:', error.message);
        return null;
    }
}

// ==================== UI UPDATERS ====================

/**
 * Gets DOM element by ID with null safety
 * @param {string} id - Element ID
 * @returns {HTMLElement|null}
 */
function getElement(id) {
    return document.getElementById(id);
}

/**
 * Finds all download buttons across multiple possible IDs and classes
 * @returns {Array<HTMLElement>}
 */
function findAllDownloadButtons() {
    const ids = ['download-btn', 'download-btn-hero', 'download-btn-header'];
    const buttons = [];
    
    ids.forEach(id => {
        const el = getElement(id);
        if (el) buttons.push(el);
    });
    
    // Also support class-based selection
    document.querySelectorAll('.download-btn-sync').forEach(el => buttons.push(el));
    
    return buttons;
}

/**
 * Updates download button with release asset or fallback
 * @param {HTMLElement} button - Download button element
 * @param {Object} release - GitHub release data
 */
function updateDownloadButton(button, release) {
    if (!button) return;

    let downloadUrl = GITHUB_CONFIG.fallbackUrl;
    let version = GITHUB_CONFIG.fallbackVersion;

    if (release) {
        version = release.tag_name;
        if (release.assets && release.assets.length > 0) {
            const zipAsset = release.assets[0];
            downloadUrl = zipAsset.browser_download_url;
            if (button.tagName === 'A') {
                button.setAttribute('download', zipAsset.name);
                button.removeAttribute('target');
            }
        } else {
            downloadUrl = release.html_url;
            if (button.tagName === 'A') {
                button.removeAttribute('download');
                button.setAttribute('target', '_blank');
            }
        }
    }

    // Update href for <a> tags
    if (button.tagName === 'A') {
        button.href = downloadUrl;
    }

    updateButtonText(button, version);
    updateButtonVersionSpan(button, version);

    button.disabled = false;
    button.classList.remove('btn-disabled');
}

/**
 * Updates version span inside button if present
 * @param {HTMLElement} button - Button element
 * @param {string} version - Version string
 */
function updateButtonVersionSpan(button, version) {
    if (!button) return;
    const span = button.querySelector('#version-badge-btn');
    if (span) {
        span.textContent = version;
    }
}

/**
 * Updates button text with version
 * @param {HTMLElement} button - Button element
 * @param {string} version - Version string
 */
function updateButtonText(button, version) {
    if (!button) return;
    const baseText = button.dataset.baseText || 'Download Hisaab Pro';
    const versionSpan = button.querySelector('#version-badge-btn');

    if (versionSpan) {
        button.textContent = `${baseText} `;
        button.appendChild(versionSpan);
    } else {
        button.textContent = `${baseText} ${version}`;
    }
}

/**
 * Updates version badge with release version
 * @param {HTMLElement} badge - Version badge element
 * @param {string} version - Version string
 */
function updateVersionBadge(badge, version) {
    if (!badge) return;

    badge.textContent = version;
    badge.classList.add('version-active');
}

/**
 * Formats date string for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Updates the "Updated" date in changelog hero section
 * @param {Object} latestRelease - Latest release data
 */
function updateChangelogDate(latestRelease) {
    const updatedSpan = document.querySelector('#changelog-updated-date');
    if (updatedSpan && latestRelease && latestRelease.published_at) {
        updatedSpan.textContent = formatDate(latestRelease.published_at);
    }
}

/**
 * Updates all elements with class 'version-display'
 * @param {string} version - Version string
 */
function updatePageVersionDisplays(version) {
    const displays = document.querySelectorAll('.version-display');
    displays.forEach(el => {
        el.textContent = version;
    });
}

/**
 * Basic markdown parser for release body
 */
function parseReleaseBody(markdown) {
    if (!markdown) return '';
    let html = markdown
        .replace(/\r\n/g, '\n')
        .replace(/### (.*)/g, '<h5 class="font-label-caps text-label-caps text-secondary mb-2 mt-4 uppercase">$1</h5>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code class="bg-slate-100 text-primary px-1 py-0.5 rounded text-[12px] font-mono">$1</code>')
        .replace(/^- (.*)/gm, '<li class="flex items-start gap-2 ml-2 mb-2"><span class="material-symbols-outlined text-[18px] text-secondary mt-0.5">check_circle</span><span class="text-on-surface-variant text-body-main">$1</span></li>')
        .replace(/^\* (.*)/gm, '<li class="flex items-start gap-2 ml-2 mb-2"><span class="material-symbols-outlined text-[18px] text-primary mt-0.5">arrow_right</span><span class="text-on-surface-variant text-body-main">$1</span></li>');
    
    // Wrap <li> in <ul>
    html = html.replace(/(<li.*?>.*?<\/li>\n?)+/g, match => `<ul class="mb-4">\n${match}</ul>\n`);
    
    // Replace double newlines with <br><br> for paragraphs
    html = html.replace(/\n\n/g, '<br><br>');
    
    return html;
}

/**
 * Populates the changelog entries section dynamically
 */
function populateChangelog(releases) {
    const container = document.getElementById('changelog-entries');
    if (!container) return;

    container.innerHTML = '';

    releases.forEach((release, index) => {
        const isLatest = index === 0;
        const version = release.tag_name;
        const dateStr = formatDate(release.published_at);
        const name = release.name || version;
        const formattedBody = parseReleaseBody(release.body);

        const entryHtml = `
        <div class="release-entry p-lg ${isLatest ? '' : 'bg-slate-50/50 older-release hidden'}">
            <div class="flex items-start gap-gutter ${isLatest ? '' : 'opacity-80'}">
                <div class="w-32 flex-shrink-0">
                    <span class="inline-block ${isLatest ? 'bg-primary text-white' : 'bg-slate-200 text-slate-700'} px-3 py-1 rounded font-data-mono text-xs font-bold">${version}</span>
                    <div class="mt-2 font-label-caps text-[10px] text-slate-400 uppercase">${dateStr}</div>
                </div>
                <div class="flex-grow w-full overflow-hidden">
                    <h4 class="font-title-sm text-title-sm ${isLatest ? 'text-primary' : 'text-slate-700'} mb-md">${name}</h4>
                    
                    <div class="relative">
                        <div id="release-content-${index}" class="release-content text-sm text-on-surface-variant overflow-hidden transition-all duration-300" style="max-height: 6rem;">
                            ${formattedBody}
                        </div>
                        <div id="release-fade-${index}" class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t ${isLatest ? 'from-white' : 'from-slate-50'} to-transparent transition-opacity duration-300"></div>
                    </div>
                    
                    <button id="release-btn-${index}" onclick="toggleRelease(${index})" class="mt-2 text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
                        <span id="release-btn-text-${index}">Show More</span>
                        <span id="release-btn-icon-${index}" class="material-symbols-outlined text-[18px]">expand_more</span>
                    </button>
                </div>
            </div>
        </div>
        `;
        container.innerHTML += entryHtml;
    });

    // Check sizes and show/hide buttons after rendering
    setTimeout(() => {
        document.querySelectorAll('.release-content').forEach((content, index) => {
            if (content.scrollHeight <= 96) {
                // Content is short enough, no need to expand
                const btn = document.getElementById(`release-btn-${index}`);
                const fade = document.getElementById(`release-fade-${index}`);
                if (btn) btn.style.display = 'none';
                if (fade) fade.style.display = 'none';
                content.style.maxHeight = 'none';
            }
        });
        
        // Show the Show Older Versions button if there is more than 1 release
        if (releases.length > 1) {
            const toggleAllBtn = document.getElementById('toggle-all-btn');
            if (toggleAllBtn) {
                toggleAllBtn.classList.remove('hidden');
                toggleAllBtn.textContent = 'Show Older Versions';
                toggleAllBtn.style.display = 'inline-block';
            }
        }
    }, 100);
}

// Global Toggle States
let isOlderShown = false;

window.toggleAllReleases = function() {
    isOlderShown = !isOlderShown;
    const btn = document.getElementById('toggle-all-btn');
    if (btn) {
        btn.textContent = isOlderShown ? 'Hide Older Versions' : 'Show Older Versions';
    }
    
    document.querySelectorAll('.older-release').forEach((el) => {
        if (isOlderShown) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
};

window.toggleRelease = function(index) {
    const content = document.getElementById(`release-content-${index}`);
    const fade = document.getElementById(`release-fade-${index}`);
    const btnText = document.getElementById(`release-btn-text-${index}`);
    const btnIcon = document.getElementById(`release-btn-icon-${index}`);
    
    if (!content) return;
    
    const isExpanded = content.style.maxHeight && content.style.maxHeight !== '6rem';
    
    if (isExpanded) {
        content.style.maxHeight = '6rem';
        if (fade) fade.style.opacity = '1';
        if (btnText) btnText.textContent = 'Show More';
        if (btnIcon) btnIcon.textContent = 'expand_more';
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        if (fade) fade.style.opacity = '0';
        if (btnText) btnText.textContent = 'Show Less';
        if (btnIcon) btnIcon.textContent = 'expand_less';
    }
};

/**
 * Fetches repository info from GitHub API
 * @returns {Promise<Object|null>} Repository info or null on error
 */
async function fetchRepoInfo() {
    const cacheKey = 'hisaab_pro_repo_cache';
    const cachedData = getCachedData(cacheKey);
    if (cachedData) return cachedData;

    const apiUrl = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setCachedData(cacheKey, data);
        return data;
    } catch (error) {
        console.error('[Hisaab Pro] Failed to fetch repo info:', error.message);
        return null;
    }
}

/**
 * Updates repository metadata across the page
 * @param {Object} repo - GitHub repository data
 */
function updateRepoMetadata(repo) {
    if (!repo) return;

    // Update Project Description
    const descriptions = document.querySelectorAll('#repo-description');
    descriptions.forEach(el => {
        el.textContent = repo.description;
    });

    // Update License
    const licenseEls = document.querySelectorAll('#repo-license');
    licenseEls.forEach(el => {
        el.textContent = repo.license ? repo.license.name : 'MIT License';
    });

    // Update Repo Stats
    const statsContainer = document.getElementById('repo-stats');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="flex items-center gap-4 text-xs font-bold text-slate-400">
                <a href="${repo.html_url}/stargazers" target="_blank" class="flex items-center gap-1 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined text-[16px]">star</span>
                    <span>${repo.stargazers_count}</span>
                </a>
                <a href="${repo.html_url}/network/members" target="_blank" class="flex items-center gap-1 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined text-[16px]">fork_right</span>
                    <span>${repo.forks_count}</span>
                </a>
                <a href="${repo.html_url}/issues" target="_blank" class="flex items-center gap-1 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined text-[16px]">error</span>
                    <span>${repo.open_issues_count}</span>
                </a>
            </div>
        `;
    }

    // Update GitHub Links
    const githubLinks = document.querySelectorAll('.github-repo-link');
    githubLinks.forEach(el => {
        if (el.tagName === 'A') el.href = repo.html_url;
    });

    // Update Topics/Tech Stack
    const topicsContainer = document.getElementById('repo-topics');
    if (topicsContainer && repo.topics) {
        topicsContainer.innerHTML = repo.topics.map(topic => 
            `<span class="bg-primary/5 text-primary border border-primary/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">${topic}</span>`
        ).join('');
    }
}

/**
 * Updates all download-related elements on the page
 */
async function updateDownloadSection() {
    // Run both fetches in parallel
    const [releases, repo] = await Promise.all([
        fetchAllReleases(),
        fetchRepoInfo()
    ]);

    const release = releases && releases.length > 0 ? releases[0] : null;

    const downloadButtons = findAllDownloadButtons();
    const versionBadge = getElement('version-badge');

    if (repo) {
        console.log('[Hisaab Pro] Repo metadata loaded');
        updateRepoMetadata(repo);
    }

    if (!release) {
        console.warn('[Hisaab Pro] Using fallback values for release');
        downloadButtons.forEach(btn => updateWithFallback(btn, versionBadge));
        return;
    }

    console.log('[Hisaab Pro] Latest release loaded:', release.tag_name);

    downloadButtons.forEach(btn => updateDownloadButton(btn, release));
    updateVersionBadge(versionBadge, release.tag_name);
    updatePageVersionDisplays(release.tag_name);
    updateChangelogDate(release);
    
    if (releases && releases.length > 0) {
        populateChangelog(releases);
        populateVersionOptions(releases);
    }
}

/**
 * Populates the version dropdown in the issue report form
 */
function populateVersionOptions(releases) {
    const versionSelect = document.getElementById('version');
    if (!versionSelect || !releases) return;

    versionSelect.innerHTML = releases.map((rel, index) => 
        `<option value="${rel.tag_name}">${rel.tag_name}${index === 0 ? ' (Latest)' : ''}</option>`
    ).join('');
}

/**
 * Updates UI with fallback values when API fails
 */
function updateWithFallback(button, versionBadge) {
    if (button) {
        if (button.tagName === 'A') {
            button.href = GITHUB_CONFIG.fallbackUrl;
        }
        updateButtonText(button, GITHUB_CONFIG.fallbackVersion);
    }

    if (versionBadge) {
        versionBadge.textContent = GITHUB_CONFIG.fallbackVersion;
    }
}

/**
 * Initialize automated form handling for Contact and Issue pages
 */
function initForms() {
    const issueForm = document.getElementById('issue-report-form');
    if (issueForm) {
        issueForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(issueForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const version = formData.get('version');
            const issueType = formData.get('issue_type');
            const description = formData.get('description');
            const steps = formData.get('steps');

            const title = encodeURIComponent(`[${issueType.toUpperCase()}] ${description.substring(0, 50)}...`);
            const body = encodeURIComponent(`
## Issue Description
${description}

## Steps to Reproduce
${steps}

---
**Environment Details:**
- **Reporter:** ${name} (${email})
- **App Version:** ${version}
- **Submitted via:** Website Form
            `.trim());

            const githubUrl = `https://github.com/SolarisXD/Hisaab-Pro/issues/new?title=${title}&body=${body}`;
            window.open(githubUrl, '_blank');
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const type = formData.get('inquiry_type');
            const message = formData.get('message');
            
            const subject = encodeURIComponent(`[${type}] Inquiry from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nInquiry Type: ${type}\n\nMessage:\n${message}`);
            window.location.href = `mailto:support@hisaabpro.com?subject=${subject}&body=${body}`;
        });
    }
}

// ==================== AUTO-INITIALIZE ====================

/**
 * Initialize on page load
 */
function init() {
    const runUpdate = () => {
        updateDownloadSection();
        initForms();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runUpdate);
    } else {
        runUpdate();
    }
}

// Start
init();
