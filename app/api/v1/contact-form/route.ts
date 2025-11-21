import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, challenge, message } = body;

    if (!name || !phone || !email || !challenge || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const webhookUrl = 'https://bi-n8n.achi.link/webhook/d779fa31-d731-4a05-8f95-8903c42f7bd5';
    const webhookUser = 'abeatbeyond';
    const webhookPassword = process.env.WEBHOOK_CONTACT_FORM;

    if (!webhookPassword) {
      console.error('WEBHOOK_CONTACT_FORM environment variable is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const payload = {
      'Nome e Cognome': name,
      'Telefono': phone,
      'Mail': email,
      'Richiesta': message,
      'sfida': challenge,
      'submittedAt': new Date().toISOString(),
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${webhookUser}:${webhookPassword}`).toString('base64')}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Webhook request failed:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to submit form' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in contact-form API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
