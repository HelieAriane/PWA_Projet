import { useParams } from "react-router-dom"
import Header from "../layouts/Header"
import AlertItem from "../components/AlertItem"

function AlertDetail() {
  const { id } = useParams();

  return (
    <>
    <Header></Header>
    <main>
      <AlertItem alertId={id}></AlertItem>
    </main>
    </>
  )
}

export default AlertDetail