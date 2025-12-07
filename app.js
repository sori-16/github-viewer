// ===================================
// DOM ELEMENTS
// ===================================
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const profileSection = document.getElementById('profileSection');
const initialState = document.getElementById('initialState');
const reposList = document.getElementById('reposList');

// Profile elements
const avatar = document.getElementById('avatar');
const nameEl = document.getElementById('name');
const usernameEl = document.getElementById('username');
const bioEl = document.getElementById('bio');
const locationEl = document.getElementById('location');
const companyEl = document.getElementById('company');
const blogEl = document.getElementById('blog');
const twitterEl = document.getElementById('twitter');
const reposCount = document.getElementById('repos');
const followersCount = document.getElementById('followers');
const followingCount = document.getElementById('following');
const profileLink = document.getElementById('profileLink');

// Detail items (for hiding/showing)
const locationItem = document.getElementById('locationItem');
const companyItem = document.getElementById('companyItem');
const blogItem = document.getElementById('blogItem');
const twitterItem = document.getElementById('twitterItem');

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initialState.classList.add('show');
    searchForm.addEventListener('submit', handleSearch);
});

// ===================================
// SEARCH HANDLER
// ===================================
async function handleSearch(e) {
    e.preventDefault();

    const username = searchInput.value.trim();
    if (!username) return;

    // Hide all states
    hideAllStates();
    loading.classList.add('show');

    try {
        // Fetch user data
        const userData = await fetchUser(username);

        // Fetch repositories
        const repos = await fetchRepos(username);

        // Display data
        displayProfile(userData);
        displayRepos(repos);

        // Show profile
        loading.classList.remove('show');
        profileSection.classList.add('show');

    } catch (err) {
        loading.classList.remove('show');
        error.classList.add('show');
        console.error('Error:', err);
    }
}

// ===================================
// API FUNCTIONS
// ===================================
async function fetchUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
        throw new Error('User not found');
    }

    return await response.json();
}

async function fetchRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);

    if (!response.ok) {
        throw new Error('Could not fetch repositories');
    }

    return await response.json();
}

// ===================================
// DISPLAY FUNCTIONS
// ===================================
function displayProfile(user) {
    // Avatar and basic info
    avatar.src = user.avatar_url;
    avatar.alt = `${user.login}'s avatar`;
    nameEl.textContent = user.name || user.login;
    usernameEl.textContent = `@${user.login}`;
    bioEl.textContent = user.bio || 'No bio available';

    // Profile link
    profileLink.href = user.html_url;

    // Stats
    reposCount.textContent = formatNumber(user.public_repos);
    followersCount.textContent = formatNumber(user.followers);
    followingCount.textContent = formatNumber(user.following);

    // Optional details
    if (user.location) {
        locationEl.textContent = user.location;
        locationItem.style.display = 'flex';
    } else {
        locationItem.style.display = 'none';
    }

    if (user.company) {
        companyEl.textContent = user.company;
        companyItem.style.display = 'flex';
    } else {
        companyItem.style.display = 'none';
    }

    if (user.blog) {
        const blogUrl = user.blog.startsWith('http') ? user.blog : `https://${user.blog}`;
        blogEl.href = blogUrl;
        blogEl.textContent = user.blog;
        blogItem.style.display = 'flex';
    } else {
        blogItem.style.display = 'none';
    }

    if (user.twitter_username) {
        twitterEl.textContent = `@${user.twitter_username}`;
        twitterItem.style.display = 'flex';
    } else {
        twitterItem.style.display = 'none';
    }
}

function displayRepos(repos) {
    if (repos.length === 0) {
        reposList.innerHTML = '<p style="text-align: center; color: var(--color-text-muted); padding: 2rem;">No repositories found</p>';
        return;
    }

    reposList.innerHTML = repos.map(repo => `
        <div class="repo-card">
            <div class="repo-header">
                <a href="${repo.html_url}" target="_blank" rel="noopener" class="repo-name">
                    ${repo.name}
                </a>
                <span class="repo-visibility">${repo.private ? 'Private' : 'Public'}</span>
            </div>
            ${repo.description ? `<p class="repo-description">${escapeHtml(repo.description)}</p>` : ''}
            <div class="repo-stats">
                ${repo.language ? `
                    <div class="repo-language">
                        <span class="language-dot" style="background: ${getLanguageColor(repo.language)}"></span>
                        <span>${repo.language}</span>
                    </div>
                ` : ''}
                <div class="repo-stat">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    ${formatNumber(repo.stargazers_count)}
                </div>
                <div class="repo-stat">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    ${formatNumber(repo.forks_count)}
                </div>
                <div class="repo-stat">
                    <span>Updated ${formatDate(repo.updated_at)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
function hideAllStates() {
    initialState.classList.remove('show');
    loading.classList.remove('show');
    error.classList.remove('show');
    profileSection.classList.remove('show');
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f7df1e',
        'TypeScript': '#3178c6',
        'Python': '#3776ab',
        'Java': '#b07219',
        'C++': '#f34b7d',
        'C': '#555555',
        'C#': '#178600',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'PHP': '#4F5D95',
        'Swift': '#ffac45',
        'Kotlin': '#A97BFF',
        'Dart': '#00B4AB',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Vue': '#41b883',
        'React': '#61dafb',
        'Shell': '#89e051',
    };

    return colors[language] || '#f59e0b';
}

// ===================================
// KEYBOARD SHORTCUTS
// ===================================
document.addEventListener('keydown', (e) => {
    // / key to focus on search
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
    }

    // Escape to clear search
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.blur();
    }
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c🔍 GitView', 'font-size: 24px; font-weight: bold; color: #f59e0b;');
console.log('%cBuilt by Soreti', 'font-size: 14px; color: #a1a1aa;');
console.log('%cKeyboard shortcut: "/" to focus search', 'font-size: 12px; color: #71717a;');
