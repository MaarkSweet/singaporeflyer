document.addEventListener('click', function(event) {
    if (event.target.classList.contains('increase-btn')) {
        changeCount(event.target.parentElement, 1);
    } else if (event.target.classList.contains('decrease-btn')) {
        changeCount(event.target.parentElement, -1);
    }
});

document.addEventListener('click', function(event) {
  const target = event.target;

  if (target.classList.contains('increase-qua')) {
    const parentElement = target.parentElement;
    if (parentElement) {
      changeCount(parentElement, 1);
    }
  } else if (target.classList.contains('decrease-qua')) {
    const parentElement = target.parentElement;
    if (parentElement) {
      changeCount(parentElement, -1);
    }
  }
});


function changeCount(parentElement, change) {
    const countElement = parentElement.querySelector('.ticket-count');
    const type = countElement.dataset.type;
    const count = parseInt(countElement.textContent) + change;
    if (count >= 0) {
        countElement.textContent = count;
        updateCart();
    }
}

function validateAndAddToCart() {
  // Проверяем, есть ли хотя бы одна единица товара у всех аналогичных товаров
  const ticketCountElements = document.querySelectorAll('.ticket-count');
  let hasAtLeastOneTicket = false;

  ticketCountElements.forEach((ticketCountElement) => {
    const ticketCount = parseInt(ticketCountElement.innerText);
    if (ticketCount >= 1) {
      hasAtLeastOneTicket = true;
      return; // Если хотя бы у одного товара есть хотя бы одна единица, прекращаем проверку
    }
  });

  if (!hasAtLeastOneTicket) {
    const errItem = document.getElementById('itemError');
    errItem.style.display = "block";
    return;
  }

  // Проверяем, выбрана ли дата
  const selectedDateElement = document.querySelector('.content-date');
  const selectedDate = selectedDateElement ? selectedDateElement.innerText.trim() : '';
  if (selectedDate === 'Requires Date/Time') {
    const errDate = document.getElementById('dateError');
    errDate.style.display = "block";
    return;
  }

  // Если все проверки пройдены, добавляем в корзину
  addToCart();
  showCart();
}



function updateCart() {
  const cards = document.querySelectorAll('.man-info');
  const cartItemList = document.getElementById("cartItem");

  let cartContent = '';
  let subtotal = 0;
  let totalQuantity = 0;

  cards.forEach((card) => {
    const countElement = card.querySelector('.ticket-count');
    const olderThan13Tickets = parseInt(countElement.dataset.type === 'olderThan13Tickets' ? countElement.textContent : 0);
    const youngerThan13Tickets = parseInt(countElement.dataset.type === 'youngerThan13Tickets' ? countElement.textContent : 0);
    const price = parseInt(card.querySelector('.man_cart').dataset.price);

    if (olderThan13Tickets > 0 || youngerThan13Tickets > 0) {
      const totalPerItem = (olderThan13Tickets * price + youngerThan13Tickets * price).toFixed(2);
      subtotal += parseFloat(totalPerItem);
      totalQuantity += olderThan13Tickets + youngerThan13Tickets;

      const packageContent = card.querySelector('.package-content').innerHTML;

      cartContent += `
        <div class="man" style="margin-top: 15px;">
          <div class="man_cart" data-price="${price}">
            <h3>${card.querySelector('h3').textContent}</h3>
            <p class="toggle-package-content" onclick="togglePackage(this)">Package contents   ></p>
            <div class="package-content" style="display: none;">
              ${packageContent}
            </div>
          </div>
          <div class="price-own" style="margin-left: auto; display: flex;">
            <div class="price-cart" style="margin-top: 10px; display: block; 
    margin-right: 20px;">
              <h4">SGD ${totalPerItem}</h4> 
            </div>
            <div class="total-price" style="margin-top: 10px; display: block;">
              ${totalPerItem}<br>
            </div>
          </div>
        </div>
      `;
    }
  });

  // Рассчитываем налог (12% от общей стоимости)
  const tax = (subtotal * 0.12).toFixed(2);

  // Вычисляем общую стоимость с налогом
  const cartTotal = (subtotal - parseFloat(tax)).toFixed(2);

  const cartSummary = `
    <div class="total" style="margin-left: 0;">
      <h2 style="text-align: left;">Total</h2>
      <div class="cart-total">
        <div class="man">
          Subtotal: SGD ${cartTotal}
        </div>
        <div class="man">
          Tax: SGD ${tax}
        </div>
        <div class="man">
          Shipping: TBC
        </div>
        <div class="man">
          Total: SGD ${subtotal.toFixed(2)}
        </div>
      </div>
    </div>
  `;

  cartContent += cartSummary;
  cartItemList.innerHTML = cartContent;
  localStorage.setItem('cartTotal', subtotal);
}


function errorApply() {
  const errApply = document.getElementById('errApply')
  errApply.style.display = "block";
}

// Пример добавления в корзину
function addToCart() {
    updateCart();
    console.log("Товары добавлены в корзину.");
    showCart();
}
