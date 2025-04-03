import { useState } from "react";

function SubscribeButton({icon}) {
  const handleSubscribe = () => {
    alert("La fonctionnalité n'est pas encore disponible.")
  };

  return (
    <div>
      <button className="subscribeButton" onClick={handleSubscribe}>M'abonner
        <img src={icon} className="arrow-icon" />
      </button>
    </div>
  )
}

export default SubscribeButton;