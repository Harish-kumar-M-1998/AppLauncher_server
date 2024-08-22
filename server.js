const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const PORT = 2354;

app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/frontend/dist')));

// API to launch applications
app.post('/launch', (req, res) => {
    const { application, parameter } = req.body;
    const command = `"${application}" ${parameter}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr });
        }
        res.json({ message: `Application launched successfully: ${stdout}` });
    });
});

// API to fetch applications
app.get('/applications', (req, res) => {
    res.json([{ name: 'Chrome', path: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' }]);
});

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
