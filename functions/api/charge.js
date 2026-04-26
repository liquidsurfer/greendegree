export async function onRequestPost(context) {
  let body;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: 'Invalid request body' }, 400);
  }

  const { amountInCents } = body;

  if (!Number.isInteger(amountInCents)) {
    return json({ error: 'Missing amount' }, 400);
  }

  // R150–R7 500 (1–50 pencil cases)
  if (amountInCents < 15000 || amountInCents > 750000) {
    return json({ error: 'Amount out of range' }, 400);
  }

  const origin = new URL(context.request.url).origin;

  const yocoRes = await fetch('https://payments.yoco.com/api/checkouts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${context.env.YOCO_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amountInCents,
      currency: 'ZAR',
      successUrl: `${origin}/donate?donated=true`,
      cancelUrl: `${origin}/donate`,
      failureUrl: `${origin}/donate?failed=true`,
    }),
  });

  const data = await yocoRes.json();

  if (!yocoRes.ok) {
    return json({ error: 'Payment provider error' }, 502);
  }

  return json({ redirectUrl: data.redirectUrl }, 200);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
