DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Student' AND column_name = 'degree') THEN
        ALTER TABLE "Student" ADD COLUMN "degree" TEXT;
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Student.degree skipped: %', SQLERRM;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Student' AND column_name = 'subject') THEN
        ALTER TABLE "Student" ADD COLUMN "subject" TEXT;
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Student.subject skipped: %', SQLERRM;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Payment' AND column_name = 'orderId') THEN
        ALTER TABLE "Payment" ADD COLUMN "orderId" TEXT;
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Payment.orderId skipped: %', SQLERRM;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Payment' AND column_name = 'paymentId') THEN
        ALTER TABLE "Payment" ADD COLUMN "paymentId" TEXT;
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Payment.paymentId skipped: %', SQLERRM;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Payment' AND column_name = 'receiptNo') THEN
        ALTER TABLE "Payment" ADD COLUMN "receiptNo" TEXT;
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Payment.receiptNo skipped: %', SQLERRM;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "Payment_receiptNo_key" ON "Payment"("receiptNo");

CREATE TABLE IF NOT EXISTS "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'super_admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Admin_email_key" ON "Admin"("email");

CREATE TABLE IF NOT EXISTS "CompletedTask" (
    "id" SERIAL NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CompletedTask_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "CompletedTask_enrollmentId_taskId_key" ON "CompletedTask"("enrollmentId", "taskId");

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'CompletedTask_enrollmentId_fkey') THEN
        ALTER TABLE "CompletedTask" ADD CONSTRAINT "CompletedTask_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'CompletedTask_enrollmentId_fkey skipped: %', SQLERRM;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'CompletedTask_taskId_fkey') THEN
        ALTER TABLE "CompletedTask" ADD CONSTRAINT "CompletedTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'CompletedTask_taskId_fkey skipped: %', SQLERRM;
END $$;

CREATE TABLE IF NOT EXISTS "CertificateApproval" (
    "id" SERIAL NOT NULL,
    "registrationNo" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "collegeName" TEXT NOT NULL,
    "internshipTopic" TEXT NOT NULL DEFAULT 'Web Development',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "degree" TEXT,
    "session" TEXT,
    "subject" TEXT,
    "email" TEXT,
    "mobileNo" TEXT,
    "address" TEXT,
    "approvedBy" INTEGER,
    "approvedAt" TIMESTAMP(3),
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CertificateApproval_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "CertificateApproval_registrationNo_internshipTopic_key" ON "CertificateApproval"("registrationNo", "internshipTopic");
CREATE INDEX IF NOT EXISTS "CertificateApproval_status_idx" ON "CertificateApproval"("status");
CREATE INDEX IF NOT EXISTS "CertificateApproval_registrationNo_idx" ON "CertificateApproval"("registrationNo");

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'CertificateApproval_approvedBy_fkey') THEN
        ALTER TABLE "CertificateApproval" ADD CONSTRAINT "CertificateApproval_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'CertificateApproval_approvedBy_fkey skipped: %', SQLERRM;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'CertificateApproval_registrationNo_fkey') THEN
        ALTER TABLE "CertificateApproval" ADD CONSTRAINT "CertificateApproval_registrationNo_fkey" FOREIGN KEY ("registrationNo") REFERENCES "Student"("registrationNo") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'CertificateApproval_registrationNo_fkey skipped: %', SQLERRM;
END $$;
