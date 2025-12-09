import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Phone } from "lucide-react";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Specifications data for each model
interface Specification {
  label: string;
  value: string;
}

interface ModelData {
  name: string;
  machineType: string;
  image?: string;
  specifications: Specification[];
}

const modelsData: Record<string, ModelData> = {
  // Escavadeiras
  "hyundai-140": {
    name: "Hyundai 140",
    machineType: "Escavadeira",
    image: "/images/escavadeiras/hyundai-140.png",
    specifications: [
      { label: "Peso Operacional", value: "14.000 kg" },
      { label: "Potência do Motor", value: "92 HP" },
      { label: "Capacidade da Caçamba", value: "0,57 m³" },
      { label: "Alcance Máximo", value: "8,5 m" },
      // Adicione mais especificações aqui
    ],
  },
  "komatsu-pc130": {
    name: "Komatsu PC130",
    machineType: "Escavadeira",
    image: "/images/escavadeiras/komatsu-pc130.png",
    specifications: [
      { label: "Peso Operacional", value: "13.500 kg" },
      { label: "Potência do Motor", value: "90 HP" },
      { label: "Capacidade da Caçamba", value: "0,54 m³" },
      { label: "Alcance Máximo", value: "8,3 m" },
      // Adicione mais especificações aqui
    ],
  },
  "hyundai-220": {
    name: "Hyundai 220",
    machineType: "Escavadeira",
    image: "/images/escavadeiras/hyundai-220.png",
    specifications: [
      { label: "Peso Operacional", value: "22.000 kg" },
      { label: "Potência do Motor", value: "158 HP" },
      { label: "Capacidade da Caçamba", value: "1,0 m³" },
      { label: "Alcance Máximo", value: "10,2 m" },
      // Adicione mais especificações aqui
    ],
  },
  "komatsu-pc200": {
    name: "Komatsu PC200",
    machineType: "Escavadeira",
    image: "/images/escavadeiras/komatsu-pc200.png",
    specifications: [
      { label: "Peso Operacional", value: "21.000 kg" },
      { label: "Potência do Motor", value: "155 HP" },
      { label: "Capacidade da Caçamba", value: "0,93 m³" },
      { label: "Alcance Máximo", value: "10,0 m" },
      // Adicione mais especificações aqui
    ],
  },
  "sany-135c": {
    name: "Sany 135C",
    machineType: "Escavadeira",
    image: "/images/escavadeiras/sany-135c.png",
    specifications: [
      { label: "Peso Operacional", value: "13.500 kg" },
      { label: "Potência do Motor", value: "91 HP" },
      { label: "Capacidade da Caçamba", value: "0,55 m³" },
      { label: "Alcance Máximo", value: "8,4 m" },
      // Adicione mais especificações aqui
    ],
  },
  "sany-215c": {
    name: "Sany 215C",
    machineType: "Escavadeira",
    image: "/images/escavadeiras/sany-215c.png",
    specifications: [
      { label: "Peso Operacional", value: "21.500 kg" },
      { label: "Potência do Motor", value: "156 HP" },
      { label: "Capacidade da Caçamba", value: "0,95 m³" },
      { label: "Alcance Máximo", value: "10,1 m" },
      // Adicione mais especificações aqui
    ],
  },
  "sany-215h": {
    name: "Sany 215H",
    machineType: "Escavadeira",
    image: "/images/escavadeiras/sany-215h.png",
    specifications: [
      { label: "Peso Operacional", value: "21.800 kg" },
      { label: "Potência do Motor", value: "160 HP" },
      { label: "Capacidade da Caçamba", value: "0,98 m³" },
      { label: "Alcance Máximo", value: "10,3 m" },
      // Adicione mais especificações aqui
    ],
  },
  "cat-320": {
    name: "CAT 320",
    machineType: "Escavadeira",
    image: "/images/escavadeiras/cat-320.png",
    specifications: [
      { label: "Peso Operacional", value: "20.500 kg" },
      { label: "Potência do Motor", value: "148 HP" },
      { label: "Capacidade da Caçamba", value: "1,0 m³" },
      { label: "Alcance Máximo", value: "9,9 m" },
      { label: "Profundidade de Escavação", value: "6,7 m" },
      { label: "Altura de Escavação", value: "9,8 m" },
      // Adicione mais especificações aqui
    ],
  },
  
  // Carregadeiras
  "case-w20e": {
    name: "Case W20E",
    machineType: "Carregadeira",
    image: "/images/carregadeiras/case-w20e.png",
    specifications: [
      { label: "Peso Operacional", value: "19.500 kg" },
      { label: "Potência do Motor", value: "164 HP" },
      { label: "Capacidade da Caçamba", value: "3,1 m³" },
      { label: "Força de Ruptura", value: "16.800 kgf" },
    ],
  },
  "case-w20g": {
    name: "Case W20G",
    machineType: "Carregadeira",
    image: "/images/carregadeiras/case-w20g.png",
    specifications: [
      { label: "Peso Operacional", value: "19.700 kg" },
      { label: "Potência do Motor", value: "168 HP" },
      { label: "Capacidade da Caçamba", value: "3,2 m³" },
      { label: "Força de Ruptura", value: "17.000 kgf" },
    ],
  },
  "nw-12d": {
    name: "NW 12D",
    machineType: "Carregadeira",
    image: "/images/carregadeiras/nw-12d.png",
    specifications: [
      { label: "Peso Operacional", value: "12.500 kg" },
      { label: "Potência do Motor", value: "125 HP" },
      { label: "Capacidade da Caçamba", value: "2,3 m³" },
      { label: "Força de Ruptura", value: "13.500 kgf" },
    ],
  },
  "hyundai-635-al": {
    name: "Hyundai 635 AL",
    machineType: "Carregadeira",
    image: "/images/carregadeiras/hyundai-635-al.png",
    specifications: [
      { label: "Peso Operacional", value: "11.800 kg" },
      { label: "Potência do Motor", value: "120 HP" },
      { label: "Capacidade da Caçamba", value: "2,2 m³" },
      { label: "Força de Ruptura", value: "13.000 kgf" },
    ],
  },

  // Motoniveladoras
  "new-holland-rg170": {
    name: "New Holland RG170",
    machineType: "Motoniveladora",
    image: "/images/motoniveladoras/new-holland-rg170.png",
    specifications: [
      { label: "Peso Operacional", value: "15.500 kg" },
      { label: "Potência do Motor", value: "170 HP" },
      { label: "Comprimento da Lâmina", value: "3,7 m" },
      { label: "Entre-eixos", value: "6,1 m" },
    ],
  },
  "case-865b": {
    name: "Case 865B",
    machineType: "Motoniveladora",
    image: "/images/motoniveladoras/case-865b.png",
    specifications: [
      { label: "Peso Operacional", value: "14.800 kg" },
      { label: "Potência do Motor", value: "165 HP" },
      { label: "Comprimento da Lâmina", value: "3,7 m" },
      { label: "Entre-eixos", value: "6,0 m" },
    ],
  },
  "komatsu-gd655": {
    name: "Komatsu GD655",
    machineType: "Motoniveladora",
    image: "/images/motoniveladoras/komatsu-gd655.png",
    specifications: [
      { label: "Peso Operacional", value: "16.200 kg" },
      { label: "Potência do Motor", value: "175 HP" },
      { label: "Comprimento da Lâmina", value: "4,3 m" },
      { label: "Entre-eixos", value: "6,2 m" },
    ],
  },
  "cat-140": {
    name: "Cat 140",
    machineType: "Motoniveladora",
    image: "/images/motoniveladoras/cat-140.png",
    specifications: [
      { label: "Peso Operacional", value: "15.900 kg" },
      { label: "Potência do Motor", value: "172 HP" },
      { label: "Comprimento da Lâmina", value: "3,7 m" },
      { label: "Entre-eixos", value: "6,1 m" },
    ],
  },
  "john-deere-620g": {
    name: "John Deere 620G",
    machineType: "Motoniveladora",
    image: "/images/motoniveladoras/john-deere-620g.png",
    specifications: [
      { label: "Peso Operacional", value: "15.400 kg" },
      { label: "Potência do Motor", value: "168 HP" },
      { label: "Comprimento da Lâmina", value: "3,7 m" },
      { label: "Entre-eixos", value: "6,0 m" },
    ],
  },

  // Tratores de Esteira
  "komatsu-d61": {
    name: "Komatsu D61",
    machineType: "Trator de Esteira",
    image: "/images/tratores-esteira/komatsu-d61.png",
    specifications: [
      { label: "Peso Operacional", value: "16.500 kg" },
      { label: "Potência do Motor", value: "140 HP" },
      { label: "Capacidade da Lâmina", value: "3,5 m³" },
      { label: "Largura da Lâmina", value: "3,4 m" },
    ],
  },
  "cat-d5": {
    name: "Cat D5 (Modelo Novo)",
    machineType: "Trator de Esteira",
    image: "/images/tratores-esteira/cat-d5.png",
    specifications: [
      { label: "Peso Operacional", value: "10.500 kg" },
      { label: "Potência do Motor", value: "105 HP" },
      { label: "Capacidade da Lâmina", value: "2,8 m³" },
      { label: "Largura da Lâmina", value: "2,9 m" },
    ],
  },
  "cat-d6": {
    name: "Cat D6",
    machineType: "Trator de Esteira",
    image: "/images/tratores-esteira/cat-d6.png",
    specifications: [
      { label: "Peso Operacional", value: "20.500 kg" },
      { label: "Potência do Motor", value: "185 HP" },
      { label: "Capacidade da Lâmina", value: "4,8 m³" },
      { label: "Largura da Lâmina", value: "3,8 m" },
    ],
  },
  "john-deere-750j": {
    name: "John Deere 750J",
    machineType: "Trator de Esteira",
    image: "/images/tratores-esteira/john-deere-750j.png",
    specifications: [
      { label: "Peso Operacional", value: "12.800 kg" },
      { label: "Potência do Motor", value: "115 HP" },
      { label: "Capacidade da Lâmina", value: "3,0 m³" },
      { label: "Largura da Lâmina", value: "3,1 m" },
    ],
  },

  // Rolos Compactadores
  "dynapac-ca250": {
    name: "Dynapac CA250",
    machineType: "Rolo Compactador",
    image: "/images/rolos-compactadores/dynapac-ca250.png",
    specifications: [
      { label: "Peso Operacional", value: "10.500 kg" },
      { label: "Potência do Motor", value: "74 HP" },
      { label: "Largura de Compactação", value: "1,68 m" },
      { label: "Força Centrífuga", value: "250 kN" },
    ],
  },
  "dynapac-ca150": {
    name: "Dynapac CA150",
    machineType: "Rolo Compactador",
    image: "/images/rolos-compactadores/dynapac-ca150.png",
    specifications: [
      { label: "Peso Operacional", value: "7.200 kg" },
      { label: "Potência do Motor", value: "55 HP" },
      { label: "Largura de Compactação", value: "1,50 m" },
      { label: "Força Centrífuga", value: "150 kN" },
    ],
  },
  "xcmg-xs120pd": {
    name: "XCMG XS120PD",
    machineType: "Rolo Compactador",
    image: "/images/rolos-compactadores/xcmg-xs120pd.png",
    specifications: [
      { label: "Peso Operacional", value: "12.000 kg" },
      { label: "Potência do Motor", value: "92 HP" },
      { label: "Largura de Compactação", value: "1,70 m" },
      { label: "Força Centrífuga", value: "220 kN" },
    ],
  },
  "cat-cs10g": {
    name: "Cat CS10G",
    machineType: "Rolo Compactador",
    image: "/images/rolos-compactadores/cat-cs10g.png",
    specifications: [
      { label: "Peso Operacional", value: "10.200 kg" },
      { label: "Potência do Motor", value: "75 HP" },
      { label: "Largura de Compactação", value: "1,68 m" },
      { label: "Força Centrífuga", value: "200 kN" },
    ],
  },
  "cat-cs533": {
    name: "Cat CS533",
    machineType: "Rolo Compactador",
    image: "/images/rolos-compactadores/cat-cs533.png",
    specifications: [
      { label: "Peso Operacional", value: "9.800 kg" },
      { label: "Potência do Motor", value: "70 HP" },
      { label: "Largura de Compactação", value: "1,68 m" },
      { label: "Força Centrífuga", value: "190 kN" },
    ],
  },
  "jcb-vm115": {
    name: "JCB VM115",
    machineType: "Rolo Compactador",
    image: "/images/rolos-compactadores/jcb-vm115.png",
    specifications: [
      { label: "Peso Operacional", value: "11.500 kg" },
      { label: "Potência do Motor", value: "85 HP" },
      { label: "Largura de Compactação", value: "1,68 m" },
      { label: "Força Centrífuga", value: "210 kN" },
    ],
  },
  "sany-ssrd120-pd": {
    name: "Sany SSRD120 PD",
    machineType: "Rolo Compactador",
    image: "/images/rolos-compactadores/sany-ssrd120-pd.png",
    specifications: [
      { label: "Peso Operacional", value: "12.000 kg" },
      { label: "Potência do Motor", value: "90 HP" },
      { label: "Largura de Compactação", value: "1,70 m" },
      { label: "Força Centrífuga", value: "215 kN" },
    ],
  },

  // Tratores Agrícolas
  "massey-ferguson-4295": {
    name: "Massey Ferguson 4295",
    machineType: "Trator Agrícola",
    image: "/images/tratores-agricolas/massey-ferguson-4295.png",
    specifications: [
      { label: "Potência do Motor", value: "95 HP" },
      { label: "Tração", value: "4x4" },
      { label: "Capacidade de Levante", value: "2.800 kg" },
      { label: "Transmissão", value: "12x12 sincronizada" },
    ],
  },
  "massey-ferguson-4310": {
    name: "Massey Ferguson 4310",
    machineType: "Trator Agrícola",
    image: "/images/tratores-agricolas/massey-ferguson-4310.png",
    specifications: [
      { label: "Potência do Motor", value: "110 HP" },
      { label: "Tração", value: "4x4" },
      { label: "Capacidade de Levante", value: "3.200 kg" },
      { label: "Transmissão", value: "12x12 sincronizada" },
    ],
  },
  "new-holland-t5100": {
    name: "New Holland T5100",
    machineType: "Trator Agrícola",
    image: "/images/tratores-agricolas/new-holland-t5100.png",
    specifications: [
      { label: "Potência do Motor", value: "100 HP" },
      { label: "Tração", value: "4x4" },
      { label: "Capacidade de Levante", value: "3.000 kg" },
      { label: "Transmissão", value: "16x16 mecânica" },
    ],
  },
  "new-holland-t130": {
    name: "New Holland T130",
    machineType: "Trator Agrícola",
    image: "/images/tratores-agricolas/new-holland-t130.png",
    specifications: [
      { label: "Potência do Motor", value: "130 HP" },
      { label: "Tração", value: "4x4" },
      { label: "Capacidade de Levante", value: "3.800 kg" },
      { label: "Transmissão", value: "16x16 mecânica" },
    ],
  },
  "valtra-a144": {
    name: "Valtra A144",
    machineType: "Trator Agrícola",
    image: "/images/tratores-agricolas/valtra-a144.png",
    specifications: [
      { label: "Potência do Motor", value: "144 HP" },
      { label: "Tração", value: "4x4" },
      { label: "Capacidade de Levante", value: "4.200 kg" },
      { label: "Transmissão", value: "24x24 powershift" },
    ],
  },
  "valtra-bh185i": {
    name: "Valtra BH185I",
    machineType: "Trator Agrícola",
    image: "/images/tratores-agricolas/valtra-bh185i.png",
    specifications: [
      { label: "Potência do Motor", value: "185 HP" },
      { label: "Tração", value: "4x4" },
      { label: "Capacidade de Levante", value: "5.500 kg" },
      { label: "Transmissão", value: "24x24 powershift" },
    ],
  },

  // Retro-escavadeiras
  "case-retro": {
    name: "Case",
    machineType: "Retro-escavadeira",
    image: "/images/retro-escavadeiras/case-retro.png",
    specifications: [
      { label: "Peso Operacional", value: "8.500 kg" },
      { label: "Potência do Motor", value: "95 HP" },
      { label: "Profundidade de Escavação", value: "5,5 m" },
      { label: "Capacidade da Caçamba", value: "1,0 m³" },
    ],
  },
  "jcb-retro": {
    name: "JCB",
    machineType: "Retro-escavadeira",
    image: "/images/retro-escavadeiras/jcb-retro.png",
    specifications: [
      { label: "Peso Operacional", value: "8.200 kg" },
      { label: "Potência do Motor", value: "90 HP" },
      { label: "Profundidade de Escavação", value: "5,4 m" },
      { label: "Capacidade da Caçamba", value: "0,95 m³" },
    ],
  },
  "sany-retro": {
    name: "Sany",
    machineType: "Retro-escavadeira",
    image: "/images/retro-escavadeiras/sany-retro.png",
    specifications: [
      { label: "Peso Operacional", value: "8.000 kg" },
      { label: "Potência do Motor", value: "88 HP" },
      { label: "Profundidade de Escavação", value: "5,3 m" },
      { label: "Capacidade da Caçamba", value: "0,90 m³" },
    ],
  },

  // Caminhões
  "caminhao-comboio-5000l": {
    name: "Caminhão Comboio 5000L",
    machineType: "Caminhão",
    image: "/images/caminhoes/caminhao-comboio-5000l.png",
    specifications: [
      { label: "Capacidade do Tanque", value: "5.000 litros" },
      { label: "Tipo", value: "Comboio para água/combustível" },
      { label: "Chassi", value: "Truck" },
      { label: "Bomba", value: "Alta vazão" },
    ],
  },
  "caminhao-prancha": {
    name: "Caminhão Prancha para Transporte",
    machineType: "Caminhão",
    image: "/images/caminhoes/caminhao-prancha.png",
    specifications: [
      { label: "Capacidade de Carga", value: "25 toneladas" },
      { label: "Comprimento da Prancha", value: "8,5 m" },
      { label: "Tipo", value: "Prancha fixa" },
      { label: "Uso", value: "Transporte de máquinas pesadas" },
    ],
  },
};

