# 🔍 GitView - GitHub Profile Viewer

A sleek web app to search and view any GitHub user's profile, stats, and repositories. Built with vanilla JavaScript and the GitHub REST API.

![Status](https://img.shields.io/badge/Status-Ready-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![GitHub API](https://img.shields.io/badge/GitHub_API-181717?style=flat&logo=github&logoColor=white)

## ✨ Features

- 🔍 **Search GitHub Users** - Find any public GitHub profile
- 👤 **Profile Information** - Avatar, name, bio, location, company
- 📊 **User Stats** - Repositories, followers, following counts
- 📁 **Recent Repositories** - View latest 6 repos with stats
- 🎨 **Modern UI** - Orange/amber theme with smooth animations
- ⚡ **Real-time API** - Live data from GitHub's REST API
- 📱 **Fully Responsive** - Works on all devices
- ⌨️ **Keyboard Shortcuts** - Press `/` to focus search

## 🚀 Quick Start

### Option 1: Open Locally

1. Download all files (`index.html`, `styles.css`, `app.js`)
2. Open `index.html` in your browser
3. Search for any GitHub username!

### Option 2: Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Upload all project files
3. Enable GitHub Pages in Settings → Pages
4. Your app will be live!

## 📦 Project Structure

```
github-viewer/
├── index.html      # Main HTML structure
├── styles.css      # All styles (orange theme)
├── app.js          # GitHub API integration
└── README.md       # This file
```

## 🎯 How to Use

1. **Enter Username**: Type any GitHub username in the search bar
2. **Hit Search**: Click the search button or press Enter
3. **View Profile**: See user's avatar, bio, stats, and recent repos
4. **Explore Repos**: Click on repository names to view them on GitHub
5. **Try Another**: Search for more users!

**Try these users:**
- `torvalds` - Linus Torvalds (Linux creator)
- `gaearon` - Dan Abramov (React core team)
- `tj` - TJ Holowaychuk
- Your own username!

## 🛠️ Technologies

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **JavaScript** - ES6+, Async/Await

### API
- **GitHub REST API v3** - User and repository data
- No authentication required for public profiles
- Rate limit: 60 requests/hour (unauthenticated)

## 📊 Data Displayed

### User Profile
- Avatar image
- Name and username
- Biography
- Location
- Company
- Website/Blog
- Twitter username

### Statistics
- Total public repositories
- Followers count
- Following count

### Repositories
- Repository name
- Description
- Primary language
- Stars count
- Forks count
- Last updated date
- Public/Private status

## ⌨️ Keyboard Shortcuts

- `/` - Focus on search input
- `Escape` - Clear search focus
- `Enter` - Submit search

## 🎨 Customization

### Change Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --color-primary: #f59e0b;     /* Orange */
    --color-accent: #fb923c;      /* Light orange */
    --color-bg: #18181b;          /* Dark background */
}
```

### Get More Repositories

In `app.js`, change the `per_page` parameter:

```javascript
// Get more repos (max 100)
const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`
);
```

### Add Authentication

To increase API rate limits, add a GitHub token:

```javascript
const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
        'Authorization': 'token YOUR_GITHUB_TOKEN'
    }
});
```

## 🌐 GitHub API

This app uses the following GitHub API endpoints:

- **User Data**: `GET /users/{username}`
- **Repositories**: `GET /users/{username}/repos`

### API Rate Limits
- **Unauthenticated**: 60 requests/hour
- **Authenticated**: 5,000 requests/hour

[GitHub API Documentation](https://docs.github.com/en/rest)

## 🎓 Learning Outcomes

This project demonstrates:
- REST API integration
- Async/Await JavaScript
- Error handling
- Dynamic DOM manipulation
- Responsive design
- Modern CSS techniques
- User experience design

## 🔧 Future Enhancements

Ideas for extending this project:
- [ ] Search history
- [ ] Favorite users
- [ ] Compare two users
- [ ] View all repositories (pagination)
- [ ] Contribution graph
- [ ] Organization support
- [ ] Dark/Light theme toggle
- [ ] Export profile data
- [ ] Share profile links

## 🐛 Error Handling

The app handles:
- **User not found** - Shows friendly error message
- **Network errors** - Graceful failure
- **Empty states** - Clear feedback when no data
- **Loading states** - Spinner during API calls

## 📱 Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 🤝 Contributing

Feel free to fork and improve! Some ideas:
- Add more user details
- Show contribution calendar
- Display pinned repositories
- Add organization support
- Implement caching

## 📄 License

Free to use for personal and commercial projects. No attribution required.

## 👨‍💻 Author

**Soreti** - Full-Stack Android Developer
- Portfolio: [your-portfolio-link](https://yourusername.github.io/portfolio)
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Data provided by [GitHub REST API](https://docs.github.com/en/rest)
- Icons: Inline SVG
- Fonts: Google Fonts (Poppins)
- Color scheme inspiration: GitHub's design system

---

**Built with ❤️ and the GitHub API**

Happy exploring! 🔍

## 📸 Screenshots

Try searching for:
- `octocat` - GitHub's mascot account
- `twitter` - Twitter's organization
- `microsoft` - Microsoft organization
