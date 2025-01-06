const BASE_URL = "https://join-7f1d9-default-rtdb.europe-west1.firebasedatabase.app/"


function gesutLogin(){
    sessionStorage.setItem('username', 'Guest');
    window.location.href = "../pages/summary.html"
}

async function init(){
    onloadFunc();
    loadData()
}

function onloadFunc(){
    console.log("test")
}

async function loadData(){
    let respons = await fetch(BASE_URL+ ".json")
    let responsToJson = await respons.json()
    console.log(responsToJson)
}

function toTheRegistration(){
    
}