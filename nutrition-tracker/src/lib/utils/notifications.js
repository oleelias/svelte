export function notificationsSupported() {
	return typeof window !== 'undefined' && 'Notification' in window;
}

export function permissionState() {
	if (!notificationsSupported()) return 'unsupported';
	return Notification.permission;
}

export async function requestNotificationPermission() {
	if (!notificationsSupported()) return 'unsupported';
	return Notification.requestPermission();
}

export function fireNotification(title, body) {
	if (!notificationsSupported() || Notification.permission !== 'granted') return false;
	new Notification(title, { body, icon: '/favicon.svg' });
	return true;
}
