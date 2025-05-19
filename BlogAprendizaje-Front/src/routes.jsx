import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostPage from './pages/PostPage'
import NotFound from './pages/NotFound'
import PostDetail from './components/posts/PostDetail'
import Navbar from './components/Navbar'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/curso/:curso" element={<PostPage />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
