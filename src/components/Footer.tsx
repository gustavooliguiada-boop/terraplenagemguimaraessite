import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const quickLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Máquinas", href: "#maquinas" },
  { label: "Serviços", href: "#servicos" },
  { label: "Contato", href: "#contato" },
];

export function Footer() {
  return (
    <footer className="bg-secondary py-16">
      {/* Industrial Stripe */}
      <div className="w-full h-2 industrial-stripes mb-12" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <img 
                src="/logo.png" 
                alt="Terraplenagem Guimarães" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-secondary-foreground/70 mb-6">
              Excelência em terraplenagem e locação de máquinas pesadas desde 1995.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-bold text-secondary-foreground mb-6 uppercase tracking-wider">
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-bold text-secondary-foreground mb-6 uppercase tracking-wider">
              Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div className="text-secondary-foreground/70">
                  <p>(31) 3495-9108</p>
                  <p>(31) 98658-3920</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-secondary-foreground/70 break-all">
                  contato@terraplenagemguimaraes.com.br
                </span>
              </li>
            </ul>
          </div>

          {/* Addresses */}
          <div>
            <h3 className="font-display text-lg font-bold text-secondary-foreground mb-6 uppercase tracking-wider">
              Endereços
            </h3>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-secondary-foreground/70 text-sm">
                    Rua Vinte e Dois, 22 – São Gabriel – Belo Horizonte / MG
                  </span>
                </div>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Rua+Santa+Luzia,+307,+Centro,+Santa+Luzia,+MG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-primary transition-colors group"
                >
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-secondary-foreground/70 text-sm group-hover:text-secondary-foreground">
                    Rua Santa Luzia, 307 – Centro – Santa Luzia / MG
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Rua+dos+Moreiras,+5,+Beija+Flor,+Belo+Horizonte,+MG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-primary transition-colors group"
                >
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-secondary-foreground/70 text-sm group-hover:text-secondary-foreground">
                    Rua dos Moreiras, 5 – Beija Flor – Belo Horizonte / MG
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-foreground/50 text-sm">
            © {new Date().getFullYear()} Terraplenagem Guimarães. Todos os direitos reservados.
          </p>
          <a
            href="https://wa.me/553134959108"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-display text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
