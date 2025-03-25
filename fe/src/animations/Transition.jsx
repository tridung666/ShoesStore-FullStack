// // src/components/PageTransition.jsx
// import { motion } from "framer-motion";
// import PropTypes from "prop-types";

// const Transition = ({ children, className }) => {
//   return (
//     <motion.div
//       className={`w-full h-full ${className}`}
//       initial={{ opacity: 0, rotate: 180, scale: 0.8 }}
//       animate={{ opacity: 1, rotate: 0, scale: 1 }}
//       exit={{ opacity: 0, rotate: -180, scale: 0.8 }}
//       transition={{ duration: 0.6, ease: "easeInOut" }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// Transition.propTypes = {
//   children: PropTypes.node.isRequired,
//   className: PropTypes.string,
// };

// export default Transition;
