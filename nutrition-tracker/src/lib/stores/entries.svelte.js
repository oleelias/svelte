import { loadJSON, saveJSON } from '../utils/storage.js';

const STORAGE_KEY = 'nutrilogg:entries';

/** @type {Record<string, Array<{id:string, time:string, name:string, quantityLabel:string, calories:number, protein:number, carbs:number, fat:number}>>} */
export const entriesByDay = $state(loadJSON(STORAGE_KEY, {}));

function persist() {
	saveJSON(STORAGE_KEY, entriesByDay);
}

export function addEntry(day, entry) {
	if (!entriesByDay[day]) entriesByDay[day] = [];
	entriesByDay[day].push({
		id: crypto.randomUUID(),
		time: new Date().toISOString(),
		...entry
	});
	persist();
}

export function removeEntry(day, id) {
	if (!entriesByDay[day]) return;
	entriesByDay[day] = entriesByDay[day].filter((e) => e.id !== id);
	persist();
}

export function totalsForDay(day) {
	const list = entriesByDay[day] ?? [];
	return list.reduce(
		(acc, e) => {
			acc.calories += e.calories;
			acc.protein += e.protein;
			acc.carbs += e.carbs;
			acc.fat += e.fat;
			return acc;
		},
		{ calories: 0, protein: 0, carbs: 0, fat: 0 }
	);
}

export function daysWithEntries() {
	return Object.keys(entriesByDay)
		.filter((day) => entriesByDay[day]?.length)
		.sort((a, b) => (a < b ? 1 : -1));
}
