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

function submitMealForm(event, method, endpoint, form) {
  event.preventDefault();

  const values = parseFormData(new FormData(form));

  if (!values.products) {
    values.products = JSON.stringify([]);
  }

  submitForm(method, endpoint, values);
}

function submitShoppingListForm(event, method, endpoint, form) {
  event.preventDefault();

  const values = parseFormData(new FormData(form));

  if (!values.meals) {
    values.meals = JSON.stringify([]);
  }

  if (!values.products) {
    values.products = JSON.stringify([]);
  }

  submitForm(method, endpoint, values);
}

function submitForm(method, endpoint, values) {
  if (!htmx) throw new Error('Htmx not found');

  htmx.ajax(method, endpoint, {
    target: 'closest section',
    swap: 'outerHTML',
    values,
  });
}

function parseFormData(formData) {
  const values = {};

  for (const [key, value] of formData.entries()) {
    const isArray = key.includes('[]');

    if (!isArray) {
      values[key] = value;
      continue;
    }

    const [rawMainKey, subKey] = key.split('.');
    const mainKey = rawMainKey.replace('[]', '');

    if (!values[mainKey]) values[mainKey] = {};
    if (!values[mainKey][subKey]) values[mainKey][subKey] = [];
    values[mainKey][subKey].push(value);
  }

  const output = Object.entries(values).reduce((acc, [key, value]) => {
    if (typeof value !== 'object') return { ...acc, [key]: value };

    const arr = [];

    Object.entries(value).forEach(([subKey, subValue]) => {
      subValue.forEach((v, i) => {
        if (!arr[i]) arr[i] = {};
        arr[i][subKey] = v;
      });
    });

    return { ...acc, [key]: JSON.stringify(arr) };
  }, {});

  return output;
}
