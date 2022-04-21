import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Home from "./Home"
import BookDetails from "./BookDetails"
import "./App.css"

const queryClient = new QueryClient()

const App = () => (
  <div id="app">
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="book/:bookId" element={<BookDetails />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  </div>
)

export default App
