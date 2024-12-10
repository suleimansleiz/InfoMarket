// import React, {} from "react";
// import "../App.css";

// const Home: React.FC = () => {
//   const renderCategory = (category: string, startIndex: number) => (
//     <div className="category-container mb-4">
//       <h5 className="category-title">{category}</h5>
//       <div className="position-relative">
//         {/* Left Scroll Button */}
//         <button
//           className="scroll-btn left-scroll"
//           onClick={() =>
//             document.getElementById(`${category}-cards`)?.scrollBy({
//               left: -850,
//               behavior: "smooth",
//             })
//           }
//         >
//           <i className="fas fa-chevron-left"></i>
//         </button>

//         {/* Cards */}
//         <div
//           className="cards-container"
//           id={`${category}-cards`}
//         >
//           {[...Array(6)].map((_, index) => (
//             <div
//               className="card-item"
//               key={index + startIndex}
//               onClick={() => console.log(`Clicked card ${index + startIndex}`)}
//             >
//               <img
//                 src="../assets/laptop.png"
//                 alt="Item"
//                 className="card-img"
//               />
//               <div className="card-content">
//                 <strong>Item {index + startIndex + 1}</strong>
//                 <p className="price">price in TZS</p>
//                 <div className="card-actions">
//                   <i className="arrow-icon fas fa-arrow-right"></i>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Right Scroll Button */}
//         <button
//           className="scroll-btn right-scroll"
//           onClick={() =>
//             document.getElementById(`${category}-cards`)?.scrollBy({
//               left: 850,
//               behavior: "smooth",
//             })
//           }
//         >
//           <i className="fas fa-chevron-right"></i>
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="home-content">
//       <h2 className="main-heading">All Items</h2>
//       {renderCategory("Accessories", 0)}
//       {renderCategory("Bags", 0)}
//       {renderCategory("Carteins", 0)}
//       {renderCategory("Computers", 0)}
//       {renderCategory("Phones", 0)}
//     </div>
//   );
// };

// export default Home;

import React from "react";

const Home: React.FC = () => {
  return <h1>Welcome to InfoMarket Home</h1>;
};

export default Home;
