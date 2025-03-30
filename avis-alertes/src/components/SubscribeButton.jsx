import { useState } from "react";

function SubscribeButton() {
  const [message, setMessage] = useState("");

  const handleSubscribe = () => {
    setMessage("La fonctionnalité n'est pas encore disponible.")
  };

  return (
    <div>
      <button className="subscribeButton" onClick={handleSubscribe}>M'abonner</button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default SubscribeButton;