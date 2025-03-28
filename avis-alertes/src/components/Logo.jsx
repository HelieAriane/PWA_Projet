function Logo({ pictureURL, fallbackText = "Logo ville de montréal"}) {
  return (
      <img src={pictureURL} alt={fallbackText} className="logo-image" />
  )   
}

export default Logo;