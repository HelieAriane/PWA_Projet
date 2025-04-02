import './App.css'
import Header from './layouts/Header'
import SearchSection from './layouts/SearchSection'
import FilterSection from './layouts/FilterSection'
import SubscribeSection from './layouts/SubscribeSection'
import AlertSection from './layouts/AlertSection'

function App() {
  return (
    <>
      <Header></Header>
      <main>
        <SearchSection></SearchSection>
        <FilterSection></FilterSection>
        <SubscribeSection></SubscribeSection>
        <AlertSection></AlertSection>
      </main>
    </>
  )
}

export default App
