import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Home from "./Home"

const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)

export default App
