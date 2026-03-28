import { Link } from 'react-router-dom';
import { Mic, Music, Headphones, Radio, MessageCircle, Truck, CreditCard, CheckCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { modelenceQuery } from '@modelence/react-query';
import Page from '@/client/components/Page';
import { Button } from '@/client/components/ui/Button';
import logo from '@/client/assets/logo.png';
import studioGeneral from '@/client/assets/studio-general.jpg';
import tamtamImg from '@/client/assets/tamtam.jpg';
import saxophonistImg from '@/client/assets/saxophonist.jpg';
import singerImg from '@/client/assets/singer.jpg';

type ContactInfo = {
  email: string;
  whatsappNumber: string;
  phone: string;
  address: string;
};

export default function HomePage() {
  const { data: contactInfo } = useQuery({
    ...modelenceQuery<ContactInfo>('contact.getContactInfo'),
  });

  const whatsappLink = contactInfo?.whatsappNumber
    ? `https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=Bonjour%20OME-PROD%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20vos%20services.`
    : 'https://wa.me/22901451080064?text=Bonjour%20OME-PROD%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20vos%20services.';

  return (
    <Page className="bg-black p-0">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 px-4 relative overflow-hidden">
        {/* Subtle gold gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-600/5"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="text-yellow-500 text-sm font-semibold tracking-[0.3em] uppercase">Studio Professionnel & Mobile</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Bienvenue chez{' '}
            <span className="font-brand text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-5xl md:text-7xl">
              OME-PROD
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-yellow-500/90 font-medium mb-4">
            Votre studio de production audio au Benin
          </p>
          <p className="text-2xl md:text-3xl font-light text-white/90 mb-8">
            Transformez vos idees en sons exceptionnels !
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            Chez OME-PROD, nous donnons vie a vos projets musicaux et audio avec un son de qualite professionnelle.
            Que vous soyez artiste, podcasteur, chanteur ou producteur, notre studio est equipe pour vous offrir
            un accompagnement complet de l'enregistrement a la production finale.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-10 py-4 rounded-xl text-lg shadow-lg shadow-green-500/30 transition-all hover:shadow-green-500/50"
          >
            <MessageCircle className="w-6 h-6" />
            Reservez votre session maintenant !
          </a>
        </div>
      </section>

      {/* Gallery Section - Placeholder for images */}
      <section className="py-16 px-4 bg-black border-t border-yellow-500/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-yellow-500 text-sm font-semibold tracking-[0.2em] uppercase">Notre Univers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
              En Studio
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto mt-6"></div>
          </div>

          {/* Image Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GalleryImage src={studioGeneral} alt="Vue generale du studio OME-PROD" />
            <GalleryImage src={singerImg} alt="Chanteuse en enregistrement" />
            <GalleryImage src={saxophonistImg} alt="Saxophoniste en studio" />
            <GalleryImage src={tamtamImg} alt="Joueur de tam-tam traditionnel" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-neutral-950 border-t border-yellow-500/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-yellow-500 text-sm font-semibold tracking-[0.2em] uppercase">Ce que nous offrons</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
              Nos Prestations
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto mt-6"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Mic className="w-8 h-8" />}
              title="Enregistrement audio"
              description="Haute qualite pour capturer chaque detail de votre son"
            />
            <FeatureCard
              icon={<Headphones className="w-8 h-8" />}
              title="Mixage et mastering"
              description="Un rendu professionnel clair et equilibre"
            />
            <FeatureCard
              icon={<Music className="w-8 h-8" />}
              title="Production musicale"
              description="Creation sur mesure pour vos projets uniques"
            />
            <FeatureCard
              icon={<Radio className="w-8 h-8" />}
              title="Podcasts et voice-over"
              description="Enregistrement professionnel pour vos contenus audio"
            />
          </div>
        </div>
      </section>

      {/* Studio Mobile Section */}
      <section className="py-20 px-4 bg-black border-t border-yellow-500/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-full mb-6">
                <Truck className="w-5 h-5" />
                <span className="text-sm font-semibold">Studio Mobile</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                On se deplace chez vous !
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Vous ne pouvez pas vous deplacer ? Pas de probleme ! Notre studio mobile vient a vous.
                Si vous remplissez les conditions, notre equipe se deplace avec tout le materiel necessaire
                pour enregistrer vos morceaux dans le lieu de votre choix.
              </p>

              <div className="bg-neutral-900 rounded-2xl p-6 border border-yellow-500/20">
                <h3 className="text-xl font-bold text-white mb-4">Conditions pour le studio mobile :</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70">Minimum <strong className="text-yellow-500">4 morceaux</strong> a enregistrer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70">Nous venons enregistrer sur place</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70">Mixage et mastering realises en studio</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70">Livraison du produit final</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Studio image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl border border-yellow-500/20 overflow-hidden">
                <img
                  src={studioGeneral}
                  alt="Studio OME-PROD"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg shadow-lg">
                Studio Mobile
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Conditions Section */}
      <section className="py-20 px-4 bg-neutral-950 border-t border-yellow-500/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-full mb-6">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm font-semibold">Modalites de paiement</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comment ca marche ?
            </h2>
            <p className="text-white/60 text-lg">
              Un processus simple et transparent pour tous vos projets
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black rounded-2xl p-8 border border-yellow-500/20">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-yellow-500">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Avant le projet</h3>
              <p className="text-white/60 leading-relaxed">
                L'artiste doit payer <strong className="text-yellow-500">50% des frais de production</strong> avant
                le debut de l'enregistrement. Cet acompte permet de reserver votre session et de preparer
                le materiel necessaire.
              </p>
            </div>

            <div className="bg-black rounded-2xl p-8 border border-yellow-500/20">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-yellow-500">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">A la livraison</h3>
              <p className="text-white/60 leading-relaxed">
                Le <strong className="text-yellow-500">solde restant (50%)</strong> doit etre regle avant
                la remise du produit final. Une fois le paiement complet effectue, vous recevez vos fichiers
                audio masterises.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-2xl p-6 border border-yellow-500/20 text-center">
            <p className="text-yellow-500 font-semibold text-lg mb-2">
              Tarifs sur devis
            </p>
            <p className="text-white/80">
              Contactez-nous pour un devis gratuit et personnalise !
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-yellow-500 hover:text-yellow-400 font-semibold"
            >
              <MessageCircle className="w-5 h-5" />
              Demander un devis sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-neutral-950 to-black border-t border-yellow-500/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pret a donner vie a votre projet ?
          </h2>
          <p className="text-white/60 mb-10 text-lg leading-relaxed">
            Contactez-nous des aujourd'hui pour discuter de vos besoins et reserver votre session en studio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services">
              <Button variant="outline" className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-8 py-3 transition-all">
                Decouvrir nos services
              </Button>
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-md shadow-lg shadow-green-500/20 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-black rounded-2xl p-6 text-center border border-yellow-500/20 hover:border-yellow-500/50 transition-all group hover:shadow-lg hover:shadow-yellow-500/5">
      <div className="inline-flex items-center justify-center w-14 h-14 bg-yellow-500/10 text-yellow-500 rounded-xl mb-4 group-hover:bg-yellow-500/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="aspect-square rounded-xl border border-yellow-500/10 overflow-hidden hover:border-yellow-500/40 transition-all group">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}
