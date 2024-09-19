document.addEventListener("DOMContentLoaded", () => {
  const categoryUrlMap = {
    Studios: "studio.html",
    "Foto, Lys, Lyd & Video": "foto.html",
    "Computere og Enheder": "comp.html",
    "Avanceret Teknologi": "vr.html",
    "Strøm Forsyning og Kabler": "strom.html",
  };

  const fetchProducts = async (offset = 0, limit = 1000) => {
    try {
      const response = await fetch(
        `https://acejtlhgjvpsfjgpqlxn.supabase.co/rest/v1/TSL?select=*&limit=${limit}&offset=${offset}`,
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

  const aggregateProducts = async () => {
    let offset = 0;
    const limit = 1000;
    let hasMore = true;
    const categories = {};

    while (hasMore) {
      const products = await fetchProducts(offset, limit);
      if (products.length === 0) {
        hasMore = false;
      } else {
        products.forEach((product) => {
          if (!categories[product.category]) {
            categories[product.category] = { product: product, count: 0 };
          }
          categories[product.category].count += parseInt(
            product["product-count"]
          );
        });
        offset += limit;
      }
    }

    return categories;
  };

  const displayProducts = async () => {
    const categories = await aggregateProducts();

    Object.values(categories).forEach(({ product, count }) => {
      const box = createBox(product, count);
      document.querySelector(".cards-container").appendChild(box);
    });
  };

  // Function to create a box
  function createBox(data, count) {
    const template = document.querySelector("#boxTemplate").content;
    const clone = template.cloneNode(true);

    const category = data["category"];
    const boxTitle = clone.querySelector(".box-title");
    const cardImage = clone.querySelector(".card-image");
    const cardLink = clone.querySelector(".card-link");
    const arrowLink = clone.querySelector(".arrow-link");

    boxTitle.textContent = category;
    cardImage.src = `img/${data["img-name"]}`;
    cardLink.textContent = `${count} produkter tilgængelige`;

    // Set href attributes based on category
    const categoryUrl = categoryUrlMap[category] || "#"; // Default to "#" if not found
    cardLink.href = categoryUrl;
    arrowLink.href = categoryUrl;

    return clone;
  }

  displayProducts();
});
