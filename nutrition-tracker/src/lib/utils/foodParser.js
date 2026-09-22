import { findBuiltInFood, unitGramsFor } from './foodDatabase.js';
import { findCustomFood } from '../stores/customFoods.svelte.js';

const NUMBER_WORDS = {
	en: 1,
	ett: 1,
	et: 1,
	to: 2,
	tre: 3,
	fire: 4,
	fem: 5,
	seks: 6,
	sju: 7,
	syv: 7,
	åtte: 8,
	ni: 9,
	ti: 10
};

const UNIT_TOKENS =
	'kg|gram|g|gr|ml|dl|l|ss|spiseskje|ts|teskje|stk|skiver|skive|glass|scoop|måleskje|porsjoner|porsjon';

const NUMBER_TOKEN = '\\d+(?:[.,]\\d+)?|' + Object.keys(NUMBER_WORDS).join('|');

const LEADING_QUANTITY = new RegExp(`^(${NUMBER_TOKEN})\\s+`, 'i');
const LEADING_UNIT = new RegExp(`^(${UNIT_TOKENS})\\.?\\s+`, 'i');

function parseQuantityToken(token) {
	const lower = token.toLowerCase();
	if (lower in NUMBER_WORDS) return NUMBER_WORDS[lower];
	return parseFloat(lower.replace(',', '.'));
}

/**
 * Splits free text like "2 egg og en skive brød med peanøttsmør" into segments
 * and resolves each against the food database (built-in + user-saved).
 * Segments that don't match a known food come back with matched: false so the
 * UI can ask the user for the macros.
 */
export function parseFoodText(text) {
	return text
		.split(/,| og |\+/i)
		.map((s) => s.trim())
		.filter(Boolean)
		.map(parseSegment);
}

function parseSegment(rawSegment) {
	let segment = rawSegment.toLowerCase().trim();
	let qty = 1;

	const qtyMatch = segment.match(LEADING_QUANTITY);
	if (qtyMatch) {
		qty = parseQuantityToken(qtyMatch[1]);
		segment = segment.slice(qtyMatch[0].length).trim();
	}

	let unit = null;
	const unitMatch = segment.match(LEADING_UNIT);
	if (unitMatch) {
		unit = unitMatch[1].toLowerCase();
		segment = segment.slice(unitMatch[0].length).trim();
	}

	segment = segment.replace(/^(med|av)\s+/, '');
	const name = segment || rawSegment.trim();

	const custom = findCustomFood(name);
	const builtIn = custom ? null : findBuiltInFood(name);
	const food = custom ?? builtIn;

	if (!food || !Number.isFinite(qty)) {
		return {
			matched: false,
			name: capitalize(name),
			raw: rawSegment.trim(),
			quantityLabel: unit ? `${qty} ${unit}` : `${qty} stk`,
			grams: null,
			calories: 0,
			protein: 0,
			carbs: 0,
			fat: 0
		};
	}

	const grams = qty * unitGramsFor(unit, food);
	const factor = grams / 100;

	return {
		matched: true,
		name: capitalize(name),
		raw: rawSegment.trim(),
		quantityLabel: unit ? `${formatQty(qty)} ${unit}` : `${formatQty(qty)} stk (${Math.round(grams)} g)`,
		grams,
		calories: round1(food.per100g.kcal * factor),
		protein: round1(food.per100g.protein * factor),
		carbs: round1(food.per100g.carbs * factor),
		fat: round1(food.per100g.fat * factor)
	};
}

function formatQty(qty) {
	return Number.isInteger(qty) ? String(qty) : qty.toFixed(1);
}

function round1(n) {
	return Math.round(n * 10) / 10;
}

function capitalize(s) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}
