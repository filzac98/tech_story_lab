const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

fetch("https://kea-alt-del.dk/t7/api/products?category=" + category)
  .then((res) => res.json())
  .then(showProducts);

function showProducts(products) {
  //looper og kalder showProduct
  products.forEach(showProduct);
}

function showProduct(product) {
  const template = document.querySelector("#smallProductTemplate").content;
  const copy = template.cloneNode(true);
  copy.querySelector("h3").textContent = product.productdisplayname;

  if (product.soldout === 1) {
    copy.querySelector("article").classList.add("soldOut");
    copy.querySelector(".price span").textContent = "Sold Out";
  } else {
    copy.querySelector(".price span").textContent = product.price + " DKK";
    if (product.discount > 0) {
      copy.querySelector(".discounted span").textContent =
        product.discount + "% Off!";
      copy.querySelector(".price span").textContent =
        "Prev: " + product.price + " DKK";
      const discountedPrice = (
        product.price -
        (product.price * product.discount) / 100
      ).toFixed(2);
      copy.querySelector(".newprice span").textContent =
        "Now: " + discountedPrice + " DKK";
    }
  }
  copy.querySelector(".smallProduct .subtle").textContent =
    product.articletype + " | " + product.brandname;

  copy
    .querySelector(".read-more")
    .setAttribute("href", `product.html?id=${product.id}`);
  copy.querySelector(
    "img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

  document.querySelector("main").appendChild(copy);
}
