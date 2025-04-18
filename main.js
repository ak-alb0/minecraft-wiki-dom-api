const searchInputMain = document.getElementById("searchInputMain");
const searchInputSingle = document.getElementById("searchInputSingle");
const entitySearchButton = document.getElementById('entitySearchButton');

const cardDisplayerMain = document.getElementById("cardDisplayerMain");
const noEntityDisplay = document.getElementById("noEntityDisplay");

searchInputMain.addEventListener("keydown", () => {
	
});


entitySearchButton.addEventListener('click', () => {
if (searchInputMain.value === "") {
		noEntityDisplay.style.display = "flex";
	} else {
		noEntityDisplay.style.display = "none";
		fetch(
			`http://192.168.1.15:3000/v1/entities?name=${searchInputMain.value}`,
			{
				method: "GET",
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log((data.length = 1));
				for (let i = 0; i < data.length; i++) {
					mainEntityCardDisplayer(data[i].name, data[i].image, data[i].classification,  data[i].type);
				}
			});
        }
});






function mainEntityCardDisplayer(name, image,classification, type) {
	const section = document.createElement("section");
	section.className = "entity-list-d";

	const section2 = document.createElement("section");
	section2.className = "entity-card";
	section2.id = "entityCard";

	const title = document.createElement("p");
	title.className = "entity-titre";
	title.id = "entityTitle";
	title.textContent = name;
	section2.appendChild(title);

	const img = document.createElement("img");
	img.src = image;
	img.id = "entityImage";
	section2.appendChild(img);

	const descriptionDiv = document.createElement("div");
	descriptionDiv.className = "entity-description";
	descriptionDiv.id = "entityDescription";

	const anchor = document.createElement("a");
	anchor.href = "#" + classification;
	anchor.textContent = classification;
	descriptionDiv.appendChild(anchor);

	const passive = document.createElement("p");
	passive.textContent = type;
	descriptionDiv.appendChild(passive);

	section2.appendChild(descriptionDiv);

	const hr = document.createElement("hr");
	section2.appendChild(hr);

	const button = document.createElement("button");
	button.textContent = "SEE MORE";
	section2.appendChild(button);

	section.appendChild(section2);
	cardDisplayerMain.appendChild(section);
}
