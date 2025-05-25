function SubscribeButton({icon, onClick}) {
  return (
    <div>
      <button className="subscribeButton" onClick={onClick}>M'abonner
        <img src={icon} className="arrow-icon" />
      </button>
    </div>
  )
}

export default SubscribeButton;