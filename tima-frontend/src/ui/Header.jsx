import MainNav from './MainNav';

function Header() {
  return (
    <header className="flex h-14 justify-between border-b border-b-primary-100 bg-primary-900 px-5 py-3 text-lg text-primary-100">
      <h1>THEIMA | The Independent Musicians Assistant</h1>
      <MainNav />
    </header>
  );
}

export default Header;
