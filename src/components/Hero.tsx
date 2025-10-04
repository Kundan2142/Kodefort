// // export default function Hero() {
// //   return (
// //     <section className="text-center py-20">
// //       <h1 className="text-5xl font-bold text-blue-600">Welcome to Kodefort</h1>
// //       <p className="mt-4 text-lg text-gray-700">
// //         Empowering businesses with secure and innovative software solutions.
// //       </p>
// //       <a href="/contact" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
// //         Get in Touch
// //       </a>
// //     </section>
// //   );
// // }



// export default function Hero() {
//   return (
//     <section className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden" style={{ height: "80vh" }}>
//       <div className="absolute inset-0 animate-bg-pan"></div>
//       <div className="absolute inset-0 bg-black opacity-60"></div>
//       <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
//         <h1 className="text-6xl font-bold text-blue-400">Welcome to Kodefort</h1>
//         <p className="mt-6 text-2xl text-gray-200 max-w-3xl">
//           Empowering businesses with secure and innovative software solutions.
//         </p>
//         <a
//           href="/contact"
//           className="mt-8 inline-block bg-blue-600 text-white px-8 py-4 rounded-lg shadow hover:bg-blue-700 transition"
//         >
//           Get in Touch
//         </a>
//       </div>
//     </section>
//   );
// }




export default function Hero() {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden" style={{ height: "80vh" }}>
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-gradient-bg"></div>
        <div className="absolute inset-0 bg-black/60"></div> {/* dark overlay for readability */}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">Welcome to Kodefort</h1>
        <p className="mt-6 text-2xl text-gray-200 max-w-3xl drop-shadow-md">
          Empowering businesses with secure and innovative software solutions.
        </p>
        <a
          href="/contact"
          className="mt-8 inline-block bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Get in Touch
        </a>
      </div>

      {/* Optional: animated floating shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute w-40 h-40 bg-purple-400 rounded-full opacity-20 animate-ping-slow top-10 left-10"></div>
        <div className="absolute w-32 h-32 bg-pink-400 rounded-full opacity-15 animate-ping-slow top-40 right-20"></div>
        <div className="absolute w-48 h-48 bg-blue-400 rounded-full opacity-10 animate-ping-slow bottom-10 left-1/3"></div>
      </div>
    </section>
  );
}
