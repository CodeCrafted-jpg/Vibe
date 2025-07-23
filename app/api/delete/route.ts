// app/api/delete-recording/route.ts (App Router)
// Or pages/api/delete-recording.ts (Pages Router)

import { NextRequest, NextResponse } from 'next/server';
import { StreamClient } from '@stream-io/node-sdk'; // Assuming you use the node SDK for server-side operations

// IMPORTANT: Replace with your actual Stream API Key and Secret
const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY!; // Your public API key
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY!; // Your API Secret (keep this server-side only!)

export async function DELETE(req: NextRequest) {
  try {
    const { callId, sessionId, filename } = await req.json();

    if (!callId || !sessionId || !filename) {
      return NextResponse.json({ message: 'Missing required parameters: callId, sessionId, filename' }, { status: 400 });
    }

    const serverClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

    // To delete a recording, you typically need to reference the call it belongs to.
    // The Stream SDK's `deleteRecording` method is usually called on a `Call` object.
    // So, you first need to get a reference to the call.
    // However, the documentation also shows a direct `client.video.deleteRecording`
    // which seems to imply you can delete it directly if you have the necessary IDs.

    // Let's assume you can get a reference to the call object or the client can directly delete it
    // based on the provided IDs. The exact method might vary slightly based on
    // your Stream SDK version or specific setup.

    // Option 1: If you have a call object reference (more common for call-related operations)
    const call = serverClient.video.call('default', callId); // 'default' is often the call type
    if (!call) {
      return NextResponse.json({ message: 'Call not found' }, { status: 404 });
    }

    await call.deleteRecording({
      session: sessionId,
      filename: filename,
    });

    // Option 2: Direct deletion via client (if supported for your SDK version)
    // You might need to adjust parameters if this specific method isn't available or
    // requires different identifiers. Check Stream's official Node.js SDK documentation.
    /*
    await serverClient.video.deleteRecording({
      call_id: callId,
      session_id: sessionId,
      filename: filename,
    });
    */

    return NextResponse.json({ message: 'Recording deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting recording:', error);
    return NextResponse.json({ message: 'Failed to delete recording', error: error }, { status: 500 });
  }
}