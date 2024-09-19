document.addEventListener("DOMContentLoaded", () => {
  const categoryUrlMap = {
    Studios: "studio.html",
    "Foto, Lys, Lyd & Video": "foto.html",
    "Computere og Enheder": "comp.html",
    "Avanceret Teknologi": "vr.html",
    "Strøm Forsyning og Kabler": "strom.html",
  };

  // Get category name from URL
  const category = document.querySelector("main h1").textContent;

  const fetchProducts = async (category, limit = 50) => {
    try {
      const response = await fetch(
        `https://acejtlhgjvpsfjgpqlxn.supabase.co/rest/v1/TSL?select=*&category=eq.${encodeURIComponent(
          category
        )}&limit=${limit}`,
        {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZWp0bGhnanZwc2ZqZ3BxbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwMzkzMjgsImV4cCI6MjA0MTYxNTMyOH0.1ZEJ_MTmeIVOHf_A_WZSX6DDi42H-7UJqVlyeflyPRE",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZWp0bGhnanZwc2ZqZ3BxbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwMzkzMjgsImV4cCI6MjA0MTYxNTMyOH0.1ZEJ_MTmeIVOHf_A_WZSX6DDi42H-7UJqVlyeflyPRE",
          },
        }
      );
      return response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const displayProducts = async () => {
    const products = await fetchProducts(category);

    // Create a Set to track displayed product names
    const displayedNames = new Set();

    const container = document.querySelector(".cards-container");
    container.innerHTML = ""; // Clear any existing content

    products.forEach((product) => {
      // Only create and append the box if the product name hasn't been displayed yet
      if (!displayedNames.has(product["product-name"])) {
        displayedNames.add(product["product-name"]);
        const box = createBox(product);
        container.appendChild(box);
      }
    });
  };

  // Function to create a product box
  function createBox(product) {
    const template = document.querySelector("#boxTemplate").content;
    const clone = template.cloneNode(true);

    clone.querySelector(".box-title").textContent = product["product-name"]; // Updated to match your database column
    clone.querySelector(".card-image").src = `img/${product["img-name"]}`;
    clone.querySelector(".card-link").textContent = product["type"]; // Assuming product has a "description" field

    // Set all arrow links to point to single.html
    clone.querySelector(".arrow-link").href = "single.html";

    return clone;
  }

  displayProducts();
});
