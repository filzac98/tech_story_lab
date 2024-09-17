document.addEventListener("DOMContentLoaded", () => {
  // Function to create a box
  function createBox(data) {
    const template = document.querySelector("#boxTemplate").content;
    const clone = template.cloneNode(true);
    clone.querySelector(".box-title").textContent = data["product-name"]; // Adjust to match your data field
    clone.querySelector(".box-image").src = `img/${data["img-name"]}`; // Use your local images
    return clone;
  }

  // Fetch data from Supabase
  fetch(
    "https://acejtlhgjvpsfjgpqlxn.supabase.co/rest/v1/TSL?select=*&limit=10",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZWp0bGhnanZwc2ZqZ3BxbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwMzkzMjgsImV4cCI6MjA0MTYxNTMyOH0.1ZEJ_MTmeIVOHf_A_WZSX6DDi42H-7UJqVlyeflyPRE", // Replace with your correct API key
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZWp0bGhnanZwc2ZqZ3BxbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwMzkzMjgsImV4cCI6MjA0MTYxNTMyOH0.1ZEJ_MTmeIVOHf_A_WZSX6DDi42H-7UJqVlyeflyPRE", // Use the same key here
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
