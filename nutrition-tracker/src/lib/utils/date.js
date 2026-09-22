/** Local (not UTC) date key, so entries land on the right day for the user's timezone. */
export function dateKey(d = new Date()) {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${y}-${m}-${day}`;
}

export function nowHHMM(d = new Date()) {
	return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function formatTime(isoString) {
	const d = new Date(isoString);
	return nowHHMM(d);
}

const WEEKDAYS = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];

export function formatDayLabel(key) {
	const todayKeyValue = dateKey();
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	if (key === todayKeyValue) return 'I dag';
	if (key === dateKey(yesterday)) return 'I går';
	const [y, m, d] = key.split('-').map(Number);
	const date = new Date(y, m - 1, d);
	return `${WEEKDAYS[date.getDay()]} ${d}.${m}`;
}
