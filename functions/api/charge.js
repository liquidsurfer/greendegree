export async function onRequestPost(context) {
  let body;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: 'Invalid request body' }, 400);
  }

  const { token, amountInCents } = body;

  if (!token || typeof amountInCents !== 'number') {
    return json({ error: 'Missing token or amount' }, 400);
  }

  // R150–R7 500 (1–50 pencil cases)
  if (amountInCents < 15000 || amountInCents > 750000) {
    return json({ error: 'Amount out of range' }, 400);
  }

  const yocoRes = await fetch('https://online.yoco.com/v1/charges/', {
    method: 'POST',
    headers: {
      'X-Auth-Secret-Key': context.env.YOCO_SECRET_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, amountInCents, currency: 'ZAR' }),
  });

  const data = await yocoRes.json();
  return json(data, yocoRes.status);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
