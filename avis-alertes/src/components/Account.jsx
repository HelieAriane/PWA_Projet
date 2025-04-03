function AccountLink({url, text, icon, fallbackText = "Icone de compte"}) {
  return (
      <a href={url} className="account-icon">
        <img src={icon} alt={fallbackText} className="account-icon-image" />
        <span className="account-text">{text}</span>
      </a>
  )
}

export default AccountLink;