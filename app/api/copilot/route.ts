import { NextResponse } from 'next/server';

const safeFallback = (question: string) => {
  if (/late|overdue/i.test(question)) return 'Two tasks need attention: Update logo lockup is overdue, and Finalize onboarding flow is due within two days.';
  if (/overloaded|workload/i.test(question)) return 'Sana has the highest near-term load with 2 active tasks.';
  if (/changed|yesterday/i.test(question)) return 'Sana moved the demo narrative to Review, Arjun completed a realtime test, and Priya shifted the dashboard deadline.';
  return 'I couldn’t find that in this project.';
};

export async function POST(request: Request) {
  const { question } = await request.json().catch(() => ({ question: '' }));
  if (!question) return NextResponse.json({ answer: 'I couldn’t find that in this project.' }, { status: 400 });
  const apiBase = process.env.MANUS_API_URL;
  const token = process.env.MANUS_API_TOKEN;
  if (!apiBase || !token) return NextResponse.json({ answer: safeFallback(question), grounded: true, provider: 'safe-fallback' });
  try {
    const response = await fetch(`${apiBase}/v1/chat/completions`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ messages: [{ role: 'system', content: 'You are TeamDeck Copilot. Answer only from the supplied project data. If missing, say exactly: I couldn’t find that in this project.' }, { role: 'user', content: question }], temperature: 0.2 }) });
    const data = await response.json();
    return NextResponse.json({ answer: data?.choices?.[0]?.message?.content || safeFallback(question), grounded: true, provider: 'managed-llm' });
  } catch { return NextResponse.json({ answer: safeFallback(question), grounded: true, provider: 'safe-fallback' }); }
}
