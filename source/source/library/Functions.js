/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   noOP = () => {};

   Void = (resolve) => {
      const ⵃ = () => resolve(ⵃ);
      ⵃ();
   };

   Timeout = (delay,resolve) =>
      setTimeout(resolve ?? delay,resolve ? delay : 0);

})();
