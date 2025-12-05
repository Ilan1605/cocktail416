'use client';

import React, { useState, useEffect } from 'react';
import { Wine, Users, Calendar, MapPin, Clock, Sparkles, ChevronDown, Send, Phone, Mail, Instagram } from 'lucide-react';

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
  'Mariage',
  'Anniversaire',
  'Événement d\'entreprise',
  'Soirée privée',
  'Inauguration',
  'Gala',
  'Autre',
];

const cocktailOptions = ['100', '200', '300', '400', '500', '500+'];
const barmanOptions = ['1', '2', '3', '4', '5'];
const barOptions = ['Aucun bar', '1 bar', '2 bars'];

// Menus de cocktails
const cocktailMenus = [
  {
    name: "Les Classiques Revisités",
    description: "Les intemporels sublimés par notre touche signature",
    cocktails: [
      { name: "Old Fashioned Fumé", ingredients: "Bourbon, bitters, sirop d'érable, fumée de bois" },
      { name: "Negroni Épicé", ingredients: "Gin, Campari, vermouth rouge, poivre de Sichuan" },
      { name: "Martini Poire & Romarin", ingredients: "Vodka, liqueur de poire, romarin frais" },
      { name: "Manhattan Noir", ingredients: "Rye whiskey, vermouth, cerise amarena" },
      { name: "Mojito Basilic", ingredients: "Rhum blanc, citron vert, basilic frais, sucre de canne" },
    ]
  },
  {
    name: "Délices Tropicaux",
    description: "Évasion garantie avec nos créations exotiques",
    cocktails: [
      { name: "Passion Mango Fizz", ingredients: "Rhum, mangue, fruit de la passion, prosecco" },
      { name: "Coco Lychee Dream", ingredients: "Vodka, lait de coco, litchi, citron vert" },
      { name: "Ananas Gingembre Sour", ingredients: "Gin, ananas frais, gingembre, blanc d'œuf" },
      { name: "Punch des Îles", ingredients: "Rhum ambré, jus tropicaux, grenadine, épices" },
      { name: "Sunset Papaya", ingredients: "Tequila, papaye, orange sanguine, agave" },
    ]
  },
  {
    name: "Élégance Française",
    description: "Le raffinement à la française dans chaque gorgée",
    cocktails: [
      { name: "French 75 Royal", ingredients: "Cognac, champagne, citron, sucre" },
      { name: "Rose de Provence", ingredients: "Gin, liqueur de rose, champagne rosé" },
      { name: "Cognac Vanille", ingredients: "Cognac XO, vanille de Madagascar, miel" },
      { name: "Lavande Fizz", ingredients: "Vodka, sirop de lavande, citron, soda" },
      { name: "Cassis Impérial", ingredients: "Champagne, crème de cassis, zeste de citron" },
    ]
  },
  {
    name: "Saveurs d'Orient",
    description: "Un voyage sensoriel aux accents orientaux",
    cocktails: [
      { name: "Jasmin Martini", ingredients: "Gin, thé jasmin infusé, liqueur de fleur de sureau" },
      { name: "Yuzu Ginger Spritz", ingredients: "Saké, yuzu, gingembre, eau pétillante" },
      { name: "Cardamome Sour", ingredients: "Whisky, cardamome, citron, sirop d'orgeat" },
      { name: "Saké Passion", ingredients: "Saké, fruit de la passion, lime" },
      { name: "Rose Persane", ingredients: "Vodka, eau de rose, grenade, pistache" },
    ]
  },
  {
    name: "Signatures 416",
    description: "Nos créations exclusives, l'âme de Cocktail 416",
    cocktails: [
      { name: "Léman Sunset", ingredients: "Gin suisse, Génépi, citron, tonic artisanal" },
      { name: "Alpes Sour", ingredients: "Whisky, sirop de sapin, citron, blanc d'œuf" },
      { name: "Genève 416", ingredients: "Vodka, absinthe, concombre, menthe fraîche" },
      { name: "Mont Blanc", ingredients: "Rhum blanc, crème de marron, espresso, crème" },
      { name: "Jet d'Eau Fizz", ingredients: "Champagne, liqueur de violette, citron, bulles" },
    ]
  },
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

  const calculateEstimate = () => {
    const barmanCount = parseInt(formData.barmanCount) || 0;
    const hours = 5; // Estimation de base: 3h d'événement + 2h montage/démontage
    const barmanCost = barmanCount * 45 * hours;
    
    let barCost = 0;
    if (formData.barCount === '1 bar') barCost = 200;
    if (formData.barCount === '2 bars') barCost = 350;
    
    const cocktailCost = (parseInt(formData.cocktailCount) || 100) * 8;
    
    return barmanCost + barCost + cocktailCost;
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
            <span>Bar à cocktails mobile</span>
          </div>
          <h1 className="hero-title">
            <span className="title-line">L'art du cocktail</span>
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
              <p>Mariages, anniversaires, soirées d'entreprise, galas... Nous nous adaptons à tous vos événements.</p>
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
            <h2 className="section-title">Des créations d'exception</h2>
            <p className="section-description">
              Découvrez nos 5 univers gustatifs, chacun composé de 5 cocktails signature soigneusement élaborés. Vous pouvez également personnaliser votre sélection ou nous proposer vos propres créations.
            </p>
          </div>
          <div className="menus-grid">
            {cocktailMenus.map((menu, menuIndex) => (
              <div key={menuIndex} className="menu-card">
                <div className="menu-header">
                  <span className="menu-number">0{menuIndex + 1}</span>
                  <h3 className="menu-name">{menu.name}</h3>
                  <p className="menu-description">{menu.description}</p>
                </div>
                <ul className="cocktails-list">
                  {menu.cocktails.map((cocktail, cocktailIndex) => (
                    <li key={cocktailIndex} className="cocktail-item">
                      <div className="cocktail-name">{cocktail.name}</div>
                      <div className="cocktail-ingredients">{cocktail.ingredients}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-tag">À propos</span>
              <h2 className="section-title">L'excellence genevoise</h2>
              <p>
                Basés à Genève, nous apportons l'art du cocktail directement à vos événements dans toute la région lémanique et au-delà.
              </p>
              <p>
                Notre équipe de barmans passionnés transforme chaque occasion en une expérience sensorielle unique. Du classique au créatif, nous personnalisons notre carte selon vos envies et votre thème.
              </p>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80" alt="Barman professionnel préparant un cocktail" />
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
                Remplissez ce formulaire et recevez un devis personnalisé sous 24h. Notre équipe vous contactera pour affiner les détails.
              </p>
              
              <div className="devis-features">
                <div className="feature">
                  <div className="feature-icon">✓</div>
                  <span>Réponse sous 24h</span>
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
                  <label htmlFor="eventType">Type d'événement *</label>
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
                  <label htmlFor="eventDate">Date de l'événement *</label>
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
                  <label htmlFor="guestCount">Nombre d'invités *</label>
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
              <p>L'art du cocktail à votre service. Bar mobile pour tous vos événements en Suisse romande.</p>
            </div>
            
            <div className="footer-links">
              <h4>Navigation</h4>
              <button onClick={() => scrollToSection('services')}>Services</button>
              <button onClick={() => scrollToSection('about')}>À propos</button>
              <button onClick={() => scrollToSection('devis')}>Demander un devis</button>
            </div>
            
            <div className="footer-contact">
              <h4>Contact</h4>
              <a href="tel:+41000000000">
                <Phone className="w-4 h-4" />
                <span>+41 00 000 00 00</span>
              </a>
              <a href="mailto:contact@cocktail416.com">
                <Mail className="w-4 h-4" />
                <span>contact@cocktail416.com</span>
              </a>
              <a href="https://instagram.com/cocktail416" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-4 h-4" />
                <span>@cocktail416</span>
              </a>
            </div>

            <div className="footer-zone">
              <h4>Zone d'intervention</h4>
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

