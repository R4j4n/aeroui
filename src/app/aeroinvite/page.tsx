
// // import React from 'react'

// // export default function page() {
// //   return (
// //     // flex-col: On smaller screens, this makes the columns stack vertically.
// //     // md:flex-row: From medium screens (md breakpoint: 768px and up), the layout switches to horizontal columns
// //     // w-full: On small screens, both columns will take up the full width (100%), stacking on top of each other.
// //     // md:w-2/5 and md:w-3/5: On medium and larger screens, the columns go back to their respective 40% and 60% widths.


// //     <div className="min-h-screen flex flex-col md:flex-row p-4">

// //     <div className="w-full md:w-2/5 bg-white rounded-lg shadow-lg p-4 m-4">
// //       <h1 className="text-xl font-bold">40% Width Column</h1>

// //       <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
// //     </div>

// //     <div className="w-full md:w-3/5 bg-white rounded-lg shadow-lg p-4 m-4">
// //       <h1 className="text-xl font-bold">60% Width Column</h1>
// //       <p>This column takes up 60% of the screen width on medium and larger screens, but stacks on small screens.</p>
// //     </div>

// //   </div>



// //   )
// // }


// import React from 'react';

// export default function InvitationPage() {
//   return (
//     <div>
//       {/* Banner section */}
//       <div className="relative">
//         <img 
//           src="banner.jpg" 
//           alt="Banner Image" 
//           className="w-full h-48 object-cover" 
//         />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <h1 className="text-7x text-black font-bol  p-4 rounded-lg">
//             Create Your Birthday Invitation
//           </h1>
//         </div>
//       </div>

//       {/* Content area for input form and generated invitation */}
//       <div className="min-h-screen flex flex-col md:flex-row p-4">
        
//         {/* Left column: User input form */}
//         <div className="w-full md:w-2/5 bg-white rounded-lg shadow-lg p-6 m-4">
//           <h2 className="text-2xl font-bold mb-4">Enter Details</h2>
//           <form>
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-gray-700">Name</label>
//               <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded-lg" />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="event" className="block text-gray-700">Event</label>
//               <input type="text" id="event" className="w-full p-2 border border-gray-300 rounded-lg" />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="date" className="block text-gray-700">Date</label>
//               <input type="date" id="date" className="w-full p-2 border border-gray-300 rounded-lg" />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="venue" className="block text-gray-700">Venue</label>
//               <input type="text" id="venue" className="w-full p-2 border border-gray-300 rounded-lg" />
//             </div>
//             <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
//               Generate Invitation
//             </button>
//           </form>
//         </div>

//         {/* Right column: Generated invitation card */}
//         <div className="w-full md:w-3/5 bg-white rounded-lg shadow-lg p-6 m-4">
//           <h2 className="text-2xl font-bold mb-4">Preview Your Invitation</h2>
//           <div className="border border-gray-300 p-4 rounded-lg bg-gray-50">
//             {/* This will be where the invitation card is displayed after generation */}
//             <p className="text-gray-600">Your invitation will appear here.</p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


