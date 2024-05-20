import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <App />

        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
