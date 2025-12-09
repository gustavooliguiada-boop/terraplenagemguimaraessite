import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Machine models data
interface MachineModel {
  name: string;
  slug: string;
  image?: string; // Caminho para a imagem (opcional)
}

const machineModels: Record<string, { title: string; models: MachineModel[] }> = {
  escavadeira: {
    title: "Escavadeiras",
    models: [
      {
        name: "Hyundai 140",
        slug: "hyundai-140",
        image: "/images/escavadeiras/hyundai-140.png",
      },
      {
        name: "Komatsu PC130",
        slug: "komatsu-pc130",
        image: "/images/escavadeiras/komatsu-pc130.png",
      },
      {
        name: "Hyundai 220",
        slug: "hyundai-220",
        image: "/images/escavadeiras/hyundai-220.png",
      },
      {
        name: "Komatsu PC200",
        slug: "komatsu-pc200",
        image: "/images/escavadeiras/komatsu-pc200.png",
      },
      {
        name: "Sany 135C",
        slug: "sany-135c",
        image: "/images/escavadeiras/sany-135c.png",
      },
      {
        name: "Sany 215C",
        slug: "sany-215c",
        image: "/images/escavadeiras/sany-215c.png",
      },
      {
        name: "Sany 215H",
        slug: "sany-215h",
        image: "/images/escavadeiras/sany-215h.png",
      },
      {
        name: "CAT 320",
        slug: "cat-320",
        image: "/images/escavadeiras/cat-320.png",
      },
    ],
  },
  carregadeira: {
    title: "Carregadeiras",
    models: [
      {
        name: "Case W20E",
        slug: "case-w20e",
        image: "/images/carregadeiras/case-w20e.png",
      },
      {
        name: "Case W20G",
        slug: "case-w20g",
        image: "/images/carregadeiras/case-w20g.png",
      },
      {
        name: "NW 12D",
        slug: "nw-12d",
        image: "/images/carregadeiras/nw-12d.png",
      },
      {
        name: "Hyundai 635 AL",
        slug: "hyundai-635-al",
        image: "/images/carregadeiras/hyundai-635-al.png",
      },
    ],
  },
  motoniveladora: {
    title: "Motoniveladoras",
    models: [
      {
        name: "New Holland RG170",
        slug: "new-holland-rg170",
        image: "/images/motoniveladoras/new-holland-rg170.png",
      },
      {
        name: "Case 865B",
        slug: "case-865b",
        image: "/images/motoniveladoras/case-865b.png",
      },
      {
        name: "Komatsu GD655",
        slug: "komatsu-gd655",
        image: "/images/motoniveladoras/komatsu-gd655.png",
      },
      {
        name: "Cat 140",
        slug: "cat-140",
        image: "/images/motoniveladoras/cat-140.png",
      },
      {
        name: "John Deere 620G",
        slug: "john-deere-620g",
        image: "/images/motoniveladoras/john-deere-620g.png",
      },
    ],
  },
  "retro-escavadeira": {
    title: "Retro-escavadeiras",
    models: [
      {
        name: "Case",
        slug: "case-retro",
        image: "/images/retro-escavadeiras/case-retro.png",
      },
      {
        name: "JCB",
        slug: "jcb-retro",
        image: "/images/retro-escavadeiras/jcb-retro.png",
      },
      {
        name: "Sany",
        slug: "sany-retro",
        image: "/images/retro-escavadeiras/sany-retro.png",
      },
    ],
  },
  "rolo-compactador": {
    title: "Rolos Compactadores",
    models: [
      {
        name: "Dynapac CA250",
        slug: "dynapac-ca250",
        image: "/images/rolos-compactadores/dynapac-ca250.png",
      },
      {
        name: "Dynapac CA150",
        slug: "dynapac-ca150",
        image: "/images/rolos-compactadores/dynapac-ca150.png",
      },
      {
        name: "XCMG XS120PD",
        slug: "xcmg-xs120pd",
        image: "/images/rolos-compactadores/xcmg-xs120pd.png",
      },
      {
        name: "Cat CS10G",
        slug: "cat-cs10g",
        image: "/images/rolos-compactadores/cat-cs10g.png",
      },
      {
        name: "Cat CS533",
        slug: "cat-cs533",
        image: "/images/rolos-compactadores/cat-cs533.png",
      },
      {
        name: "JCB VM115",
        slug: "jcb-vm115",
        image: "/images/rolos-compactadores/jcb-vm115.png",
      },
      {
        name: "Sany SSRD120 PD",
        slug: "sany-ssrd120-pd",
        image: "/images/rolos-compactadores/sany-ssrd120-pd.png",
      },
    ],
  },
  "trator-de-esteira": {
    title: "Tratores de Esteira",
    models: [
      {
        name: "Komatsu D61",
        slug: "komatsu-d61",
        image: "/images/tratores-esteira/komatsu-d61.png",
      },
      {
        name: "Cat D5 (Modelo Novo)",
        slug: "cat-d5",
        image: "/images/tratores-esteira/cat-d5.png",
      },
      {
        name: "Cat D6",
        slug: "cat-d6",
        image: "/images/tratores-esteira/cat-d6.png",
      },
      {
        name: "John Deere 750J",
        slug: "john-deere-750j",
        image: "/images/tratores-esteira/john-deere-750j.png",
      },
    ],
  },
  "trator-agricola": {
    title: "Tratores Agrícolas",
    models: [
      {
        name: "Massey Ferguson 4295",
        slug: "massey-ferguson-4295",
        image: "/images/tratores-agricolas/massey-ferguson-4295.png",
      },
      {
        name: "Massey Ferguson 4310",
        slug: "massey-ferguson-4310",
        image: "/images/tratores-agricolas/massey-ferguson-4310.png",
      },
      {
        name: "New Holland T5100",
        slug: "new-holland-t5100",
        image: "/images/tratores-agricolas/new-holland-t5100.png",
      },
      {
        name: "New Holland T130",
        slug: "new-holland-t130",
        image: "/images/tratores-agricolas/new-holland-t130.png",
      },
      {
        name: "Valtra A144",
        slug: "valtra-a144",
        image: "/images/tratores-agricolas/valtra-a144.png",
      },
      {
        name: "Valtra BH185I",
        slug: "valtra-bh185i",
        image: "/images/tratores-agricolas/valtra-bh185i.png",
      },
    ],
  },
  caminhao: {
    title: "Caminhões",
    models: [
      {
        name: "Caminhão Comboio 5000L",
        slug: "caminhao-comboio-5000l",
        image: "/images/caminhoes/caminhao-comboio-5000l.png",
      },
      {
        name: "Caminhão Prancha para Transporte",
        slug: "caminhao-prancha",
        image: "/images/caminhoes/caminhao-prancha.png",
      },
    ],
  },
};

const MachineDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const machineData = slug ? machineModels[slug] : null;

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!machineData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Máquina não encontrada</h1>
          <button
            onClick={() => navigate("/")}
            className="text-primary hover:underline"
          >
            Voltar para início
          </button>
        </div>
      </div>
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
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar</span>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-display text-sm tracking-widest uppercase mb-4">
              Modelos Disponíveis
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {machineData.title}
            </h1>
          </motion.div>

          {/* Models Grid */}
          {machineData.models.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {machineData.models.map((model, index) => (
                <motion.div
                  key={model.slug}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg bg-card shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/maquinas/${slug}/${model.slug}`)}
                >
                  {/* Content Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted flex items-center justify-center">
                    {model.image ? (
                      <>
                        <img
                          src={model.image}
                          alt={model.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                        {/* Model Name Overlay when no image */}
                        <div className="relative z-10 text-center p-4">
                          <h3 className="font-display text-xl font-bold text-foreground">
                            {model.name}
                          </h3>
                        </div>
                      </>
                    )}

                    {/* Yellow Accent Line */}
                    <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-500 z-20" />
                  </div>

                  {/* Card Content */}
                  <div className="p-4 bg-card">
                    {model.image && (
                      <h3 className="font-display text-lg font-bold text-card-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                        {model.name}
                      </h3>
                    )}
                    <p className="text-sm text-muted-foreground text-center">
                      Clique para ver especificações
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                Modelos serão adicionados em breve.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default MachineDetails;
