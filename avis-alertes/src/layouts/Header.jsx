import Logo from "../components/Logo";
import logoHeader from "../assets/logo_header.svg";
import AccountLink from "../components/Account";
import accountIcon from "../assets/account_icon.svg";

function Header() {
  return (
    <header>
      <div className="header">
        <Logo picture={logoHeader} />
        <AccountLink url={"#"} icon={accountIcon} text={"Mon compte"} />
      </div>
    </header>
  )
}

export default Header;