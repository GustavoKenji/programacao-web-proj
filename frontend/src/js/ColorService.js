function separeteList(listCodes) {
	listCodes = listCodes.sort((a, b) => a - b);
	let middle = Math.floor(listCodes.length / 2);
	let firstSubList = listCodes.slice(0, middle);
	let secondSubList = listCodes.slice(middle, listCodes.length);

	return { first: firstSubList, second: secondSubList };
}

function calculateRangeValues(listCodes) {
	let { first, second } = separeteList(listCodes);
	let minVal = first.reduce((accumulator, current) => accumulator + current);
	let maxVal = second.reduce((accumulator, current) => accumulator + current);

	minVal = ((359 * (maxVal - minVal) / (359 + minVal)));
	maxVal = ((359 * (maxVal - minVal) / (359 + maxVal)));

	return { min: Math.ceil(minVal), max: Math.ceil(maxVal) };
}

function transformNameInAsciiCode(nameArray) {
	let nameSplited = nameArray.split("");
	return nameSplited.map(ch => {
			return ch.charCodeAt();
	});
}

function requestColoursPallete(values) {
	let { min, max } = values;
	return fetch(`${API_URL}/colors?random=${min},${max}`, {
		method: "get",
		headers: {"Content-type": "application/json" }
	})
	.then(res => {
		if(res.status === 200) {
			return res.json();
		} else {
			return console.error(res.json());
		}
	});
}

function template(values) {
	let item = `   
					<div class="pallete-result">
							${values.map(v => `<div class="pallete-square" style="background:${v.hexadecimal};">
								<span style="color: white; background: black">${v.name}</span>
							</div>`).join("")}
					</div>
			`;

	resultsPallete.innerHTML = item;
}