import SubscribeButton from "../components/SubscribeButton";
import arrowIcon from "../assets/arrow_icon.svg";

function SubscribeSection() {
  return (
    <div className="subscribeSection">
      <h1>S'abonner aux alertes</h1>
      <p>Pour recevoir des avis et alertes par courriel ou texto, vous devez avoir créé un compte.</p>
      <SubscribeButton icon={arrowIcon}/>
    </div>
  )
}

export default SubscribeSection;