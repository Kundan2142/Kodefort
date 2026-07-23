"use client";
export const dynamic = 'force-dynamic';
import { Suspense, useEffect, useState, ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PaymentReceiptPDF from "./components/PaymentReceiptPDF";
import OfferLetterPDF from "./components/OfferLetterPDF";
import {
  CheckCircle2,
  CreditCard,
  FileText,
  ArrowRight,
  BookOpen,
  Loader2,
  Check,
  Download,
  Shield,
  Zap,
  Award
} from "lucide-react";

// Sample images for each internship (same as internship page)
const internshipImages: Record<string, string> = {
  "Web Development": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  "Cyber Security": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  "AI Basics": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  "Digital Marketing": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
  "Python Programming": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80",
  "Cloud Computing": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  "DevOps": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
  "Software Development": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
  "Database Management": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
};

interface Task {
  id: number;
  title: string;
  description: string;
  youtubeUrl: string | null;
  order: number;
}

interface Internship {
  difficulty: ReactNode;
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}

interface Enrollment {
  id: number;
  student?: {
    name: string;
    collegeName: string;
    registrationNo: string;
    email: string;
    mobileNo: string;
  };
  internship: Internship;
  payment: {
    id: number;
    status: string;
    createdAt?: string;
    receiptNo?: string;
    orderId?: string;
    paymentId?: string;
  } | null;
  completedTasks: { id: number; taskId: number }[];
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDownloadScreen, setShowDownloadScreen] = useState(false);
  // Keep track of whether we've shown the download screen already
  const [hasSeenDownloadScreen, setHasSeenDownloadScreen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [togglingTaskId, setTogglingTaskId] = useState<number | null>(null);
  const enrollmentIdFromQuery = searchParams.get("enrollmentId");
  
  // Function to toggle task completion
  const toggleTaskCompletion = async (taskId: number) => {
    if (!selectedEnrollment) return;
    console.log("Toggling task completion for task ID:", taskId);
    
    // Optimistic update first for instant feedback
    const isCurrentlyCompleted = selectedEnrollment.completedTasks?.some(ct => ct.taskId === taskId);
    console.log("Currently completed:", isCurrentlyCompleted);
    
    setSelectedEnrollment({
      ...selectedEnrollment,
      completedTasks: isCurrentlyCompleted
        ? selectedEnrollment.completedTasks?.filter(ct => ct.taskId !== taskId)
        : [...(selectedEnrollment.completedTasks || []), { id: Date.now(), taskId }]
    });
    
    setTogglingTaskId(taskId);
    try {
      const response = await fetch(`/api/internship/enroll/${selectedEnrollment.id}/tasks/${taskId}/toggle`, {
        method: "POST",
      });
      console.log("Toggle API response status:", response.status);
      
      if (response.ok) {
        // Refresh the enrollment data to confirm
        const updatedEnrollRes = await fetch(`/api/internship/enroll/${selectedEnrollment.id}`);
        if (updatedEnrollRes.ok) {
          const updatedEnrollment = await updatedEnrollRes.json();
          console.log("Updated enrollment from API:", updatedEnrollment);
          setSelectedEnrollment(updatedEnrollment);
        }
      }
    } catch (error) {
      console.error("Error toggling task completion:", error);
      // Revert optimistic update on error
      setSelectedEnrollment(selectedEnrollment);
    } finally {
      setTogglingTaskId(null);
    }
  };
  console.log("=== DashboardPage Component Initialization ===");
  console.log("searchParams.toString():", searchParams.toString());
  console.log("enrollmentIdFromQuery:", enrollmentIdFromQuery);

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePayment = async () => {
    if (!selectedEnrollment) return;
    setIsPaying(true);

    try {
      // Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Failed to load Razorpay SDK");
        return;
      }

      // Create order on backend
      const orderRes = await fetch("/api/internship/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId: selectedEnrollment.id }),
      });

      if (!orderRes.ok) {
        alert("Failed to create order");
        return;
      }

      const orderData = await orderRes.json();

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TEWKSe1rBIWxbV",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Kodefort Internship",
        description: `Payment for ${selectedEnrollment.internship.name}`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
            console.log("=== Razorpay handler called ===");
            console.log("Razorpay response:", response);
            // Verify payment on backend
            const verifyRes = await fetch("/api/internship/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                enrollmentId: selectedEnrollment.id,
              }),
            });
            console.log("verifyRes.ok:", verifyRes.ok, "verifyRes.status:", verifyRes.status);

            if (verifyRes.ok) {
              console.log("Payment verified successfully! Fetching updated enrollment...");
              
              // Fetch the updated, fresh enrollment directly!
              const updatedEnrollRes = await fetch(`/api/internship/enroll/${selectedEnrollment.id}`);
              console.log("updatedEnrollRes.ok:", updatedEnrollRes.ok);
              if (updatedEnrollRes.ok) {
                const updatedEnrollment = await updatedEnrollRes.json();
                console.log("Updated enrollment (with payment completed):", updatedEnrollment);
                setSelectedEnrollment(updatedEnrollment);
                
                // Also refresh the full enrollments list if we have a token
                const token = localStorage.getItem("token");
                if (token) {
                  const enrollRes = await fetch("/api/internship/enroll", {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  if (enrollRes.ok) {
                    const data = await enrollRes.json();
                    setEnrollments(data);
                  }
                }
              }
              
              console.log("Setting showDownloadScreen to true!");
              setShowDownloadScreen(true);
            } else {
              const errorText = await verifyRes.text();
              console.error("Payment verification failed! verifyRes error text:", errorText);
              alert("Payment verification failed");
            }
          },
        prefill: {
          name: "Student",
          email: "student@example.com",
        },
        theme: { color: "#2563eb" },
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.on("closed", () => {
        setIsPaying(false);
      });
      rzp.open();
    } catch (e) {
      console.error(e);
      setIsPaying(false);
    }
  };

  // Helper function to safely parse JSON from localStorage
  const safeParseJSON = (str: string | null) => {
    if (!str) return null;
    try {
      return JSON.parse(str);
    } catch (e) {
      console.error("Failed to parse JSON from localStorage:", e);
      return null;
    }
  };

  useEffect(() => {
    console.log("=== Dashboard useEffect INIT ===");
    console.log("window.location.href:", window.location.href);
    const token = localStorage.getItem("token");
    const localStorageEnrollment = localStorage.getItem("enrollment");
    const localStorageStudent = localStorage.getItem("student");
    console.log("token:", token);
    console.log("localStorage.enrollment (raw):", localStorageEnrollment);
    console.log("localStorage.student (raw):", localStorageStudent);
    console.log("enrollmentIdFromQuery:", enrollmentIdFromQuery);
    console.log("typeof enrollmentIdFromQuery:", typeof enrollmentIdFromQuery);
    
    if (!token && !localStorageEnrollment && !enrollmentIdFromQuery) {
      console.log("No auth found, pushing to login");
      router.push("/internship/login");
      return;
    }
    
    const fetchEnrollments = async () => {
      console.log("=== fetchEnrollments START ===");
      
      // PRIORITIZE enrollmentIdFromQuery above everything else!
      if (enrollmentIdFromQuery) {
        console.log("PRIORITIZING enrollmentIdFromQuery:", enrollmentIdFromQuery);
        try {
          const url = `/api/internship/enroll/${enrollmentIdFromQuery}`;
          console.log("Fetching URL:", url);
          const res = await fetch(url);
          console.log("API response status:", res.status, res.statusText);
          if (res.ok) {
            const data = await res.json();
            console.log("API response data:", data);
            console.log("API response data keys:", Object.keys(data));
            setSelectedEnrollment(data);
            localStorage.setItem("student", JSON.stringify(data.student));
            localStorage.setItem("enrollment", JSON.stringify({ 
              id: data.id, 
              studentId: data.studentId, 
              internshipId: data.internshipId, 
              createdAt: data.createdAt 
            }));
            console.log("Saved to localStorage");
            // Show download screen only if it's a fresh payment (indicated by query param)
            if (data.payment?.status === "completed" && searchParams.has("paymentCompleted")) {
              console.log("Fresh payment completed, showing download screen");
              setShowDownloadScreen(true);
              setHasSeenDownloadScreen(true);
            }
            
            // If we have a token, still fetch all enrollments for the dropdown
            if (token) {
              console.log("Also fetching all enrollments for dropdown using token");
              const enrollRes = await fetch("/api/internship/enroll", {
                headers: { Authorization: `Bearer ${token}` },
              });
              if (enrollRes.ok) {
                const enrollData = await enrollRes.json();
                console.log("Enrollments from token for dropdown:", enrollData);
                setEnrollments(enrollData);
              }
            }
          } else {
            const errorText = await res.text();
            console.error("API error response:", errorText);
          }
        } catch (fetchError) {
          console.error("Fetch error:", fetchError);
        }
      } else if (token) { // No enrollmentIdFromQuery, use token
        console.log("Using token to fetch enrollments");
        const res = await fetch("/api/internship/enroll", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Token fetch res.ok:", res.ok, "res.status:", res.status);
        const data = await res.json();
        console.log("Enrollments from token:", data);
        setEnrollments(data);
        if (data.length > 0) {
          console.log("Using first enrollment");
          setSelectedEnrollment(data[0]);
          // Don't show download screen on normal login
        }
      } else if (localStorageEnrollment) { // No query or token, use localStorage
        console.log("Using localStorage enrollment");
        const enrollmentData = safeParseJSON(localStorageEnrollment);
        console.log("enrollmentData after safeParse:", enrollmentData);
        if (enrollmentData) {
          console.log("enrollmentData.id:", enrollmentData.id);
          const res = await fetch("/api/internship");
          const internships = await res.json();
          console.log("internships:", internships);
          const internship = internships.find((i: any) => i.id === enrollmentData.internshipId);
          console.log("found internship:", internship);
          if (internship) {
            const newSelectedEnrollment = {
              ...enrollmentData,
              internship,
              payment: { id: 0, status: "pending" }
            };
            console.log("Setting selectedEnrollment:", newSelectedEnrollment);
            setSelectedEnrollment(newSelectedEnrollment);
          }
        }
      } else {
        console.log("No way to get enrollment");
      }
      
      console.log("=== fetchEnrollments END - setting loading to false ===");
      setLoading(false);
    };
    
    fetchEnrollments();
  }, [enrollmentIdFromQuery, router]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
        <p className="text-xl text-slate-700 font-medium">Loading your dashboard...</p>
      </div>
    </div>
  );

  if (showDownloadScreen && selectedEnrollment) {
    const student = safeParseJSON(localStorage.getItem("student")) || {};
    const date = getCurrentDate();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 flex items-center justify-center">
        <div className="w-full max-w-5xl bg-white rounded-[24px] shadow-[0_10px_40px_rgba(2,6,23,.06)] border border-[#E5E7EB] overflow-hidden">
          {/* Header with blobs */}
          <div className="relative overflow-hidden px-8 py-6 flex items-center gap-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300/40 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-300/40 rounded-full blur-3xl pointer-events-none"></div>
            <Image 
              src="/logo.png" 
              alt="Kodefort Logo" 
              width={36} 
              height={36} 
              className="rounded-lg relative z-10"
            />
            <div className="relative z-10">
              <h2 className="text-[36px] font-bold text-white tracking-tight" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>Payment Successful!</h2>
              <p className="text-blue-100 text-sm mt-1">Congratulations on enrolling in the internship</p>
            </div>
          </div>
          
          <div className="p-10 md:p-14 text-center relative">
            {/* Decorative blobs */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-100/50 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-20 right-10 w-20 h-20 bg-blue-100/40 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 ring-8 ring-green-100">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              
              <h1 className="text-[40px] font-extrabold text-[#111827] mb-4 tracking-tight" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>Payment Successful!</h1>
              <p className="text-xl text-[#6B7280] mb-3">Congratulations on enrolling in the internship!</p>
              <p className="text-[28px] font-bold text-[#2563EB] mb-10 tracking-tight" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>{selectedEnrollment.internship.name}</p>
              
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent mx-auto mb-10"></div>
              
              <p className="text-[#6B7280] mb-12 text-lg font-medium">Download your payment receipt and offer letter below:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
                <PDFDownloadLink
                            document={
                              <PaymentReceiptPDF
                                receiptId={`KF-${selectedEnrollment.id}-${selectedEnrollment.payment?.id || '0'}-${Date.now()}`}
                                receiptNo={selectedEnrollment.payment?.receiptNo}
                                orderId={selectedEnrollment.payment?.orderId}
                                paymentId={selectedEnrollment.payment?.paymentId}
                                date={date}
                                studentName={student.name || "N/A"}
                                collegeName={student.collegeName || "N/A"}
                                registrationNo={student.registrationNo || "N/A"}
                                email={student.email || "N/A"}
                                mobileNo={student.mobileNo || "N/A"}
                                internshipName={selectedEnrollment.internship.name}
                                amountPaid="₹500.00"
                              />
                            }
                            fileName={`Kodefort_Payment_Receipt_${student.registrationNo || "student"}.pdf`}
                            className="group relative flex items-center justify-center gap-2 bg-gradient-to-b from-orange-500 via-orange-600 to-orange-700 text-white py-3 px-6 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 border border-orange-800/30 z-10"
                          >
                            {({ loading }) => (
                              <div className="relative z-20 flex items-center justify-center gap-2">
                                {loading ? (
                                  <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Loading PDF...
                                  </>
                                ) : (
                                  <>
                                    <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                    Download Payment Receipt
                                  </>
                                )}
                              </div>
                            )}
                          </PDFDownloadLink>
                          
                          <PDFDownloadLink
                            document={
                              <OfferLetterPDF
                                studentName={student.name || "N/A"}
                                collegeName={student.collegeName || "N/A"}
                                registrationNo={student.registrationNo || "N/A"}
                                email={student.email || "N/A"}
                                mobileNo={student.mobileNo || "N/A"}
                                internshipName={selectedEnrollment.internship.name}
                              />
                            }
                            fileName={`Kodefort_Offer_Letter_${student.registrationNo || "student"}.pdf`}
                            className="group relative flex items-center justify-center gap-2 bg-white text-orange-600 py-3 px-6 rounded-full font-bold text-lg shadow-lg shadow-orange-500/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 border-2 border-orange-300 z-10"
                          >
                            {({ loading }) => (
                              <div className="relative z-20 flex items-center justify-center gap-2">
                                {loading ? (
                                  <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Loading PDF...
                                  </>
                                ) : (
                                  <>
                                    <FileText className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                    Download Offer Letter
                                  </>
                                )}
                              </div>
                            )}
                          </PDFDownloadLink>
              </div>
              
              <button
                onClick={() => {
                  setShowDownloadScreen(false);
                }}
                className="inline-flex items-center gap-3 text-[#2563EB] hover:text-[#1D4ED8] font-semibold text-lg hover:underline transition-colors duration-200"
              >
                Go to Dashboard
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-orange-100/40 rounded-full blur-2xl"></div>
      
      {selectedEnrollment ? (
        <div className="container mx-auto max-w-6xl px-4 py-8 relative z-10">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-2" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>
                Hello, {selectedEnrollment.student?.name || "Student"}
              </h1>
              <p className="text-lg text-slate-500">
                {selectedEnrollment.internship.description}
                {selectedEnrollment.student?.registrationNo && (
                  <span className="ml-2 text-slate-400">• Reg. No: {selectedEnrollment.student.registrationNo}</span>
                )}
              </p>
              {enrollments.length > 1 && (
                <div className="mt-4 w-full max-w-md">
                  <div className="relative">
                    <select
                      className="w-full pl-4 pr-10 py-3 border-2 border-orange-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all appearance-none bg-white shadow-sm"
                      value={selectedEnrollment.id}
                      onChange={(event) => setSelectedEnrollment(enrollments.find((enrollment) => enrollment.id === parseInt(event.target.value)) || null)}
                    >
                      {enrollments.map((enrollment) => (
                        <option key={enrollment.id} value={enrollment.id}>{enrollment.internship.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center gap-4">
              <div className="relative w-28 h-28 bg-white rounded-full shadow-2xl border-4 border-orange-100">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="48" fill="none" stroke="#fed7aa" strokeWidth="8" />
                  <circle 
                    cx="56" cy="56" r="48" fill="none" 
                    stroke={selectedEnrollment.payment?.status === "completed" ? "#10b981" : "#f97316"} 
                    strokeWidth="8" 
                    strokeDasharray="301.6" 
                    strokeDashoffset={selectedEnrollment.payment?.status === "completed" 
                      ? 301.6 - (301.6 * (selectedEnrollment.completedTasks?.length || 0)) / (selectedEnrollment.internship.tasks?.length || 1)
                      : 301.6}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>
                    {selectedEnrollment.completedTasks?.length || 0}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">/ {selectedEnrollment.internship.tasks?.length || 0}</span>
                  <span className="text-xs text-slate-500 mt-1">Tasks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section (if not completed) */}
          {selectedEnrollment.payment?.status !== "completed" ? (
            <div className="mb-12">
              <div className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_10px_40px_rgba(2,6,23,.06)] overflow-hidden">
                {/* Header */}
                <div className="relative overflow-hidden px-8 py-6 flex items-center gap-4 rounded-t-[24px] bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300/40 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-300/40 rounded-full blur-3xl pointer-events-none"></div>
                  <Image 
                    src="/logo.png" 
                    alt="Kodefort Logo" 
                    width={36} 
                    height={36} 
                    className="rounded-lg relative z-10"
                  />
                  <div className="relative z-10">
                    <h2 className="text-[36px] font-bold text-white tracking-tight" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>Complete Your Enrollment</h2>
                    <p className="text-blue-100 text-sm mt-1">Secure payment powered by Razorpay</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left Column: Course Summary */}
                  <div className="p-10 border-r border-[#E5E7EB]">
                    <div className="flex items-center gap-2 mb-8 text-[#6B7280] font-semibold text-sm">
                      <BookOpen className="w-4 h-4 stroke-[1.75]" />
                      <span>Course Summary</span>
                    </div>
                    
                    <div className="relative mb-8 rounded-[20px] overflow-hidden">
                      <img 
                        src={internshipImages[selectedEnrollment.internship.name] || "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80"} 
                        alt={selectedEnrollment.internship.name} 
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute bottom-5 left-5">
                        <span className="inline-block px-3 py-1.5 bg-white text-xs font-semibold text-[#111827] rounded-full">
                          {selectedEnrollment.internship.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-[20px] font-semibold text-[#111827] mb-6 tracking-tight" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>
                      {selectedEnrollment.internship.name}
                    </h3>
                    
                    <div className="bg-[#F8FAFC] border border-[#E5E7EB] p-[18px] rounded-[16px] mb-8">
                      <p className="text-[15px] text-[#4B5563] leading-relaxed">
                        {selectedEnrollment.internship.description}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="h-[64px] bg-white border border-[#E5E7EB] rounded-[16px] p-4 flex items-center gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] hover:border-[#2563EB] transition-all duration-200 cursor-default">
                        <div className="w-8 h-8 bg-[#F3F4F6] rounded-full flex items-center justify-center text-[#6B7280]">
                          <Award className="w-4 h-4 stroke-[1.75]" />
                        </div>
                        <p className="text-[15px] font-medium text-[#111827]">Industry-Recognized Certificate</p>
                      </div>
                      
                      <div className="h-[64px] bg-white border border-[#E5E7EB] rounded-[16px] p-4 flex items-center gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] hover:border-[#2563EB] transition-all duration-200 cursor-default">
                        <div className="w-8 h-8 bg-[#F3F4F6] rounded-full flex items-center justify-center text-[#6B7280]">
                          <Zap className="w-4 h-4 stroke-[1.75]" />
                        </div>
                        <p className="text-[15px] font-medium text-[#111827]">Lifetime Access to Content</p>
                      </div>
                      
                      <div className="h-[64px] bg-white border border-[#E5E7EB] rounded-[16px] p-4 flex items-center gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] hover:border-[#2563EB] transition-all duration-200 cursor-default">
                        <div className="w-8 h-8 bg-[#F3F4F6] rounded-full flex items-center justify-center text-[#6B7280]">
                          <Shield className="w-4 h-4 stroke-[1.75]" />
                        </div>
                        <p className="text-[15px] font-medium text-[#111827]">100% Secure Payment</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column: Payment Details */}
                  <div className="p-10 bg-white">
                    <div className="flex items-center gap-2 mb-8 text-[#6B7280] font-semibold text-sm">
                      <CreditCard className="w-4 h-4 stroke-[1.75]" />
                      <span>Payment Details</span>
                    </div>
                    
                    <div className="space-y-4 mb-10">
                      <div>
                        <label className="text-[14px] font-semibold text-[#4B5563] mb-2 block">Name</label>
                        <div className="h-[56px] bg-white border border-[#E5E7EB] px-5 rounded-[14px] text-[#111827] font-medium flex items-center justify-between transition-all duration-200">
                          {selectedEnrollment.student?.name || "N/A"}
                          <div className="w-6 h-6 bg-[#ECFDF5] rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-[#10B981] stroke-[1.75]" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-[14px] font-semibold text-[#4B5563] mb-2 block">Email</label>
                        <div className="h-[56px] bg-white border border-[#E5E7EB] px-5 rounded-[14px] text-[#111827] font-medium flex items-center justify-between transition-all duration-200">
                          {selectedEnrollment.student?.email || "N/A"}
                          <div className="w-6 h-6 bg-[#ECFDF5] rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-[#10B981] stroke-[1.75]" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-[14px] font-semibold text-[#4B5563] mb-2 block">Registration No</label>
                        <div className="h-[56px] bg-white border border-[#E5E7EB] px-5 rounded-[14px] text-[#111827] font-medium flex items-center justify-between transition-all duration-200">
                          {selectedEnrollment.student?.registrationNo || "N/A"}
                          <div className="w-6 h-6 bg-[#ECFDF5] rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-[#10B981] stroke-[1.75]" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-[20px] border border-[#E5E7EB] p-8 mb-10">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[15px] text-[#6B7280] font-medium">Course Fee</span>
                        <span className="text-[20px] font-semibold text-[#111827]">₹500</span>
                      </div>
                      
                      <div className="border-t border-[#E5E7EB] pt-6 flex justify-between items-start">
                        <span className="text-[20px] font-semibold text-[#111827]">Total</span>
                        <div className="text-right">
                          <span className="text-[44px] font-extrabold text-[#111827] tracking-tight" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>₹500</span>
                          <p className="text-xs text-[#9CA3AF] mt-1">Inclusive of all taxes</p>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={handlePayment}
                      disabled={isPaying}
                      className="w-full h-[58px] flex items-center justify-center gap-3 bg-gradient-to-r from-[#2563EB] to-[#4338CA] text-white rounded-[16px] font-semibold text-lg shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:brightness-[1.03] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_12px_rgba(37,99,235,0.2)] disabled:hover:brightness-100"
                    >
                      {isPaying ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-6 h-6 stroke-[1.75]" />
                          Pay ₹500 Securely
                        </>
                      )}
                    </button>
                    
                    <div className="mt-10 flex items-center justify-center gap-12 text-[#9CA3AF] text-[14px]">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 stroke-[1.75]" />
                        <span>100% Secure</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 stroke-[1.75]" />
                        <span>Instant Access</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-4xl font-extrabold text-slate-900" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>
                        {selectedEnrollment.internship.tasks?.length || 0}
                      </p>
                      <p className="text-sm text-slate-600 font-semibold">Total Tasks</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-4xl font-extrabold text-slate-900" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>
                        {selectedEnrollment.completedTasks?.length || 0}
                      </p>
                      <p className="text-sm text-slate-600 font-semibold">Completed</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-4xl font-extrabold text-slate-900" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>
                        2
                      </p>
                      <p className="text-sm text-slate-600 font-semibold">Documents</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasks Section */}
              <div className="mb-4">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>
                  Day 1 Tasks
                </h2>
                
                {/* Search and Actions Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                  <div className="relative w-full md:w-96">
                    <svg className="w-5 h-5 text-orange-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input 
                      type="text" 
                      placeholder="Search here..."
                      className="w-full pl-12 pr-4 py-3 border-2 border-orange-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all bg-white shadow-sm"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Download Buttons */}
                    {selectedEnrollment && (() => {
                      const student = safeParseJSON(localStorage.getItem("student")) || {};
                      const date = getCurrentDate();
                      return (
                        <>
                          <PDFDownloadLink
                            document={
                              <PaymentReceiptPDF
                                receiptId={`KF-${selectedEnrollment.id}-${selectedEnrollment.payment?.id || '0'}-${Date.now()}`}
                                receiptNo={selectedEnrollment.payment?.receiptNo}
                                orderId={selectedEnrollment.payment?.orderId}
                                paymentId={selectedEnrollment.payment?.paymentId}
                                date={date}
                                studentName={student.name || "N/A"}
                                collegeName={student.collegeName || "N/A"}
                                registrationNo={student.registrationNo || "N/A"}
                                email={student.email || "N/A"}
                                mobileNo={student.mobileNo || "N/A"}
                                internshipName={selectedEnrollment.internship.name}
                                amountPaid="₹500.00"
                              />
                            }
                            fileName={`Kodefort_Payment_Receipt_${student.registrationNo || "student"}.pdf`}
                            className="group relative flex items-center gap-2 bg-gradient-to-b from-orange-500 via-orange-600 to-orange-700 text-white px-5 py-2.5 rounded-full font-bold text-base shadow-lg shadow-orange-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 border border-orange-800/30 z-10"
                          >
                            {({ loading }) => (
                              <div className="relative z-20 flex items-center gap-2">
                                {loading ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Loading...
                                  </>
                                ) : (
                                  <>
                                    <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                                    Receipt
                                  </>
                                )}
                              </div>
                            )}
                          </PDFDownloadLink>
                          <PDFDownloadLink
                            document={
                              <OfferLetterPDF
                                studentName={student.name || "N/A"}
                                collegeName={student.collegeName || "N/A"}
                                registrationNo={student.registrationNo || "N/A"}
                                email={student.email || "N/A"}
                                mobileNo={student.mobileNo || "N/A"}
                                internshipName={selectedEnrollment.internship.name}
                              />
                            }
                            fileName={`Kodefort_Offer_Letter_${student.registrationNo || "student"}.pdf`}
                            className="group relative flex items-center gap-2 bg-white text-orange-600 px-5 py-2.5 rounded-full font-bold text-base shadow-lg shadow-orange-500/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 border-2 border-orange-300 z-10"
                          >
                            {({ loading }) => (
                              <div className="relative z-20 flex items-center gap-2">
                                {loading ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Loading...
                                  </>
                                ) : (
                                  <>
                                    <FileText className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                                    Offer Letter
                                  </>
                                )}
                              </div>
                            )}
                          </PDFDownloadLink>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Video Lessons */}
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Video Lessons
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedEnrollment.internship.tasks
                      .filter(task => task.youtubeUrl)
                      .map((task) => {
                        const isCompleted = selectedEnrollment.completedTasks?.some(ct => ct.taskId === task.id);
                        return (
                        <div 
                          key={task.id} 
                          className={`bg-white border-2 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${isCompleted ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-orange-300'}`}
                        >
                          {/* Thumbnail */}
                          <div className="relative aspect-video bg-slate-100">
                            {task.youtubeUrl && (
                              <iframe
                                width="100%"
                                height="100%"
                                src={task.youtubeUrl}
                                title={task.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                              ></iframe>
                            )}
                            {/* Status Badge & Checkbox */}
                            <div className="absolute top-4 left-4 flex items-center gap-3">
                              <button
                                onClick={() => toggleTaskCompletion(task.id)}
                                disabled={togglingTaskId === task.id}
                                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${isCompleted ? 'bg-green-500 text-white hover:bg-green-600 scale-105' : 'bg-white text-slate-600 hover:bg-slate-100 border-2 border-slate-300 hover:border-orange-400'}`}
                              >
                                {togglingTaskId === task.id ? (
                                  <Loader2 className="w-6 h-6 animate-spin" />
                                ) : isCompleted ? (
                                  <Check className="w-7 h-7 font-bold" />
                                ) : (
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </button>
                              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-lg ${isCompleted ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                                {isCompleted ? (
                                  <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    Completed
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Pending
                                  </>
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Task Content */}
                          <div className="p-5">
                            <h3 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>
                              {task.order}. {task.title}
                            </h3>
                            <p className="text-sm text-slate-500 line-clamp-2">
                              {task.description}
                            </p>
                          </div>
                        </div>
                      )})}
                  </div>
                </div>

                {/* Assignments */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Assignments
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedEnrollment.internship.tasks
                      .filter(task => !task.youtubeUrl)
                      .map((task) => {
                        const isCompleted = selectedEnrollment.completedTasks?.some(ct => ct.taskId === task.id);
                        return (
                        <div 
                          key={task.id} 
                          className={`bg-white border-2 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${isCompleted ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-orange-300'}`}
                        >
                          {/* Thumbnail */}
                          <div className="relative aspect-video bg-slate-100">
                            <img 
                              src={internshipImages[selectedEnrollment.internship.name] || "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80"} 
                              alt={task.title} 
                              className="w-full h-full object-cover"
                            />
                            {/* Status Badge & Checkbox */}
                            <div className="absolute top-4 left-4 flex items-center gap-3">
                              <button
                                onClick={() => toggleTaskCompletion(task.id)}
                                disabled={togglingTaskId === task.id}
                                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${isCompleted ? 'bg-green-500 text-white hover:bg-green-600 scale-105' : 'bg-white text-slate-600 hover:bg-slate-100 border-2 border-slate-300 hover:border-orange-400'}`}
                              >
                                {togglingTaskId === task.id ? (
                                  <Loader2 className="w-6 h-6 animate-spin" />
                                ) : isCompleted ? (
                                  <Check className="w-7 h-7 font-bold" />
                                ) : (
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </button>
                              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-lg ${isCompleted ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                                {isCompleted ? (
                                  <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    Completed
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Assignment
                                  </>
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Task Content */}
                          <div className="p-5">
                            <h3 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: 'Creato Display, Outfit, sans-serif' }}>
                              {task.order}. {task.title}
                            </h3>
                            <p className="text-sm text-slate-500 line-clamp-2">
                              {task.description}
                            </p>
                          </div>
                        </div>
                      )})}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl shadow-xl shadow-orange-200/50 border border-orange-100 p-12 text-center max-w-2xl">
            <p className="text-xl md:text-2xl text-slate-700 mb-6">No enrollments found</p>
            <a href="/internship" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold text-lg hover:underline">
              Browse Internships
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
          <p className="text-xl text-slate-700 font-medium">Loading dashboard...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
