import { AppProvider } from "@/context/AppContext";
import { Layout } from "@/components/site/Layout";
import { ROUTES } from "@/constants/navigation";
import { useRoute } from "@/router";
import HomePage from "@/routes/index";
import SeerahPage from "@/routes/seerah";
import AqeedahPage from "@/routes/aqeedah";
import QuranPage from "@/routes/quran";
import FiqhPage from "@/routes/fiqh";
import SearchPage from "@/routes/search";
import FavoritesPage from "@/routes/favorites";
import AboutPage from "@/routes/about";

function Routes() {
  const { path } = useRoute();

  switch (path) {
    case ROUTES.seerah:
      return <SeerahPage />;
    case ROUTES.aqeedah:
      return <AqeedahPage />;
    case ROUTES.quran:
      return <QuranPage />;
    case ROUTES.fiqh:
      return <FiqhPage />;
    case ROUTES.search:
      return <SearchPage />;
    case ROUTES.favorites:
      return <FavoritesPage />;
    case ROUTES.about:
      return <AboutPage />;
    default:
      return <HomePage />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <Routes />
      </Layout>
    </AppProvider>
  );
}