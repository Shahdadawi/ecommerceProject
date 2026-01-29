import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'
import './App.css'
import router from './route'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import LanguageManager from './utils/LanguageManager'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import useThemeStore from './store/useThemeStore'
import getTheme from './theme'
function App() {

    const queryClient = new QueryClient()
    const mode = useThemeStore((state)=>state.mode);
    const theme = getTheme(mode);

    return (
        <QueryClientProvider client={queryClient}>
            <LanguageManager />
            <ReactQueryDevtools initialIsOpen={false} />
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <RouterProvider router={router} />
            </ThemeProvider>
        </QueryClientProvider>
    )

}

export default App
