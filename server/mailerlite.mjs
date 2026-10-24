// Server-only integration. Never expose MAILERLITE_API_KEY to the browser.
const BASE = 'https://connect.mailerlite.com/api';
export async function subscribeConsentedCreator({ email, apiKey, groupId }) {
  if (!apiKey || !groupId) throw new Error('mailerlite_not_configured');
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('verified_email_required');
  const headers = { Authorization: `Bearer ${apiKey}`, Accept: 'application/json', 'Content-Type': 'application/json' };
  const read = await fetch(`${BASE}/subscribers/${encodeURIComponent(email)}`, { headers, signal: AbortSignal.timeout(10000) });
  if (read.ok) {
    const previous = await read.json();
    if (previous?.data?.status !== 'active') throw new Error('subscriber_requires_resubscription');
  } else if (read.status !== 404) {
    throw new Error('mailerlite_lookup_failed');
  }
  const result = await fetch(`${BASE}/subscribers`, {
    method: 'POST', headers, signal: AbortSignal.timeout(10000),
    body: JSON.stringify({ email, groups: [groupId], status: 'active' }),
  });
  if (!result.ok) throw new Error('mailerlite_subscription_failed');
  return { subscribed: true };
}
