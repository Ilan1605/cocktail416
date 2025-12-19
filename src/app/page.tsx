'use client';

import React, { useState, useEffect } from 'react';
import { Wine, Users, Calendar, MapPin, Clock, Sparkles, ChevronDown, Send, Phone, Mail } from 'lucide-react';

// Images de cocktails (URLs d'images libres de droits)
const cocktailImages = [
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80',
  'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80',
  'https://images.unsplash.com/photo-1560963689-b5682b6440f8?w=800&q=80',
  'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=800&q=80',
  'https://images.unsplash.com/photo-1609345265499-2133bbeb6ce5?w=800&q=80',
  'https://images.unsplash.com/photo-1582837403612-a2a93bf71dbb?w=800&q=80',
  'https://images.unsplash.com/photo-1541546006121-5c3bc5e8c7b9?w=800&q=80',
];

const eventTypes = [
  "Mariage",
  "Anniversaire",
  "Événement d'entreprise",
  "Soirée privée",
  "Inauguration",
  "Gala",
  "Autre",
];

const cocktailOptions = ["100", "200", "300", "400", "500", "500+"];

// Images pour le carrousel de la carte (sans la photo du bar)
const carteImages = [
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80',
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80',
  'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&q=80',
  'https://images.unsplash.com/photo-1560963689-b5682b6440f8?w=600&q=80',
  'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=600&q=80',
  'https://images.unsplash.com/photo-1609345265499-2133bbeb6ce5?w=600&q=80',
  'https://images.unsplash.com/photo-1541546006121-5c3bc5e8c7b9?w=600&q=80',
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80',
  'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&q=80',
];

