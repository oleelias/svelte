/**
 * Small built-in database of common foods, values per 100 g (or 100 ml).
 * unitGrams is what "1 stk" / "1 skive" / "1 glass" etc. roughly weighs,
 * used when the user gives a count instead of a weight.
 */
export const foodDatabase = [
	{ names: ['egg'], per100g: { kcal: 155, protein: 13, carbs: 1.1, fat: 11 }, unitGrams: 55 },
	{ names: ['banan'], per100g: { kcal: 89, protein: 1.1, carbs: 23, fat: 0.3 }, unitGrams: 120 },
	{ names: ['eple'], per100g: { kcal: 52, protein: 0.3, carbs: 14, fat: 0.2 }, unitGrams: 180 },
	{
		names: ['ris', 'kokt ris', 'ris kokt'],
		per100g: { kcal: 130, protein: 2.7, carbs: 28, fat: 0.3 },
		unitGrams: null
	},
	{
		names: ['havregryn', 'havre'],
		per100g: { kcal: 389, protein: 17, carbs: 66, fat: 7 },
		unitGrams: null
	},
	{
		names: ['kyllingfilet', 'kylling', 'kyllingbryst'],
		per100g: { kcal: 165, protein: 31, carbs: 0, fat: 3.6 },
		unitGrams: null
	},
	{ names: ['laks'], per100g: { kcal: 208, protein: 20, carbs: 0, fat: 13 }, unitGrams: null },
	{
		names: ['brød', 'loff', 'brødskive'],
		per100g: { kcal: 265, protein: 9, carbs: 49, fat: 3.2 },
		unitGrams: 30
	},
	{
		names: ['lettmelk', 'melk', 'skummet melk'],
		per100g: { kcal: 42, protein: 3.4, carbs: 4.8, fat: 1 },
		unitGrams: 200
	},
	{
		names: ['yoghurt', 'yoghurt naturell', 'skyr'],
		per100g: { kcal: 65, protein: 8, carbs: 4, fat: 0.5 },
		unitGrams: null
	},
	{ names: ['potet'], per100g: { kcal: 87, protein: 1.9, carbs: 20, fat: 0.1 }, unitGrams: 150 },
	{
		names: ['pasta', 'kokt pasta'],
		per100g: { kcal: 131, protein: 5, carbs: 25, fat: 1.1 },
		unitGrams: null
	},
	{ names: ['avokado'], per100g: { kcal: 160, protein: 2, carbs: 9, fat: 15 }, unitGrams: 200 },
	{
		names: ['peanøttsmør'],
		per100g: { kcal: 588, protein: 25, carbs: 20, fat: 50 },
		unitGrams: null
	},
	{
		names: ['norvegia', 'ost', 'gulost'],
		per100g: { kcal: 356, protein: 27, carbs: 0, fat: 28 },
		unitGrams: null
	},
	{ names: ['kesam'], per100g: { kcal: 98, protein: 12, carbs: 4, fat: 3.5 }, unitGrams: null },
	{
		names: ['whey', 'proteinpulver', 'protein pulver', 'protein shake'],
		per100g: { kcal: 400, protein: 80, carbs: 10, fat: 5 },
		unitGrams: 30
	},
	{
		names: ['knekkebrød'],
		per100g: { kcal: 380, protein: 10, carbs: 65, fat: 6 },
		unitGrams: 10
	},
	{ names: ['tomat'], per100g: { kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2 }, unitGrams: 120 },
	{
		names: ['agurk'],
		per100g: { kcal: 15, protein: 0.7, carbs: 3.6, fat: 0.1 },
		unitGrams: 300
	},
	{
		names: ['ris kaker', 'riskake', 'riskaker'],
		per100g: { kcal: 387, protein: 8, carbs: 81, fat: 2.8 },
		unitGrams: 9
	}
];

const UNIT_TO_GRAMS = {
	g: 1,
	gram: 1,
	gr: 1,
	kg: 1000,
	ml: 1,
	l: 1000,
	dl: 100,
	ss: 15,
	spiseskje: 15,
	ts: 5,
	teskje: 5
};

const COUNT_UNITS = ['stk', 'skive', 'skiver', 'glass', 'scoop', 'måleskje', 'porsjon', 'porsjoner'];

export function unitGramsFor(unit, food) {
	if (!unit) return food?.unitGrams ?? 100;
	if (unit in UNIT_TO_GRAMS) return UNIT_TO_GRAMS[unit];
	if (COUNT_UNITS.includes(unit)) return food?.unitGrams ?? 100;
	return food?.unitGrams ?? 100;
}

export function findBuiltInFood(name) {
	const needle = name.trim().toLowerCase();
	if (!needle) return null;
	let match = foodDatabase.find((f) => f.names.includes(needle));
	if (match) return match;
	match = foodDatabase.find((f) => f.names.some((n) => needle.includes(n) || n.includes(needle)));
	return match ?? null;
}
