import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import './App.css'
import router from './route'
import { RouterProvider } from 'react-router-dom'
import LanguageManager from './utils/LanguageManager'
function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
           <LanguageManager/>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )

}

export default App
