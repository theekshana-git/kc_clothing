document.addEventListener('DOMContentLoaded', function() {
  let currentPage = 1;
  const limit = 20;
  const categoryId = 20;

  function fetchProducts(page) {
    fetch(`../../../../php/fetch_products.php?page=${page}&limit=${limit}&category_id=${categoryId}`)
      .then(response => response.json())
      .then(data => {
        const products = data.products;
        const totalProducts = data.total;
        const totalPages = Math.ceil(totalProducts / limit);

        console.log(products); // Log the fetched products
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = ''; // Clear existing content

        products.forEach(product => {
          const categoryPath = product.maincategory ? `${product.maincategory} > ${product.subcategory}` : product.subcategory;
          const productCard = `
            <a class="product-link" href="../../product-card.html?id=${product.id}" target="_parent">
              <div class="item" data-category="${categoryPath}" data-price="${product.price}">
                <div class="product-card">
                  <div class="image-container">
                    <img class="product-image" src="../../../..${product.image}" alt="${product.name}" />
                  </div>
                  <p class="product-class">${categoryPath}</p>
                  <p class="product-nametag">${product.name}</p>
                  <p class="price-tag">LKR ${product.price}</p>
                </div>
              </div>
            </a>
          `;

          // Insert the product card into the grid
          productGrid.insertAdjacentHTML('beforeend', productCard);
        });

        updatePaginationControls(totalPages);
      })
      .catch(error => console.error('Error fetching products:', error));
  }

  function updatePaginationControls(totalPages) {
    const paginationControls = document.querySelector('.pagination-controls');
    paginationControls.innerHTML = ''; // Clear existing controls

    const prevButton = document.createElement('li');
    prevButton.classList.add('page-item');
    if (currentPage === 1) {
      prevButton.classList.add('disabled');
    }
    prevButton.innerHTML = `<a class="page-link" href="#" tabindex="-1">Previous</a>`;
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        fetchProducts(currentPage);
      }
    });
    paginationControls.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('li');
      pageButton.classList.add('page-item');
      if (i === currentPage) {
        pageButton.classList.add('active');
      }
      pageButton.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      pageButton.addEventListener('click', () => {
        currentPage = i;
        fetchProducts(currentPage);
      });
      paginationControls.appendChild(pageButton);
    }

    const nextButton = document.createElement('li');
    nextButton.classList.add('page-item');
    if (currentPage === totalPages) {
      nextButton.classList.add('disabled');
    }
    nextButton.innerHTML = `<a class="page-link" href="#">Next</a>`;
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        fetchProducts(currentPage);
      }
    });
    paginationControls.appendChild(nextButton);
  }

  fetchProducts(currentPage);
});