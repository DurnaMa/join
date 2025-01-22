/*let users = [
	{
		name: "Max Muster",
		initial: "MM",
		'email': "max@mm.com",
		'password': 123,
		phone: "01234567890",
	},
	{
		name: "Dax Duster",
		initial: "DD",
		'email': "Dax@mm.com",
		'password': 123,
		phone: "1234567890",
	},
	{
		name: "Fax Fuster",
		initial: "FF",
		'email': "fax@mm.com",
		'password': 123,
		phone: "234567890",
	},
];*/

//let BASE_URL = 'https://join-7f1d9-default-rtdb.europe-west1.firebasedatabase.app/';

let users = [];



async function loadData(path = "") {
	let response = await fetch(BASE_URL + path + ".json");
	let responseToJson = await response.json();
	console.log(responseToJson);

	users = responseToJson;


	let email = document.getElementById("loginEmail").value;
	let password = document.getElementById("loginPassword").value;

	users.push();
	console.log(users);


	let user = users.find(user => user.email === email && user.password === password);


	//let user = users.find(user => user.email === email.value && user.password === password.value);


	console.log(user);

	if (user) {
		console.log("Anmeldung erfolgreich");
	}

}



/*function init() {
	logIn("");
}*/

/*async function logIn(path = 'signup["-OH2GD62vDxlyL1sFlFh"]') {
	let response = await fetch(BASE_URL + path + '.json');
	let responseToJson = await response.json();
	console.log(responseToJson);

	let email = document.getElementById("loginEmail").value;
	let password = document.getElementById("loginPassword").value;

	if (email == email && password == password) {
		console.log("Anmeldung erfolgreich");
		
	}

}*/

/*async function dataLogin(path = '') {
	let response = await fetch(BASE_URL + path + '.json');
	let responseToJson = await response.json();
	console.log(responseToJson);
	
	let email = document.getElementById("loginEmail");
	let password = document.getElementById("loginPassword");
	
	let users = responseToJson;
	let user = users.find(user => user.email == email.value && user.password == password.value);
		
	
	console.log(users);
	console.log(user);

	
}*/


function guestLogin() {
	sessionStorage.setItem("username", "Guest");
	window.location.href = "../pages/bord.html";
}

/*function logIn() {
	let email = document.getElementById("loginEmail");
	let password = document.getElementById("loginPassword");


	let user = users.find(
		user => user.email == email.value && user.password == password.value
	);
	console.log(user);

	if (user) {
		console.log("Anmeldung");
	} else {
		console.log("Fehler bei der Anmeldung");
	}
}*/

// async function logIn(path = '') {
//   // let BASE_URL = 'https://join-7f1d9-default-rtdb.europe-west1.firebasedatabase.app/';
//   let response = await fetch(BASE_URL + path + '.json');
//   console.log('Abruf datenbak', BASE_URL);
//   let loginEmail = document.getElementById('loginEmail');
//   let loginPassword = document.getElementById('loginPassword');

//   if (loginEmail && loginPassword) {
//     let data = {
//       email: loginEmail.value,
//       password: loginPassword.value,
//     };
//     console.log(data);

//     try {
//       await loadData('/signup', data);
//       loginEmail.value = '';
//       loginPassword.value = '';
//       window.location.href = './pages/summary.html';
//       console.log('Anmeldung erfolgreich');
//     } catch (error) {
//       console.error('Fehler bei der Anmeldung:', error);
//     }
//   }

//   return (responseToJson = await response.json());
// }
