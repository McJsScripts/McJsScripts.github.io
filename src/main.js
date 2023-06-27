import "./index.css";
import "@fontsource-variable/inter";
import { Fzf } from "fzf";

const getScriptHTML = (pkgname, name, desc, owner, mcver, pkgver, tags) => {
	let tagHTML = "";
	if (tags.length) tags.array.forEach((tag) => tagHTML += `<span>${tag}</span>`);

	return `
			<div class="script-container">
				<a href="/pkg?name=${pkgname}"><h1>${name}</h1></a>
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

const getPkgSkeleton = () => {
	const skeleton = document.createElement("div");
	skeleton.classList.add("script-container", "animate-pulse", "skeleton");
	skeleton.innerHTML = `
			<h1><div class="w-1/6 h-4 rounded-lg bg-white"></div></h1>
			<div class="stats">
				<div class="w-1/5 ml-2 mt-2 h-3 rounded-lg bg-white opacity-25"></div>
			</div>
			<div class="w-1/3 ml-2 mt-2 h-3 rounded-lg bg-white opacity-50"></div>
		`;
	return skeleton;
};
// sans. (laugh (hilarious))
const genSkeletons = (count) => {
	for (let i = 0; i < count; i++) packagesContainer.appendChild(getPkgSkeleton());
}

const packagesContainer = document.getElementById("scriptsContainer");
const API_URL = "https://backend-1-a2537223.deta.app";

const fetchedPkgNames = (await (await fetch(`${API_URL}/`)).json()).packageNames;
genSkeletons(fetchedPkgNames.length);
const pkgNames = [];
const promises = fetchedPkgNames.map(async n => ({pkgName: n, res: await fetch(`${API_URL}/pkg/${n}`)}));
(await Promise.all(promises)).forEach(async ({pkgName, res}) => {
	const data = await res.json();
	const pkgData = JSON.parse(atob(data.content.substring(0, data.content.length - 1)));
	const skeleton = packagesContainer.querySelector("div.skeleton");
	packagesContainer.removeChild(skeleton);

	const displayName = pkgData.displayName ? pkgData.displayName : pkgName;
	const desc = pkgData.description ? pkgData.description : "-- no description --";
	const tags = pkgData.tags ? pkgData.tags : [];

	if (displayName == pkgName) pkgNames.push(pkgName);
	else pkgNames.push(displayName);

	packagesContainer.innerHTML += getScriptHTML(
		pkgName,
		displayName,
		desc,
		pkgData.author.name,
		pkgData.version.minecraft,
		pkgData.version.pkg,
		tags
	);
});
document.querySelector("footer").style.display = "block";

new Promise(async (resolve, reject) => {
	try {
		const pkgNames = [];
		for (let pkgName of fetchedPkgNames) {

			const res = await (await fetch(`${API_URL}/pkg/${pkgName}`)).json();

		}
		resolve(pkgNames);
	} catch (e) { reject(`${e}`) }
})

const fzf = new Fzf(pkgNames, {casing: "case-insensitive"});
const scriptSearch = document.getElementById("scriptSearch");

scriptSearch.addEventListener("input", (e) => {
	const results = fzf.find(e.target.value);
	console.log(e.target.value, results);

	packagesContainer.querySelectorAll(".script-container").forEach((script) => {
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
