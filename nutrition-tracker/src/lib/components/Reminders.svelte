<script>
	import {
		reminders,
		addReminder,
		removeReminder,
		toggleReminder,
		updateReminderTime
	} from '../stores/reminders.svelte.js';
	import {
		notificationsSupported,
		permissionState,
		requestNotificationPermission
	} from '../utils/notifications.js';

	let newLabel = $state('');
	let newTime = $state('08:00');
	let permission = $state(permissionState());

	async function be() {
		permission = await requestNotificationPermission();
	}

	function leggTil() {
		if (!newLabel.trim()) return;
		addReminder(newLabel.trim(), newTime);
		newLabel = '';
	}
</script>

<div class="card">
	<h2>Påminnelser</h2>
	<p class="muted">
		Legg til påminnelser for supplementer og kreatin. Påminnelser vises som varsler fra nettleseren
		mens denne siden er åpen i en fane.
	</p>

	{#if notificationsSupported() && permission !== 'granted'}
		<button class="btn btn-secondary" onclick={be}>Slå på varsler</button>
	{:else if !notificationsSupported()}
		<p class="warn">Nettleseren din støtter ikke varsler. Påminnelser vises likevel inne i appen.</p>
	{:else}
		<p class="ok">Varsler er på ✓</p>
	{/if}

	<ul class="reminder-list">
		{#each reminders as r (r.id)}
			<li>
				<input type="checkbox" checked={r.enabled} onchange={() => toggleReminder(r.id)} />
				<span class="label" class:disabled={!r.enabled}>{r.label}</span>
				<input
					type="time"
					value={r.time}
					class="time"
					onchange={(e) => updateReminderTime(r.id, e.target.value)}
				/>
				<button class="btn-icon" onclick={() => removeReminder(r.id)} aria-label="Fjern">✕</button>
			</li>
		{/each}
	</ul>

	<div class="add-row">
		<input type="text" placeholder="F.eks. Kreatin" bind:value={newLabel} />
		<input type="time" bind:value={newTime} />
		<button class="btn" onclick={leggTil} disabled={!newLabel.trim()}>Legg til</button>
	</div>
</div>

<style>
	.muted {
		color: var(--text-muted);
		font-size: 0.85rem;
	}
	.warn {
		font-size: 0.85rem;
		color: var(--carbs);
	}
	.ok {
		font-size: 0.85rem;
		color: var(--brand);
		font-weight: 600;
	}
	.reminder-list {
		list-style: none;
		margin: 1rem 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.reminder-list li {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		background: var(--surface-alt);
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 0.5rem 0.6rem;
	}
	.reminder-list input[type='checkbox'] {
		width: auto;
	}
	.label {
		flex: 1;
		font-weight: 600;
	}
	.label.disabled {
		color: var(--text-muted);
		text-decoration: line-through;
		font-weight: 500;
	}
	.time {
		width: auto;
	}
	.add-row {
		display: flex;
		gap: 0.5rem;
		margin-top: 1rem;
	}
	.add-row input[type='text'] {
		flex: 1;
	}
	.add-row input[type='time'] {
		width: auto;
	}
</style>
