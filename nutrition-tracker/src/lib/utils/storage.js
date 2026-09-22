export function loadJSON(key, fallback) {
	try {
		const raw = localStorage.getItem(key);
		if (raw === null) return fallback;
		return JSON.parse(raw);
	} catch {
		return fallback;
	}
}

export function saveJSON(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// storage full or unavailable (private mode etc.) - fail silently, data just won't persist
	}
}
