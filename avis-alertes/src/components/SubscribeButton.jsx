import { useState } from "react";

function SubscribeButton() {
  const handleSubscribe = () => {
    alert("La fonctionnalité n'est pas encore disponible.")
  };

  return (
    <div>
      <button className="subscribeButton" onClick={handleSubscribe}>M'abonner</button>
    </div>
  )
}

export default SubscribeButton;