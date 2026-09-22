<script>
	import { goals } from '../stores/goals.svelte.js';
	import { entriesByDay, totalsForDay, removeEntry } from '../stores/entries.svelte.js';
	import { dateKey, formatTime } from '../utils/date.js';
	import MacroBar from './MacroBar.svelte';
	import QuickAdd from './QuickAdd.svelte';

	let today = dateKey();
	let totals = $derived(totalsForDay(today));
	let entries = $derived([...(entriesByDay[today] ?? [])].reverse());
	let kcalLeft = $derived(Math.round(goals.calories - totals.calories));
</script>

<div class="stack">
	<div class="card summary">
		<div class="kcal-row">
			<div>
				<h2>{Math.round(totals.calories)} kcal</h2>
				<p class="muted">
					av {goals.calories} kcal i dag
					{#if kcalLeft >= 0}
						· {kcalLeft} igjen
					{:else}
						· {Math.abs(kcalLeft)} over
					{/if}
				</p>
			</div>
			<div class="ring" style="--pct: {goals.calories > 0 ? Math.min(100, (totals.calories / goals.calories) * 100) : 0}">
				<span>{goals.calories > 0 ? Math.round((totals.calories / goals.calories) * 100) : 0}%</span>
			</div>
		</div>
		<MacroBar label="Protein" value={totals.protein} goal={goals.protein} color="var(--protein)" />
		<MacroBar label="Karbohydrater" value={totals.carbs} goal={goals.carbs} color="var(--carbs)" />
		<MacroBar label="Fett" value={totals.fat} goal={goals.fat} color="var(--fat)" />
	</div>

	<QuickAdd day={today} />

	<div class="card">
		<h3>Dagens logg</h3>
		{#if entries.length === 0}
			<p class="muted">Ingenting logget ennå i dag.</p>
		{:else}
			<ul class="entries">
				{#each entries as e (e.id)}
					<li>
						<div class="entry-main">
							<span class="entry-name">{e.name}</span>
							<span class="entry-meta muted">{e.quantityLabel} · {formatTime(e.time)}</span>
						</div>
						<div class="entry-macros muted">
							{Math.round(e.calories)} kcal · P{Math.round(e.protein)} K{Math.round(e.carbs)} F{Math.round(
								e.fat
							)}
						</div>
						<button class="btn-icon" onclick={() => removeEntry(today, e.id)} aria-label="Slett">✕</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.kcal-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}
	.summary h2 {
		font-size: 1.7rem;
	}
	.muted {
		color: var(--text-muted);
		font-size: 0.85rem;
		margin: 0;
	}
	.ring {
		--size: 64px;
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.85rem;
		background: conic-gradient(var(--brand) calc(var(--pct) * 1%), var(--surface-alt) 0);
		flex-shrink: 0;
	}
	.ring span {
		background: var(--surface);
		width: calc(var(--size) - 12px);
		height: calc(var(--size) - 12px);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.entries {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.entries li {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: start;
		border-bottom: 1px solid var(--border);
		padding-bottom: 0.6rem;
	}
	.entries li:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}
	.entry-main {
		display: flex;
		flex-direction: column;
	}
	.entry-name {
		font-weight: 600;
	}
	.entry-meta {
		font-size: 0.78rem;
	}
	.entry-macros {
		grid-column: 1;
		font-size: 0.78rem;
	}
	.entries li .btn-icon {
		grid-row: 1 / 3;
		grid-column: 2;
	}
</style>
