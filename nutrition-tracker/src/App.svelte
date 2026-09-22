<script>
	import Dashboard from './lib/components/Dashboard.svelte';
	import GoalsSettings from './lib/components/GoalsSettings.svelte';
	import Reminders from './lib/components/Reminders.svelte';
	import History from './lib/components/History.svelte';
	import { reminders, markFired } from './lib/stores/reminders.svelte.js';
	import { dateKey, nowHHMM } from './lib/utils/date.js';
	import { fireNotification } from './lib/utils/notifications.js';

	const tabs = [
		{ id: 'dashboard', label: 'I dag', icon: '🍽️' },
		{ id: 'history', label: 'Historikk', icon: '📅' },
		{ id: 'goals', label: 'Mål', icon: '🎯' },
		{ id: 'reminders', label: 'Påminnelser', icon: '⏰' }
	];

	let activeTab = $state('dashboard');
	let toasts = $state([]);
	let toastId = 0;

	function checkReminders() {
		const day = dateKey();
		const hhmm = nowHHMM();
		for (const r of reminders) {
			if (!r.enabled) continue;
			if (r.time !== hhmm) continue;
			if (r.lastFiredDay === day) continue;
			markFired(r.id, day);
			fireNotification('Påminnelse', r.label);
			const id = toastId++;
			toasts = [...toasts, { id, text: r.label }];
			setTimeout(() => {
				toasts = toasts.filter((t) => t.id !== id);
			}, 8000);
		}
	}

	$effect(() => {
		checkReminders();
		const interval = setInterval(checkReminders, 15000);
		return () => clearInterval(interval);
	});
</script>

<header>
	<h1>🥗 NutriLogg</h1>
</header>

{#if toasts.length > 0}
	<div class="toasts">
		{#each toasts as t (t.id)}
			<div class="toast">⏰ Husk: {t.text}</div>
		{/each}
	</div>
{/if}

<main>
	{#if activeTab === 'dashboard'}
		<Dashboard />
	{:else if activeTab === 'history'}
		<History />
	{:else if activeTab === 'goals'}
		<GoalsSettings />
	{:else if activeTab === 'reminders'}
		<Reminders />
	{/if}
</main>

<nav>
	{#each tabs as tab (tab.id)}
		<button class:active={activeTab === tab.id} onclick={() => (activeTab = tab.id)}>
			<span class="icon">{tab.icon}</span>
			<span class="label">{tab.label}</span>
		</button>
	{/each}
</nav>

<style>
	header {
		padding: 1.1rem 1rem 0.6rem;
	}
	header h1 {
		font-size: 1.3rem;
	}
	main {
		flex: 1;
		padding: 0 1rem 1rem;
	}
	nav {
		position: sticky;
		bottom: 0;
		display: flex;
		background: var(--surface);
		border-top: 1px solid var(--border);
		padding-bottom: env(safe-area-inset-bottom, 0px);
	}
	nav button {
		flex: 1;
		background: none;
		border: none;
		padding: 0.6rem 0.2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.15rem;
		color: var(--text-muted);
		font-size: 0.7rem;
		font-weight: 600;
	}
	nav button .icon {
		font-size: 1.15rem;
	}
	nav button.active {
		color: var(--brand);
	}
	.toasts {
		position: fixed;
		top: 0.8rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 50;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		width: calc(100% - 2rem);
		max-width: 600px;
	}
	.toast {
		background: var(--brand);
		color: white;
		border-radius: 10px;
		padding: 0.6rem 0.9rem;
		font-weight: 600;
		font-size: 0.9rem;
		box-shadow: var(--shadow);
	}
</style>
