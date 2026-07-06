import HomePage from './pages/HomePage';
import SeoArticlePage from './pages/SeoArticlePage';

export default function App() {
  const isArticle = window.location.pathname.startsWith('/how-to-make-low-opacity-overlay-trend');
  return isArticle ? <SeoArticlePage /> : <HomePage />;
}
