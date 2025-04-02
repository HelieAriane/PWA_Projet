import Header from "../layouts/Header"
import SubscribeSection from "../layouts/SubscribeSection"
import AlertSection from "../layouts/AlertSection"

function Home() {
  return (
    <>
      <Header></Header>
      <main>
        <SubscribeSection></SubscribeSection>
        <AlertSection></AlertSection>
      </main>
    </>
  )
}

export default Home
