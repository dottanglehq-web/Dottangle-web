// Never show host error pages or JSON parser internals to a customer.
export async function submitInquiry(data, { fetcher = fetch, signal } = {}) {
  const response = await fetcher('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data), signal });
  let result;
  if (response.headers.get('content-type')?.toLowerCase().includes('application/json')) {
    try { result = await response.json(); } catch { /* Empty or truncated host response. */ }
  }
  if (!result || typeof result !== 'object') throw new Error('Our contact service is temporarily unavailable. Please try again shortly or call +91 7973574376.');
  if (!response.ok || result.success !== true || !result.submissionId) {
    const error = typeof result.error === 'string' && result.error.length <= 250 && !/[<>]/.test(result.error) ? result.error : 'We could not save your inquiry. Please try again shortly.';
    throw new Error(error);
  }
  return result;
}