export default function Cocktail416Page() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    eventLocation: '',
    guestCount: '',
    cocktailCount: '',
    barmanCount: '',
    barCount: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  

  // Animation du carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % cocktailImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          eventLocation: '',
          guestCount: '',
          cocktailCount: '',
          barmanCount: '',
          barCount: '',
          message: '',
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
    
    setIsSubmitting(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div className="cocktail-page">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'nav-scrolled' : 'nav-transparent'}`}>
        <div className="nav-container">
          <div className="logo-container">
            <span className="logo-text">COCKTAIL</span>
            <span className="logo-number">416</span>
          </div>
          <div className="nav-links">
            <button onClick={() => scrollToSection('services')} className="nav-link">Services</button>
            <button onClick={() => scrollToSection('carte')} className="nav-link">Carte</button>
            <button onClick={() => scrollToSection('about')} className="nav-link">À propos</button>
            <button onClick={() => scrollToSection('devis')} className="nav-link-cta">Demander un devis</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay" />
        
        {/* Carousel d'images */}
        <div className="hero-carousel">
          {cocktailImages.map((img, index) => (
            <div
              key={index}
              className={`hero-image ${index === currentImageIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>

        {/* Contenu Hero */}
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles className="w-4 h-4" />
            <span>Bar à cocktails événementiel</span>
          </div>
          <h1 className="hero-title">
            <span className="title-line">L&apos;art du cocktail</span>
            <span className="title-line accent">à votre événement</span>
          </h1>
          <p className="hero-subtitle">
            Transformez vos événements en expériences inoubliables avec notre service de bar mobile et nos barmans professionnels.
          </p>
          <div className="hero-buttons">
            <button onClick={() => scrollToSection('devis')} className="btn-primary">
              <span>Demander un devis</span>
              <Send className="w-5 h-5" />
            </button>
            <button onClick={() => scrollToSection('services')} className="btn-secondary">
              Découvrir nos services
            </button>
          </div>
          <div className="hero-location">
            <MapPin className="w-5 h-5" />
            <span>Genève et ses alentours</span>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <button onClick={() => scrollToSection('services')} className="scroll-indicator">
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </button>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">Nos services</span>
            <h2 className="section-title">Une expérience sur mesure</h2>
            <p className="section-description">
              De la conception à la réalisation, nous nous occupons de tout pour faire de votre événement un moment exceptionnel.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <Wine className="w-8 h-8" />
              </div>
              <h3>Bar Mobile</h3>
              <p>Un ou deux bars élégants installés sur place, parfaitement adaptés à votre espace et votre thème.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Users className="w-8 h-8" />
              </div>
              <h3>Barmans Professionnels</h3>
              <p>Des mixologues experts qui créent des cocktails spectaculaires et animent votre soirée avec talent.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Calendar className="w-8 h-8" />
              </div>
              <h3>Tous Événements</h3>
              <p>Mariages, anniversaires, soirées d&apos;entreprise, galas... Nous nous adaptons à tous vos événements.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Clock className="w-8 h-8" />
              </div>
              <h3>Service Complet</h3>
              <p>Installation, service et démontage inclus. Vous profitez, nous nous occupons du reste.</p>
              <div className="service-price">+2h montage/démontage incluses</div>
            </div>
          </div>
        </div>
      </section>

      {/* Carte des Cocktails */}
      <section id="carte" className="carte-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">Notre carte</span>
            <h2 className="section-title">Des créations d&apos;exception</h2>
            <p className="section-description">
              Découvrez nos cocktails signature soigneusement élaborés par nos mixologues. Classiques revisités, créations originales ou cocktails sur mesure selon vos envies.
            </p>
          </div>
          
          {/* Carrousel auto-scroll infini */}
          <div className="carte-carousel-wrapper">
            <div className="carte-carousel">
              {/* Triple les images pour effet infini */}
              {[...carteImages, ...carteImages, ...carteImages].map((img, index) => (
                <div key={index} className="carte-image-card">
                  <img src={img} alt={`Cocktail ${(index % carteImages.length) + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Bouton pour voir la carte PDF */}
          <div className="carte-cta">
            <a href="/carte.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary carte-btn">
              <Wine className="w-5 h-5" />
              <span>Découvrir notre carte complète</span>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-tag">À propos</span>
              <h2 className="section-title">L&apos;excellence genevoise</h2>
              <p>
                Basés à Genève, nous apportons l&apos;art du cocktail directement à vos événements dans toute la région lémanique et au-delà.
              </p>
              <p>
                Notre équipe de barmans passionnés transforme chaque occasion en une expérience sensorielle unique. Du classique au créatif, nous personnalisons notre carte selon vos envies et votre thème.
              </p>
            </div>
            <div className="about-image">
              <img src="/cocktail-about.jpg" alt="Cocktail signature Cocktail 416" />
              <div className="about-image-accent" />
            </div>
          </div>
        </div>
      </section>

      {/* Devis Section */}
      <section id="devis" className="devis-section">
        <div className="section-container">
          <div className="devis-grid">
            <div className="devis-info">
              <span className="section-tag">Devis gratuit</span>
              <h2 className="section-title">Planifions votre événement</h2>
              <p>
                Remplissez ce formulaire et recevez un devis personnalisé sous 24h (jours ouvrables). Notre équipe vous contactera pour affiner les détails.
              </p>
              
              <div className="devis-features">
                <div className="feature">
                  <div className="feature-icon">✓</div>
                  <span>Réponse sous 24h (jours ouvrables)</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">✓</div>
                  <span>Devis sans engagement</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">✓</div>
                  <span>Personnalisation complète</span>
                </div>
              </div>

            </div>

            <form onSubmit={handleSubmit} className="devis-form">
              {submitSuccess && (
                <div className="success-message">
                  <Sparkles className="w-5 h-5" />
                  <span>Votre demande a été envoyée avec succès !</span>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nom complet *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre nom"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Téléphone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+41 XX XXX XX XX"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eventType">Type d&apos;événement *</label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Sélectionnez...</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="eventDate">Date de l&apos;événement *</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eventLocation">Lieu *</label>
                  <input
                    type="text"
                    id="eventLocation"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleInputChange}
                    required
                    placeholder="Ville ou adresse"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="guestCount">Nombre d&apos;invités *</label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: 150"
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cocktailCount">Nombre de cocktails *</label>
                  <select
                    id="cocktailCount"
                    name="cocktailCount"
                    value={formData.cocktailCount}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Sélectionnez...</option>
                    {cocktailOptions.map((option) => (
                      <option key={option} value={option}>{option} cocktails</option>
                    ))}
                  </select>
                </div>
              </div>


              <div className="form-group full-width">
                <label htmlFor="message">Message (optionnel)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Décrivez votre événement, vos envies, vos questions..."
                />
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="spinner" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Envoyer ma demande</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="section-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo-container">
                <span className="logo-text">COCKTAIL</span>
                <span className="logo-number">416</span>
              </div>
              <p>L&apos;art du cocktail à votre service. Bar mobile pour tous vos événements en Suisse romande.</p>
            </div>
            
            <div className="footer-links">
              <h4>Navigation</h4>
              <button onClick={() => scrollToSection('services')}>Services</button>
              <button onClick={() => scrollToSection('about')}>À propos</button>
              <button onClick={() => scrollToSection('devis')}>Demander un devis</button>
            </div>
            
            <div className="footer-contact">
              <h4>Contact</h4>
              <a href="tel:+41783368860">
                <Phone className="w-4 h-4" />
                <span>+41 78 336 88 60</span>
              </a>
              <a href="mailto:contact@cocktail416.com">
                <Mail className="w-4 h-4" />
                <span>contact@cocktail416.com</span>
              </a>
            </div>

            <div className="footer-zone">
              <h4>Zone d&apos;intervention</h4>
              <div className="zone-list">
                <span><MapPin className="w-4 h-4" /> Genève et ses alentours</span>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2025 Cocktail 416. Tous droits réservés.</p>
            <p>Conçu avec passion à Genève 🍸</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

