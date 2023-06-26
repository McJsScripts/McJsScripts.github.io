import "./index.css";

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

// Fetch all scripts from '/' (GET) packageNames[]
fetch(`${API_URL}/`).then((res) => {
	res.json().then((data) => {
		const scriptNames = data.packageNames;
		scriptNames.forEach((scriptName) => {
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
