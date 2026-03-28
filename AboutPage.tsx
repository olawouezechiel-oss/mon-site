import { Link } from 'react-router-dom';
import { Target, Users, Sparkles, MessageCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { modelenceQuery } from '@modelence/react-query';
import Page from '@/client/components/Page';
import { Button } from '@/client/components/ui/Button';
import logo from '@/client/assets/logo.png';

type ContactInfo = {
  email: string;
  whatsappNumber: string;
  phone: string;
  address: string;
};

export default function AboutPage() {
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
          <span className="text-yellow-500 text-sm font-semibold tracking-[0.2em] uppercase">Notre Histoire</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Qui sommes-nous ?
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-neutral-950">
        <div className="max-w-3xl mx-auto">
          <div className="bg-black rounded-2xl border border-yellow-500/20 p-8 md:p-12 mb-16">
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 font-bold">OME-PROD</span> est un studio de production audio base a Cotonou, Benin.
              Fonde par des passionnes de musique et de son, notre objectif est de fournir aux artistes et createurs
              un espace ou leurs idees prennent vie avec precision et creativite.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Notre equipe combine savoir-faire technique et sens artistique pour garantir un resultat a la hauteur
              de vos attentes. Chez OME-PROD, chaque projet est unique et beneficie d'une attention personnalisee,
              qu'il s'agisse d'un album, d'un single ou d'un podcast.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <span className="text-yellow-500 text-sm font-semibold tracking-[0.2em] uppercase">Ce qui nous anime</span>
              <h2 className="text-3xl font-bold text-white mt-3">Notre Mission</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto mt-4"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <MissionCard
                icon={<Target className="w-7 h-7" />}
                title="Qualite professionnelle"
                description="Offrir un son de qualite professionnelle a tous les createurs"
              />
              <MissionCard
                icon={<Users className="w-7 h-7" />}
                title="Accompagnement complet"
                description="Accompagner les artistes du debut a la fin de leur projet"
              />
              <MissionCard
                icon={<Sparkles className="w-7 h-7" />}
                title="Inspiration creative"
                description="Creer un environnement inspirant et convivial pour stimuler la creativite"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-black rounded-2xl border border-yellow-500/20 p-10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pret a travailler avec nous ?
            </h3>
            <p className="text-white/50 mb-8">
              Decouvrez comment nous pouvons vous accompagner dans votre projet audio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button variant="outline" className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-6">
                  Voir nos services
                </Button>
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-md shadow-lg shadow-green-500/20 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
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

function MissionCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-black rounded-2xl p-6 text-center border border-yellow-500/20 hover:border-yellow-500/40 transition-all group">
      <div className="inline-flex items-center justify-center w-14 h-14 bg-yellow-500/10 text-yellow-500 rounded-xl mb-4 group-hover:bg-yellow-500/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
