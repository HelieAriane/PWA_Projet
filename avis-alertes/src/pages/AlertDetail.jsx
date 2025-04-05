import { useParams } from "react-router-dom"
import Header from "../layouts/Header"
import AlertItem from "../components/AlertItem"
import Footer from "../layouts/Footer";

function AlertDetail() {
  const { id } = useParams();

  return (
    <>      
      <main className="alert-detail">        
        <Header></Header> 
        <AlertItem alertId={id}></AlertItem>
        <Footer></Footer>
      </main>
    </>
  )
}

export default AlertDetail