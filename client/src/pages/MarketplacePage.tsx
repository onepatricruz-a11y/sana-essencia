import React, { useState, useEffect } from 'react';

// Product Interface
interface Product {
  id: string;
  title: string;
  brand: string;
  description: string;
  category: 'olfactory' | 'skin' | 'hair' | 'supplements' | 'exercise';
  amazonLink: string;
  imagePlaceholder: string;
  tags: string[];
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    brand: 'Tisserand Aromatherapy',
    title: 'MenoBalance Cooling Body Mist (100ml)',
    description: 'Enriched with cooling peppermint and calming clary sage oils. Formulated in the UK to physically cool skin down instantly during a hot flush while soothing emotional tension.',
    category: 'olfactory',
    amazonLink: 'https://www.amazon.co.uk/dp/YOUR_AFFILIATE_ID_HERE',
    imagePlaceholder: '🌬️',
    tags: ['Instant Cooling', 'Essential Oils', 'UK Made']
  },
  {
    id: '2',
    brand: 'Wild Nutrition',
    title: 'Food-Grown Perimenopause Complex',
    description: 'A premium, food-form supplement tailored for hormone regulation, reducing fatigue, and supporting emotional balance during the transitional years.',
    category: 'supplements',
    amazonLink: 'https://www.amazon.co.uk/dp/YOUR_AFFILIATE_ID_HERE',
    imagePlaceholder: '🌿',
    tags: ['Hormone Balance', 'Food-Grown', 'Vitamin B12']
  },
  {
    id: '3',
    brand: 'Weleda',
    title: 'Skin Food Intense Nourishing Cream',
    description: 'Deeply hydrates changing, estrogen-depleted skin. Perfect for dry zones, fine lines, and restoring natural skin barrier health.',
    category: 'skin',
    amazonLink: 'https://www.amazon.co.uk/dp/YOUR_AFFILIATE_ID_HERE',
    imagePlaceholder: '🧴',
    tags: ['Deep Hydration', 'Organic', 'Hormonal Dryness']
  },
  {
    id: '4',
    brand: 'Watermans',
    title: 'Grow Me Shampoo & Conditioner Set',
    description: 'UK manufactured premium hair care containing biotin, caffeine, and rosemary extract to target hormonal hair thinning and boost volume.',
    category: 'hair',
    amazonLink: 'https://www.amazon.co.uk/dp/YOUR_AFFILIATE_ID_HERE',
    imagePlaceholder: '💇‍♀️',
    tags: ['Thinning Hair', 'Biotin', 'UK Dispatched']
  },
  {
    id: '5',
    brand: 'Renpho',
    title: 'Under Desk Mini Exercise Bike & Pedal Exerciser',
    description: 'Compact, low-impact cardio tool designed to maintain bone density and joint mobility from the comfort of your sofa or home office desk.',
    category: 'exercise',
    amazonLink: 'https://www.amazon.co.uk/dp/YOUR_AFFILIATE_ID_HERE',
    imagePlaceholder: '🚴‍♀️',
    tags: ['Home Workout', 'Low Impact', 'Bone Health']
  }
];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Automatically read the category from the URL parameter (e.g., ?category=olfactory)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    if (catParam) {
      setActiveCategory(catParam);
    }
  }, []);

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* MANDATORY LEGAL DISCLOSURE BANNER (ASA & Amazon Compliant) */}
      <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2 text-xs text-center font-medium shadow-sm">
        ⚠️ Ad: As an Amazon Associate, this directory earns a small commission from qualifying purchases. 
        All items are fulfilled, packed, and dispatched directly from Amazon UK fulfilment centers.
      </div>

      <header className="max-w-6xl mx-auto px-4 pt-8 pb-4 text-center">
        <h1 className="text-3xl font-extrabold text-indigo-950 sm:text-4xl tracking-tight">
          Curated Perimenopause Essentials
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
          Expertly selected products to help target symptoms from the inside out. Evaluated for quality and speed of UK delivery.
        </p>
      </header>

      {/* CATEGORY BAR */}
      <div className="max-w-6xl mx-auto px-4 my-6 flex flex-wrap justify-center gap-2">
        {[
          { id: 'all', label: 'All Products' },
          { id: 'olfactory', label: '🌬️ Aromatherapy & Cooling' },
          { id: 'supplements', label: '🌿 Supplements' },
          { id: 'skin', label: '🧴 Skincare' },
          { id: 'hair', label: '💇‍♀️ Hair Support' },
          { id: 'exercise', label: '🚴‍♀️ Home Fitness' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeCategory === cat.id
                ? 'bg-indigo-950 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <main className="max-w-6xl mx-auto px-4 mt-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            No products listed in this section yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl mb-4">
                    {product.imagePlaceholder}
                  </div>
                  <span className="text-xs uppercase tracking-wider font-bold text-indigo-600">
                    {product.brand}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2 leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-6">
                    {product.tags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={product.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-3 px-4 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1"
                >
                  View on Amazon UK 
                  <span className="text-[10px] opacity-75">(Paid Link)</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
