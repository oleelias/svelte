import { loadJSON, saveJSON } from '../utils/storage.js';

const STORAGE_KEY = 'nutrilogg:goals';

const defaults = { calories: 2200, protein: 150, carbs: 250, fat: 70 };

export const goals = $state(loadJSON(STORAGE_KEY, defaults));

export function saveGoals() {
	saveJSON(STORAGE_KEY, goals);
}

export function updateGoal(key, value) {
	const num = Number(value);
	goals[key] = Number.isFinite(num) && num >= 0 ? num : 0;
	saveGoals();
}
