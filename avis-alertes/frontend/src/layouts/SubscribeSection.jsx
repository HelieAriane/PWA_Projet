import { useState } from "react";
import SubscribeButton from "../components/SubscribeButton";
import SubscriptionModal from "../components/SubscriptionModal";
import arrowIcon from "../assets/arrow_icon.svg";
import { useEffect } from "react";

const VAPID_PUBLIC_KEY = "BPRvd5Guryvbw3eMSZvId6edGBx3_VKRKmEsIMLK3rKTxPggSzL4KilmdCIsDXOOEP-B8dN-eMsXoCfNdu7qbL0";

function SubscribeSection() {
  const [showModal, setShowModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [preferences, setPreferences] = useState({
    district: [],
    subject: []
  });

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready
        .then((registration) => registration.pushManager.getSubscription())
        .then(subscription => {
          if (subscription) {
            setIsSubscribed(true);
          }
        }).catch(console.error);
      }
    }, []);

  const handleSubscribe = () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      alert("Les notifications push ne sont pas supportées par votre navigateur.");
      return;
    }

    navigator.serviceWorker.ready.then((registration) =>
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: VAPID_PUBLIC_KEY
      })
    ).then(subscription => {
      fetch("http://localhost:3000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...subscription.toJSON(), preferences })
      }).then(() => {
        alert("Vous êtes maintenant abonné aux alertes.");
        setIsSubscribed(true);
        setShowModal(false);
      });
    }).catch(console.error);
  };

  const handleUnsubscribe = () => {
    navigator.serviceWorker.ready.then((registration) =>
      registration.pushManager.getSubscription()
    ).then(subscription => {
      if (subscription) {
        subscription.unsubscribe();
        fetch("http://localhost:3000/api/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ endpoint: subscription.endpoint })
        }).then(() => {
          alert("Vous êtes désabonné des alertes.");
          setIsSubscribed(false);
          setShowModal(false);
        });
      }
    }).catch(console.error);
  }

  return (
    <div className="subscribeSection">
      <h1>S'abonner aux alertes</h1>
      <p>Pour recevoir des avis et alertes par courriel ou texto, vous devez avoir créé un compte.</p>
      <SubscribeButton icon={arrowIcon} onClick={() => setShowModal(true)} />

      {showModal && (
        <SubscriptionModal
          onClose={() => setShowModal(false)}
          isSubscribed={isSubscribed}
          onSubscribe={handleSubscribe}
          onUnsubscribe={handleUnsubscribe}
          preferences={preferences}
          setPreferences={setPreferences}
        />
      )}
    </div>
  )
}

export default SubscribeSection;