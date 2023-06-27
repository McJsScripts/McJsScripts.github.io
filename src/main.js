import "./index.css";
import "@fontsource-variable/inter";
import { Fzf } from "fzf";
const API_URL = "https://backend-1-a2537223.deta.app";

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
if (urlParams.has("pkg")) {
	const pkg = urlParams.get("pkg");
	const pkgPage = document.querySelector("section#pkgPage");
	pkgPage.classList.remove("hidden");
} else {
	const pkgBrowser = document.querySelector("section#pkgBrowser");
	pkgBrowser.classList.remove("hidden");
	initPackageSearch();
}

async function initPackageSearch() {
	const getScriptHTML = (pkgname, name, desc, owner, mcver, pkgver, tags) => {
		let tagsElement = document.createElement("div");
		if (tags.length) tags.array.forEach((tag) => tagHTM.appendChild(document.createElement("span").textContent = tag));

		const htmlTemplate = `
			<div class="pkg-container">
				<a href="?pkg=${encodeURIComponent(pkgname)}"><h1></h1></a>
				<div class="stats">
					<img src="/media/user.svg" alt="" /> <span id="owner"></span>
					<img src="/media/cube.svg" alt="" /> <span id="mcver"></span>
					<img src="/media/code.svg" alt="" /> <span id="pkgver"></span>
				</div>
				<p id="desc"></p>
				<div class="tags">${tagsElement.innerHTML}</div>
			</div>
			`;

		let packageContainer = document.createElement("div");
		packageContainer.innerHTML = htmlTemplate;

		packageContainer.querySelector("h1").textContent = name;
		packageContainer.querySelector("#owner").textContent = owner;
		packageContainer.querySelector("#mcver").textContent = mcver;
		packageContainer.querySelector("#pkgver").textContent = pkgver;
		packageContainer.querySelector("#desc").textContent = desc;

		return packageContainer;
	}
	const getPkgSkeleton = () => {
		const skeleton = document.createElement("div");
		skeleton.classList.add("pkg-container", "animate-pulse", "skeleton");
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
		for (let i = 0; i < count; i++) pkgContainer.appendChild(getPkgSkeleton());
		document.querySelector("footer").style.display = null;
	}

	const pkgContainer = document.getElementById("pkgContainer");
	const fetchedPkgNames = (await (await fetch(`${API_URL}/`)).json()).packageNames;
	genSkeletons(fetchedPkgNames.length);
	const searchQueries = [];
	const promises = fetchedPkgNames.map(async n => ({pkgName: n, res: await fetch(`${API_URL}/pkg/${n}`)}));
	await Promise.all((await Promise.all(promises)).map(async ({pkgName, res}) => {
		const data = await res.json();
		const pkgData = JSON.parse(atob(data.content.substring(0, data.content.length - 1)));
		const skeleton = pkgContainer.querySelector("div.skeleton");
		pkgContainer.removeChild(skeleton);

		const displayName = pkgData.displayName ? pkgData.displayName : pkgName;
		const desc = pkgData.description ? pkgData.description : "-- no description --";
		const tags = pkgData.tags ? pkgData.tags : [];

		if (displayName != pkgName) searchQueries.push(displayName);
		searchQueries.push(pkgName);
		searchQueries.push(desc);
		searchQueries.push(pkgData.author.name);
		searchQueries.push(pkgData.version.minecraft);
		searchQueries.push(...tags);

		pkgContainer.appendChild(getScriptHTML(
			pkgName,
			displayName,
			desc,
			pkgData.author.name,
			pkgData.version.minecraft,
			pkgData.version.pkg,
			tags
		));
	}));

	const fzf = new Fzf(searchQueries, {casing: "case-insensitive"});
	const scriptSearch = document.getElementById("pkgSearch");

	scriptSearch.addEventListener("input", (e) => {
		const results = fzf.find(e.target.value);
		pkgContainer.querySelectorAll(".pkg-container").forEach((pkg) => {
			if (results.some((obj) => pkg.innerHTML.includes(obj.item))) {
				pkg.style.display = "grid";
				pkg.style.opacity = 100;
			} else {
				pkg.style.opacity = 0
				setTimeout(() => pkg.style.display = "none", 150);
			};
		});
	});
}
