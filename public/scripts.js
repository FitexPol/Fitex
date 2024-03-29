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

let loader = document.getElementById('loader');
let progressBar = loader.firstChild;
let progress = 0;
let animationDuration;
let interval;

document.addEventListener('htmx:beforeRequest', ({ detail }) => {
  if (!detail.boosted) return;

  loader = document.getElementById('loader');
  progressBar = loader.firstChild;

  animationDuration = 25;
  progressBar.style['transition-duration'] = `${animationDuration}ms`;
  loader.style.height = '2px';

  interval = setInterval(() => {
    progress += 0.1;
    progressBar.style.transform = `scaleX(${progress})`;

    if (progress >= 0.6) clearInterval(interval);
  }, animationDuration);
});

document.addEventListener('htmx:afterRequest', ({ detail }) => {
  if (!detail.boosted) return;

  clearInterval(interval);
  animationDuration = 150;
  progressBar.style['transition-duration'] = `${animationDuration}ms`;
  progressBar.style.transform = 'scaleX(1)';

  setTimeout(() => {
    loader.style.height = '0';
    progress = 0;
    progressBar.style.transform = 'scaleX(0)';
  }, animationDuration);
});

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');

  if (!menu.classList.contains('hidden')) {
    menu.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  }
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

function toggleAccordionItem(buttonElement) {
  const content = buttonElement.nextElementSibling;
  content.classList.toggle('hidden');

  buttonElement.querySelector('svg').style.transform = content.classList.contains('hidden')
    ? 'rotate(0deg)'
    : 'rotate(180deg)';
}
