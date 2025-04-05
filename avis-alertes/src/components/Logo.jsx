function Logo({ picture, fallbackText = "Logo ville de montréal"}) {
  return (
    <img src={picture} alt={fallbackText} className="logo-image" />
  )   
}

export default Logo;