const axios = require('axios');
const cheerio = require('cheerio');

// get crypto price func
const getCryptoPrice = async () => {
	try {
		const url = 'https://coinmarketcap.com/';
		const { data } = await axios.get(url);

		const $ = cheerio.load(data);
		const elementSelector =
			'#__next > div > div.main-content > div.sc-4vztjb-0.cLXodu.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr';

		const keys = [
			'rank',
			'name',
			'price',
			'24h',
			'7d',
			'marketCap',
			'volume',
			'circulatingSupply',
		];

		const coinArr = [];

		$(elementSelector).each((parentIdx, parentElem) => {
			let keyIdx = 0;
			const coinObj = {};

			if (parentIdx <= 9) {
				$(parentElem)
					.children()
					.each((childIdx, childElem) => {
						let tdValue = $(childElem).text();

						if (keyIdx === 1 || keyIdx === 0) {
							tdValue = $('p:first-child', $(childElem).html()).text();
						}

						if (tdValue) {
							coinObj[keys[keyIdx]] = tdValue;

							keyIdx++;
						}
					});

				coinArr.push(coinObj);
			}
		});

		return coinArr;
	} catch (err) {
		console.error(err);
	}
};

module.exports = getCryptoPrice;
