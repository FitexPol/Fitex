// custom client scripts here
let dialog;

document.body.addEventListener('showModal', () => {
  dialog = document.getElementById('modal-portal');
  dialog.showModal();
  dialog.addEventListener('click', onDialogBackdropClick);
});

document.body.addEventListener('closeModal', () => closeModal());

function closeModal() {
  if (!dialog) throw new Error('Dialog not found');

  dialog.close();
  dialog.removeEventListener('click', onDialogBackdropClick);
}

function onDialogBackdropClick({ target }) {
  if (target !== dialog) return;

  dialog.close();
}

function removeIngredient(element) {
  const row = element.closest('li');
  row.remove();
}

function submitMealForm(event, form, mealId) {
  event.preventDefault();

  if (!htmx) throw new Error('Htmx not found');

  const [method, endpoint] = mealId ? ['PUT', `/api/meals/${mealId}`] : ['POST', '/api/meals'];

  htmx.ajax(method, endpoint, {
    target: '#meals-section',
    swap: 'outerHTML',
    values: parseFormData(new FormData(form)),
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
