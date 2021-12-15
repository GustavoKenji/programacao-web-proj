const Color = require("../models/Color");

class ColorController {
	constructor() {
		this.ColorModel = new Color();
	}
	async searchColors(request, response) {
		try {
			const { random } = request.query;
			let [min, max] = random.split(",");
			let colors = await this.ColorModel.getAllColors();
			let minColor = colors[min];
			let maxColor = colors[max];
			let keys = "keys".split("").map((el) => Math.floor(Math.random()*(139)+(0)));
			let randomColors = keys.map(k => colors[k]);
			randomColors.unshift(minColor);
			randomColors.push(maxColor);
			return response.status(200).json(randomColors);
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = new ColorController();