"use strict";

//toggle drawer open for navigation bar
document.querySelector(".nav-button").addEventListener("click", function () {
    document.body.classList.toggle("drawer-open");
})


function renderTile(projectIndex) {
   let proj = document.createElement("div");
   proj.classList.add("project", "col-md-6", "col-lg-4", "py-3");

   let card = document.createElement("div");
   card.classList.add("card");
   proj.appendChild(card);

   let a = document.createElement("a");
   a.href = PROJECTS[projectIndex].url;

   let cardimgdiv = document.createElement("div");
   cardimgdiv.classList.add("card-img-box");

   let cardimg = document.createElement("img");
   cardimg.classList.add("card-img-top");
   cardimg.src = PROJECTS[projectIndex].img;

   cardimgdiv.appendChild(cardimg);

   a.appendChild(cardimgdiv);

   card.appendChild(a);

   let cardbody = document.createElement("div");
   cardbody.classList.add("card-body");

   let a2 = document.createElement("a");
   a2.src = PROJECTS[projectIndex].url;

   let h5 = document.createElement("h5");
   h5.textContent = PROJECTS[projectIndex].name;

   a2.appendChild(h5);

   cardbody.appendChild(a2);

   let description = document.createElement("p");
   description.textContent = PROJECTS[projectIndex].shortdesc;

   cardbody.appendChild(description);

   let skills = document.createElement("p");
   skills.classList.add("skills");
   skills.textContent = PROJECTS[projectIndex].skills;

   cardbody.appendChild(skills);

   card.appendChild(cardbody);

   return proj;
}


function createProjectTiles() {
    for(let i = 0; i < PROJECTS.length; i++) {
        document.querySelector("#card-row").appendChild(renderTile(i));
    }
}

createProjectTiles();