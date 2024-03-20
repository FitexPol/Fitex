document.body.addEventListener('notification', ({ detail }) => {
  const notificationPortal = document.getElementById('notification-portal');
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

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');
}

function toggleSidePanel() {
  const sidePanel = document.getElementById('side-panel');
  sidePanel.classList.toggle('hidden');

  if (!sidePanel.classList.contains('hidden')) {
    sidePanel.addEventListener('click', () => {
      sidePanel.classList.add('hidden');
    });
  }
}

function updateAddToShoppingListLink(mealId) {
  const productList = document.getElementById(`products-${mealId}`);
  const checkboxes = productList.querySelectorAll('input');
  const queryParams = new URLSearchParams();

  checkboxes.forEach((checkbox, i) => {
    if (!checkbox.checked) return;

    queryParams.append(`product-${i}`, checkbox.name);
  });

  const link = document.getElementById(`add-to-shopping-list-${mealId}`);
  const url = new URL(link.href);
  
  link.href = queryParams.toString().length > 0 ? `${url.pathname}?${queryParams.toString()}` : url.pathname;
}
