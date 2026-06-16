async function FetchProjectData(id) {
    const response = await fetch("projectdata.json");
    const data = await response.json();
    return data[id];
}
function GetProjectId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}


let image_index = 0;
let images = [];

function UpdateImage() {
    if (images.length == 0) {
        // delete the slideshow
        document.getElementById("images").remove();
        return;
    }
    // document.getElementById("images").getElementsByTagName("img")[0].src = images[image_index];
    document.getElementById("current-image").style.backgroundImage = `url(${images[image_index]})`;
    document.getElementById("current").innerText = image_index + 1;
    document.getElementById("total").innerText = images.length;
}
function NextImage() {
    image_index = (image_index + 1) % images.length;
    UpdateImage();
}
function PreviousImage() {
    image_index = (image_index - 1 + images.length) % images.length;
    UpdateImage();
}

async function DisplayProjectData() {
    const data = await FetchProjectData(GetProjectId());

    document.getElementById("back-button").getElementsByTagName("a")[0].href = data.backurl;
    document.getElementById("project-description").innerHTML = data.description;
    document.getElementById("project-title").innerText = data.name;

    // imgs
    images = data.images;
    UpdateImage();
    // for (const image_url of data.images) {
    //     document.getElementById("images").innerHTML += `<img src="${image_url}" class="project-image"><br>`;
    // }
    // buttons
    for (const button_data of data.buttons) {
        document.getElementById("buttons").innerHTML += 
            `<button><a href="${button_data.link}">- ${button_data.text} -</a></button><br>`;
    }
    // tags
    for (const tag of data.tags) {
        document.getElementsByClassName("project-tags")[0].innerHTML += 
            `<span class="project-tag">${tag}</span>&nbsp;`;
    }
}