<script>
	import { parseFoodText } from '../utils/foodParser.js';
	import { saveCustomFood } from '../stores/customFoods.svelte.js';
	import { addEntry } from '../stores/entries.svelte.js';

	let { day } = $props();

	let text = $state('');
	let pending = $state([]);
	let nextId = 0;

	function tolk() {
		if (!text.trim()) return;
		const parsed = parseFoodText(text);
		pending = [
			...pending,
			...parsed.map((p) => ({
				localId: nextId++,
				name: p.name,
				quantityLabel: p.quantityLabel,
				grams: p.grams,
				calories: p.calories,
				protein: p.protein,
				carbs: p.carbs,
				fat: p.fat,
				matched: p.matched,
				rememberFood: !p.matched
			}))
		];
		text = '';
	}

	function leggTilManuelt() {
		pending = [
			...pending,
			{
				localId: nextId++,
				name: '',
				quantityLabel: '1 porsjon',
				grams: null,
				calories: 0,
				protein: 0,
				carbs: 0,
				fat: 0,
				matched: false,
				rememberFood: false
			}
		];
	}

	function fjern(localId) {
		pending = pending.filter((p) => p.localId !== localId);
	}

	function loggAlt() {
		for (const item of pending) {
			if (!item.name.trim()) continue;
			if (item.rememberFood && item.name.trim()) {
				const grams = item.grams ?? 100;
				const factor = 100 / grams;
				saveCustomFood(
					item.name,
					{
						kcal: round1(item.calories * factor),
						protein: round1(item.protein * factor),
						carbs: round1(item.carbs * factor),
						fat: round1(item.fat * factor)
					},
					null
				);
			}
			addEntry(day, {
				name: item.name.trim(),
				quantityLabel: item.quantityLabel,
				calories: Number(item.calories) || 0,
				protein: Number(item.protein) || 0,
				carbs: Number(item.carbs) || 0,
				fat: Number(item.fat) || 0
			});
		}
		pending = [];
	}

	function round1(n) {
		return Math.round(n * 10) / 10;
	}

	function onKeydown(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			tolk();
		}
	}
</script>

<div class="card">
	<h3>Hva spiste du?</h3>
	<p class="hint">
		F.eks. «2 egg og en skive brød» eller «150g kyllingfilet med ris». Skriv «og» eller komma
		mellom flere matvarer.
	</p>
	<div class="input-row">
		<input
			type="text"
			placeholder="Skriv hva du spiste..."
			bind:value={text}
			onkeydown={onKeydown}
		/>
		<button class="btn" onclick={tolk} disabled={!text.trim()}>Tolk</button>
	</div>
	<button class="btn-link" onclick={leggTilManuelt}>+ Legg til matvare manuelt</button>

	{#if pending.length > 0}
		<div class="pending-list">
			{#each pending as item (item.localId)}
				<div class="pending-item" class:unmatched={!item.matched}>
					<div class="pending-item-head">
						<input
							type="text"
							class="name-input"
							placeholder="Navn på matvare"
							bind:value={item.name}
						/>
						<button class="btn-icon" onclick={() => fjern(item.localId)} aria-label="Fjern">✕</button>
					</div>
					{#if !item.matched}
						<p class="warn">Fant ikke denne matvaren – fyll inn næringsinnhold selv.</p>
					{:else}
						<p class="quantity">{item.quantityLabel}</p>
					{/if}
					<div class="macro-inputs">
						<label>
							Kcal
							<input type="number" min="0" bind:value={item.calories} />
						</label>
						<label>
							Protein (g)
							<input type="number" min="0" step="0.1" bind:value={item.protein} />
						</label>
						<label>
							Karbo (g)
							<input type="number" min="0" step="0.1" bind:value={item.carbs} />
						</label>
						<label>
							Fett (g)
							<input type="number" min="0" step="0.1" bind:value={item.fat} />
						</label>
					</div>
					<label class="remember">
						<input type="checkbox" bind:checked={item.rememberFood} />
						Husk denne matvaren til neste gang
					</label>
				</div>
			{/each}
			<button class="btn log-btn" onclick={loggAlt}>Logg {pending.length} matvare(r)</button>
		</div>
	{/if}
</div>

<style>
	h3 {
		margin-bottom: 0.2rem;
	}
	.hint {
		font-size: 0.85rem;
		margin-bottom: 0.8rem;
	}
	.input-row {
		display: flex;
		gap: 0.5rem;
	}
	.input-row input {
		flex: 1;
	}
	.btn-link {
		background: none;
		border: none;
		color: var(--brand);
		font-weight: 600;
		font-size: 0.85rem;
		padding: 0.6rem 0;
	}
	.pending-list {
		margin-top: 0.8rem;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
	.pending-item {
		background: var(--surface-alt);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 0.7rem;
	}
	.pending-item.unmatched {
		border-color: var(--carbs);
	}
	.pending-item-head {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}
	.name-input {
		flex: 1;
		font-weight: 600;
		background: var(--surface);
	}
	.quantity {
		font-size: 0.8rem;
		margin: 0.3rem 0 0.5rem;
	}
	.warn {
		font-size: 0.8rem;
		color: var(--carbs);
		margin: 0.3rem 0 0.5rem;
	}
	.macro-inputs {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
	}
	.macro-inputs label {
		font-size: 0.75rem;
	}
	.remember {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.8rem;
		margin-top: 0.6rem;
		font-weight: 500;
	}
	.remember input {
		width: auto;
	}
	.log-btn {
		width: 100%;
	}
</style>
