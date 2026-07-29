import { NextResponse } from 'next/server';
import { getMeetings, saveMeetings } from '@/lib/db';

export async function GET() {
  try {
    const meetings = await getMeetings();
    return NextResponse.json(meetings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const meetings = await getMeetings();
    const newMeeting = {
      _id: 'meet_' + Date.now(),
      name: body.name,
      email: body.email,
      goal: body.goal || 'New Web Application Project',
      slot: body.slot || '02:00 PM PKT',
      notes: body.notes || '',
      status: 'pending', // 'pending', 'confirmed', 'completed', 'cancelled'
      createdAt: new Date().toISOString(),
    };
    meetings.unshift(newMeeting);
    await saveMeetings(meetings);
    return NextResponse.json(newMeeting, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const meetings = await getMeetings();
    const index = meetings.findIndex((m) => m._id === body._id);
    if (index === -1) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }
    meetings[index] = { ...meetings[index], ...body };
    await saveMeetings(meetings);
    return NextResponse.json(meetings[index]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    let meetings = await getMeetings();
    meetings = meetings.filter((m) => m._id !== id);
    await saveMeetings(meetings);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
