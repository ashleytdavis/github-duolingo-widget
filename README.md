<h1 style="width: 50%; margin: auto; text-align: center;"> Github Duolingo Stats</h1>
<br />
<div style="display: flex; justify-content: center; gap: 1rem;">
<a href="https://github.com/ashleytdavis/github-duolingo-widget/graphs/contributors">
      <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/ashleytdavis/github-duolingo-widget?color=32a83c">
</a>
<a href="https://github.com/ashleytdavis/github-duolingo-widget/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/ashleytdavis/github-duolingo-widget?color=32a83c">
</a>
<a href="https://github.com/ashleytdavis/github-duolingo-widget/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/ashleytdavis/github-duolingo-widget?color=32a83c">
</a>
</div>
<br />

Table of Contents:
- <a href="#about" style="color:rgb(65, 194, 76);">About</a>
- <a href="#usage" style="color: rgb(65, 194, 76);;">Usage</a>
- <a href="#how-to-start-the-development-environment" style="color: rgb(65, 194, 76);">How to Start the Development Environment</a>
- <a href="#making-contributions" style="color: rgb(65, 194, 76);">Making Contributions</a>
- <a href="#project-author" style="color: rgb(65, 194, 76);">Project Author</a>
- <a href="#thanks" style="color:rgb(65, 194, 76);">Thanks</a>
<br />
<br />

## About
Heavily inspired by projects such as <a href="https://github.com/anuraghazra/github-readme-stats" style="color:rgb(65, 194, 76);">github readme stats</a>, the github duolingo widget allows github users to display some of their basic duolingo stats on their github profile READMEs.

This project also comes with a live site that users can tailor their widgets to their liking using an aesthetic UI. 

## Usage
Copy and paste this into your markdown, and that's it. Simple!

Change the `?username=` value to your Duolingo username.
```
![Duolingo Stats](https://github-duolingo-widget.onrender.com/api/duolingo-badge?username=a-shelly123)
```
![Ashley's Duolingo Stats](https://github-duolingo-widget.onrender.com/api/duolingo-badge?username=a-shelly123)

### Dark Mode Theme
You can pass a query parameter `&darkMode=` to enable or disable dark mode.
```
![Duolingo Stats](https://github-duolingo-widget.onrender.com/api/duolingo-badge?username=a-shelly123&darkMode=true)
```
![Ashley's Duolingo Stats](https://github-duolingo-widget.onrender.com/api/duolingo-badge?username=a-shelly123&darkMode=true)

### Background Color
You can pass a query parameter `&bgColor=` to set a solid background color.
```
![Duolingo Stats](https://github-duolingo-widget.onrender.com/api/duolingo-badge?username=a-shelly123&bgColor=c02a2a)
```
![Duolingo Stats](https://github-duolingo-widget.onrender.com/api/duolingo-badge?username=a-shelly123&bgColor=c02a2a)

### Gradient Background
You can pass query parameters `&gradientStart=` and `&gradientEnd=` to create a gradient background.
```
![Duolingo Stats](https://github-duolingo-widget.onrender.com/api/duolingo-badge?username=a-shelly123&gradientStart=ff0000&gradientEnd=00ff00)
```
![Duolingo Stats](https://github-duolingo-widget.onrender.com/api/duolingo-badge?username=a-shelly123&gradientStart=1364e8&gradientEnd=8239e3)

### Altering Text Colors
You can pass the query parameters `&tectColor=`, `&headerColor=`, and `&valuesColor=` to customize the different text elements.
```
![Duolingo Stats](https://github-duolingo-widget.onrender.com/api/duolingo-badge?username=a-shelly123&textColor=2b977c&headerColor=ff0000&valuesColor=0000ff)
```
![Duolingo Stats](https://github-duolingo-widget.onrender.com/api/duolingo-badge?username=a-shelly123&textColor=2b977c&headerColor=ff0000&valuesColor=0000ff)

### Custom Dimensions
You can pass the query parameters `&width=` and `&height=` to adjust the size of the widget.
```
![Duolingo Stats](https://github-duolingo-widget.onrender.com/api/duolingo-badge?username=a-shelly123&width=350&height=200)
```
![Duolingo Stats](https://github-duolingo-widget.onrender.com/api/duolingo-badge?username=a-shelly123&width=350&height=200)

### Combining Options
You can combine any of these options to tailor the widget to your liking =)
```
![Duolingo Stats](https://github-duolingo-widget.onrender.com/api/duolingo-badge?username=a-shelly123&darkMode=true&gradientStart=000033&gradientEnd=000066&textColor=ffffff&width=400)
```
![Duolingo Stats](https://github-duolingo-widget.onrender.com/api/duolingo-badge?username=a-shelly123&darkMode=true&gradientStart=000033&gradientEnd=000066&textColor=ffffff&width=400)

## How to Start the Development Environment
I've done my best to make it really easy to run this project locally. The client runs on port 3000 and the server on port 3001.
- Client
    - Navigate to the client directory: `cd client`
    - Install dependencies: `npm install`
    - Start: `npm start`

Rinse and repeat for the `server` directory. Note that both the client and server need to be ran in seperate terminal instances simultaneously.

## Making Contributions
- I encourage users to add their own contributions to this project! Here is best practice for doing so:
    - Ensure you follow the <a href="/ContributorCovenant.md" style="color: rgb(65, 194, 76);">Contributor Covenant</a>
    - Make an <a href="https://github.com/ashleytdavis/github-duolingo-stats/issues" style="color: rgb(65, 194, 76);">issue</a>
    - Make a branch off of the `main` branch named with a _clear_ and _succinct_ branch name (no more than 30 characters)
    - Ensure your commit messages are <a href="https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/#https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/#heading-5-steps-to-write-better-commit-messages:~:text=5%20Steps%20to%20Write%20Better%20Commit%20Messages" style="color:rgb(65, 194, 76);">professional and clear</a>
    - When you're ready, open up a <a href="https://github.com/jekhi5/NorthStar/pull" style="color: rgb(65, 194, 76);">pull request</a> (PR)

## Project Author
This project was designed and developed by Ashley Davis. Feel free to connect on other platforms such as <a href="https://www.linkedin.com/in/ashleytdavis/" style="color:rgb(65, 194, 76);">LinkedIn</a>, or feel free to contact me via email ashley921davis@gmail.com.

## Thanks
Thank you to <a href="https://www.duolingo.com/" style="color:rgb(65, 194, 76);">Duolingo</a> for creating a free platform where users can explore new languages =)
