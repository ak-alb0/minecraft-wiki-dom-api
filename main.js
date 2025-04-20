const searchInputMain = document.getElementById("searchInputMain");
const searchInputSingle = document.getElementById("searchInputSingle");
const entitySearchButton = document.getElementById("entitySearchButton");

const classificationSearch = document.getElementById("classificationSearch");
const typeSearch = document.getElementById("typeSearch");

const healthSearch = document.getElementById("healthSearch");
const armorSearch = document.getElementById("armorSearch");
const damageSearch = document.getElementById("damageSearch");

const cardDisplayerMain = document.getElementById("cardDisplayerMain");
const noEntityDisplay = document.getElementById("noEntityDisplay");

entitySearchButton.addEventListener("click", () => {
	if (
		searchInputMain.value === "" &&
		classificationSearch.value === "" &&
		typeSearch.value === "" &&
		healthSearch.value === "" &&
		armorSearch.value === ""
	) {
		noEntityDisplay.style.display = "flex";
		cardDisplayerMain.innerHTML = "";
	} else if (healthSearch.value != "" && searchInputMain.value === "") {
		noEntityDisplay.style.display = "none";
		cardDisplayerMain.innerHTML = "";
		fetch(
			`http://51.38.232.174:3000/v1/entities?classification=` +
				classificationSearch.value +
				"&" +
				"type=" +
				typeSearch.value +
				"&" +
				"health=" +
				healthSearch.value +
				"&" +
				"armor=" +
				armorSearch.value,
			{
				method: "GET",
			}
		)
			.then((res) => res.json())
			.then((data) => {
				for (let i = 0; i < data.length; i++) {
					mainEntityCardDisplayer(
						data[i].name,
						data[i].image,
						data[i].classification,
						data[i].type
					);
				}
			});
	} else {
		noEntityDisplay.style.display = "none";
		cardDisplayerMain.innerHTML = "";

		fetch(
			`http://51.38.232.174:3000/v1/entities?name=${searchInputMain.value}`,
			{
				method: "GET",
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.length === 0) {
					noEntityDisplay.style.display = "flex";
				}
				for (let i = 0; i < data.length; i++) {
					mainEntityCardDisplayer(
						data[i].name,
						data[i].image,
						data[i].classification,
						data[i].type
					);
				}
			});
	}
});

function mainEntityCardDisplayer(name, image, classification, type) {
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
