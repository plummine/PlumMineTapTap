const axios = require('axios');

module.exports = async (req, res) => {
    // শুধুমাত্র POST রিকোয়েস্ট হ্যান্ডেল করবে (টেলিগ্রাম থেকে আসা ডাটা)
    if (req.method === 'POST') {
        const { message } = req.body;
        
        // আপনার বট টোকেন
        const BOT_TOKEN = "8617357036:AAEs-Q1zfl36_6FdL3A8b12XE3TpTksxpKU";

        if (message && message.text) {
            const chatId = message.chat.id;
            const text = message.text;
            const userName = message.from.first_name || "User";

            // যদি কেউ /start লিখে বটে আসে
            if (text.startsWith('/start')) {
                // রেফারেল আইডি আলাদা করা (যদি থাকে)
                const payload = text.split(' ')[1]; 
                
                let welcomeMsg = `আসসালামু আলাইকুম ${userName}! 😊\n\n🧺 *PlumMine* এ আপনাকে স্বাগতম।\nএখানে আপনি ট্যাপ করে বড়ই (🍒) সংগ্রহ করতে পারবেন এবং তা দিয়ে ইনকাম করতে পারবেন।`;
                
                if (payload) {
                    welcomeMsg += `\n\n🎁 আপনি ইউজার আইডি *${payload}* এর আমন্ত্রণে জয়েন করেছেন। আপনার বোনাস পয়েন্ট শীঘ্রই যুক্ত হবে!`;
                }

                // টেলিগ্রামে মেসেজ এবং প্লে বাটন পাঠানো
                await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    chat_id: chatId,
                    text: welcomeMsg,
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [[
                            { 
                                text: "🎮 Play PlumMine 🧺", 
                                web_app: { url: "https://plummine.github.io/PlumMineTapTap/" } 
                            }
                        ]]
                    }
                });
            }
        }
        return res.status(200).send('OK');
    }

    // ব্রাউজারে চেক করার জন্য
    res.status(200).send('PlumMine Bot Backend is Running! 🚀');
};
