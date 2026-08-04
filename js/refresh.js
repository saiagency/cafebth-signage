/**
 * Signage auto-refresh — clock-aligned every 30 minutes
 * Triggers at :00 and :30
 */
(() => {
  "use strict";

  const SLOT_MS = 30 * 60 * 1000;

  const msUntilNextSlot = () => {
    const now = new Date();
    const msIntoHour =
      ((now.getMinutes() * 60) + now.getSeconds()) * 1000 + now.getMilliseconds();
    const elapsedInSlot = msIntoHour % SLOT_MS;

    // Already exactly on a slot (e.g. right after reload) → wait for the next one
    if (elapsedInSlot === 0) return SLOT_MS;
    return SLOT_MS - elapsedInSlot;
  };

  window.setTimeout(() => {
    window.location.reload();
  }, msUntilNextSlot());
})();
