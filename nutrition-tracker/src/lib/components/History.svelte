<script>
	import { goals } from '../stores/goals.svelte.js';
	import { daysWithEntries, totalsForDay } from '../stores/entries.svelte.js';
	import { formatDayLabel, dateKey } from '../utils/date.js';

	let today = dateKey();
	let days = $derived(daysWithEntries().filter((d) => d !== today));
</script>

<div class="card">
	<h2>Historikk</h2>
	{#if days.length === 0}
		<p class="muted">Ingen tidligere dager logget ennå.</p>
	{:else}
		<ul class="days">
			{#each days as day (day)}
				{@const totals = totalsForDay(day)}
				<li>
					<div class="day-head">
						<span class="day-label">{formatDayLabel(day)}</span>
						<span class="muted">{Math.round(totals.calories)} / {goals.calories} kcal</span>
					</div>
					<div class="macro-row muted">
						P {Math.round(totals.protein)}g · K {Math.round(totals.carbs)}g · F {Math.round(
							totals.fat
						)}g
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.muted {
		color: var(--text-muted);
		font-size: 0.85rem;
	}
	.days {
		list-style: none;
		margin: 0.5rem 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
	.days li {
		border-bottom: 1px solid var(--border);
		padding-bottom: 0.7rem;
	}
	.days li:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}
	.day-head {
		display: flex;
		justify-content: space-between;
		font-weight: 600;
		margin-bottom: 0.2rem;
	}
	.day-head .muted {
		font-weight: 500;
	}
</style>
