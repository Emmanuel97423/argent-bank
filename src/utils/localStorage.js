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

export const deleteState = (storageItem) => {
  try {
    localStorage.removeItem(storageItem);
  } catch {
    // ignore write errors
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('auth', serializedState);
  } catch {
    // ignore write errors
  }
};
