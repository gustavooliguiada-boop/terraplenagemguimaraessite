import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "João Silva",
    company: "Construtora Silva & Cia",
    location: "Belo Horizonte - MG",
    text: "A Terraplenagem Guimarães foi fundamental para o sucesso do nosso projeto. Equipamentos modernos, equipe qualificada e pontualidade impecável. Recomendo!",
    rating: 5,
    image: null,
  },
  {
    name: "Maria Santos",
    company: "Empreendimentos Santos",
    location: "Contagem - MG",
    text: "Trabalho com a Guimarães há mais de 5 anos. A qualidade dos serviços e a manutenção preventiva das máquinas garantem zero problemas nas obras. Parceria de confiança!",
    rating: 5,
    image: null,
  },
  {
    name: "Carlos Mendes",
    company: "Fazenda Santa Rita",
    location: "Sete Lagoas - MG",
    text: "Precisava de tratores para trabalho agrícola e a frota deles atendeu perfeitamente. Máquinas bem conservadas e preço justo. Voltarei a fazer negócio com certeza!",
    rating: 5,
    image: null,
  },
  {
    name: "Roberto Oliveira",
    company: "RO Construções",
    location: "Betim - MG",
    text: "Excelente atendimento desde o primeiro contato. A equipe é muito profissional e sempre disponível para ajudar. As máquinas chegaram no prazo e em perfeito estado.",
    rating: 5,
    image: null,
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-lg p-6 shadow-card hover:shadow-elevated transition-all duration-300 relative"
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 opacity-10">
        <Quote className="w-12 h-12 text-primary" />
      </div>

      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-muted-foreground italic mb-6 relative z-10">
        "{testimonial.text}"
      </p>

      {/* Client Info */}
      <div className="border-t border-border pt-4">
        <h4 className="font-display font-bold text-foreground">
          {testimonial.name}
        </h4>
        <p className="text-sm text-primary font-semibold">
          {testimonial.company}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {testimonial.location}
        </p>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [animationKey, setAnimationKey] = useState(0);

  // Reset animation when coming back into view
  useEffect(() => {
    if (isInView) {
      setAnimationKey(prev => prev + 1);
    }
  }, [isInView]);

  return (
    <section id="clientes" className="py-20 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          key={`header-${animationKey}`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-display text-sm tracking-widest uppercase mb-4">
            Depoimentos
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O QUE NOSSOS <span className="text-primary">CLIENTES</span> DIZEM
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A satisfação dos nossos clientes é nossa maior conquista. Veja o que eles têm a dizer sobre nossos serviços.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`${index}-${animationKey}`} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Faça parte dos nossos clientes satisfeitos!
          </p>
          <a
            href="#contato"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-display font-bold rounded hover:bg-primary/90 transition-colors duration-300 shadow-yellow hover:shadow-yellow-lg"
          >
            Solicitar Orçamento
          </a>
        </motion.div>
      </div>
    </section>
  );
}
