$(document).ready(function() {
  function updateCart() {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var $cartItems = $('#cart-items');
    var $cartSummary = $('#cart-summary');
    var $emptyCartMessage = $('#empty-cart-message');
    var subtotal = 0;
    var shipping = 300; // Example shipping cost

    $cartItems.empty();

    if (cartItems.length > 0) {
      $emptyCartMessage.hide();
      $cartSummary.show();

      cartItems.forEach(function(item) {
        subtotal += item.total;
        $cartItems.append(`
          <tr>
            <td class="col-sm-8 col-md-6">
              <div class="media">
                <a class="thumbnail pull-left" href="#"> <img class="media-object" src="${item.img}" style="width: 72px; height: 72px;"> </a>
                <div class="media-body">
                  <h4 class="media-heading"><a href="#">${item.name}</a></h4>
                  <span>Size: ${item.size}</span><br>
                  <span>Status: </span><span class="text-success"><strong>In Stock</strong></span>
                </div>
              </div>
            </td>
            <td class="col-sm-1 col-md-1" style="text-align: center">
              <input type="number" class="form-control quantity-input" value="${item.quantity}" min="1" data-id="${item.id}" data-size="${item.size}">
            </td>
            <td class="col-sm-1 col-md-1 text-center"><strong>LKR ${item.price.toFixed(2)}</strong></td>
            <td class="col-sm-1 col-md-1 text-center"><strong class="item-total">LKR ${item.total.toFixed(2)}</strong></td>
            <td class="col-sm-1 col-md-1">
              <button type="button" class="btn btn-danger remove-item" data-id="${item.id}" data-size="${item.size}">
                <span class="glyphicon glyphicon-remove"></span> Remove
              </button>
            </td>
          </tr>
        `);
      });

      $('#subtotal').text(`LKR ${subtotal.toFixed(2)}`);
      $('#shipping').text(`LKR ${shipping.toFixed(2)}`);
      $('#total').text(`LKR ${(subtotal + shipping).toFixed(2)}`);
    } else {
      $emptyCartMessage.show();
      $cartSummary.hide();
    }
  }

  function removeFromCart(productId, size) {
    console.log('Removing product with ID:', productId, 'and size:', size); // Debugging log
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Current cart:', cart); // Debugging log

    cart = cart.filter(item => {
      const shouldRemove = item.id === productId && item.size === size;
      console.log(`Checking item with ID: ${item.id} and size: ${item.size} - Should remove: ${shouldRemove}`); // Debugging log
      return shouldRemove;
    });

    console.log('Updated cart:', cart); // Debugging log
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }

  function updateQuantity(productId, size, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.map(item => {
      if (item.id === productId && item.size === size) {
        item.quantity = newQuantity;
        item.total = item.price * newQuantity;
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }

  $(document).on('click', '.remove-item', function() {
    const productId = $(this).data('id');
    const size = $(this).data('size');
    console.log('Remove button clicked for product ID:', productId, 'and size:', size); // Debugging log
    removeFromCart(productId, size);
  });

  $(document).on('change', '.quantity-input', function() {
    const productId = $(this).data('id');
    const size = $(this).data('size');
    const newQuantity = parseInt($(this).val());
    updateQuantity(productId, size, newQuantity);
  });

  updateCart();
});