const { get } = require('axios');

exports.generateWidget = async (req, res) => {
    const { username, darkMode, bgColor, textColor, headerColor, valuesColor, width, height, gradientStart, gradientEnd } = req.query;
    const isDarkMode = darkMode === 'true';

    // Determine background style based on gradient or solid color
    let backgroundFill;
    if (gradientStart && gradientEnd) {
        backgroundFill = `url(#gradient)`;
    } else {
        backgroundFill = bgColor ? `#${bgColor}` : (isDarkMode ? '#1a1a1a' : 'white');
    }

    // Add '#' to colors if they don't exist
    const mainTextColor = textColor ? `#${textColor}` : (isDarkMode ? '#9ca3af' : '#57606a');
    const titleColor = headerColor ? `#${headerColor}` : (isDarkMode ? '#58cc02' : '#46a302');
    const emphasisTextColor = valuesColor ? `#${valuesColor}` : (isDarkMode ? '#ffffff' : '#24292E');

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
        const numUserCourses = userData.courses.length - 1;
        const numCourseString = numUserCourses === 1 ? '(+1 other)' : numUserCourses === 0 ? '' : `(+${numUserCourses} others)`;
        const languageLearning = userData.courses[0].title;
        const name = userData.name;

        const svg = generateSVG({
            width: parseInt(width) || 275,
            height: parseInt(height) || 160,
            backgroundFill,
            gradientStart,
            gradientEnd,
            mainTextColor,
            titleColor,
            emphasisTextColor,
            name,
            streak,
            totalXP,
            languageLearning,
            numCourseString,
            username,
            isDarkMode
        });

        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('X-Content-Type-Options', 'nosniff');

        res.send(svg);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
};

function generateSVG({ width, height, backgroundFill, gradientStart, gradientEnd, mainTextColor, titleColor, emphasisTextColor, name, streak, totalXP, languageLearning, numCourseString, username, isDarkMode }) {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <defs>
            ${gradientStart && gradientEnd ? `
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#${gradientStart.replace('#', '')}"/>
                <stop offset="100%" style="stop-color:#${gradientEnd.replace('#', '')}"/>
            </linearGradient>
            ` : ''}
        </defs>
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
        <rect width="100%" height="100%" fill="${backgroundFill}" 
              stroke="${isDarkMode ? '#333' : '#E4E2E2'}" stroke-width="1" rx="6"/>
        
        <!-- Title -->
        <text class="title" x="20" y="30" font-size="16" 
              fill="${titleColor}" font-weight="625">
              ${name}'s Duolingo Stats
        </text>
        
        <!-- Stats -->
        <g fill="${mainTextColor}">
            <text class="stats-row" x="17" y="60" font-size="14">
                <tspan class="emoji">🔥</tspan> Streak:
                <tspan x="${width - 155}" font-weight="600" 
                       fill="${emphasisTextColor}">${streak} days</tspan>
            </text>
            <text class="stats-row" x="17" y="90" font-size="14">
                <tspan class="emoji">✨</tspan> Total XP:
                <tspan x="${width - 155}" font-weight="600" 
                       fill="${emphasisTextColor}">${totalXP}</tspan>
            </text>
            <text class="stats-row" x="17" y="120" font-size="14">
                <tspan class="emoji">💡</tspan> Learning:
                <tspan x="${width - 155}" font-weight="600" 
                       fill="${emphasisTextColor}">
                       ${languageLearning} ${numCourseString}</tspan>
            </text>
        </g>
                
        <!-- Username -->
        <text class="username" x="20" y="145" font-size="12" 
              fill="${mainTextColor}">
              Learn with me! @${username}</text>
    </svg>
    `;
}
