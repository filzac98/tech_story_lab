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
  fetch("https://acejtlhgjvpsfjgpqlxn.supabase.co/rest/v1/TSL?select=*", {
    headers: {
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZWp0bGhnanZwc2ZqZ3BxbHhuIiwicm9zZSI6ImFub24iLCJpYXQiOjE3MjYwMzkzMjgsImV4cCI6MjA0MTYxNTMyOH0.1ZEJ_MTmeIVOHf_A_WZSX6DDi42H-7UJqVlyeflyPRE",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZWp0bGhnanZwc2ZqZ3BxbHhuIiwicm9zZSI6ImFub24iLCJpYXQiOjE3MjYwMzkzMjgsImV4cCI6MjA0MTYxNTMyOH0.1ZEJ_MTmeIVOHf_A_WZSX6DDi42H-7UJqVlyeflyPRE",
    },
  })
    .then((res) => res.json())
    .then((products) => {
      const section = document.querySelector(".kats");
      products.forEach((product) => {
        const box = createBox(product);
        section.appendChild(box);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
