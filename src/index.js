const express = require('express');
const getCryptoPrice = require('./utils/getCryptoPrice');
import dotenv from 'dotenv';

// initialize express app
const app = express();
dotenv.config(); // support .env file
const port = process.env.PORT; // port

// make api
app.get('/api/v1/crypto_price_feed', async (req, res) => {
	try {
		const priceFeed = await getCryptoPrice();

		return res.status(200).json({
			results: priceFeed,
		});
	} catch (err) {
		return res.status(500).json({
			error: err.toString(),
		});
	}
});

// home route
app.get('/', (req, res) => {
	res.status(200).json({ Success: '⚡️ Crypto price tracker is running!' });
});

app.listen(port, () =>
	console.log('Crypto Tracker server is running on port', port)
);
