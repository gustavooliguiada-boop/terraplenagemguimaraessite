import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Máquinas", href: "#maquinas", hasDropdown: true },
  { label: "Serviços", href: "#servicos" },
  { label: "Contato", href: "#contato" },
];

// Machine categories with their models
const machineCategories = [
  {
    name: "Escavadeiras",
    slug: "escavadeira",
    models: [
      { name: "Hyundai 140", slug: "hyundai-140" },
      { name: "Komatsu PC130", slug: "komatsu-pc130" },
      { name: "Hyundai 220", slug: "hyundai-220" },
      { name: "Komatsu PC200", slug: "komatsu-pc200" },
      { name: "Sany 135C", slug: "sany-135c" },
      { name: "Sany 215C", slug: "sany-215c" },
      { name: "Sany 215H", slug: "sany-215h" },
      { name: "CAT 320", slug: "cat-320" },
    ],
  },
  {
    name: "Carregadeiras",
    slug: "carregadeira",
    models: [
      { name: "Case W20E", slug: "case-w20e" },
      { name: "Case W20G", slug: "case-w20g" },
      { name: "NW 12D", slug: "nw-12d" },
      { name: "Hyundai 635 AL", slug: "hyundai-635-al" },
    ],
  },
  {
    name: "Motoniveladoras",
    slug: "motoniveladora",
    models: [
      { name: "New Holland RG170", slug: "new-holland-rg170" },
      { name: "Case 865B", slug: "case-865b" },
      { name: "Komatsu GD655", slug: "komatsu-gd655" },
      { name: "Cat 140", slug: "cat-140" },
      { name: "John Deere 620G", slug: "john-deere-620g" },
    ],
  },
  {
    name: "Retro-escavadeiras",
    slug: "retro-escavadeira",
    models: [
      { name: "Case", slug: "case-retro" },
      { name: "JCB", slug: "jcb-retro" },
      { name: "Sany", slug: "sany-retro" },
    ],
  },
  {
    name: "Rolos Compactadores",
    slug: "rolo-compactador",
    models: [
      { name: "Dynapac CA250", slug: "dynapac-ca250" },
      { name: "Dynapac CA150", slug: "dynapac-ca150" },
      { name: "XCMG XS120PD", slug: "xcmg-xs120pd" },
      { name: "Cat CS10G", slug: "cat-cs10g" },
      { name: "Cat CS533", slug: "cat-cs533" },
      { name: "JCB VM115", slug: "jcb-vm115" },
      { name: "Sany SSRD120 PD", slug: "sany-ssrd120-pd" },
    ],
  },
  {
    name: "Tratores de Esteira",
    slug: "trator-de-esteira",
    models: [
      { name: "Komatsu D61", slug: "komatsu-d61" },
      { name: "Cat D5", slug: "cat-d5" },
      { name: "Cat D6", slug: "cat-d6" },
      { name: "John Deere 750J", slug: "john-deere-750j" },
    ],
  },
  {
    name: "Tratores Agrícolas",
    slug: "trator-agricola",
    models: [
      { name: "Massey Ferguson 4295", slug: "massey-ferguson-4295" },
      { name: "Massey Ferguson 4310", slug: "massey-ferguson-4310" },
      { name: "New Holland T5100", slug: "new-holland-t5100" },
      { name: "New Holland T130", slug: "new-holland-t130" },
      { name: "Valtra A144", slug: "valtra-a144" },
      { name: "Valtra BH185I", slug: "valtra-bh185i" },
    ],
  },
  {
    name: "Caminhões",
    slug: "caminhao",
    models: [
      { name: "Caminhão Comboio 5000L", slug: "caminhao-comboio-5000l" },
      { name: "Caminhão Prancha", slug: "caminhao-prancha" },
    ],
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-secondary/95 backdrop-blur-md shadow-elevated py-3"
          : "bg-secondary/80 backdrop-blur-sm py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#inicio"
            onClick={(e) => handleNavClick(e, "#inicio")}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="/logo.png" 
              alt="Terraplenagem Guimarães" 
              className="h-12 w-auto md:h-14"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <motion.ul
            className="hidden lg:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navItems.map((item) => (
              <li 
                key={item.href}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => {
                  setActiveDropdown(null);
                  setHoveredCategory(null);
                }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-display text-secondary-foreground hover:text-primary transition-colors duration-300 tracking-wider text-sm uppercase relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>

                {/* Mega Menu Dropdown */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-secondary/95 backdrop-blur-md shadow-elevated rounded-lg overflow-hidden"
                    >
                      <div className="flex">
                        {/* Categories Column */}
                        <div className="w-56 border-r border-border/50">
                          {machineCategories.map((category) => (
                            <div
                              key={category.slug}
                              className={`px-4 py-3 hover:bg-primary/10 transition-colors cursor-pointer ${
                                hoveredCategory === category.slug ? 'bg-primary/10' : ''
                              }`}
                              onMouseEnter={() => setHoveredCategory(category.slug)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-secondary-foreground font-display">
                                  {category.name}
                                </span>
                                <ChevronRight className="w-4 h-4 text-primary" />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Models Column */}
                        <div className="w-64 p-4">
                          {hoveredCategory ? (
                            <div>
                              <h4 className="text-xs text-primary font-display uppercase tracking-wider mb-3">
                                Modelos Disponíveis
                              </h4>
                              <div className="space-y-2 max-h-96 overflow-y-auto">
                                {machineCategories
                                  .find((cat) => cat.slug === hoveredCategory)
                                  ?.models.map((model) => (
                                    <button
                                      key={model.slug}
                                      onClick={() => {
                                        navigate(`/maquinas/${hoveredCategory}/${model.slug}`);
                                        setActiveDropdown(null);
                                        setHoveredCategory(null);
                                      }}
                                      className="block w-full text-left px-3 py-2 text-sm text-secondary-foreground hover:text-primary hover:bg-primary/5 rounded transition-colors"
                                    >
                                      {model.name}
                                    </button>
                                  ))}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                              Passe o mouse sobre uma categoria
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </li>
            ))}
          </motion.ul>

          {/* CTA Button */}
          <motion.div
            className="hidden lg:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="tel:+553134959108" className="flex items-center gap-2 text-secondary-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span className="font-display text-sm">(31) 3495-9108</span>
            </a>
            <Button variant="default" size="sm" asChild>
              <a href="#contato">Orçamento</a>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-secondary-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <ul className="py-6 space-y-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block font-display text-secondary-foreground hover:text-primary transition-colors duration-300 tracking-wider text-lg uppercase py-2"
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="pt-4">
                  <Button variant="default" size="lg" className="w-full" asChild>
                    <a href="#contato">Solicitar Orçamento</a>
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
