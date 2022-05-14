const Api = "https://rickandmortyapi.com/api/character"

let charList = []
let charSection = document.getElementById("characters");

const ApiData = () => {
    fetch(Api)
    .then(response => response.json())
    .then(data => {
        charList = data.results
        MFCounter(charList)
        createCards(charList)
    })
    .catch(err => console.error(err))
}

const MFCounter = (charList) => {
    let nMale = charList.filter(res => res.gender === "Male");
    let nFemale = charList.filter(res => res.gender === "Female");

    let maleCountContainer = document.getElementById("filters-genders-male"),
    femaleCountContainer = document.getElementById("filters-genders-female");

    let maleCounter = document.createElement("h1");
    maleCounter.textContent = `Male : ${nMale.length}`;
    let femaleCounter = document.createElement("h1");
    femaleCounter.textContent = `Female : ${nFemale.length}`;
    
    maleCountContainer.insertAdjacentElement("beforeend", maleCounter);
    femaleCountContainer.insertAdjacentElement("beforeend", femaleCounter);
}

const charFilter = (filter) => {
    let charContainer = document.getElementById("characters-container"),
    newChar = "";
    
    if(filter === charList || filter === "all"){
        newChar = createCards(charList);
        charSection.replaceChild(newChar, charContainer);
    }else if(filter === "alive"){
        newChar = createCards(charList.filter(res => res.status === "Alive"));
        charSection.replaceChild(newChar, charContainer);
    }else if(filter === "dead"){
        newChar = createCards(charList.filter(res => res.status === 'Dead'))
        charSection.replaceChild(newChar, charContainer);
    }else if(filter === "unknown"){
        newChar = createCards(charList.filter(res => res.status === 'unknown'))
        charSection.replaceChild(newChar, charContainer);
    }
}

const createCards = (characters) => {
    let charContainer = document.createElement("div");
    charContainer.id = "characters-container"

    characters.forEach(res => {
        charContainer.innerHTML += 
        `<article class="characters-card">
            <img class="characters-card-img" src="${res.image}">
            <div class="characters-card-content">
                <div>
                    <span class="status-badge ${res.status}">${res.status}</span>
                </div>
                <div>
                    <div>
                        <p class="blue-light">Name: </p>
                        <p class="characters-card-name">${res.name}</p>
                    </div>
                </div>
                <div>
                    <p class="blue-light">Location:</p>
                    <p class ="characters-card-location">${res.location.name}</p>
                </div>
                <div >
                    <p class="blue-light">Gender: </p>
                    <p><i class="${genderIcon(res.gender)} class ="characters-card-gender""></i></p>
                </div> 
            </div>
        </article>`
        // let charArticle = document.createElement("article");
        // charArticle.classList.add("characters-card");

        // let charImg = document.createElement("img");
        // charImg.classList.add("characters-card-img");
        // charImg.setAttribute("src", res.image);

        // let charContent = document.createElement("div");
        // charContent.setAttribute("class", "characters-card-content")

        // let charName = document.createElement("h3");
        // charName.textContent = `Name: ${res.name}`;
        // charName.setAttribute("class", "characters-card-name");

        // let charLocation = document.createElement("h3");
        // charLocation.textContent =`Location: ${res.location.name}`;
        // charLocation.setAttribute("class", "characters-card-location");

        // let charGender = document.createElement("h3"),
        // charGenderIcon = document.createElement("i");
        // charGender.classList.add("characters-card-gender");
        // charGender.textContent = "Gender: "
        // charGenderIcon.setAttribute("class", genderIcon(res.gender));
        // charGender.appendChild(charGenderIcon);
        
        // charArticle.appendChild(charImg);
        // charContent.appendChild(charName);
        // charContent.appendChild(charLocation);
        // charContent.appendChild(charGender);
        // charArticle.appendChild(charContent);
        // charContainer.appendChild(charArticle);
        
        charSection.appendChild(charContainer);
    })
    return charContainer;
}   

const genderIcon = (gender) => {

    let genderIcon 

    if(gender === "Male"){
        genderIcon = "fa-solid fa-mars blue";    
    }else if(gender === "Female"){
        genderIcon = "fa-solid fa-venus pink";
    }
    
    return genderIcon;
} 

ApiData();