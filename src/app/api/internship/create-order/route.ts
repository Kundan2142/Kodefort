import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { enrollmentId } = await request.json();

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });

    // Get enrollment to verify
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: parseInt(enrollmentId) },
      include: { internship: true },
    });

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    // Generate unique receipt number
    let receiptNo = "";
    let isUnique = false;
    while (!isUnique) {
      receiptNo = `KFT-${Date.now()}-${Math.floor(Math.random() * 1000000)}`; // Increase random range to 1M
      const existing = await prisma.payment.findUnique({
        where: { receiptNo },
      });
      isUnique = !existing;
    }

    // Create Razorpay order (amount in paise, 500 INR = 50000 paise)
    const order = await razorpay.orders.create({
      amount: 500 * 100,
      currency: 'INR',
      receipt: receiptNo,
      payment_capture: true,
    });

    // Update payment with orderId and receiptNo
    await prisma.payment.update({
      where: { enrollmentId: parseInt(enrollmentId) },
      data: {
        orderId: order.id,
        receiptNo: receiptNo,
      },
    });

    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
