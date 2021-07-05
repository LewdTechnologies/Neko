/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   find = (parent,type,method) =>
      ((type && parent) ?? document)[method](type ?? parent);

   findClasses = (parent,className) =>
      [...find(parent,className,'getElementsByClassName')];

   findTags = (parent,tagName) =>
      [...find(parent,tagName,'getElementsByTagName')];

   findClass = (parent,className) =>
      findClasses(parent,className)?.[0];

   findTag = (parent,tagName) =>
      findTags(parent,tagName)?.[0];

   findId = (document,id) =>
      find(document,id,'getElementById');

   select = (document,selector) =>
      find(document,selector,'querySelector');

   selectAll = (document,selector) =>
      [...find(document,selector,'querySelectorAll')];

})();
