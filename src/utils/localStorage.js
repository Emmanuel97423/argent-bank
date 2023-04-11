/**
 * Loads the specified state item from local storage and returns its value.
 * @param {string} stateItem - The name of the state item to load.
 * @returns {Object|undefined} The loaded state item, or undefined if it doesn't exist.
 */
export const loadState = (stateItem) => {
  try {
    const serializedState = localStorage.getItem(stateItem);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

/**
 * Deletes the specified storage item from local storage.
 * @param {string} storageItem - The name of the storage item to delete.
 */
export const deleteState = (storageItem) => {
  try {
    localStorage.removeItem(storageItem);
  } catch {
    // ignore write errors
  }
};

/**
 * Saves the specified state object to local storage.
 * @param {Object} state - The state object to save.
 */
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('auth', serializedState);
  } catch {
    // ignore write errors
  }
};
