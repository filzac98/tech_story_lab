// document.addEventListener("DOMContentLoaded", () => {
//   // Function to create a box
//   function createBox(data) {
//     const template = document.querySelector("#boxTemplate").content;
//     const clone = template.cloneNode(true);
//     clone.querySelector(".box-title").textContent = data["product-name"]; // Adjust to match your data field
//     clone.querySelector(".box-image").src = `img/${data["img-name"]}`; // Use your local images
//     return clone;
//   }

//   // Fetch data from Supabase
//   fetch(
//     "https://acejtlhgjvpsfjgpqlxn.supabase.co/rest/v1/TSL?select=*&limit=3",
//     {
//       headers: {
//         apikey:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZWp0bGhnanZwc2ZqZ3BxbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwMzkzMjgsImV4cCI6MjA0MTYxNTMyOH0.1ZEJ_MTmeIVOHf_A_WZSX6DDi42H-7UJqVlyeflyPRE", // Replace with your correct API key
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZWp0bGhnanZwc2ZqZ3BxbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwMzkzMjgsImV4cCI6MjA0MTYxNTMyOH0.1ZEJ_MTmeIVOHf_A_WZSX6DDi42H-7UJqVlyeflyPRE", // Use the same key here
//       },
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Fetched products:", data);
//       const products = Array.isArray(data) ? data : [];
//       products.forEach((product) => {
//         const box = createBox(product);
//         document.querySelector(".kats").appendChild(box);
//       });
//     })
//     .catch((error) => console.error("Error fetching data:", error));
// });

document.addEventListener("DOMContentLoaded", () => {
  // Function to create a box
  function createBox(data) {
    const template = document.querySelector("#boxTemplate").content;
    const clone = template.cloneNode(true);

    // Update title and image based on fetched data
    clone.querySelector(".box-title").textContent = data["category"]; // Match your data field for product names
    clone.querySelector(".box-image").src = `img/${data["img-name"]}`; // Assuming your images are stored locally
    clone.querySelector(
      ".product-count"
    ).textContent = `${data["product-count"]} produkter tilgængelige`; // Add the product count if it's available in your data

    return clone;
  }

  // Fetch data from Supabase
  fetch(
    "https://acejtlhgjvpsfjgpqlxn.supabase.co/rest/v1/TSL?select=*&limit=5", // Fetch the first 5 products (adjust limit as needed)
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZWp0bGhnanZwc2ZqZ3BxbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwMzkzMjgsImV4cCI6MjA0MTYxNTMyOH0.1ZEJ_MTmeIVOHf_A_WZSX6DDi42H-7UJqVlyeflyPRE", // Replace with your correct API key
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZWp0bGhnanZwc2ZqZ3BxbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwMzkzMjgsImV4cCI6MjA0MTYxNTMyOH0.1ZEJ_MTmeIVOHf_A_WZSX6DDi42H-7UJqVlyeflyPRE", // Replace with your correct Bearer token
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched products:", data);
      const products = Array.isArray(data) ? data : [];
      products.forEach((product) => {
        const box = createBox(product);
        document.querySelector(".kats").appendChild(box);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
