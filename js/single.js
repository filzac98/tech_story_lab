// single.js
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id"); // Get the product ID from the URL

  const fetchProduct = async (id) => {
    try {
      const response = await fetch(
        `https://acejtlhgjvpsfjgpqlxn.supabase.co/rest/v1/TSL?id=eq.${encodeURIComponent(
          id
        )}`,
        {
          headers: {
            apikey: "YOUR_SUPABASE_API_KEY",
            Authorization: "Bearer YOUR_SUPABASE_AUTH_KEY",
          },
        }
      );
      const data = await response.json();
      return data[0]; // Assuming the response is an array with one object
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  const displayProduct = async () => {
    const product = await fetchProduct(productId);

    if (product) {
      // Update the HTML elements with the product data
      document.getElementById("productName").textContent =
        product["product-name"];
      document.getElementById("availability").textContent =
        product["availability"] || "N/A";
      document.getElementById(
        "productImage"
      ).src = `img/${product["img-name"]}`;
      document.getElementById("lens").textContent = product["lens"] || "N/A"; // Adjust field names based on your schema
      document.getElementById("productId").textContent = product["id"];
      document.getElementById("suitableFor").textContent =
        product["suitableFor"] || "N/A"; // Adjust field names based on your schema
    }
  };

  displayProduct();
});
