import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { callId } = await req.json();

  // --- ADDED LOG ---
  console.log('Received request to delete call. callId:', callId);
  // --- END ADDED LOG ---

  if (!callId) {
    return NextResponse.json({ error: 'Missing call ID' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://video.stream-io-api.com/api/v1/call/default/${callId}/delete`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.STREAM_APP_SECRECT}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // --- ADDED LOG ---
    console.log('Response from Stream.io API:', response.status, data);
    // --- END ADDED LOG ---

    if (!response.ok) {
      // --- ADDED LOG for Stream API error ---
      console.error('Error from Stream.io API:', data);
      // --- END ADDED LOG ---
      return NextResponse.json({ error: data }, { status: response.status });
    }

    // --- ADDED LOG for success ---
    console.log('Call deleted successfully via Stream.io API for callId:', callId);
    // --- END ADDED LOG ---
    return NextResponse.json({ success: true });
  } catch (err: any) { // Added 'any' type for err to satisfy TypeScript if needed
    // --- ADDED LOG for internal server error ---
    console.error('Internal Server Error when calling Stream.io:', err);
    // --- END ADDED LOG ---
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}