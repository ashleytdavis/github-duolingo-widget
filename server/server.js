const express = require('express');
const cors = require('cors');
const path = require('path');
const widgetRoutes = require('./routes/widgetRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/assets', (req, res, next) => {
    res.set('Content-Type', 'image/png');
    next();
});

app.use('/api', widgetRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
