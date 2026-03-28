import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import PlumbingCursor from "./components/effects/PlumbingCursor";
import PageTransition from "./components/effects/PageTransition";

// Chargement immédiat : page d'accueil (critique)
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Lazy loading : pages secondaires (chargées à la demande)
const ServicesListPage = lazy(() => import("./pages/ServicesListPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const BlogListPage = lazy(() => import("./pages/BlogListPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const CitiesListPage = lazy(() => import("./pages/CitiesListPage"));
const CityPage = lazy(() => import("./pages/CityPage"));
const MentionsLegalesPage = lazy(() => import("./pages/MentionsLegalesPage"));
const PolitiqueConfidentialitePage = lazy(() => import("./pages/PolitiqueConfidentialitePage"));

// Fallback de chargement minimaliste (la PageTransition couvre visuellement)
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#06b6d4] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <PageTransition>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={ServicesListPage} />
          <Route path="/services/:slug" component={ServicePage} />
          <Route path="/blog" component={BlogListPage} />
          <Route path="/blog/:slug" component={BlogPostPage} />
          <Route path="/villes" component={CitiesListPage} />
          <Route path="/plombier-:slug" component={CityPage} />
          <Route path="/mentions-legales" component={MentionsLegalesPage} />
          <Route path="/politique-confidentialite" component={PolitiqueConfidentialitePage} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </PageTransition>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          {/* Curseur personnalisé plomberie – désactivé automatiquement sur mobile/tactile */}
          <PlumbingCursor />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
