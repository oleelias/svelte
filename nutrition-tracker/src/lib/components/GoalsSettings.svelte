<script>
	import { goals, updateGoal } from '../stores/goals.svelte.js';
</script>

<div class="card">
	<h2>Daglige mål</h2>
	<p class="muted">Juster målene dine når som helst. Endringer lagres automatisk.</p>

	<div class="field">
		<label for="kcal">Kalorier (kcal)</label>
		<input
			id="kcal"
			type="number"
			min="0"
			value={goals.calories}
			oninput={(e) => updateGoal('calories', e.target.value)}
		/>
	</div>

	<div class="field">
		<label for="protein">Protein (g)</label>
		<input
			id="protein"
			type="number"
			min="0"
			value={goals.protein}
			oninput={(e) => updateGoal('protein', e.target.value)}
		/>
	</div>

	<div class="field">
		<label for="carbs">Karbohydrater (g)</label>
		<input
			id="carbs"
			type="number"
			min="0"
			value={goals.carbs}
			oninput={(e) => updateGoal('carbs', e.target.value)}
		/>
	</div>

	<div class="field">
		<label for="fat">Fett (g)</label>
		<input
			id="fat"
			type="number"
			min="0"
			value={goals.fat}
			oninput={(e) => updateGoal('fat', e.target.value)}
		/>
	</div>
</div>

<style>
	.muted {
		color: var(--text-muted);
		font-size: 0.85rem;
	}
	.field {
		margin-bottom: 0.9rem;
	}
	.field:last-child {
		margin-bottom: 0;
	}
</style>
