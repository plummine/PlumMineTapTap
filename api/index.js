const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { message } = req.body;
        const BOT_TOKEN = "8617357036:AAEs-Q1zfl36_6FdL3A8b12XE3TpTksxpKU";

        if (message && message.text) {
            const chatId = message.chat.id;
            const userId = message.from.id;
            const text = message.text;
            const userName = message.from.first_name || "User";

            if (text.startsWith('/start')) {
                const payload = text.split(' ')[1]; 
                // সঠিক বটের ইউজারনেম দিয়ে রেফারেল লিঙ্ক
                const inviteLink = `https://t.me/PlumMineTap_Bot?start=${userId}`;
                
                let welcomeMsg = `আসসালামু আলাইকুম ${userName}! 😊\n\n🧺 *PlumMine* এ আপনাকে স্বাগতম।\n\n🔗 আপনার রেফারেল লিঙ্ক:\n${inviteLink}\n\nআপনার বন্ধুদের ইনভাইট করুন আর বোনাস পান!`;
                
                if (payload) {
                    welcomeMsg += `\n\n🎁 আপনি ইউজার আইডি *${payload}* এর আমন্ত্রণে জয়েন করেছেন।`;
                }

                await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    chat_id: chatId,
                    text: welcomeMsg,
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [[
                            { 
                                text: "🎮 Play PlumMine 🧺", 
                                web_app: { url: "https://plum-mine-tap-tap.vercel.app" } 
                            }
                        ]]
                    }
                });
            }
        }
        return res.status(200).send('OK');
    }
    res.status(200).send('PlumMine Bot Backend is Running! 🚀');
};
