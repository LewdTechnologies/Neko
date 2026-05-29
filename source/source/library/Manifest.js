
(() => {

   const { runtime } = chrome

   window.Manifest ??= {}

   const manifest = runtime.getManifest()

   Manifest.uuid = () =>
      runtime.id

   Manifest.version = () =>
      manifest.version

   Manifest.versionName = () =>
      manifest.versionName

})();
