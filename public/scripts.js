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
