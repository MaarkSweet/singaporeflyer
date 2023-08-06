// Получаем ссылки на разделы меню
const categorySection = document.getElementById("category");
const ticketsSection = document.getElementById("tickets");
const cartSection = document.getElementById("cart");
const checkoutSection = document.getElementById("checkout");
const confirmSection = document.getElementById("confirm");
const cartBtn = document.getElementById("addToCartButton")

// Переключаем видимость разделов меню
function showCategory() {
  hideAllSections();
  categorySection.style.display = "block";
}

function showTickets() {
  hideAllSections();
  ticketsSection.style.display = "block";
  if (ticketsSection.style.display = "block") {
    cartBtn.style.display = "block";
  } else {
    cartBtn.style.display = "none";
  }
}

function showCart() {
  hideAllSections();
  cartSection.style.display = "block";
}

function showCheckout() {
  hideAllSections();
  checkoutSection.style.display = "block";
}

function showConfirm() {
  hideAllSections();
  confirmSection.style.display = "block";
}

// Функция для скрытия всех разделов
function hideAllSections() {
  categorySection.style.display = "none";
  ticketsSection.style.display = "none";
  cartSection.style.display = "none";
  checkoutSection.style.display = "none";
  confirmSection.style.display = "none";
  cartBtn.style.display = "none";
}



// Переменные для отслеживания состояния корзины
const cartItems = [];
let cartTotal = 0;

// Функция для добавления товара в корзину
function addToCart() {
  const ticketQuantity = parseInt(document.getElementById("ticketQuantity").value);
  const ticketDate = document.getElementById("ticketDate").value;

  if (ticketQuantity < 1 || ticketDate === "") {
    alert("Пожалуйста, выберите количество и дату перед добавлением в корзину.");
    return;
  }

  // Здесь можешь добавить логику для получения информации о товаре и его цене
  // Например:
  const ticketPrice = 10; // Предположим, что цена за один билет равна $10
  const totalPrice = ticketPrice * ticketQuantity;

  const cartItem = {
    name: "Ticket", // Здесь можно добавить название товара
    date: ticketDate,
    price: ticketPrice,
    quantity: ticketQuantity,
    total: totalPrice,
  };

  cartItems.push(cartItem);
  cartTotal += totalPrice;

  updateCartDisplay();
}

// Функция для обновления содержимого корзины на странице
function updateCartDisplay() {
  const cartItemsList = document.getElementById("cartItems");
  cartItemsList.innerHTML = "";

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price} x ${item.quantity} = $${item.total}`;
    cartItemsList.appendChild(li);
  });

  const cartTotalDisplay = document.getElementById("cartTotal");
  cartTotalDisplay.textContent = cartTotal;
}

// Функция для обновления корзины (добавление или обновление элементов)
function updateCart(item) {
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += item.quantity;
    existingItem.total = existingItem.price * existingItem.quantity;
  } else {
    const newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    };
    cartItems.push(newItem);
  }

  // Пересчитываем общую стоимость корзины
  cartTotal = cartItems.reduce((total, item) => total + item.total, 0);

  // Обновляем отображение корзины
  updateCartDisplay();
}


// Запускаем приложение, скрывая все разделы, кроме первого
hideAllSections();
showCategory();

let selectedEvent = null;

function addToTickets(eventName, eventDescription) {
  selectedEvent = { eventName, eventDescription };
  const ticketsSection = document.getElementById("tickets");
  const eventNameElement = document.getElementById("eventName");
  const eventDescriptionElement = document.getElementById("eventDescription");
  eventNameElement.textContent = eventName;
  eventDescriptionElement.textContent = eventDescription;
  showTickets();
}

function getDate() {
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const myCalendar = document.getElementById('ticketDate');
myCalendar.min = getTodayDate();

function togglePackage(element) {
  const packageContent = element.nextElementSibling;
  packageContent.style.display = packageContent.style.display === "none" ? "block" : "none";
}

function handleTicketClick(ticketButton, ticketDateId) {
  const ticketDateInput = document.getElementById(ticketDateId);
  const selectedDate = ticketDateInput.value; // Получаем выбранную дату из элемента input

  // Проверяем, есть ли дата в инпуте
  if (selectedDate) {
    // Получаем информацию из кнопки
    const timeLineElement = ticketButton.parentNode.querySelector('.timeline');
    const eventName = ticketButton.textContent.trim();

    const formattedDate = selectedDate;

    // Формируем строку с информацией о событии и устанавливаем её в элемент с классом "select-date-name"
    const selectDateNameElement = document.querySelector('.select-date-name');
    const contentDate = document.querySelector('.content-date');
    const backDate = document.querySelector('.btn-date');
    selectDateNameElement.textContent = `${eventName} ${formattedDate} ${timeLineElement.textContent.trim()}`;
    contentDate.textContent = `${formattedDate} ${timeLineElement.textContent.trim()}`;
    backDate.style.background = "#64daf6";

    closeModal();
  }
}


function closeModal() {
  const closeSecondElement = document.querySelector('.closeSecond');
  closeSecondElement.click();
}

// Функция для очистки выбранной даты и информации о событии
function clearSelection(ticketDateId) {
  const ticketDateInput = document.getElementById(ticketDateId);
  const ticket = document.querySelector('#myBtnSecond');
  const ticketName = document.querySelector('.select-date-name');
  ticketDateInput.value = "E - Select Date/Time"; // Очищаем значение выбранной даты
  ticketName.value = "E - Select Date/Time";
  ticket.style.background = "#444";

  // Очищаем информацию о событии в элементе с классом "select-date-name"
  const selectDateNameElement = document.querySelector('.select-date-name');
  selectDateNameElement.textContent = "";
}

  // Функция для проверки, все ли поля заполнены
  function isFormValid() {
    const formInputs = document.querySelectorAll('.checkout input, .checkout select');
    let isCheckboxChecked = false;

    formInputs.forEach((input) => {
      if (input.type === 'checkbox' && input.checked) {
        isCheckboxChecked = true;
      } else if (input.value.trim() === '') {
        return false;
      }
    });

    return isCheckboxChecked;
  }

  // Обработчик события для проверки формы и активации/деактивации кнопки
  function checkFormValidity() {
    const submitBtn = document.querySelector('.order-btn');
    if (isFormValid()) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  // Добавляем обработчики событий для полей формы и первого чекбокса
  const formInputs = document.querySelectorAll('.checkout input, .checkout select');
  formInputs.forEach((input) => {
    input.addEventListener('input', checkFormValidity);
  });
  document.querySelector('.box:nth-child(1) input').addEventListener('change', checkFormValidity);