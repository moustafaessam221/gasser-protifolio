// "use client";
// import { motion } from "framer-motion";

// export default function Loading() {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <motion.div
//         className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"
//         initial={{ rotate: 0 }}
//         animate={{ rotate: 360 }}
//         transition={{
//           repeat: Infinity,
//           duration: 1,
//           ease: "linear",
//         }}
//       />
//     </div>
//   );
// }

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}
