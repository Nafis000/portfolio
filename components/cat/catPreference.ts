// The visitor's "hide the cat" choice: remembered per browser, shared between the cat and its toggle.
const KEY = "cat-hidden";
const listeners = new Set<() => void>();

function read() {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false; // storage blocked: just show the cat
  }
}

export const catHidden = {
  get: read,
  set(hidden: boolean) {
    try {
      localStorage.setItem(KEY, hidden ? "1" : "0");
    } catch {}
    listeners.forEach((l) => l());
  },
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
};
