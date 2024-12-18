const express = require('express');
const { get } = require('axios');
const cors = require('cors');
const path = require('path');


const app = express();
const port = 3001;

const languageMap = [
    {
        apiName: 'ja',
        language: 'Japanese',
    },
    {
        apiName: 'zh',
        language: 'Chinese',
    },
    {
        apiName: 'fr',
        language: 'French',
    },
    {
        apiName: 'pt',
        language: 'Portuguese',
    },
    {
        apiName: 'de',
        language: 'German',
    },
    {
        apiName: 'ko',
        language: 'Korean',
    },
    {
        apiName: 'ar',
        language: 'Arabic',
    },
    {
        apiName: 'en',
        language: 'English',
    },
    {
        apiName: 'eo',
        language: 'Esperanto',
    },
    {
        apiName: 'el',
        language: 'Greek',
    },
    {
        apiName: 'sv',
        language: 'Swedish',
    },
    {
        apiName: 'it',
        language: 'Italian',
    },
];

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/assets', (req, res, next) => {
    res.set('Content-Type', 'image/png');
    next();
});

app.get('/duolingo-badge', async (req, res) => {
    const { username, darkMode } = req.query;
    const isDarkMode = darkMode === 'true';

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const response = await get(`https://www.duolingo.com/2017-06-30/users?username=${username}`, {
            headers: {
                'User-Agent': 'DuolingoBadge/1.0'
            }
        });

        if (!response.data.users || response.data.users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = response.data.users[0];
        const streak = userData.streak;
        const totalXP = userData.totalXp;
        const currentCourse = userData.learningLanguage;
        const numUserCourses = userData.courses.length - 1; //-1, exclude the current course being learned
        const numCourseString = numUserCourses === 1 ? '(+1 other)' : numUserCourses === 0 ? '' : `(+${numUserCourses} others)`;
        const languageLearning = languageMap.find(course => course.apiName === currentCourse)?.language || 'Unknown Course';
        const name = userData.name;

        console.log(userData);

        // Calculate the width based on the name length
        const baseWidth = 275; // Minimum width
        const nameWidth = name.length * 10; // Estimate 10px per character
        const svgWidth = Math.max(baseWidth, nameWidth + 50); // Add some padding

        const svg = `
         <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="160">
             <style>
                 text { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif; }
                 @keyframes fadeIn {
                     from { opacity: 0; }
                     to { opacity: 1; }
                 }
                 @keyframes slideIn {
                     from { transform: translateX(-10px); opacity: 0; }
                     to { transform: translateX(0); opacity: 1; }
                 }
                 @keyframes pulse {
                     0% { transform: scale(1); }
                     50% { transform: scale(1.1); }
                     100% { transform: scale(1); }
                 }
                 .stats-row { animation: slideIn 0.6s ease-out forwards; }
                 .stats-row:nth-child(1) { animation-delay: 0.2s; }
                 .stats-row:nth-child(2) { animation-delay: 0.4s; }
                 .stats-row:nth-child(3) { animation-delay: 0.6s; }
                 .title { animation: fadeIn 0.8s ease-out; }
                 .emoji { animation: pulse 2s infinite; }
                 .username { animation: slideIn 0.6s ease-out forwards; 
                            animation-delay: 0.8s; }
             </style>
             
             <!-- Background -->
             <rect width="100%" height="100%" fill="${isDarkMode ? '#1a1a1a' : 'white'}" 
                   stroke="${isDarkMode ? '#333' : '#E4E2E2'}" stroke-width="1" rx="6"/>
             
             <!-- Title -->
             <text class="title" x="20" y="30" font-size="16" 
                   fill="${isDarkMode ? '#58cc02' : '#46a302'}" font-weight="625">
                   ${name}'s Duolingo Stats
             </text>
             
             <!-- Stats -->
             <g fill="${isDarkMode ? '#9ca3af' : '#57606a'}">
                 <text class="stats-row" x="17" y="60" font-size="14">
                     <tspan class="emoji">🔥</tspan> Streak:
                     <tspan x="${svgWidth - 155}" font-weight="600" 
                            fill="${isDarkMode ? '#ffffff' : '#24292E'}">${streak} days</tspan>
                 </text>
                 <text class="stats-row" x="17" y="90" font-size="14">
                     <tspan class="emoji">✨</tspan> Total XP:
                     <tspan x="${svgWidth - 155}" font-weight="600" 
                            fill="${isDarkMode ? '#ffffff' : '#24292E'}">${totalXP}</tspan>
                 </text>
                 <text class="stats-row" x="17" y="120" font-size="14">
                     <tspan class="emoji">💡</tspan> Learning:
                     <tspan x="${svgWidth - 155}" font-weight="600" 
                            fill="${isDarkMode ? '#ffffff' : '#24292E'}">
                            ${languageLearning} ${numCourseString}</tspan>
                 </text>
             </g>
                     
             <!-- Username -->
             <text class="username" x="20" y="145" font-size="12" 
                   fill="${isDarkMode ? '#9ca3af' : '#57606a'}">
                   Learn with me! @${username}</text>
         </svg>
         `;


        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('X-Content-Type-Options', 'nosniff');

        res.send(svg);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
