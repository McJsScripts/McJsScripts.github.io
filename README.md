# JSPMFrontend
JSPMFrontend - aka JsScripts Browser, uses the [JSPM API](https://github.com/McJsScripts/JSPMBackend) that accesses the [JSPM Registry](https://github.com/McJsScripts/JSPMRegistry) to fetch scripts and their data and dispaly them.

## Will/does include:
* Search for scripts by their names and tags
* Filter by tag and mc version
* Preview a script by clicking on it and viewing there its dependencies

This website uses TailwindCSS, check (src/styles.css)[/src/styles.css]
The output is on `dist/output.css`, when changing css you should never touch `output.css`, only `styles.css` and html classes
