const BASE_URL = "https://join-7f1d9-default-rtdb.europe-west1.firebasedatabase.app/"


function gesutLogin(){
    sessionStorage.setItem('username', 'Guest');
    window.location.href = "../pages/summary.html"
}

async function init(){
    onloadFunc();
    loadData();
    postData();
}

function onloadFunc(){
    console.log("test")
}

async function loadData(path=""){
    let response = await fetch(BASE_URL + path +".json");
    return responseToJson = await response.json();
}

async function postData(path="", data={}){
    let response = await fetch(BASE_URL + path +".json",{
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseToJson = await response.json();
}

// async function deleteData(path=""){
//     let response = await fetch(BASE_URL + path +".json",{
//         method: "DELETE",
//     })
//     return responseToJson = await response.json();
// }

// async function testPostData(path="", data={}){
//     const response = await fetch(BASE_URL + path +".json",{
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     });
//     return responseToJson = await response.json();
// }

function toTheRegistration(){
    
}