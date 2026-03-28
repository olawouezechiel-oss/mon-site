import { Link } from 'react-router-dom';
import { Mic, Sliders, Music2, Radio, MessageCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { modelenceQuery } from '@modelence/react-query';
import Page from '@/client/components/Page';
import logo from '@/client/assets/logo.png';

type ContactInfo = {
  email: string;
  whatsappNumber: string;
  phone: string;
  address: string;
};

export default function ServicesPage() {
  const { data: contactInfo } = useQuery({
    ...modelenceQuery<ContactInfo>('contact.getContactInfo'),
  });

  const whatsappLink = contactInfo?.whatsappNumber
    ? `https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=Bonjour%20OME-PROD%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20vos%20services.`
    : 'https://wa.me/22901451080064?text=Bonjour%20OME-PROD%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20vos%20services.';

  return (
    <Page className="bg-black p-0">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-600/5"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-yellow-500 text-sm font-semibold tracking-[0.2em] uppercase">Ce que nous proposons</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Nos Services
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto"></div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 px-4 bg-neutral-950">
        <div className="max-w-4xl mx-auto space-y-6">
          <ServiceCard
            icon={<Mic className="w-8 h-8" />}
            title="Enregistrement Audio"
            description="Capturez chaque note, chaque voix et chaque instrument avec notre equipement professionnel. Notre studio est equipe des dernieres technologies pour garantir une qualite sonore exceptionnelle."
          />

          <ServiceCard
            icon={<Sliders className="w-8 h-8" />}
            title="Mixage & Mastering"
            description="Nos ingenieurs audio peaufinent vos morceaux pour un rendu clair, equilibre et puissant. Nous utilisons des techniques professionnelles pour sublimer votre musique."
          />

          <ServiceCard
            icon={<Music2 className="w-8 h-8" />}
            title="Production Musicale"
            description="Composez, arrangez et produisez vos morceaux avec l'aide de nos experts en musique. De l'idee initiale au produit final, nous vous accompagnons a chaque etape."
          />

          <ServiceCard
            icon={<Radio className="w-8 h-8" />}
            title="Podcasts & Voice-over"
            description="Enregistrez vos podcasts, narrations et publicites avec un son limpide et professionnel. Nous offrons un environnement optimal pour tous vos projets vocaux."
          />

          <ServiceCard
            icon={<MessageCircle className="w-8 h-8" />}
            title="Consultation & Coaching Artistique"
            description="Beneficiez de conseils personnalises pour ameliorer vos performances et optimiser vos productions. Notre equipe experimentee vous guide vers l'excellence."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-neutral-950 to-black border-t border-yellow-500/10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-yellow-500 text-sm font-semibold tracking-[0.2em] uppercase">Passez a l'action</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
            Decouvrez nos forfaits
          </h2>
          <p className="text-white/50 mb-10 text-lg">
            Reservez votre session des aujourd'hui et donnez vie a vos projets audio !
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-10 py-4 rounded-xl text-lg shadow-lg shadow-green-500/30 transition-all hover:shadow-green-500/50"
          >
            <MessageCircle className="w-6 h-6" />
            Reserver une session
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white/50 py-12 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="OME-PROD" className="h-16 w-auto" />
          </div>
          <p className="text-sm mb-6 text-white/40">Studio de production audio - Cotonou, Calavi, Benin</p>
          <div className="flex justify-center gap-8 text-sm">
            <Link to="/a-propos" className="text-white/50 hover:text-yellow-500 transition-colors">A propos</Link>
            <Link to="/services" className="text-white/50 hover:text-yellow-500 transition-colors">Services</Link>
            <Link to="/contact" className="text-white/50 hover:text-yellow-500 transition-colors">Contact</Link>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} OME-PROD. Tous droits reserves.
            </p>
          </div>
        </div>
      </footer>
    </Page>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-black rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all group flex flex-col md:flex-row gap-6 items-start">
      <div className="flex-shrink-0 inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 text-yellow-500 rounded-xl group-hover:bg-yellow-500/20 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/60 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
