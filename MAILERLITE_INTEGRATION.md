# MailerLite marketing opt-in integration

This feature is intentionally NOT deployed or activated until manually verified.

## Scope
- Signed-in users can explicitly opt into optional marketing emails from the dashboard.
- The backend obtains the email from the validated Clerk/Easy Auth identity, not browser-submitted email.
- The backend adds consenting, non-premium customers to the MailerLite group `EZway Free Signups`.
- Already-unsubscribed MailerLite contacts are not silently resubscribed.
- No Clerk signup automatically opts a customer into marketing.
- Paid members are rejected by the opt-in endpoint to avoid enrolling them in free-tier sales emails.

## Azure Container App secrets
Set `MAILERLITE_API_KEY` as a server-side secret in the production Container App (never with a `VITE_` prefix). Set `MAILERLITE_GROUP_ID=202161567011178190`.

Store credentials in Azure secrets and reference them as environment variables. Never commit keys to GitHub or expose them to client bundles. The connector authorization used in ChatGPT does not itself grant a runtime API key to the deployed app.

## Test plan before activation
1. Deploy to a staging revision first with the API key and group ID.
2. Sign in as a non-premium test creator and visit the dashboard.
3. Confirm the opt-in checkbox is unchecked initially.
4. Check the box and subscribe. Confirm exactly one active MailerLite subscriber in `EZway Free Signups`.
5. Retry subscription and confirm no duplicate email deliveries.
6. Confirm a Clerk signup without opt-in does NOT add a MailerLite subscriber.
7. Confirm a canceled/unsubscribed contact is not automatically reactivated.
8. Confirm a paid subscriber does not enter the free-tier sales automation.
9. Test the MailerLite automations independently with a subscribed contact.
10. Activate only after legal compliance, product offer, and syncing premium upgrades are verified.

## Known launch blockers
- The app's current registration flow requires an active subscription, so the advertised 3 free evidence records are not implemented in the reviewed code.
- The current Stripe event pipeline does not synchronize new Premium subscribers into the `EZC - Premium Active` MailerLite group. Premium upgrades that happen while a contact is already in the email sequence require an explicit exit rule or server-side update before launching.
- The marketing checkbox lives in the signed-in dashboard; it is not part of Clerk's hosted signup form. The user opts in after authenticating.
- Onboarding and marketing messages must not claim that a record was already created on signup.
