<section id="pkgBrowser" class="hidden">
	<header>
		<div class="bg-primary grid grid-cols-2 items-center m-3 p-2 justify-center rounded-md">
			<span class="text-3xl inline">
				<a class="font-bold lg:mr-3" href="/">JSPM</a><span class="hidden lg:inline border-l-2 pl-3"
					>JsScripts Package Manager</span
				>
			</span>
			<div class="flex flex-row">
				<input
					type="text"
					placeholder="Search by name or tags..."
					id="pkgSearch"
					class="bg-secondary p-2 rounded-l-lg w-full outline-1"
				/>
				<button class="bg-tertiary rounded-r-lg px-2">
					<img src="./media/search.svg" alt="" class="w-5" />
				</button>
			</div>
		</div>
	</header>
	<main>
		<div class="flex flex-col w-full h-full p-5 gap-8" id="pkgContainer" />
	</main>
</section>
<section id="pkgPage" class="hidden">
	<header>
		<div class="bg-primary grid grid-cols-2 items-center m-3 p-2 justify-center rounded-md">
			<span class="text-3xl inline">
				<a class="font-bold lg:mr-3" href="/">JSPM</a><span class="hidden lg:inline border-l-2 pl-3"
					>JsScripts Package Manager</span
				>
			</span>
			<div class="ml-auto">
				<a href="/">
					<img src="./media/back.svg" alt="" class="w-11 p-3 bg-secondary rounded-lg" />
				</a>
			</div>
		</div>
	</header>
</section>
