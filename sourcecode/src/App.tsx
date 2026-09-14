import { type FormEvent, type MouseEvent as ReactMouseEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowUpRight, Instagram, MapPin, Menu as MenuIcon, Phone, Play, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;
const whatsappUrl = 'https://wa.me/919438334239?text=Hello%20Break!!%20Cafe%20and%20Restro%2C%20I%20would%20like%20to%20enquire%20about%20booking%20Dreamy%20House%20party%20hall.';
const mapsUrl = 'https://maps.app.goo.gl/sdLrTmCgF7DMH9Kr8?g_st=aw';
const instagramUrl = 'https://www.instagram.com/break.thecafe?stkn=ZDZyc3dneWhzNXdn';

const menu = {
  Soups: [["Veg Hot 'n' Sour", 80], ['Veg Sweet Corn', 90], ['Veg Lemon Coriander', 80], ['Veg Manchow', 90], ["Non-Veg Hot 'n' Sour", 90], ['Non-Veg Sweet Corn', 100], ['Non-Veg Lemon Coriander', 90], ['Non-Veg Manchow', 100]],
  Burgers: [['Veg Cheese Burger', 80], ['Veg Burger', 60], ['Chicken Burger', 100], ['Chicken Cheese Burger', 120], ['Paneer Burger', 100]],
  Pizza: [['Margherita', 150], ['Baby Corn Fantasy', 160], ['Paneer / Chicken', 180], ['Cheese Burst', 200]],
  Noodles: [['Veg Noodles', 120], ['Chicken / Mushroom / Paneer Noodles', 160], ['Mix Noodles', 180], ['Chilly Garlic / Schezwan Veg', 140], ['Paneer / Mushroom / Corn Veg', 180], ['Mix', 200], ['Special Noodles', 220]],
  Rolls: [['Veg Roll', 80], ['Paneer Roll', 100], ['Chicken Roll', 100], ['Egg Roll', 90], ['Egg Chicken Roll', 110]],
  Pasta: [['Red Sauce Pasta', 150], ['White Sauce Pasta', 150], ['Mix Sauce Pasta', 180], ['Agy with Chicken', 40]],
  'Veg Starters': [['Sweet Corn Chat', 150], ['American Crispy Corn', 160], ['Crispy Chilly Babycorn', 180], ['Mushroom / Paneer Chilly', 190], ['Mushroom / Paneer', 200], ["Mushroom / Paneer Salt 'n' Pepper", 190], ['Dragon Paneer / Mushroom', 200], ['Garlic Paneer / Mushroom', 200], ['Paneer Kurkure', 180], ['Veg Lollipop', 160], ['Veg Pakoda', 160], ['Veg Sizzlers', 220], ['Veg Manchurian', 150]],
  'Chicken Starters': [['Chicken Lollipop (5 pc)', 220], ['Chicken Sticks', 200], ['Chilly Chicken', 190], ['Chicken 65', 200], ['Garlic Chicken', 200], ['Dragon Chicken', 200], ['Honey Chicken', 200], ["Chicken Salt 'n' Pepper", 180], ['Chicken Sizzler', 230], ['Chicken Manchurian', 200]],
  Combos: [['Chilly Paneer & Veg Noodles', 200], ['Chilly Chicken & Veg Noodles', 200], ['Chilly Paneer with Veg Fried Rice', 220], ['Chilly Chicken with Fried Rice', 220], ['Paneer / Mushroom / Chicken Combination', 220]],
} as const;

type Category = keyof typeof menu;

const gallery = [
  ['10259.jpg', 'Balloon walkway & gift setup'],
  ['10260.jpg', 'Warm-lit celebration entrance'],
  ['10261.jpg', 'Birthday celebration'],
  ['10262.jpg', 'Blue & white theme'],
  ['10263.png', 'Classic birthday setup'],
  ['10264.png', 'Cake & celebration setup'],
  ['10265.png', 'Family celebration'],
  ['10266.png', 'Pink birthday theme'],
];

const customerMoments = [
  ['IMG_20260913_212703.jpg', 'Celebration moment'],
  ['Screenshot_2026-09-13-21-14-36-978_com.google.android.apps.maps.png', 'Happy customers'],
  ['Screenshot_2026-09-13-21-15-23-545_com.google.android.apps.maps.png', 'Family moment'],
  ['Screenshot_2026-09-13-21-15-36-849_com.google.android.apps.maps.png', 'Friends together'],
];

const videos = [
  ['video-01.mp4', 'Celebration moment', 'Tap play for sound'],
  ['video-02.mp4', 'Party atmosphere', 'A little room, a lot of feeling'],
  ['video-03.mp4', 'Cafe moments', 'Food, tables, familiar faces'],
  ['video-04.mp4', 'Celebration reel', 'The good part of the evening'],
];

function useRevealAnimations() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal, .stagger');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function AmbientLayer() {
  const [cursor, setCursor] = useState({ x: -30, y: -30 });
  useEffect(() => {
    const move = (event: globalThis.MouseEvent) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="cursor-dot" style={{ left: cursor.x, top: cursor.y }} aria-hidden="true" />
      <i className="particle particle-one" aria-hidden="true" />
      <i className="particle particle-two" aria-hidden="true" />
      <i className="particle particle-three" aria-hidden="true" />
    </>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="nav-bar">
        <a className="brand-lockup" href="#top" onClick={close} data-testid="link-brand-home">
          <img className="brand-mark" src={asset('img/logo.jpg')} alt="Break Cafe logo" />
          <div>
            <div className="brand-name">Break!! Cafe & Restro</div>
            <div className="brand-place">Talcher · Dreamy House</div>
          </div>
        </a>
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main navigation">
          <a href="#menu" onClick={close} data-testid="link-nav-menu">Menu</a>
          <a href="#hall" onClick={close} data-testid="link-nav-hall">Dreamy House</a>
          <a href="#videos" onClick={close} data-testid="link-nav-videos">Videos</a>
          <a href="#decor" onClick={close} data-testid="link-nav-decor">Gallery</a>
          <a href="#contact" onClick={close} data-testid="link-nav-contact">Contact</a>
          <a className="nav-book" href={whatsappUrl} target="_blank" rel="noreferrer" data-testid="link-nav-book">Book the hall <ArrowUpRight size={14} /></a>
        </nav>
        <button className="mobile-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu">
          {open ? <X size={17} /> : <MenuIcon size={17} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMove = (event: ReactMouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({ x: ((event.clientY - rect.top) / rect.height - .5) * -5, y: ((event.clientX - rect.left) / rect.width - .5) * 5 });
  };
  return (
    <section className="hero" id="top" onMouseMove={handleMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
      <div className="hero-aurora" aria-hidden="true" />
      <div className="container hero-content">
        <div className="hero-copy reveal">
          <span className="hero-kicker">Classic warm dining · Talcher</span>
          <h1 className="display">Good food.<br /><em>Warm celebrations.</em></h1>
          <p className="hero-description">Break!! Cafe & Restro brings together a relaxed cafe experience and Dreamy House — a private celebration space for birthdays, parties and permitted events.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#menu" data-testid="link-hero-menu">Explore the menu <ArrowDownRight size={16} /></a>
            <a className="button button-outline" href={whatsappUrl} target="_blank" rel="noreferrer" data-testid="link-hero-whatsapp">WhatsApp booking <ArrowUpRight size={16} /></a>
            <a className="button button-outline" href="tel:+918984099592" data-testid="link-hero-call"><Phone size={15} /> Call cafe</a>
          </div>
          <div className="hero-footnote"><span /> Open for good company, every day <b>·</b> ITI Chowk, Talcher</div>
        </div>
        <div className="orb-stage reveal" style={{ transform: `translate3d(0,0,0) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
          <div className="orbit" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <div className="orb-shadow" aria-hidden="true" />
          <div className="coffee-orb" aria-label="Animated coffee-inspired centerpiece" role="img" />
          <div className="orb-label">a pause<br />worth sharing</div>
          <div className="orb-note">made for slow<br />golden hours</div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-label="Break Cafe highlights">
      <div className="marquee-track">
        <div className="marquee-line"><span>Food for the table</span><i /><span>Room for the moment</span><i /><span>Dreamy House celebrations</span><i /><span>Talcher, Odisha</span><i /></div>
        <div className="marquee-line" aria-hidden="true"><span>Food for the table</span><i /><span>Room for the moment</span><i /><span>Dreamy House celebrations</span><i /><span>Talcher, Odisha</span><i /></div>
      </div>
    </div>
  );
}

function SectionHeading({ kicker, title, copy }: { kicker: string; title: ReactNode; copy: string }) {
  return (
    <div className="section-header reveal">
      <div><div className="eyebrow">{kicker}</div><h2 className="display">{title}</h2></div>
      <p>{copy}</p>
    </div>
  );
}

function MenuSection() {
  const categories = Object.keys(menu) as Category[];
  const [active, setActive] = useState<Category>('Soups');
  const [query, setQuery] = useState('');
  const currentItems = useMemo(() => menu[active].filter(([name]) => name.toLowerCase().includes(query.toLowerCase().trim())), [active, query]);
  return (
    <section className="section section-light" id="menu">
      <div className="container">
        <SectionHeading kicker="The menu" title={<>Pick a mood.<br /><em>Pick a plate.</em></>} copy="Search any dish instantly or switch categories. The original cafe menu, given a little room to breathe." />
        <div className="menu-layout">
          <aside className="menu-intro reveal">
            <h3 className="display">Made to<br />pass around.</h3>
            <p>From hot soups and crispy starters to pizza, pasta, noodles and the dishes everyone orders for the table.</p>
            <div className="menu-stamp">break!!<br />est. talcher<br />good food</div>
          </aside>
          <div className="menu-panel reveal">
            <div className="menu-tools">
              <input className="menu-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a dish..." aria-label="Search dishes" data-testid="input-menu-search" />
              <span className="menu-count" data-testid="text-menu-count">{currentItems.length} dishes</span>
            </div>
            <div className="category-list" role="tablist" aria-label="Menu categories">
              {categories.map((category) => (
                <button className={`category-button ${active === category ? 'active' : ''}`} type="button" role="tab" aria-selected={active === category} onClick={() => setActive(category)} key={category} data-testid={`button-menu-category-${category.toLowerCase().replaceAll(' ', '-')}`}>
                  {category}<span>{menu[category].length.toString().padStart(2, '0')}</span>
                </button>
              ))}
            </div>
            <div className="menu-grid" data-testid="list-menu-items">
              {currentItems.length ? currentItems.map(([name, price]) => (
                <div className="menu-item" key={name} data-testid={`menu-item-${name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}>
                  <div><strong>{name}</strong><small>Made fresh at Break!!</small></div><span className="menu-price">₹{price}</span>
                </div>
              )) : <div className="menu-empty">No matching dish found. Try another plate.</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HallSection() {
  return (
    <section className="section section-paper" id="hall">
      <div className="container">
        <SectionHeading kicker="Dreamy House" title={<>Your people.<br /><em>Your kind of party.</em></>} copy="A warm, photo-friendly party space with different decoration styles already experienced at the cafe." />
        <div className="hall-layout">
          <div className="hall-copy reveal">
            <div className="eyebrow">Private celebrations · Talcher</div>
            <h3 className="display">Make a little<br />more of it.</h3>
            <p>Birthday celebrations, private get-togethers and other permitted events can be made more memorable with themed decorations, cakes and a comfortable cafe setting.</p>
            <ul className="hall-list">
              <li>Birthday & celebration setups</li>
              <li>Multiple decoration themes</li>
              <li>Food and celebration in one place</li>
              <li>Comfortable private setting</li>
            </ul>
            <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer" data-testid="link-hall-whatsapp">Enquire on WhatsApp <ArrowUpRight size={16} /></a>
          </div>
          <div className="hall-media stagger">
            {[
              ['10146.jpg', 'Dreamy House decorated hall'],
              ['10147.jpg', 'Dreamy House celebration setup'],
              ['10148.jpg', 'Dreamy House interior celebration'],
            ].map(([src, alt], index) => (
              <figure key={src}><img src={asset(`img/${src}`)} alt={alt} loading="lazy" /><figcaption className="hall-caption">{index === 0 ? 'The main scene' : index === 1 ? 'A table for your people' : 'Details that make it yours'}</figcaption></figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="section section-ink" id="videos">
      <div className="container">
        <div className="video-intro reveal">
          <div><div className="eyebrow">Real moments</div><h2 className="display">Press play.<br /><em>Stay awhile.</em></h2></div>
          <p className="video-note">Four real videos supplied by the cafe. Use the controls to play with sound — browsers intentionally keep audio quiet until you ask.</p>
        </div>
        <div className="video-grid stagger">
          {videos.map(([src, title, note], index) => (
            <article className="video-card" key={src} data-testid={`card-video-${index + 1}`}>
              <video controls playsInline preload="metadata" src={asset(`video/${src}`)} aria-label={title} data-testid={`video-${index + 1}`} />
              <div className="video-card-meta"><strong>{title}</strong><span>{note}</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="section section-light" id="decor">
      <div className="container">
        <SectionHeading kicker="Decoration gallery" title={<>Set the<br /><em>scene.</em></>} copy="Balloon arches, table styling, cake corners and the small details that turn a cafe visit into your celebration." />
        <div className="gallery-grid stagger">
          {gallery.map(([src, caption], index) => (
            <figure className="gallery-card" key={src} data-testid={`gallery-card-${index + 1}`}>
              <img src={asset(`img/${src}`)} alt={caption} loading="lazy" />
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function MomentsSection() {
  return (
    <section className="section section-ink" id="customers">
      <div className="container moments-layout">
        <div className="moments-title reveal">
          <div className="eyebrow">Happy customers</div>
          <h2 className="display">Keep the<br /><em>good bits.</em></h2>
          <p>Customer and celebration photos supplied for this website. The best table is the one that gets a little louder as the evening goes on.</p>
        </div>
        <div className="customer-grid stagger">
          {customerMoments.map(([src, label], index) => (
            <figure className="customer-card" key={src} data-testid={`customer-moment-${index + 1}`}>
              <img src={asset(`img/${src}`)} alt={label} loading="lazy" />
              <figcaption className="customer-tag">{label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="section section-light" id="reviews">
      <div className="container">
        <SectionHeading kicker="Customer feedback" title={<>The room<br /><em>remembers.</em></>} copy="Read the latest verified customer feedback directly on the cafe's Google Maps listing." />
        <div className="review-strip reveal">
          <div>
            <h3 className="display">See the real reviews.</h3>
            <p>This button opens the cafe's Google Maps listing, where customers can read the latest reviews and ratings.</p>
            <p className="review-note">We have not invented review text or names. The live listing is the best place to hear from the people who have visited.</p>
          </div>
          <div>
            <div className="review-badge"><span className="review-mark">G</span><span>Google Maps<br /><small>Live review source</small></span></div>
            <a className="button button-dark" style={{ marginTop: 16 }} href={mapsUrl} target="_blank" rel="noreferrer" data-testid="link-google-reviews">Open Google Reviews <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return (
    <section className="section section-paper contact-section" id="contact">
      <div className="container">
        <SectionHeading kicker="Visit & book" title={<>Come for the<br /><em>feeling.</em></>} copy="ITI CHOWK, TALCHER · For the quickest Dreamy House enquiry, send a WhatsApp." />
        <div className="contact-wrap">
          <div className="contact-card reveal">
            <div className="eyebrow">Break!! Cafe & Restro</div>
            <h2 className="display">There is always<br />room at our table.</h2>
            <p>For cafe enquiries call us. For Dreamy House bookings, use WhatsApp and tell us what you are celebrating.</p>
            <div className="contact-links">
              <a className="contact-link" href="tel:+918984099592" data-testid="link-contact-call"><Phone size={16} /> Call: +91 89840 99592</a>
              <a className="contact-link" href="https://wa.me/919438334239" target="_blank" rel="noreferrer" data-testid="link-contact-whatsapp"><Play size={15} /> WhatsApp: +91 94383 34239</a>
              <a className="contact-link" href={mapsUrl} target="_blank" rel="noreferrer" data-testid="link-contact-maps"><MapPin size={16} /> Open in Google Maps</a>
              <a className="contact-link" href={instagramUrl} target="_blank" rel="noreferrer" data-testid="link-contact-instagram"><Instagram size={16} /> @break.thecafe</a>
            </div>
          </div>
          <div className="booking-card reveal">
            <div className="eyebrow">Dreamy House</div>
            <h3 className="display">Tell us the<br />occasion.</h3>
            <p>Leave a quick note and we will shape the details together. This enquiry stays in your browser until you send it on WhatsApp.</p>
            {submitted ? (
              <div className="booking-success" data-testid="status-booking-submitted">Your details are ready. For a confirmed booking, send the same note on WhatsApp.</div>
            ) : (
              <form className="booking-form" onSubmit={handleSubmit}>
                <input required name="name" placeholder="Your name" aria-label="Your name" data-testid="input-booking-name" />
                <input required name="occasion" placeholder="What are you celebrating?" aria-label="Celebration occasion" data-testid="input-booking-occasion" />
                <select required name="guests" defaultValue="" aria-label="Number of guests" data-testid="select-booking-guests">
                  <option value="" disabled>How many guests?</option><option>Up to 10</option><option>11–20</option><option>21–40</option><option>More than 40</option>
                </select>
                <button className="button button-dark" type="submit" data-testid="button-booking-submit">Make an enquiry <ArrowUpRight size={15} /></button>
              </form>
            )}
            <a className="button button-dark" style={{ marginTop: 10, width: '100%' }} href={whatsappUrl} target="_blank" rel="noreferrer" data-testid="link-booking-whatsapp">Book / enquire on WhatsApp <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-line">
        <strong>Break!!</strong>
        <span>© Break!! Cafe & Restro · ITI Chowk, Talcher · Dreamy House</span>
        <a href="#top" data-testid="link-footer-top">Back to top <ArrowUpRight size={13} /></a>
      </div>
    </footer>
  );
}

function Home() {
  useRevealAnimations();
  useEffect(() => {
    document.title = 'Break!! Cafe & Restro | Dreamy House, Talcher';
    const description = "Break!! Cafe & Restro, Talcher — warm cafe dining, Dreamy House celebrations, party videos, decoration gallery and customer moments.";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = document.title;
  }, []);
  return (
    <div className="site-shell">
      <AmbientLayer />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <MenuSection />
        <HallSection />
        <VideoSection />
        <GallerySection />
        <MomentsSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <div className="floating-actions" aria-label="Quick contact actions">
        <a href="https://wa.me/919438334239" target="_blank" rel="noreferrer" aria-label="WhatsApp" data-testid="link-floating-whatsapp"><Play size={16} /></a>
        <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" data-testid="link-floating-instagram"><Instagram size={16} /></a>
        <a href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Google Maps" data-testid="link-floating-maps"><MapPin size={16} /></a>
        <a href="tel:+918984099592" aria-label="Call cafe" data-testid="link-floating-call"><Phone size={16} /></a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;