import Logo from "../components/Logo";
import AccountLink from "../components/Account";
import accountIcon from "../assets/account_icon.svg";

function Header() {
  return (
    <header>
      <div className="header">
        <Logo pictureURL={"https://upload.wikimedia.org/wikipedia/fr/thumb/9/9c/Logo_Montr%C3%A9al.svg/563px-Logo_Montr%C3%A9al.svg.png?20180302011535"} />
        <AccountLink url={"#"} icon={accountIcon} text={"Mon compte"} />
      </div>
    </header>
  )
}

export default Header;