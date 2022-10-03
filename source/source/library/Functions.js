
(() => {

   noOP = () => {};

   Void = (resolve) => {
      const ⵃ = () => resolve(ⵃ);
      ⵃ();
   };

   Timeout = (delay,resolve) =>
      setTimeout(resolve ?? delay,resolve ? delay : 0);

})();
