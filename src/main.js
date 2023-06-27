import "./index.css";
import "@fontsource-variable/inter";
import { Fzf } from "fzf";

const getScriptHTML = (name, desc, owner, mcver, pkgver, tags) => {
	let tagHTML = "";
	if (tags.length > 0) {
		tags.array.forEach((tag) => {
			tagHTML += `<span>${tag}</span>`;
		});
	}

	return `
			<div class="script-container">
				<h1>${name}</h1>
				<div class="stats">
					<img src="/media/user.svg" alt="" /> ${owner}
					<img src="/media/cube.svg" alt="" /> ${mcver}
					<img src="/media/code.svg" alt="" /> ${pkgver}
				</div>
				<p>${desc}</p>
				<div class="tags">${tagHTML}</div>
				<div class="mobileinfo">
					<div class="tags">${tagHTML}</div>
					<div class="stats">
						<img src="/media/user.svg" alt="" /> sbot50
						<img src="/media/cube.svg" alt="" /> 1.20
						<img src="/media/code.svg" alt="" /> v1.0
					</div>
				</div>
			</div>
		`;
};

const getScriptSkeleton = () => {
	const skeleton = document.createElement("div");
	skeleton.classList.add("script-container", "animate-pulse");
	skeleton.innerHTML = `
			<h1><div class="w-1/6 h-4 rounded-lg bg-white"></div></h1>
			<div class="stats">
				<div class="w-1/5 ml-2 mt-2 h-3 rounded-lg bg-white opacity-25"></div>
			</div>
			<div class="w-1/3 ml-2 mt-2 h-3 rounded-lg bg-white opacity-50"></div>
		`;
	return skeleton;
};

const scriptsContainer = document.getElementById("scriptsContainer");
const API_URL = "https://backend-1-a2537223.deta.app";

const pendingPromise = new Promise(async (resolve, reject) => {
	try {
		const fetchedScriptNames = (await (await fetch(`${API_URL}/`)).json()).packageNames;
		const pkgNames = [];
		for (let pkgName of fetchedScriptNames) {
			const skeleton = getScriptSkeleton();
			scriptsContainer.appendChild(skeleton);

			const res = await (await fetch(`${API_URL}/pkg/${pkgName}`)).json();
			const pkgData = JSON.parse(atob(res.content.substring(0, res.content.length - 1)));

			const displayName = pkgData.displayName
				? pkgData.displayName
				: pkgName;
			const desc = pkgData.description
				? pkgData.description
				: "-- no description --";
			const tags = pkgData.tags ? pkgData.tags : [];

			if (displayName == pkgName) pkgNames.push(pkgName);
			else pkgNames.push(displayName);

			scriptsContainer.removeChild(skeleton)

			scriptsContainer.innerHTML += getScriptHTML(
				displayName,
				desc,
				pkgData.author.name,
				pkgData.version.minecraft,
				pkgData.version.pkg,
				tags
			);

		}
		resolve(pkgNames);
	} catch (e) { reject(`${e}`) }
	document.querySelector("footer").style.display = "block";
})

const pkgNames = await pendingPromise;
console.log(pkgNames)
const fzf = new Fzf(pkgNames, {casing: "case-insensitive"});
const scriptSearch = document.getElementById("scriptSearch");

scriptSearch.addEventListener("input", (e) => {
	const results = fzf.find(e.target.value);
	console.log(e.target.value, results);

	scriptsContainer.querySelectorAll(".script-container").forEach((script) => {
		if (results.some((obj) => obj.item == script.querySelector("h1").innerText)) {
			script.style.display = "block";
			script.style.opacity = 100;
		} else{
			script.style.opacity = 0
			setTimeout(() => {
				script.style.display = "none";
			}, 150);
		};
	});
});
