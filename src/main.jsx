import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Provider/AuthProvider.jsx'
import router from './Router/router.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <QueryClientProvider client={queryClient}>
   <AuthProvider>
   <RouterProvider router={router}/>
   </AuthProvider>
   </QueryClientProvider>
  </React.StrictMode>,
)

// Auth provider is included. name the router file start with small r and router folder start with capital R.