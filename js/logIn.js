let users = [
	{
		name: "Max Muster",
		initial: "MM",
		email: "max@mm.com",
		password: 123,
		phone: "01234567890",
	},
	{
		name: "Dax Duster",
		initial: "DD",
		email: "dax@mm.com",
		password: 123,
		phone: "1234567890",
	},
	{
		name: "Fax Fuster",
		initial: "FF",
		email: "fax@mm.com",
		password: 123,
		phone: "234567890",
	},
];

function guestLogin() {
	sessionStorage.setItem("username", "Guest");
	window.location.href = "../pages/bord.html";
}

function logIn() {
	let email = document.getElementById("loginEmail");
	let password = document.getElementById("loginPassword");

	let name = users.find(
		(name) => name.email === email.value && name.password === password.value
	);
	console.log(name);

	if (name) {
		console.log("Anmeldung");
	} else {
		console.log("Fehler bei der Anmeldung");
	}
}

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
