import SubscribeButton from "../components/SubscribeButton";

function SubscribeSection() {
  return (
    <div className="subscribeSection">
      <h1>S'abonner aux alertes</h1>
      <p>Pour recevoir des avis et alertes par courriel ou texto, vous devez avoir créé un compte.</p>
      <SubscribeButton />
    </div>
  )
}

export default SubscribeSection;