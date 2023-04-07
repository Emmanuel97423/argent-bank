export const saveStateToSessionStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('auth', serializedState);
  } catch {
    // ignore write errors
  }
};

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

export const deleteStateToSessionStorage = (storageItem) => {
  try {
    sessionStorage.removeItem(storageItem);
  } catch {
    // ignore write errors
  }
};
