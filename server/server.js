import app from './app.js';
import dns from 'node:dns';

dns.setDefaultResultOrder('ipv4first');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Portfolio API running on http://localhost:${PORT}`);
});