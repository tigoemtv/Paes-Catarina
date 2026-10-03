import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Instagram, Facebook, MessageCircle, 
  Wheat, Coffee, Utensils, Apple, PieChart, ChevronRight 
} from 'lucide-react';

// Injecting custom fonts for the rustic/elegant vibe
const FontStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
      
      .font-serif {
        font-family: 'Playfair Display', serif;
      }
      .font-sans {
        font-family: 'Lato', sans-serif;
      }
      
      /* Hide scrollbar for tab navigation on mobile */
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}
  </style>
);

const CATALOG_DATA = {
  paes: {
    id: 'paes',
    label: 'Pães',
    icon: <Wheat size={18} />,
    description: 'Nossos pães artesanais de fermentação lenta, feitos com carinho e tradição.',
    items: [
      {
        name: 'Pão Caseiro de Massa Doce',
        desc: 'Massa leve e fofinha, levemente adocicada. Perfeito para acompanhar um café fresco.',
        img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Pão Caseiro de Massa Salgada',
        desc: 'O tradicional pão de fazenda, com casca dourada e miolo macio.',
        img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Pão 100% Integral',
        desc: 'Rico em fibras, feito com farinha integral selecionada e grãos rústicos.',
        img: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Pão Doce Recheado',
        desc: 'Nossa massa doce fofinha, recheada generosamente com Goiabada ou Doce de Leite.',
        img: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Pão Salgado Recheado',
        desc: 'Recheio suculento e bem temperado de frango, envolto em nossa massa rústica salgada.',
        img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  cucas: {
    id: 'cucas',
    label: 'Cucas Alemãs',
    icon: <Coffee size={18} />,
    description: 'A autêntica receita alemã com muita farofa (Streusel) e recheios generosos.',
    items: [
      {
        name: 'Cuca de Banana',
        desc: 'Clássica e reconfortante, com fatias de banana caramelizadas e farofa crocante.',
        img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Cuca de Goiabada',
        desc: 'Massa macia contrastando com pedaços derretidos de goiabada cascão e farofa.',
        img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Cuca de Doce de Leite',
        desc: 'Uma explosão de sabor com o nosso doce de leite artesanal sob uma camada de Streusel.',
        img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  enrolados: {
    id: 'enrolados',
    label: 'Enrolados',
    icon: <Utensils size={18} />,
    description: 'Salgados assados fresquinhos, com massa leve que derrete na boca.',
    items: [
      {
        name: 'Enrolado de Presunto e Queijo',
        desc: 'O clássico que nunca falha. Queijo derretido e presunto de qualidade em massa macia.',
        img: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Enrolado de Frango com Queijo',
        desc: 'Frango desfiado suculento, bem temperado, acompanhado de queijo derretido.',
        img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Enrolado de Carne com Queijo',
        desc: 'Carne moída temperada com especiarias da casa, unida ao sabor do queijo.',
        img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  empadao: {
    id: 'empadao',
    label: 'Empadão',
    icon: <PieChart size={18} />,
    description: 'Massa quebradiça e amanteigada que desmancha, com recheio super cremoso.',
    items: [
      {
        name: 'Empadão de Frango',
        desc: 'Massa rústica inconfundível, escondendo um recheio de frango cremoso, azeitonas e temperos frescos.',
        img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  geleias: {
    id: 'geleias',
    label: 'Geleias',
    icon: <Apple size={18} />,
    description: 'Feitas com frutas selecionadas e redução lenta, preservando a essência da natureza.',
    items: [
      {
        name: 'Geleia de Morango',
        desc: 'Pedaços inteiros de morango em uma geleia brilhante, no ponto perfeito de doçura.',
        img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Geleia de Uva',
        desc: 'Intensa e saborosa, feita com uvas frescas. Perfeita para harmonizar com nossos pães.',
        img: 'https://images.unsplash.com/photo-1598835483664-d7d498c4b26a?auto=format&fit=crop&q=80&w=800'
      }
    ]
  }
};

const HeroSection = () => (
  <div className="relative w-full h-[35vh] md:h-[45vh] bg-stone-900 overflow-hidden border-b-[6px] border-[#2C4C63]/70">
    <div className="absolute inset-0">
      <img 
        src="image_8eb881.jpg" 
        alt="Pães Catarina - Aconchego e Tradição" 
        className="w-full h-full object-cover opacity-90 object-top"
      />
      {/* Lighter gradient overlay to let the illustration shine while keeping text readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent" />
    </div>
    <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-6 pb-10 md:pb-12">
       <h1 className="text-amber-50 font-serif text-3xl md:text-5xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-3">
         Bem-vindo ao nosso Lar
       </h1>
       <p className="text-amber-100/95 font-sans text-base md:text-lg max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
         Tradição, afeto e receitas caseiras que aquecem a alma. Conheça nossos produtos artesanais.
       </p>
    </div>
  </div>
);

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/5531986398494" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe57] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
    aria-label="Encomende pelo WhatsApp"
  >
    <MessageCircle size={32} />
    <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out pl-0 group-hover:pl-2 font-medium font-sans">
      Faça sua Encomenda
    </span>
  </a>
);

const InteractiveBreadCard = ({ item }) => {
  return (
    <div className="group relative w-full aspect-square overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-[#e8dbcc] border-[3px] border-amber-900/10">
      {/* Background Image with Zoom on Hover */}
      <img 
        src={item.img} 
        alt={item.name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
      />
      
      {/* Dark overlay that appears on hover */}
      <div className="absolute inset-0 bg-stone-900/20 transition-colors duration-500 group-hover:bg-amber-950/80" />
      
      {/* Default State (Visible on mobile without hover, pushed down on desktop hover) */}
      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-stone-900/90 to-transparent transition-opacity duration-500 group-hover:opacity-0">
        <h3 className="text-white font-serif text-xl font-semibold drop-shadow-md">{item.name}</h3>
      </div>

      {/* Hover State Content (Centered, reveals on hover) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 transform translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
        <h3 className="text-amber-100 font-serif text-2xl md:text-3xl font-bold mb-3 drop-shadow-lg">
          {item.name}
        </h3>
        <p className="text-amber-50 font-sans text-sm md:text-base opacity-90 mb-4">
          {item.desc}
        </p>
        <div className="mt-2 px-6 py-2 border-2 border-[#D35D47] text-white bg-[#D35D47]/90 backdrop-blur-sm text-sm uppercase tracking-widest rounded-full font-sans hover:bg-[#c04e39] hover:border-[#c04e39] transition-all duration-300 shadow-lg">
          Quero este!
        </div>
      </div>
    </div>
  );
};

const StandardProductCard = ({ item }) => (
  <div className="bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-amber-900/10 group relative">
    {/* Subtle inner decorative border to mimic a rustic menu/recipe card */}
    <div className="absolute inset-2 border border-dashed border-amber-900/20 rounded-xl pointer-events-none z-10 hidden sm:block"></div>
    <div className="relative h-56 overflow-hidden">
      <img 
        src={item.img} 
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-stone-900/10 transition-opacity duration-300 group-hover:opacity-0" />
    </div>
    <div className="p-6 flex-grow flex flex-col bg-transparent z-20">
      <h3 className="text-stone-800 font-serif text-xl font-bold mb-2 group-hover:text-amber-800 transition-colors">{item.name}</h3>
      <p className="text-stone-600 font-sans text-sm leading-relaxed mb-4 flex-grow">
        {item.desc}
      </p>
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('paes');
  const [isScrolled, setIsScrolled] = useState(false);

  // Fix the previously cut-off useEffect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const activeCategory = CATALOG_DATA[activeTab];

  return (
    <div className="min-h-screen bg-[#F4EFE8] font-sans text-stone-800">
      <FontStyles />

      {/* Header & Navigation */}
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3' 
            : 'bg-gradient-to-b from-stone-900/80 to-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className={`flex items-center gap-2 transition-colors duration-300 ${isScrolled ? 'text-amber-900' : 'text-amber-100'}`}>
            <Wheat size={28} className={isScrolled ? 'text-amber-700' : 'text-amber-400'} />
            <h1 className="font-serif text-2xl font-bold tracking-wide">Pães Catarina</h1>
          </div>

          {/* Navigation Tabs */}
          <nav className="w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <ul className="flex items-center gap-2 md:gap-4 min-w-max px-2">
              {Object.values(CATALOG_DATA).map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => setActiveTab(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === category.id
                        ? 'bg-[#2C4C63] text-white shadow-md transform scale-105'
                        : isScrolled
                          ? 'bg-amber-100/50 text-stone-600 hover:bg-amber-200/50 hover:text-amber-900'
                          : 'bg-stone-900/40 text-amber-50 hover:bg-stone-800/60'
                    }`}
                  >
                    {category.icon}
                    <span>{category.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {}
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Category Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="flex justify-center items-center gap-3 mb-4 text-[#D35D47]">
            <span className="h-px w-12 bg-[#D35D47]/60"></span>
            {activeCategory.icon}
            <span className="h-px w-12 bg-[#D35D47]/60"></span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            {activeCategory.label}
          </h2>
          <p className="font-sans text-lg text-stone-600">
            {activeCategory.description}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {activeCategory.items.map((item, index) => (
            <React.Fragment key={index}>
              {activeTab === 'paes' ? (
                <InteractiveBreadCard item={item} />
              ) : (
                <StandardProductCard item={item} />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Call to action at bottom of lists */}
        <div className="mt-16 text-center">
          <p className="text-stone-500 italic font-serif text-lg mb-6">
            "Sabor de casa, feito à mão para você."
          </p>
        </div>
      </main>

      {}
      {/* Footer */}
      <footer className="bg-stone-900 text-amber-50/70 py-12 border-t border-stone-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4 text-amber-50">
              <Wheat size={24} className="text-amber-500" />
              <span className="font-serif text-2xl font-bold">Pães Catarina</span>
            </div>
            <p className="font-sans text-sm max-w-xs text-center md:text-left">
              Padaria artesanal. Receitas caseiras preparadas com carinho e tradição.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-serif text-lg mb-4 text-amber-100">Siga-nos</h4>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-stone-800 rounded-full hover:bg-amber-700 hover:text-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-3 bg-stone-800 rounded-full hover:bg-amber-700 hover:text-white transition-colors duration-300">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-stone-500">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Pães Catarina. Todos os direitos reservados.
          </div>
          <div className="text-center md:text-right font-medium">
            <p>Dev: Thiago Pereira</p>
            <p>Ver. 2.0</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <WhatsAppButton />
    </div>
  );
}