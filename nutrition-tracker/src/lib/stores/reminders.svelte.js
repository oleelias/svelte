import { loadJSON, saveJSON } from '../utils/storage.js';

const STORAGE_KEY = 'nutrilogg:reminders';

const defaults = [
	{ id: crypto.randomUUID(), label: 'Kreatin', time: '08:00', enabled: true, lastFiredDay: null },
	{
		id: crypto.randomUUID(),
		label: 'Multivitamin',
		time: '08:00',
		enabled: true,
		lastFiredDay: null
	}
];

export const reminders = $state(loadJSON(STORAGE_KEY, defaults));

function persist() {
	saveJSON(STORAGE_KEY, reminders);
}

export function addReminder(label, time) {
	reminders.push({
		id: crypto.randomUUID(),
		label,
		time,
		enabled: true,
		lastFiredDay: null
	});
	persist();
}

export function removeReminder(id) {
	const idx = reminders.findIndex((r) => r.id === id);
	if (idx !== -1) reminders.splice(idx, 1);
	persist();
}

export function toggleReminder(id) {
	const reminder = reminders.find((r) => r.id === id);
	if (reminder) {
		reminder.enabled = !reminder.enabled;
		persist();
	}
}

export function updateReminderTime(id, time) {
	const reminder = reminders.find((r) => r.id === id);
	if (reminder) {
		reminder.time = time;
		persist();
	}
}

export function markFired(id, day) {
	const reminder = reminders.find((r) => r.id === id);
	if (reminder) {
		reminder.lastFiredDay = day;
		persist();
	}
}
