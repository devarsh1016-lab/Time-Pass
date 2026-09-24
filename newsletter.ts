// Replace the body with your ESP call (Klaviyo, Loops, Mailchimp, a Next route handler...).
// Throw an Error with a user-facing message to show it under the field.
export async function subscribe(email: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 700));
  if (!email.includes('@')) throw new Error('Enter an email address like name@example.com.');
}
