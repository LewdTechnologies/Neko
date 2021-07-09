/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.Manifest ??= {};


   const manifest = chrome.runtime.getManifest();


   Manifest.version = () =>
      manifest.version;

   Manifest.versionName = () =>
      manifest.versionName;

})();
