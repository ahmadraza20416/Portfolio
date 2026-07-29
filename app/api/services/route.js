import { NextResponse } from 'next/server';
import { getServices, saveServices } from '@/lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const showAll = searchParams.get('all') === 'true';
    const services = await getServices(showAll);
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const services = await getServices(true);
    const newService = {
      _id: 'srv_' + Date.now(),
      title: body.title,
      description: body.description || '',
      icon: body.icon || 'Code2',
      deliverables: body.deliverables || [],
      priceRange: body.priceRange || '$500 - $2,500',
      order: body.order || services.length + 1,
      visible: body.visible ?? true,
    };
    services.push(newService);
    await saveServices(services);
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const services = await getServices(true);
    const index = services.findIndex((s) => s._id === body._id);
    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    services[index] = { ...services[index], ...body };
    await saveServices(services);
    return NextResponse.json(services[index]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    let services = await getServices(true);
    services = services.filter((s) => s._id !== id);
    await saveServices(services);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
