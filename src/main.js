import "./index.css";
import "@fontsource-variable/inter";
import { Fzf } from "fzf";

const getScriptHTML = (name, desc, owner, mcver, scrver, tags) => {
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
					<img src="/media/code.svg" alt="" /> ${scrver}
				</div>
				<p>
					${desc}
				</p>
				<div class="tags">
					${tagHTML}
				</div>
				<div class="mobileinfo">
					<div class="tags">
					${tagHTML}
					</div>
					<div class="stats">
						<img src="/media/user.svg" alt="" /> sbot50
						<img src="/media/cube.svg" alt="" /> 1.20
						<img src="/media/code.svg" alt="" /> v1.0
					</div>
				</div>
			</div>
`;
};

const scriptsContainer = document.getElementById("scriptsContainer");
const API_URL = "https://backend-1-a2537223.deta.app";

let scriptNames = [];

// Fetch all scripts from '/' (GET) packageNames[]
fetch(`${API_URL}/`).then((res) => {
	res.json().then((data) => {
		const fetchedScriptNames = data.packageNames;
		fetchedScriptNames.forEach((scriptName) => {
			fetch(`${API_URL}/pkg/${scriptName}`).then((res) => {
				res.json().then((data) => {
					const scriptData = JSON.parse(
						atob(data.content.substring(0, data.content.length - 1))
					);

					const scriptDisplayName = scriptData.displayName
						? scriptData.displayName
						: scriptName;
					const scriptDesc = scriptData.description
						? scriptData.description
						: "";
					const scriptTags = scriptData.tags ? scriptData.tags : [];

					if (scriptDisplayName == scriptName) {
						scriptNames.push(scriptName);
					} else {
						scriptNames.push(scriptDisplayName);
					}

					scriptsContainer.innerHTML += getScriptHTML(
						scriptDisplayName,
						scriptDesc,
						scriptData.author.name,
						scriptData.version.minecraft,
						scriptData.version.pkg,
						scriptTags
					);
				});
			});
		});
	});
});

const fzf = new Fzf(scriptNames);
const scriptSearch = document.getElementById("scriptSearch");

scriptSearch.addEventListener("input", (e) => {
	const results = fzf.find(e.target.value);
	console.log(e.target.value);
	console.log(results);

	scriptsContainer.querySelectorAll(".script-container").forEach((script) => {
		if (
			results.some(
				(obj) => obj.item == script.querySelector("h1").innerText
			)
		) {
			script.style.display = null;
		} else {
			script.style.display = "none";
		}
	});
});
