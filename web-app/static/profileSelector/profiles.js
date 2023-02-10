// Helper functions - to ease coding
function id(id) {
    return document.getElementById(id);
}

const body = id("profile-selector");

var profile_ids = [];
var buttonElements = []

// Get the information from the link (what user is selected)
let params = new URLSearchParams(window.location.search);
let userType = params.get("type");
console.log("userType: ", userType);

let dataFile;
let nextPage;
let subtitle;
let img_file;

// Change the subtitle to the userType
// Change the variables to that
console.log(userType);
switch (userType) {
    case "insightGenerator":
        dataFile = '../database/insightProfiles.csv'
        nextPage = '../insight-page/insightPage.html'
        subtitle = 'Insight Generator'
        img_file = 'insight'
        break;
    case "advertiser":
        dataFile = '../database/advProfiles.csv'
        nextPage = '../advertiser-page/advPage.html'
        subtitle = 'Advertiser'
        img_file = 'advertiser'
        break;
    case "user":
        dataFile = '../database/userProfiles.csv'
        nextPage = '../user-page/userPage.html'
        subtitle = 'User'
        img_file = 'user'
        break;
    case "website":
        dataFile = '../database/webProfiles.csv'
        nextPage = '../web-page/webPage.html'
        subtitle = 'Website'
        img_file = 'website'
        break;
    default:
        break;
}

id("subtitle").textContent = "Select the " + subtitle + " profile"

async function setUp() {
    const response = await fetch(dataFile)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');

            for (let i = 1; i < lines.length - 1; i++) {
                const el = lines[i].split(", ");
                let name = el[1];
                let id = el[2];
                console.log(id);

                id = id.replace(/\r/g, "");
                profile_ids.push(id)
                console.log("el", el);

                let a = document.createElement('button');
                a.classList += "intro-button"
                let link = "../img/" + img_file + "/" + id + ".jpeg"
                a.innerHTML = '<img src = ' + link + ' alt = ' + name + '>'
                a.id += "user-" + id

                a.addEventListener('click', function () {

                    profileSelected(id, name);
                })

                body.appendChild(a);
            }
        });

    // setup the button elements
    for (let i = 0; i < profile_ids.length; i++) {
        buttonElements[i] = id(userType + profile_ids[i])
    }
}

function profileSelected(userid, name) {
    console.log("Pofile selected: ", userid);
    window.location.href = nextPage + "?id=" + encodeURIComponent(userid) + "&name=" + encodeURIComponent(name);
}

setUp();


// function userSelected() {
//     // update selected profile
//     console.log("User profile selected.");

//     window.location = "./userSelection.html";

//     // // prepare request
//     // const request = {
//     //     task: "select-user",
//     // };

//     // const template = Ajax.query(request);
//     // console.log("Request: " + JSON.stringify(request));

//     // // upon the return of the request
//     // template.then(function (object) {
//     //     console.log("Response: " + JSON.stringify(object));

//     //     window.location = "./userSelection.html";
//     // });
// }

// Equivalent of .onclick = function ()
// (idk why that doesnt seem to work for me but this does)
// window.onload = function () {
//     // option_1.addEventListener("click", singleOption);
//     user_profile.addEventListener("click", userSelected);
// };
