/**
 * Saves the specified state object to session storage.
 * @param {Object} state - The state object to save.
 */
export const saveStateToSessionStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('auth', serializedState);
  } catch {
    // ignore write errors
  }
};

/**
 * Loads the specified state item from session storage and returns its value.
 * @param {string} stateItem - The name of the state item to load.
 * @returns {Object|undefined} The loaded state item, or undefined if it doesn't exist.
 */
export const loadStateToSessionStorage = (stateItem) => {
  try {
    const serializedState = sessionStorage.getItem(stateItem);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

/**
 * Deletes the specified storage item from session storage.
 * @param {string} storageItem - The name of the storage item to delete.
 */
export const deleteStateToSessionStorage = (storageItem) => {
  try {
    sessionStorage.removeItem(storageItem);
  } catch {
    // ignore write errors
  }
};
