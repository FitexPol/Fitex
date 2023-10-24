export default function Navbar() {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Test', href: '/test' },
  ];

  return (
    <nav class="border-b border-b-slate-500">
      <ul>
        <li>
          <a href="/">
            <strong>Fitex</strong>
          </a>
        </li>
      </ul>
      <ul hx-boost="true">
        {navigation.map(({ href, name }) => (
          <li>
            <a href={href}>{name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
