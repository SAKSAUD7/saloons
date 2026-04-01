import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Generator from "@/pages/generator";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Gallery from "@/pages/gallery";
import Booking from "@/pages/booking";
import Contact from "@/pages/contact";
import { useEffect } from "react";
import { useSalonData } from "@/lib/useSalonData";

const queryClient = new QueryClient();

function ProtectedRoute({ component: Component, ...rest }: any) {
  const { data, loading } = useSalonData();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !data) {
      setLocation("/generator");
    }
  }, [data, loading, setLocation]);

  if (loading) return null;
  if (!data) return null;

  return <Component {...rest} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/generator" component={Generator} />
      <Route path="/" component={() => <ProtectedRoute component={Home} />} />
      <Route path="/about" component={() => <ProtectedRoute component={About} />} />
      <Route path="/services" component={() => <ProtectedRoute component={Services} />} />
      <Route path="/gallery" component={() => <ProtectedRoute component={Gallery} />} />
      <Route path="/booking" component={() => <ProtectedRoute component={Booking} />} />
      <Route path="/contact" component={() => <ProtectedRoute component={Contact} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
