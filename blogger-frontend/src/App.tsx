import { Flex } from '@chakra-ui/react'
import './App.css'
import Header from './components/header/Header'

function App() {

  return (
    <Flex>
      <Header isLoggedIn={true} name='Jane Doe'/>
    </Flex>
    )
}

export default App
