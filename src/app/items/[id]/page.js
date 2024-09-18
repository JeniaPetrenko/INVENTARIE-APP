// //app/items/[id]/page.js

// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// export default function ItemPage() {
//   const [item, setItem] = useState(null);
//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     async function fetchItem() {
//       if (id) {
//         const response = await fetch(`/api/items/${id}`);
//         const data = await response.json();
//         setItem(data);
//       }
//     }
//     fetchItem();
//   }, [id]);

//   if (!item) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>{item.name}</h1>
//       <p>{item.description}</p>
//       <p>Quantity: {item.quantity}</p>
//     </div>
//   );
// }
