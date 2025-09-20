import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    console.log(' Данные получены:', { name, email, message });

    return NextResponse.json({
      message: 'Форма успешно отправлена!',
    });
  } catch  {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
