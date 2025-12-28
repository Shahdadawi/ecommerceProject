import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import './App.css'
import router from './route'
import { RouterProvider } from 'react-router-dom'
function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )

}

export default App
