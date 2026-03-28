import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { modelenceMutation, modelenceQuery } from '@modelence/react-query';
import toast from 'react-hot-toast';
import Page from '@/client/components/Page';
import { Button } from '@/client/components/ui/Button';
import { Input } from '@/client/components/ui/Input';
import { Label } from '@/client/components/ui/Label';
import logo from '@/client/assets/logo.png';

type ContactInfo = {
  email: string;
  whatsappNumber: string;
  phone: string;
  address: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const { data: contactInfo } = useQuery({
    ...modelenceQuery<ContactInfo>('contact.getContactInfo'),
  });

  const { mutate: submitContact, isPending } = useMutation({
    ...modelenceMutation('contact.submit'),
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success('Message envoye avec succes !');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Une erreur est survenue');
    }
  });

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    submitContact(formData);
  }, [formData, submitContact]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const whatsappLink = contactInfo?.whatsappNumber
    ? `https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=Bonjour%20OME-PROD%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20vos%20services.`
    : '#';

  return (
    <Page className="bg-black p-0">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-600/5"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-yellow-500 text-sm font-semibold tracking-[0.2em] uppercase">Parlons de votre projet</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Contactez-nous
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto mb-6"></div>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Vous avez un projet audio en tete ou une question sur nos services ? Nous sommes la pour vous aider !
          </p>

          {/* WhatsApp CTA Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-green-500/30 transition-all hover:shadow-green-500/50"
          >
            <MessageCircle className="w-6 h-6" />
            Contactez-nous sur WhatsApp
          </a>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4 bg-neutral-950">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Nos Coordonnees</h2>
            <div className="space-y-6">
              {/* WhatsApp */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-black rounded-xl border border-green-500/20 hover:border-green-500/50 transition-colors group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 text-green-500 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-white/40 mb-1">WhatsApp</p>
                  <p className="text-white font-medium">{contactInfo?.phone || '+229 01 45 10 80 64'}</p>
                  <p className="text-green-500 text-sm mt-1">Cliquez pour nous ecrire</p>
                </div>
              </a>

              <ContactInfo
                icon={<Phone className="w-5 h-5" />}
                label="Telephone"
                value={contactInfo?.phone || '+229 01 45 10 80 64'}
                href={`tel:${contactInfo?.whatsappNumber || '+22901451080064'}`}
              />
              <ContactInfo
                icon={<Mail className="w-5 h-5" />}
                label="Email"
                value={contactInfo?.email || 'contact@ome-prod.bj'}
                href={`mailto:${contactInfo?.email || 'contact@ome-prod.bj'}`}
              />
              <ContactInfo
                icon={<MapPin className="w-5 h-5" />}
                label="Adresse"
                value={contactInfo?.address || 'Cotonou, Calavi, Benin'}
              />
            </div>

            {/* Social Media */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-white mb-4">Suivez-nous</h3>
              <p className="text-white/50 mb-6">
                Retrouvez-nous sur les reseaux sociaux pour les dernieres nouveautes et promotions :
              </p>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/OME_PROD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-lg font-medium transition-colors border border-yellow-500/20"
                >
                  Facebook
                </a>
                <a
                  href="https://instagram.com/OME_PROD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-lg font-medium transition-colors border border-yellow-500/20"
                >
                  Instagram
                </a>
                <a
                  href="https://tiktok.com/@OME_PROD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-lg font-medium transition-colors border border-yellow-500/20"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black rounded-2xl border border-yellow-500/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h2>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Message envoye !</h3>
                <p className="text-white/50 mb-6">Nous vous repondrons dans les plus brefs delais.</p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                >
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-white/80">Nom</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom complet"
                    className="mt-2 bg-neutral-900 border-white/10 text-white placeholder:text-white/30 focus:border-yellow-500 focus:ring-yellow-500/20"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-white/80">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="mt-2 bg-neutral-900 border-white/10 text-white placeholder:text-white/30 focus:border-yellow-500 focus:ring-yellow-500/20"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-white/80">Objet</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Sujet de votre message"
                    className="mt-2 bg-neutral-900 border-white/10 text-white placeholder:text-white/30 focus:border-yellow-500 focus:ring-yellow-500/20"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white/80">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Decrivez votre projet ou posez votre question..."
                    className="mt-2 w-full rounded-lg bg-neutral-900 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold py-3 shadow-lg shadow-yellow-500/20"
                >
                  {isPending ? 'Envoi en cours...' : 'Envoyer'}
                </Button>
              </form>
            )}
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

function ContactInfo({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-4 p-4 bg-black rounded-xl border border-yellow-500/10 hover:border-yellow-500/30 transition-colors">
      <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/10 text-yellow-500 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm text-white/40 mb-1">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}
