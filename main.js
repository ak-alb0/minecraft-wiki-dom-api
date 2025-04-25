const card = document.getElementById("card");
const title = document.getElementById("title");
const warning = document.getElementById("warning");
const warningDesc = document.getElementById("warningDesc");
const descRegular = document.getElementById("descRegular");
const descRegularSmall = document.getElementById("descRegularSmall");
const entityCardSection = document.getElementById("entityCardSection");

const searchInputMain = document.getElementById("searchInputMain");
const searchInputSingle = document.getElementById("searchInputSingle");
const entitySearchButton = document.getElementById("entitySearchButton");
const main = document.getElementById("main");
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
						data[i].type,
						data[i].health,
						data[i].armor,
						data[i].width,
						data[i].height,
						data[i].description,
						data[i].icon
					);
				}
			});
	}
});

function mainEntityCardDisplayer(
	name,
	image,
	classification,
	type,
	health,
	armor,
	width,
	height,
	description,
	icon
) {
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

	const moreInfoButton = document.createElement("button");
	moreInfoButton.textContent = "SEE MORE";
	section2.appendChild(moreInfoButton);

	section.appendChild(section2);
	cardDisplayerMain.appendChild(section);

	moreInfoButton.addEventListener("click", () => {
		const cardOverlay = document.createElement("section");
		cardOverlay.classList.add("card");
		main.appendChild(cardOverlay);
		card.style.display = "none";
		cardOverlay.style.position = "absolute";
		cardOverlay.style.zIndex = "3";
		cardOverlay.style.top = "60px";
		cardOverlay.classList.add("card");

		cardOverlay.innerHTML = `
			<h1 class="title">Explore Minecraft entities</h1>
			<section class="warning" id="stub">
				<img src="./asset/stub-image (1).svg" />
				<p class="p-regular">
					<span>This article is a <a href="#">stub.</a></span>
					You can help by expanding it
				</p>
			</section>
			<section class="definition">
				<div class="def-text">
					<p class="p-regular">
					${description}
					</p>
					<br />
					<p id="mobDesc">
					</p>
				</div>
	
				<section class="entity-hihihiha">
					<p class="entity-titre" id="entityName">${name}<img src='${icon}' alt'not found'></p>
					<img id="mobSelected" src="${image}"/>
					<div class="entity-description">
						<div>
							<a>Health</a>
							<p id="mobHealth">
							${health}
								<img src="./asset/heart.png" />
							</p>
						</div>
						<div>
							<p>Armor</p>
							<p id="mobArmor">
							${armor}
								<img src="./asset/amor.png" />
							</p>
						</div>
						<div>
							<p>Strength</p>
							<p id="mobStrenght">
								0
								<img src="./asset/heart.png" />
							</p>
						</div>
						<div>
							<p>Classification</p>
							<a id='mobClassification'>${classification}</a>
						</div>
						<div>
							<p>Behavior</p>
							<p id='mobBehavior'>${type}</p>
						</div>
					</div>
					<button>DETAILS</button>
					<div class="physic">
						<p>Size</p>
						<div>
							<p>Height: <span id="mobHeight">${height}</span></p>
							<p>Width: <span id="mobWidth">${width}</span></p>
						</div>
					</div>
				</section>
			</section>
		`;
	});
}

const entityName = document.getElementById("entityName");
const mobSelected = document.getElementById("mobSelected");
const mobHealth = document.getElementById("mobHealth");
const mobArmor = document.getElementById("mobArmor");
const mobStrenght = document.getElementById("mobStrenght");
const mobClassification = document.getElementById("mobClassification");
const mobBehavior = document.getElementById("mobBehavior");
const mobHeight = document.getElementById("mobHeight");
const mobWidth = document.getElementById("mobWidth");

const themeBtn = document.getElementById("themeBtn");

// themeBtn.addEventListener("click", () => {
// 	const optionOverlay = document.createElement("div", "optionOverlay");
// 	main.appendChild(optionOverlay);
// });
