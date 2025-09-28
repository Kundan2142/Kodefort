// // components/FaqAccordion.tsx
// "use client";
// import { useState } from 'react';

// const faqData = [
//   {
//     question: "What is Kodefort?",
//     answer: "Kodefort is a cybersecurity and software development company specializing in AI-driven solutions."
//   },
//   {
//     question: "How does Kodefort ensure data security?",
//     answer: "We implement end-to-end encryption, multi-factor authentication, and regular security audits."
//   },
//   {
//     question: "What AI technologies does Kodefort use?",
//     answer: "We utilize machine learning, natural language processing, and predictive analytics in our solutions."
//   },
//   {
//     question: "How can I contact Kodefort?",
//     answer: "You can reach us via email at support@kodefort.com or call us at +123456789."
//   }
// ];

// export default function FaqAccordion() {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const toggleAccordion = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-6">
//       <h2 className="text-3xl font-semibold text-center mb-6">Frequently Asked Questions</h2>
//       <div className="space-y-4">
//         {faqData.map((faq, index) => (
//           <div key={index} className="border-b border-gray-300">
//             <button
//               onClick={() => toggleAccordion(index)}
//               className="w-full text-left py-3 px-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
//             >
//               <span className="text-lg font-medium">{faq.question}</span>
//             </button>
//             {openIndex === index && (
//               <div className="py-3 px-4 bg-gray-50">
//                 <p className="text-gray-700">{faq.answer}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";

const faqData = [
  {
    question: "What is Kodefort?",
    answer:
      "Kodefort is a leading cybersecurity and software development company specializing in AI-driven solutions tailored to meet modern business needs. We combine industry expertise with cutting-edge technology to deliver secure and scalable software products.",
  },
  {
    question: "How does Kodefort ensure data security?",
    answer:
      "We prioritize data security through multiple layers of protection, including end-to-end encryption, multi-factor authentication, regular penetration testing, and compliance with global security standards. Our dedicated security team continuously monitors and updates protocols to guard against emerging threats.",
  },
  {
    question: "What AI technologies does Kodefort use?",
    answer:
      "Kodefort leverages a diverse set of AI technologies such as machine learning algorithms for predictive analytics, natural language processing to enhance user interactions, and deep learning for image and pattern recognition. Our AI solutions are designed to improve automation, decision-making, and operational efficiency.",
  },
  {
    question: "How can I contact Kodefort?",
    answer:
      "You can easily get in touch with us via email at kundan6391582@gmail.com or by calling +91 6207525287. Our customer support team is available all day from 9 AM to 6 PM to assist you with any inquiries or support requests.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-8xl mx-auto px-8 py-10">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-gray-900">
  Frequently Asked Questions
</h2>

      <div className="space-y-8">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="flex justify-between items-center w-full px-6 py-5 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <span className="text-xl font-semibold text-gray-800">
                {faq.question}
              </span>
              <svg
                className={`w-7 h-7 text-indigo-600 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openIndex === index && (
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className="px-6 py-6 bg-gray-50 text-gray-700 text-lg leading-relaxed"
              >
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
