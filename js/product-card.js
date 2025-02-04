//adds the function to change main image

document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("main-image");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  let currentIndex = 0;

  // Update main image
  const updateMainImage = (index) => {
    const selectedThumbnail = thumbnails[index];
    mainImage.src = selectedThumbnail.src;
  };

  // Thumbnail click functionality
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      currentIndex = index;
      updateMainImage(currentIndex);
    });
  });

  // Previous button functionality
  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    updateMainImage(currentIndex);
  });

  // Next button functionality
  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    updateMainImage(currentIndex);
  });
});

const sizeButtons = document.querySelectorAll(".size-option");

sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    sizeButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");
  });
});


//Adding switchable photos for image gallery
const galleryImages = document.querySelectorAll(".image-gallery img");
const mainImage = document.querySelector(".main-image img");

galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    mainImage.src = img.src;
  });
});

//selecting color changes the color label
const colorRadios = document.querySelectorAll('input[name="color"]');
const colorLabel = document.querySelector(".label-container label");

colorRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    colorLabel.textContent = `COLOR: ${radio.value}`;
  });
});

//adds the add and decrement opreation into quantity
const quantityButton = document.querySelector(".quantity-button");
let quantity = 1;

quantityButton
  .querySelector("span:nth-child(1)")
  .addEventListener("click", () => {
    if (quantity > 1) quantity--;
    updateQuantity();
  });

quantityButton
  .querySelector("span:nth-child(3)")
  .addEventListener("click", () => {
    quantity++;
    updateQuantity();
  });

function updateQuantity() {
  quantityButton.querySelector("span:nth-child(2)").textContent = quantity;
}

//adds the feature for tabs to show diffrent content according to the label
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabs button");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Deactivate all tabs and hide all contents
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((content) => (content.style.display = "none"));

      // Activate the clicked tab and show the relevant content
      tab.classList.add("active");
      const tabId = tab.getAttribute("data-tab");
      document.getElementById(tabId).style.display = "block";
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  console.log('Product ID:', productId); // Add this line

  if (productId) {
    fetch(`../../php/fetch_products.php?id=${productId}`)
      .then(response => response.json())
      .then(productData => {
        console.log('Product Data:', productData); // Add this line
        if (productData) {
          document.querySelector('.product-name').textContent = productData.name;
          document.querySelector('.price').textContent = `LKR ${productData.price}`;
          document.getElementById('main-image').src = `../..${productData.image}`;
          document.querySelector('.breadcrumb').innerHTML = `
            <a href="#"><span class="breadcrumb-text">Home</span></a> &gt;
            <a href="#"><span class="breadcrumb-text">${productData.maincategory}</span></a> &gt;
            <a href="#"><span class="breadcrumb-text">${productData.subcategory}</span></a> &gt;
            <span class="breadcrumb-text">${productData.name}</span>
          `;

          // Add event listener for the "Add to Cart" button
          document.querySelector('.add-to-cart').addEventListener('click', () => {
            const selectedSize = document.querySelector('.size-option.active');
            if (!selectedSize) {
              alert('Please select a size before adding to cart.');
              return;
            }

            const product = {
              id: productId,
              name: productData.name,
              price: parseFloat(productData.price),
              size: selectedSize.textContent,
              quantity: 1,
              total: parseFloat(productData.price),
              img: document.getElementById('main-image').src
            };

            addToCart(product);
          });
        }
      })
      .catch(error => console.error('Error fetching product data:', error));
  } else {
    console.error('Product ID not found in URL.');
  }
});




function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find(item => item.id === product.id && item.size === product.size);

  if (existingProduct) {
    existingProduct.quantity += 1;
    existingProduct.total = existingProduct.quantity * existingProduct.price;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}