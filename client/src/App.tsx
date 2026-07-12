import Home from "./pages/Home";

export default function App() {
  return <Home />;
}
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import MarketplacePage from "./pages/MarketplacePage";

export default function App() {
  const [showMarketplace, setShowMarketplace] = useState(false);

  useEffect(() => {
    // If the URL contains "marketplace" or a quiz category, show the marketplace page
    if (
      window.location.pathname.includes("marketplace") || 
      window.location.search.includes("category")
    ) {
      setShowMarketplace(true);
    }
  }, []);

  if (showMarketplace) {
    return <MarketplacePage />;
  }

  return <Home />;
}
