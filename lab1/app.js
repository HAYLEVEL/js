const TariffRepository = require("./repositories/tariffRepository.js");
const UserRepository = require("./repositories/userRepository.js");
const readline = require('readline-sync');
const Tariff = require("./models/tariff.js");

const users = new UserRepository("./data/users.json");
const tariffs = new TariffRepository("./data/tariffs.json")

function StrToInt(number) {
	let num = '';
		for (let index in number) {
			if ( parseInt(number[index]) ) {
				num += number[index]
			}
		}
	return parseInt(num);
}

function NewTariff() {
	const new_tar = new Tariff();
	let buff = readline.question("Enter brand:");
	new_tar.brand = buff;
	buff = readline.question("Enter fullname:");
	new_tar.fullname = buff;
	buff = readline.question("Enter price:");
	new_tar.price = buff;
	if (!parseInt(buff) || !parseFloat(buff)) {
		return undefined;
	}
	new_tar.registeredAt = new Date().toISOString();
	buff = readline.question("Enter consumers:");
	if (!parseInt(buff)) {
		return undefined;
	}
	new_tar.consumers = parseInt(buff);
	return new_tar;
}

while (true) {
    const input = readline.question("Enter command:");
    console.log(input);

    if (input === "get/users") {
        console.log(users.getUsers());
	}
	else if (input.startsWith("get/user/"))
	{
		let num = StrToInt(input)
		if (users.getUserById(Number(num)) === undefined) {
			console.log("Id not found");
		}
		else {
			console.log(users.getUserById(Number(num)));
		}
	}
	else if (input === "get/tariffs") {
        console.log(tariffs.getTariffs());
	}
    else if (input.startsWith("get/tariff/")) {
        let num = StrToInt(input)
		if (tariffs.getTariffById(Number(num)) === undefined) {
			console.log("Id not found");
		}
		else {
			console.log(tariffs.getTariffById(Number(num)));
		}
	}
	else if (input.startsWith("delete/tariff/")) {
        let num = StrToInt(input)
		if (tariffs.getTariffById(Number(num)) === undefined) {
			console.log("Id not found");
		}
		else {
			tariffs.deleteTariff(Number(num));
		}
	}
	else if (input.startsWith("update/tariff/")) {
		let num = StrToInt(input)
		if (tariffs.getTariffById(Number(num)) === undefined) {
			console.log("Id not found");
		}
		else {
			console.log(tariffs.getTariffById(num));
			console.log("Enter new data:");
			const new_tar = NewTariff();
			if (new_tar == undefined) {
				console.log("Data is not correct");
			}
			else {
				new_tar.id = num;
				tariffs.updateTariff(new_tar);
			}
		}
	}
	else if (input === "post/tariff") {
		const new_tar = NewTariff();
		tariffs.addTariff(new_tar);
	}
	else {
		console.log("Command not found, please try again")
	} 
}