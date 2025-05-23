import Logo from "../components/Logo";
import logoFooter from "../assets/logo_footer.svg";

function Footer() {
  return (
    <footer>
      <div className="footer">
        <Logo picture={logoFooter} />
        <p>© 2025 Avis et alertes | Ville de Montréal. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

export default Footer;
