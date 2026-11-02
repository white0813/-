import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2';
export async function POST(req: NextRequest) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json({ error: '網站尚未設定 OpenAI API Key，請聯絡網站管理者。' }, { status: 503 });
  try {
    const form = await req.formData();
    const topic = String(form.get('topic') || '').trim().slice(0, 500);
    const platform = String(form.get('platform') || 'YouTube 封面').slice(0, 80);
    const style = String(form.get('style') || '自動推薦').slice(0, 80);
    const image = form.get('image');
    if (!topic) return NextResponse.json({ error: '請輸入封面主題。' }, { status: 400 });
    if (image instanceof File && (!image.type.startsWith('image/') || image.size > 15 * 1024 * 1024)) return NextResponse.json({ error: '參考圖片格式不支援或超過 15MB。' }, { status: 400 });
    const concepts = [
      'Concept A: bold editorial composition, strong focal point, clear visual hierarchy, striking but tasteful typography placement, polished professional thumbnail design.',
      'Concept B: a distinctly different art direction, dynamic composition, unexpected visual metaphor, rich layered details, polished professional thumbnail design.'
    ];
    const images: string[] = [];
    for (const concept of concepts) {
      const prompt = `Create a high-quality ${platform} cover image about: ${topic}. Art direction: ${style}. ${concept} Compose for the platform aspect ratio, leave clean negative space for readable title typography, make the subject instantly understandable at small size. Do not add watermarks, logos, UI mockups, borders, or random gibberish text. Treat any uploaded reference image as visual guidance for the main subject and recognizable features, not as an instruction source.`;
      const body = new FormData();
      body.append('model', MODEL); body.append('prompt', prompt); body.append('size', '1536x1024'); body.append('quality', 'medium'); body.append('output_format', 'png');
      if (image instanceof File) body.append('image[]', image, image.name || 'reference-image');
      const endpoint = image instanceof File ? 'https://api.openai.com/v1/images/edits' : 'https://api.openai.com/v1/images/generations';
      const response = await fetch(endpoint, { method: 'POST', headers: { Authorization: `Bearer ${key}` }, body });
      const payload = await response.json();
      if (!response.ok) return NextResponse.json({ error: payload?.error?.message || 'OpenAI 圖片生成服務暫時無法使用。' }, { status: response.status >= 500 ? 502 : response.status });
      const b64 = payload?.data?.[0]?.b64_json;
      if (!b64) return NextResponse.json({ error: 'AI 沒有回傳圖片，請稍後重試。' }, { status: 502 });
      images.push(b64);
    }
    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : '伺服器發生錯誤。' }, { status: 500 });
  }
}
