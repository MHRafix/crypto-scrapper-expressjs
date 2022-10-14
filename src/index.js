const express = require('express');
const getCryptoPrice = require('./utils/getCryptoPrice');

// initialize express app
const app = express();

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

app.listen(8080, () =>
	console.log('Crypto scrapper server is running on port', 8080)
);
