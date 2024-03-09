const notificationPortal = document.getElementById('notification-portal');

document.body.addEventListener('notification', ({ detail }) => {
  const messageNode = document.createElement('span');
  messageNode.textContent = decodeURIComponent(detail.message);

  const notification = document.createElement('div');
  notification.classList.add(detail.type);
  notification.appendChild(messageNode);

  notificationPortal.appendChild(notification);
  notificationPortal.show();

  setTimeout(() => {
    notificationPortal.removeChild(notification);

    if (notificationPortal.children.length > 0) return;

    notificationPortal.close();
  }, 2000);
});

const modalPortal = document.getElementById('modal-portal');

document.body.addEventListener('showModal', () => {
  modalPortal.showModal();
});

document.body.addEventListener('closeModal', () => {
  closeModal();
});

modalPortal.addEventListener('click', (e) => {
  if (e.target === modalPortal) closeModal();
});

function closeModal() {
  modalPortal.close();
}

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');
}

function removeRow(element) {
  const row = element.closest('li');
  row.remove();
}

function submitMealForm(event, method, endpoint) {
  event.preventDefault();

  const mealDetailsForm = document.getElementById('meal-details-form');
  const productForms = document.getElementById('products').querySelectorAll('form');

  const values = {
    ...getObjectFromForm(mealDetailsForm),
    products: getArrayAsJSON(productForms),
  };

  submitForm(method, endpoint, values);
}

function submitShoppingListForm(event, method, endpoint) {
  event.preventDefault();

  const shoppingListDetailsForm = document.getElementById('shopping-list-details-form');
  const productForms = document.getElementById('products').querySelectorAll('form');
  const mealForms = document.getElementById('meals').querySelectorAll('form');

  const values = {
    ...getObjectFromForm(shoppingListDetailsForm),
    products: getArrayAsJSON(productForms),
    meals: getArrayAsJSON(mealForms),
  };

  submitForm(method, endpoint, values);
}

function getArrayAsJSON(forms) {
  const array = [];

  forms.forEach((form) => {
    array.push(getObjectFromForm(form));
  });

  return JSON.stringify(array);
}

function getObjectFromForm(form) {
  const values = {};

  new FormData(form).forEach((value, key) => {
    values[key] = value;
  });

  return values;
}

function submitForm(method, endpoint, values) {
  if (!htmx) throw new Error('Htmx not found');

  htmx.ajax(method, endpoint, { values });
}

