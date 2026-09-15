import { loadJSON, saveJSON } from '../utils/storage.js';

const STORAGE_KEY = 'nutrilogg:customFoods';

/** @type {Record<string, {per100g: {kcal:number,protein:number,carbs:number,fat:number}, unitGrams: number|null}>} */
export const customFoods = $state(loadJSON(STORAGE_KEY, {}));

function persist() {
	saveJSON(STORAGE_KEY, customFoods);
}

export function findCustomFood(name) {
	return customFoods[name.trim().toLowerCase()] ?? null;
}

export function saveCustomFood(name, per100g, unitGrams = null) {
	const key = name.trim().toLowerCase();
	if (!key) return;
	customFoods[key] = { per100g, unitGrams };
	persist();
}

export function removeCustomFood(name) {
	delete customFoods[name.trim().toLowerCase()];
	persist();
}
