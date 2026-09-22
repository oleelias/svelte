<script>
	let { label, value, goal, unit = 'g', color } = $props();

	let pct = $derived(goal > 0 ? Math.min(100, (value / goal) * 100) : 0);
	let over = $derived(goal > 0 && value > goal);
</script>

<div class="macro">
	<div class="macro-head">
		<span class="macro-label">{label}</span>
		<span class="macro-value">
			{Math.round(value)}<span class="muted">/{Math.round(goal)} {unit}</span>
		</span>
	</div>
	<div class="track">
		<div
			class="fill"
			class:over
			style="width: {pct}%; background: {color};"
		></div>
	</div>
</div>

<style>
	.macro {
		margin-bottom: 0.75rem;
	}
	.macro:last-child {
		margin-bottom: 0;
	}
	.macro-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-size: 0.88rem;
		margin-bottom: 0.3rem;
	}
	.macro-label {
		font-weight: 600;
	}
	.macro-value {
		font-variant-numeric: tabular-nums;
	}
	.muted {
		color: var(--text-muted);
	}
	.track {
		height: 8px;
		border-radius: 999px;
		background: var(--surface-alt);
		border: 1px solid var(--border);
		overflow: hidden;
	}
	.fill {
		height: 100%;
		border-radius: 999px;
		transition: width 0.25s ease;
	}
	.fill.over {
		background: var(--danger) !important;
	}
</style>
