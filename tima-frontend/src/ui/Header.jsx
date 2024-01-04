import MainNav from './MainNav';

function Header() {
  return (
    <header className="flex justify-between bg-primary-300 px-5 py-3 text-lg text-primary-900">
      <h1>TIMA | The Independent Musicians Assistant</h1>
      <MainNav />
    </header>
  );
}

export default Header;
