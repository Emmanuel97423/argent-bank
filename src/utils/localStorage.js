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

export const saveState = (state, storageItem, payload) => {
  if (state.status !== 200) {
    return;
  }
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(storageItem, serializedState);
  } catch {
    // ignore write errors
  }
};

export const saveToken = (state, storageItem, payload) => {
  const token = payload;
  // if (payload.status !== 200) {
  //   return;
  // }
  try {
    const serializedState = JSON.stringify(token);
    localStorage.setItem(storageItem, serializedState);
  } catch {
    // ignore write errors
  }
};

export const saveUserState = (state, storageItem, payload) => {
  // const user = payload.body.token;
  // if (payload.status !== 200) {
  //   return;
  // }
  try {
    const serializedState = JSON.stringify(payload);
    localStorage.setItem(storageItem, serializedState);
  } catch {
    // ignore write errors
  }
};
