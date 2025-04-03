import Header from "../layouts/Header"
import SubscribeSection from "../layouts/SubscribeSection"
import AlertSection from "../layouts/AlertSection"

function Home() {
  return (
    <>
      <Header></Header>
      <main>
        <AlertSection></AlertSection>
        <SubscribeSection></SubscribeSection>
      </main>
    </>
  )
}

export default Home