const ModelSpecifications = () => {
  const { slug, modelSlug } = useParams<{ slug: string; modelSlug: string }>();
  const navigate = useNavigate();

  const modelData = modelSlug ? modelsData[modelSlug] : null;

  // Scroll to top when component mounts or modelSlug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [modelSlug]);

  if (!modelData) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Modelo não encontrado</h1>
            <button
              onClick={() => navigate("/")}
              className="text-primary hover:underline"
            >
              Voltar para início
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(`/maquinas/${slug}`)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar para {modelData.machineType}s</span>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-display text-sm tracking-widest uppercase mb-4">
              {modelData.machineType}
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {modelData.name}
            </h1>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-elevated bg-muted">
                {modelData.image ? (
                  <img
                    src={modelData.image}
                    alt={modelData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="text-center p-8">
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                        {modelData.name}
                      </h3>
                      <p className="text-muted-foreground">
                        Imagem em breve
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Specifications Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Especificações Técnicas
              </h2>
              
              <div className="space-y-4">
                {modelData.specifications.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex justify-between items-center p-4 bg-card rounded-lg shadow-card border-l-4 border-primary"
                  >
                    <span className="font-medium text-foreground">{spec.label}</span>
                    <span className="text-primary font-bold">{spec.value}</span>
                  </motion.div>
                ))}
              </div>

              {/* Contact CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20"
              >
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  Interessado neste modelo?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Entre em contato conosco para solicitar um orçamento ou tirar suas dúvidas.
                </p>
                <a
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/#contato");
                  }}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <Phone className="w-5 h-5" />
                  Solicitar Orçamento
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default ModelSpecifications;
