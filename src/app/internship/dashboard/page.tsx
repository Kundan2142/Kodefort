"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  Download
} from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  youtubeUrl: string | null;
  order: number;
}

interface Internship {
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
  } | null;
}

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDownloadScreen, setShowDownloadScreen] = useState(false);
  // Keep track of whether we've shown the download screen already
  const [hasSeenDownloadScreen, setHasSeenDownloadScreen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const enrollmentIdFromQuery = searchParams.get("enrollmentId");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-xl text-slate-700 font-medium">Loading your dashboard...</p>
      </div>
    </div>
  );

  if (showDownloadScreen && selectedEnrollment) {
    const student = safeParseJSON(localStorage.getItem("student")) || {};
    const date = getCurrentDate();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Payment Successful!</h1>
          <p className="text-xl text-slate-600 mb-3">Congratulations on enrolling in the internship!</p>
          <p className="text-2xl font-bold text-blue-600 mb-8">{selectedEnrollment.internship.name}</p>
          
          <p className="text-slate-600 mb-10 text-lg">Download your payment receipt and offer letter below:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <PDFDownloadLink
                              document={
                                <PaymentReceiptPDF
                                  receiptId={`KF-${selectedEnrollment.id}-${selectedEnrollment.payment?.id || '0'}-${Date.now()}`}
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
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-200 hover:shadow-xl"
            >
              {({ loading }) => (
                loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Loading PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-6 h-6" />
                    Download Payment Receipt
                  </>
                )
              )}
            </PDFDownloadLink>
            <PDFDownloadLink
              document={
                <OfferLetterPDF
                  date={date}
                  studentName={student.name || "N/A"}
                  collegeName={student.collegeName || "N/A"}
                  registrationNo={student.registrationNo || "N/A"}
                  email={student.email || "N/A"}
                  mobileNo={student.mobileNo || "N/A"}
                  internshipName={selectedEnrollment.internship.name}
                />
              }
              fileName={`Kodefort_Offer_Letter_${student.registrationNo || "student"}.pdf`}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl"
            >
              {({ loading }) => (
                loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Loading PDF...
                  </>
                ) : (
                  <>
                    <FileText className="w-6 h-6" />
                    Download Offer Letter
                  </>
                )
              )}
            </PDFDownloadLink>
          </div>
          
          <button
            onClick={() => {
              setShowDownloadScreen(false);
            }}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg hover:underline"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
            Internship Dashboard
          </h1>
          <p className="text-xl text-slate-600">Track your progress and access your materials</p>
        </div>
        
        {selectedEnrollment ? (
          <div>
            {enrollments.length > 1 && (
              <div className="mb-8 w-full max-w-md mx-auto">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Select Internship
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all appearance-none bg-white"
                    value={selectedEnrollment.id}
                    onChange={(event) => setSelectedEnrollment(enrollments.find((enrollment) => enrollment.id === parseInt(event.target.value)) || null)}
                  >
                    {enrollments.map((enrollment) => (
                      <option key={enrollment.id} value={enrollment.id}>{enrollment.internship.name}</option>
                    ))}
                  </select>
                  <BookOpen className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 p-8 md:p-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                {selectedEnrollment.internship.name}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {selectedEnrollment.internship.description}
              </p>
              
              {selectedEnrollment.payment?.status !== "completed" ? (
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 p-8 rounded-2xl mb-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-amber-800 mb-2 flex items-center gap-2">
                        <CreditCard className="w-7 h-7" />
                        Payment Required
                      </h3>
                      <p className="text-amber-700">Please complete the payment of <span className="font-bold text-xl">₹500</span> to access the tasks</p>
                    </div>
                    <button
                      onClick={handlePayment}
                      disabled={isPaying}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isPaying ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-6 h-6" />
                          Pay Now with Razorpay
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Tasks</h3>
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        <Check className="w-4 h-4" />
                        Enrolled
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {selectedEnrollment && (() => {
                        const student = safeParseJSON(localStorage.getItem("student")) || {};
                        const date = getCurrentDate();
                        return (
                          <>
                            <PDFDownloadLink
                              document={
                                <PaymentReceiptPDF
                                  receiptId={`KF-${selectedEnrollment.id}-${selectedEnrollment.payment?.id || '0'}-${Date.now()}`}
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
                              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md"
                            >
                              {({ loading }) => (
                                loading ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Loading...
                                  </>
                                ) : (
                                  <>
                                    <Download className="w-4 h-4" />
                                    Download Payment Receipt
                                  </>
                                )
                              )}
                            </PDFDownloadLink>
                            <PDFDownloadLink
                              document={
                                <OfferLetterPDF
                                  date={date}
                                  studentName={student.name || "N/A"}
                                  collegeName={student.collegeName || "N/A"}
                                  registrationNo={student.registrationNo || "N/A"}
                                  email={student.email || "N/A"}
                                  mobileNo={student.mobileNo || "N/A"}
                                  internshipName={selectedEnrollment.internship.name}
                                />
                              }
                              fileName={`Kodefort_Offer_Letter_${student.registrationNo || "student"}.pdf`}
                              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                            >
                              {({ loading }) => (
                                loading ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Loading...
                                  </>
                                ) : (
                                  <>
                                    <FileText className="w-4 h-4" />
                                    Download Offer Letter
                                  </>
                                )
                              )}
                            </PDFDownloadLink>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {selectedEnrollment.internship.tasks.map((task) => (
                      <div key={task.id} className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all">
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                          <span className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-700 rounded-full font-bold text-lg">
                            {task.order}
                          </span>
                          {task.title}
                        </h4>
                        <p className="text-slate-600 mb-6 leading-relaxed">{task.description}</p>
                        
                        {task.youtubeUrl && (
                          <div className="aspect-video rounded-xl overflow-hidden shadow-md">
                            <iframe
                              width="100%"
                              height="100%"
                              src={task.youtubeUrl.replace("watch?v=", "embed/")}
                              title={task.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            ></iframe>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-12 text-center max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl text-slate-700 mb-6">No enrollments found</p>
            <a href="/internship" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-lg hover:underline">
              Browse Internships
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
