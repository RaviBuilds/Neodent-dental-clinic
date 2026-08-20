import {
  useEffect,
  useState,
  useRef,
  type FormEvent,
  type ReactNode,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";
const entranceImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Neodent%20dental%20hospital%20Interior-6gEP3lFz9hLW0mdFgt5OH9BytsCK1e.jpg";
const waitingImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Neodent%20dental%20hospital%20Interior-6gEP3lFz9hLW0mdFgt5OH9BytsCK1e.jpg";
const doctorImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dr.%20Md.%20Miftah%20Ur%20Rahman%20-%20Neodent%20Dental%20Hospital-wBj3lG72iqjj2q6uX5ZH0gWGAKB5DN.png";
const recognitionImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dr.%20Mohd.%20Siraj%20Ur%20Rahman%20-%20Neodent%20Dental%20Hospital%20Hyd-xayK2qFwCaiNp3g8lIGg8iTOwsb2qI.png";
const treatmentVideo = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dr.%20Miftah%20Neodent%20dental%20clinic%20Hyderabad%20-%20treatment%20video-DGRRw5vjVc271Ni7yHPsXcNruG7QvW.mp4";
const treatmentImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Neodent%20dental%20hospital%20Interior-6gEP3lFz9hLW0mdFgt5OH9BytsCK1e.jpg";
const equipmentImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Neodent%20dental%20hospital%20Interior-6gEP3lFz9hLW0mdFgt5OH9BytsCK1e.jpg";
const detailImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Neodent%20dental%20hospital%20Interior-6gEP3lFz9hLW0mdFgt5OH9BytsCK1e.jpg";
const philosophyImage = "/attached_assets/our-philosophy.webp";
const visitImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Neodent%20dental%20hospital%20Interior-6gEP3lFz9hLW0mdFgt5OH9BytsCK1e.jpg";
const officialLogo = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Neodent%20dental%20hospital%20hyderabad%20logo-4P3cEjHdeEdFSXWdfaBHy5QYphO7TW.jpeg";

const queryClient = new QueryClient();
const phone = "+91 9030648393";
const telPhone = "tel:+919030648393";
const whatsappLink = `https://wa.me/919030648393?text=${encodeURIComponent(
  "Hi, I'd like to book an appointment at Neodent Dental Hospitals.",
)}`;
const whatsappConsultLink = `https://wa.me/919030648393?text=${encodeURIComponent(
  "Hi, I'd like to enquire about a consultation at Neodent Dental Hospitals.",
)}`;
const address =
  "Masjid-e-Azizia, Humayun Nagar Road, Royal Colony, Humayun Nagar, Hyderabad, Telangana, India";
const shortLocation = "Humayun Nagar, Hyderabad";
const heroLocations = [
  { number: "01", name: "Humayun Nagar", detail: "Humayun Nagar, Hyderabad" },
  {
    number: "02",
    name: "Nampally",
    detail: "Medwin Hospital Complex, Nampally",
  },
] as const;
const directions =
  "https://www.google.com/maps/search/?api=1&query=Masjid-e-Azizia%2C%20Humayun%20Nagar%20Road%2C%20Royal%20Colony%2C%20Humayun%20Nagar%2C%20Hyderabad%2C%20Telangana%2C%20India";
const googleRating = { score: "4.3", count: 259 };
const LEAD_CAPTURE_SESSION_KEY = "neodent-lead-capture-shown";

type NavItem = { label: string; href: string };
const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Clinic", href: "#clinic" },
  { label: "Doctor", href: "#doctor" },
  { label: "Contact", href: "#contact" },
];

const galleryItems = [
  {
    src: entranceImage,
    label: "The Neodent entrance",
    alt: "Entrance to Neodent Dental Hospitals",
  },
  {
    src: waitingImage,
    label: "A considered waiting room",
    alt: "Neodent Dental Hospitals waiting area",
  },
  {
    src: equipmentImage,
    label: "Treatment room",
    alt: "Dental treatment equipment in a Neodent room",
  },
  {
    src: treatmentImage,
    label: "Inside the clinic",
    alt: "Dental treatment room at Neodent",
  },
  {
    src: equipmentImage,
    label: "Clinical detail",
    alt: "Dental equipment in a treatment room",
  },
];

function AppButton({
  children,
  onClick,
  href,
  variant = "dark",
  className = "",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "dark" | "light" | "ghost" | "primary";
  className?: string;
  type?: "button" | "submit";
}) {
  const classes = `button button-${variant} ${className}`;
  if (href)
    return (
      <a
        className={classes}
        href={href}
        data-testid={`link-${href.replace(/[^a-z0-9]+/gi, "-")}`}
      >
        {children}
      </a>
    );
  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      data-testid={`button-${String(children)
        .replace(/[^a-z0-9]+/gi, "-")
        .toLowerCase()}`}
    >
      {children}
    </button>
  );
}

function Navbar({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return (
    <header
      className={`nav ${scrolled ? "scrolled" : ""}`}
      data-testid="navigation-header"
    >
      <div className="container nav-inner">
        <a
          className="brand"
          href="#home"
          onClick={closeMenu}
          data-testid="link-home-brand"
        >
          <span className="brand-logo-wrap">
            <img
              className="brand-logo"
              src={officialLogo}
              alt="Neodent Dental Hospitals"
            />
          </span>
          <span className="brand-word">
            NEODENT
            <br />
            DENTAL HOSPITALS
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-testid={`link-nav-${item.label.toLowerCase()}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <AppButton onClick={onBook} variant="primary">
          Book Appointment
        </AppButton>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            data-testid={`link-mobile-${item.label.toLowerCase()}`}
          >
            {item.label}
          </a>
        ))}
        <AppButton
          onClick={() => {
            closeMenu();
            onBook();
          }}
          variant="dark"
        >
          Book Appointment
        </AppButton>
      </div>
    </header>
  );
}

const heroSlideMeta = [
  { id: "hospital", label: "Hospitals" },
  { id: "siraj", label: "Dr. Siraj" },
  { id: "miftah", label: "Dr. Miftah" },
] as const;
const HERO_AUTOPLAY_MS = 7000;
const inertAttr = (isInert: boolean) =>
  (isInert ? { inert: "" } : {}) as Record<string, string>;

function Hero() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((current) => (current + 1) % heroSlideMeta.length);
    }, HERO_AUTOPLAY_MS);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    setActive(index);
    startTimer();
  };
  const goRelative = (delta: number) => {
    goTo((active + delta + heroSlideMeta.length) % heroSlideMeta.length);
  };

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-slides">
        {/* Slide 01 — Dr. Siraj, the founder identity */}
        <article
          className={`hero-slide hero-slide-founder ${active === 0 ? "hero-slide-active" : ""}`}
          aria-hidden={active !== 0}
          {...inertAttr(active !== 0)}
        >
          <div className="hero-founder">
            <div className="hero-founder-bg" aria-hidden="true">
              <span className="hero-founder-gridlines" />
            </div>
            <span className="hero-founder-vertical-label" aria-hidden="true">
              Humayun Nagar &nbsp;·&nbsp; Nampally &nbsp;·&nbsp; Hyderabad
            </span>
            <div className="container hero-founder-inner">
              <div className="hero-founder-copy">
                <div className="hero-eyebrow">NeoDent Dental Hospitals</div>
                <p className="hero-founder-tagline">
                  Changing smiles since 3 decades.
                </p>
                <h1 id="hero-title" className="hero-title hero-founder-title">
                  Three decades{" "}
                  <span className="serif">of changing smiles.</span>
                </h1>
                <p className="hero-credentials">
                  Dr. Mohd. Siraj Ur Rahman · BDS, FCIP, MDS (Chennai)
                </p>
                <p className="hero-lead">
                  Dental Surgeon, Prosthodontist and Implantologist. Professor
                  at Osmania Government Dental College &amp; Hospital,
                  Hyderabad. Director, NeoDent Dental Hospitals.
                </p>
                <div className="hero-rating" data-testid="text-hero-rating">
                  <span className="hero-rating-stars" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={13}
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    ))}
                  </span>
                  <span className="hero-rating-score">
                    {googleRating.score}
                  </span>
                  <span className="hero-rating-divider" aria-hidden="true">
                    ·
                  </span>
                  <span>{googleRating.count} Google reviews</span>
                </div>
                <div
                  className="hero-founder-locations"
                  aria-label="Two NeoDent locations in Hyderabad"
                >
                  <MapPin size={13} aria-hidden="true" />
                  <span>2 Hyderabad locations</span>
                  <span aria-hidden="true">·</span>
                  <span>Humayun Nagar</span>
                  <span aria-hidden="true">·</span>
                  <span>Nampally</span>
                </div>
                <div className="hero-founder-contact">
                  <span className="hero-founder-contact-label">
                    Call today for a consultation
                  </span>
                  <a
                    className="hero-founder-phone"
                    href={telPhone}
                    data-testid="link-hero-phone"
                  >
                    <Phone size={16} aria-hidden="true" />
                    {phone}
                  </a>
                </div>
                <div className="hero-actions">
                  <AppButton href={telPhone} variant="primary">
                    Call for Consultation <ArrowRight size={15} />
                  </AppButton>
                  <AppButton href={whatsappConsultLink} variant="ghost">
                    WhatsApp the Clinic <MessageCircle size={14} />
                  </AppButton>
                </div>
              </div>
              <div className="hero-founder-visual">
                <span className="hero-founder-frame" aria-hidden="true" />
                <span className="hero-founder-mark" aria-hidden="true">
                  30<span>+</span>
                </span>
                <span className="hero-founder-mark-caption" aria-hidden="true">
                  Years of changing smiles
                </span>
                <span className="hero-founder-groundline" aria-hidden="true" />
                <img
                  className="hero-founder-portrait"
                  src={recognitionImage}
                  alt="Dr. Mohd. Siraj Ur Rahman, BDS, FCIP, MDS, Director of NeoDent Dental Hospitals, Hyderabad"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </article>

        {/* Slide 02 — Dr. Siraj */}
        <article
          className={`hero-slide ${active === 1 ? "hero-slide-active" : ""}`}
          aria-hidden={active !== 1}
          {...inertAttr(active !== 1)}
        >
          <div className="container hero-slide-grid hero-slide-grid-reverse">
            <div className="hero-slide-copy">
              <div className="hero-eyebrow">Director, NeoDent Dental Hospitals</div>
              <h1 className="hero-title">
                Dr. Mohd. Siraj{" "}
                <span className="serif">Ur Rahman.</span>
              </h1>
              <p className="hero-credentials">
                BDS, FCIP, MDS (Chennai)
              </p>
              <p className="hero-lead">
                Dental Surgeon · Prosthodontist · Implantologist. Professor at
                Osmania Government Dental College &amp; Hospital, Hyderabad.
              </p>
              <div className="hero-actions">
                <AppButton href="#doctor" variant="primary">
                  Meet Dr. Siraj <ArrowRight size={15} />
                </AppButton>
              </div>
            </div>
            <div className="hero-slide-visual hero-visual-doctor">
              <img
                className="hero-visual-portrait"
                src={recognitionImage}
                alt="Dr. Mohd. Siraj Ur Rahman, Director of NeoDent Dental Hospitals"
                loading="eager"
              />
            </div>
          </div>
        </article>

        {/* Slide 03 — Dr. Miftah */}
        <article
          className={`hero-slide ${active === 2 ? "hero-slide-active" : ""}`}
          aria-hidden={active !== 2}
          {...inertAttr(active !== 2)}
        >
          <div className="container hero-slide-grid">
            <div className="hero-slide-copy">
              <div className="hero-eyebrow">
                Assistant Director, NeoDent Dental Hospitals
              </div>
              <h1 className="hero-title">
                Dr. Md. Miftah{" "}
                <span className="serif">Ur Rahman.</span>
              </h1>
              <p className="hero-credentials">
                BDS, MDS, FICOI (U.S.A.) · Gold Medalist
              </p>
              <p className="hero-lead">
                Prosthodontist &amp; Implantologist. Assistant Professor at SB
                Patil Dental College &amp; Hospital.
              </p>
              <div className="hero-actions">
                <AppButton href="#expertise" variant="primary">
                  Explore Treatments <ArrowRight size={15} />
                </AppButton>
              </div>
            </div>
            <div className="hero-slide-visual hero-visual-video">
              <video
                className="hero-visual-video-el"
                src={treatmentVideo}
                poster={treatmentImage}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
              <img
                className="hero-visual-portrait hero-visual-portrait-overlay"
                src={doctorImage}
                alt="Dr. Md. Miftah Ur Rahman treating a patient at NeoDent"
                loading="eager"
              />
            </div>
          </div>
        </article>
      </div>

      <div className="hero-nav" aria-label="Hero slide navigation">
        <button
          type="button"
          className="hero-nav-arrow"
          onClick={() => goRelative(-1)}
          aria-label="Previous slide"
          data-testid="button-hero-prev"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="hero-nav-dots">
          {heroSlideMeta.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`hero-nav-dot ${active === index ? "hero-nav-dot-active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`Show ${slide.label} slide`}
              aria-current={active === index}
              data-testid={`button-hero-dot-${slide.id}`}
            />
          ))}
        </div>
        <button
          type="button"
          className="hero-nav-arrow"
          onClick={() => goRelative(1)}
          aria-label="Next slide"
          data-testid="button-hero-next"
        >
          <ChevronRight size={16} />
        </button>
        <span className="hero-nav-index" aria-hidden="true">
          {String(active + 1).padStart(2, "0")} / 0{heroSlideMeta.length}
        </span>
      </div>
    </section>
  );
}

function TrustStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const [activePrinciple, setActivePrinciple] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const principles = [
    {
      number: "01",
      title: "Experienced specialists",
      description:
        "Care led by experienced dental professionals across multiple areas of dentistry.",
    },
    {
      number: "02",
      title: "Comprehensive treatment",
      description:
        "From preventive and restorative care to implants, orthodontics and cosmetic dentistry.",
    },
    {
      number: "03",
      title: "Patient-first consultations",
      description:
        "Clear conversations, thoughtful treatment planning and care shaped around your individual needs.",
    },
    {
      number: "04",
      title: "Two Hyderabad locations",
      description:
        "Convenient access to NeoDent Dental Hospitals in Humayun Nagar and Nampally.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`trust ${isVisible ? "trust-visible" : ""}`}
      aria-label="Our care principles"
    >
      <div className="trust-decorative-bg">
        <div className="trust-glow trust-glow-1"></div>
        <div className="trust-glow trust-glow-2"></div>
      </div>
      <div className="container trust-content">
        <div className="trust-lead">
          <p>A clinic shaped by what patients need from dental care.</p>
          <span className="trust-lead-support">
            Good dental care begins with understanding what each patient needs —
            from the first conversation through treatment and follow-up.
          </span>
        </div>
        <div className="trust-principles">
          {principles.map((principle, index) => {
            return (
              <div
                className={`trust-item ${activePrinciple === index ? "trust-item-active" : ""}`}
                key={principle.number}
                onMouseEnter={() => setActivePrinciple(index)}
                onFocus={() => setActivePrinciple(index)}
                tabIndex={0}
                style={{
                  animationDelay: `${0.2 + index * 0.15}s`,
                }}
              >
                <div className="trust-item-number">{principle.number}</div>
                <div className="trust-item-content">
                  <h3 className="trust-item-title">{principle.title}</h3>
                  <p className="trust-item-description">
                    {principle.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="trust-footer-note">
          <span>Two locations. One standard of care.</span>
          <a href="#treatments">Discover our treatments <ArrowRight size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`about ${isVisible ? "about-visible" : ""}`}
      id="about"
      aria-labelledby="about-title"
    >
      <div className="about-decorative-bg">
        <div className="about-glow about-glow-1"></div>
        <div className="about-glow about-glow-2"></div>
      </div>
      <div className="container about-grid">
        <figure className="about-image">
          <div className="about-image-inner">
            <img
              src={philosophyImage}
              alt="Close dental treatment moment showing attentive clinical care at Neodent"
              loading="lazy"
            />
          </div>
          <figcaption className="image-tag">
            Care that begins with attention.
          </figcaption>
        </figure>
        <div className="about-copy">
          <div className="eyebrow">Our philosophy</div>
          <h2 id="about-title" className="section-heading">
            Dental care designed around <span className="serif">people,</span>{" "}
            not just procedures.
          </h2>
          <p className="about-quote serif">
            <span className="quote-mark">"</span>A good visit begins before
            treatment starts.
          </p>
          <p className="section-intro">
            At Neodent, we believe a dental visit should feel clear, comfortable
            and considered. Our approach is to make quality care feel
            approachable, with attention to the person sitting in the chair.
          </p>
          <a
            className="text-link"
            href="#experience"
            data-testid="link-about-experience"
          >
            See the patient experience <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function WhyNeodent() {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const principles = [
    {
      number: "01",
      title: "Experienced specialists",
      description:
        "Care led by experienced dental professionals across multiple areas of dentistry.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="16"
            r="6"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            cx="20"
            cy="16"
            r="6"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Comprehensive treatment",
      description:
        "From preventive and restorative care to implants, orthodontics and cosmetic dentistry.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 20V24C6 25.1046 6.89543 26 8 26H24C25.1046 26 26 25.1046 26 24V20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M6 20C6 16 8 14 12 14H20C24 14 26 16 26 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect
            x="11"
            y="6"
            width="10"
            height="8"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Patient-first consultations",
      description:
        "Clear conversations, thoughtful treatment planning and care shaped around your individual needs.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 6V26M6 16H26"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle
            cx="16"
            cy="16"
            r="9"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Two Hyderabad locations",
      description:
        "Convenient access to NeoDent Dental Hospitals in Humayun Nagar and Nampally.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 26C16 26 24 20 24 13C24 8.58172 20.4183 5 16 5C11.5817 5 8 8.58172 8 13C8 20 16 26 16 26Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="16"
            cy="13"
            r="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / window.innerHeight),
      );
      const translateY = (scrollProgress - 0.5) * 30;
      setParallaxY(translateY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section why ${isVisible ? "why-visible" : ""}`}
      aria-labelledby="why-title"
      style={{ "--parallax-y": `${parallaxY}px` } as React.CSSProperties}
    >
      <div className="why-floating-accent why-floating-accent-1" />
      <div className="why-floating-accent why-floating-accent-2" />
      <div className="container">
        <div className="why-header">
          <div>
            <div className="eyebrow">Why Neodent</div>
            <h2 id="why-title" className="section-heading">
              Quietly
              <br />
              <span className="serif">considered.</span>
            </h2>
          </div>
          <p className="section-intro">
            The details of a good visit matter: a calm room, a clear
            conversation and care that never feels rushed.
          </p>
        </div>
        <div className="principles">
          {principles.map((principle) => (
            <div className="principle" key={principle.number}>
              <div className="principle-icon">{principle.icon}</div>
              <div>
                <span className="principle-number">{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const expertise = [
    {
      number: "01",
      title: "Prosthodontics",
      description:
        "Focused care for restoring function, comfort and confidence.",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M20 14V20L24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="20" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Implantology",
      description:
        "Thoughtful implant care guided by a considered clinical approach.",
      icon: <span className="expertise-icon-glyph" aria-hidden="true">+</span>,
    },
    {
      number: "03",
      title: "Restorative dentistry",
      description:
        "Practical restorative care that helps bring back everyday comfort and function.",
      icon: <span className="expertise-icon-glyph" aria-hidden="true">+</span>,
    },
    {
      number: "04",
      title: "Cosmetic dentistry",
      description:
        "Subtle, considered improvements designed around your natural smile.",
      icon: <span className="expertise-icon-glyph" aria-hidden="true">+</span>,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / window.innerHeight),
      );
      const translateY = (scrollProgress - 0.5) * 40;
      setParallaxY(translateY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section expertise ${isVisible ? "expertise-visible" : ""}`}
      id="expertise"
      aria-labelledby="expertise-title"
      style={{ "--parallax-y": `${parallaxY}px` } as React.CSSProperties}
    >
      <div className="expertise-decorative-bg">
        <div className="expertise-glow expertise-glow-1" />
        <div className="expertise-glow expertise-glow-2" />
      </div>
      <div className="expertise-floating-accent expertise-floating-accent-1" />
      <div className="expertise-floating-accent expertise-floating-accent-2" />
      <div className="container expertise-grid">
        <div className="expertise-header">
          <div className="eyebrow">Focused care</div>
          <h2 id="expertise-title" className="section-heading">
            Our dental <span className="serif">expertise.</span>
          </h2>
          <p className="section-intro" style={{ marginTop: 26 }}>
            A focused range of care, brought together in one welcoming Hyderabad
            practice.
          </p>
        </div>
        <div className="expertise-list">
          {expertise.map((item, index) => (
            <div
              className="expertise-item"
              key={item.title}
              style={{
                animationDelay: `${0.2 + index * 0.25}s`,
              }}
            >
              <div className="expertise-icon-wrapper">
                <div className="expertise-icon">{item.icon}</div>
                <div className="expertise-number">{item.number}</div>
              </div>
              <div className="expertise-content">
                <span className="expertise-kicker">{item.number} / FOCUS</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Doctor() {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [floatingImageY, setFloatingImageY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const credentials = [
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M16 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M20 14V20L24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="20" r="2" fill="currentColor" />
        </svg>
      ),
      label: "Prosthodontist",
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M16 10V30"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M16 10C13 10 11 12 11 15V18H21V15C21 12 19 10 16 10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="16"
            cy="30"
            r="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
      label: "Implantologist",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imageContainerRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / window.innerHeight),
      );
      const translateY = (scrollProgress - 0.5) * 50;
      setParallaxY(translateY);

      // Refined parallax for floating doctor portrait
      // Creates restrained vertical movement in opposite direction to scroll
      const sectionTop = rect.top;
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate scroll progress through the section
      // 0 = section entering viewport from bottom
      // 0.5 = section centered in viewport
      // 1 = section exiting viewport from top
      const scrollRange = windowHeight + sectionHeight;
      const normalizedProgress = Math.max(
        0,
        Math.min(1, (windowHeight - sectionTop) / scrollRange),
      );

      // Apply restrained parallax movement
      // Desktop: 60px total travel, Mobile: 20px total travel
      const isMobile = window.innerWidth <= 560;
      const maxTravel = isMobile ? 20 : 60;

      // Movement: starts at -maxTravel/2, ends at +maxTravel/2
      // This creates the editorial effect where the portrait moves vertically relative to the main image
      const newY = (normalizedProgress - 0.5) * maxTravel;

      setFloatingImageY(newY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section doctor ${isVisible ? "doctor-visible" : ""}`}
      id="doctor"
      aria-labelledby="doctor-title"
      style={{ "--parallax-y": `${parallaxY}px` } as React.CSSProperties}
    >
      <div className="doctor-decorative-bg">
        <div className="doctor-glow doctor-glow-1" />
        <div className="doctor-glow doctor-glow-2" />
      </div>
      <div className="doctor-floating-accent doctor-floating-accent-1" />
      <div className="doctor-floating-accent doctor-floating-accent-2" />
      <div className="container doctor-grid">
        <figure className="doctor-image">
          <div className="doctor-image-inner">
            <video
              className="doctor-treatment-video"
              src={treatmentVideo}
              aria-label="Dr. Miftah Ur Rahman demonstrating treatment at Neodent"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
          <figcaption>Care in practice</figcaption>
        </figure>
        <div className="doctor-copy">
          <div className="eyebrow">Meet the doctor</div>
          <h2 id="doctor-title" className="section-heading">
            A steady hand.
            <br />
            <span className="serif">A human approach.</span>
          </h2>
          <p className="section-intro">
            Neodent is directed by Dr. Md. Sirajur Rahman, whose work brings
            specialist clinical focus and a personal presence to every conversation.
          </p>
          <h3 className="doctor-name">Dr. Md. Sirajur Rahman</h3>
          <div className="doctor-credentials">
            {credentials.map((credential, index) => (
              <div className="doctor-credential" key={credential.label}>
                <div className="doctor-credential-icon">{credential.icon}</div>
                <span>{credential.label}</span>
              </div>
            ))}
          </div>
          <p className="doctor-description">
            Director — Neodent Dental Hospitals
          </p>
          <a className="text-link doctor-link" href="#appointment">
            Book a consultation <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Recognition() {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / window.innerHeight),
      );
      const translateY = (scrollProgress - 0.5) * 40;
      setParallaxY(translateY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`recognition ${isVisible ? "recognition-visible" : ""}`}
      aria-labelledby="recognition-title"
      style={{ "--parallax-y": `${parallaxY}px` } as React.CSSProperties}
    >
      <div className="recognition-background" aria-hidden="true" />
      <div className="container recognition-container">
        {/* Header */}
        <div className="recognition-header">
          <p className="recognition-eyebrow">
            <Sparkles size={16} strokeWidth={2} aria-hidden="true" />
            Professional recognition
          </p>
          <h2 id="recognition-title">
            A commitment to considered clinical care.
          </h2>
          <p className="recognition-intro">
            A professional standard carried into every consultation — with precise
            planning, continued learning and a patient experience that feels clear
            from the first conversation.
          </p>
        </div>

        {/* Asymmetric Editorial Layout */}
        <div className="recognition-content-grid">
          {/* Left: Featured Image + Badge */}
          <div className="recognition-featured">
            <div className="recognition-parallax">
              <div className="recognition-featured-frame" aria-hidden="true" />
              <figure className="recognition-featured-image">
                <img
                  src={recognitionImage}
                  alt="Dr. Md. Sirajur Rahman receiving professional recognition"
                  loading="lazy"
                />
                <div
                  className="recognition-badge-overlay"
                  aria-label="Professional excellence award"
                >
                  <Award size={28} strokeWidth={2.5} />
                </div>
              </figure>
            </div>
          </div>

          {/* Right: Credentials Stack */}
          <div className="recognition-credentials">
            <div className="recognition-credential recognition-credential-1">
              <div className="recognition-credential-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Medal badge with checkmark — professional excellence / certification */}
                  <circle className="icon-path" cx="24" cy="18" r="10" />
                  <path className="icon-path" d="M19 18L22.5 21.5L29 14" />
                  <path
                    className="icon-path"
                    d="M17 25L12 39L20 34L24 41L28 34L36 39L31 25"
                  />
                </svg>
              </div>
              <h3>Professional Excellence</h3>
              <p>
                Maintaining the highest standards of clinical practice through
                ongoing education, certification, and peer-reviewed methods.
              </p>
            </div>

            <div className="recognition-credential recognition-credential-2">
              <div className="recognition-credential-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Heart with pulse line — patient trust / attentive care */}
                  <path
                    className="icon-path"
                    d="M24 37C24 37 8 26.5 8 15.5C8 10.5 12 7 16.5 7C19.7 7 22.6 8.9 24 12C25.4 8.9 28.3 7 31.5 7C36 7 40 10.5 40 15.5C40 26.5 24 37 24 37Z"
                  />
                  <path
                    className="icon-path"
                    d="M13 19H18L21 12L27 28L30 19H35"
                  />
                </svg>
              </div>
              <h3>Patient Trust</h3>
              <p>
                Earned through consistent care, clear communication, and
                treatment outcomes that reflect each patient's individual needs.
              </p>
            </div>

            <div className="recognition-credential recognition-credential-3">
              <div className="recognition-credential-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Tooth with verified badge — consistent, dependable clinical care */}
                  <path
                    className="icon-path"
                    d="M17 8C13 8 9 11 9 15.5C9 19 9.8 22 11 25.5C11.6 27.3 12.3 29 13.3 29C14.3 29 14.8 27 15.2 25C15.5 23.5 16.2 23 17 23C17.8 23 18.5 23.5 18.8 25C19.2 27 19.7 29 20.7 29C21.7 29 22.4 27.3 23 25.5C24.2 22 25 19 25 15.5C25 11 21 8 17 8Z"
                  />
                  <circle className="icon-path" cx="34" cy="32" r="8" />
                  <path className="icon-path" d="M30.5 32L33 34.5L37.5 29.5" />
                </svg>
              </div>
              <h3>Consistent Care</h3>
              <p>
                Every appointment reflects our commitment to precision,
                transparency, and creating a welcoming clinical environment.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="recognition-footer">
          <Clock3 size={18} strokeWidth={2} aria-hidden="true" />
          Evening appointments available at NeoDent Dental Hospitals: 04:00 PM – 09:00 PM
        </div>
      </div>
    </section>
  );
}

function Contact({ onBook }: { onBook: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / window.innerHeight),
      );
      setParallaxY((scrollProgress - 0.5) * 26);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section contact ${isVisible ? "contact-visible" : ""}`}
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-ambient" aria-hidden="true" />
      <div className="container contact-grid">
        <div className="contact-copy">
          <div className="eyebrow">Find your way to us</div>
          <h2 id="contact-title" className="section-heading">
            Visit Neodent <span className="serif">Dental Hospitals.</span>
          </h2>
          <div className="contact-location-summary">
            <span className="contact-location-kicker">Two locations in Hyderabad</span>
            <div className="contact-location-list">
              {heroLocations.map((location) => (
                <a href="#clinic" key={location.number}>
                  <span>{location.number}</span>
                  <strong>{location.name}</strong>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <dl className="contact-details">
            <div className="detail detail-1">
              <div className="detail-icon" aria-hidden="true">
                <MapPin size={18} strokeWidth={2} />
              </div>
              <div className="detail-body">
                <dt>Humayun Nagar</dt>
                <dd>{address}</dd>
              </div>
            </div>
            <div className="detail detail-2">
              <div className="detail-icon" aria-hidden="true">
                <Phone size={18} strokeWidth={2} />
              </div>
              <div className="detail-body">
                <dt>Phone</dt>
                <dd>
                  <a href={telPhone} data-testid="link-contact-phone">
                    {phone}
                  </a>
                </dd>
              </div>
            </div>
            <div className="detail detail-3">
              <div className="detail-icon" aria-hidden="true">
                <Clock3 size={18} strokeWidth={2} />
              </div>
              <div className="detail-body">
                <dt>Hours</dt>
                <dd>04:00 PM – 09:00 PM</dd>
              </div>
            </div>
          </dl>
          <div className="contact-actions">
            <AppButton href={telPhone}>
              <Phone size={14} /> Call now
            </AppButton>
            <AppButton href={directions} variant="ghost">
              <MapPin size={14} /> Directions
            </AppButton>
          </div>
        </div>
        <div
          className="map-card"
          aria-label="Neodent Dental Hospitals location"
        >
          <div
            className="map-card-frame"
            style={{ "--parallax-y": `${parallaxY}px` } as React.CSSProperties}
          >
            <img
              src={entranceImage}
              alt="Neodent Dental Hospitals entrance on Humayun Nagar Road"
              loading="lazy"
            />
            <div className="location-panel">
              <div className="map-label">Find us in Humayun Nagar</div>
              <div className="map-address">{address}</div>
              <AppButton href={directions} variant="light">
                Open directions <ArrowRight size={14} />
              </AppButton>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: 45 }}>
        <AppButton onClick={onBook}>
          Prefer to book first? <ArrowRight size={14} />
        </AppButton>
      </div>
    </section>
  );
}

function FinalCta({ onBook }: { onBook: () => void }) {
  return (
    <section className="final-cta" aria-labelledby="cta-title">
      <div className="eyebrow">Your next visit</div>
      <h2 id="cta-title">
        Let’s make your visit feel <span className="serif">simple.</span>
      </h2>
      <p>Choose your preferred location, then let&apos;s begin with a conversation.</p>
      <div className="final-actions">
        <AppButton onClick={onBook} variant="primary">
          Book an Appointment <ArrowRight size={14} />
        </AppButton>
        <AppButton href={telPhone} variant="ghost">
          <Phone size={14} /> Call {phone}
        </AppButton>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <a className="brand" href="#home" data-testid="link-footer-brand">
<span className="brand-logo-wrap">
            <img className="brand-logo" src={officialLogo} alt="Neodent Dental Hospitals" />
          </span>
          <span className="brand-word">
            NEODENT
            <br />
            DENTAL HOSPITALS
          </span>
            </a>
            <p className="footer-tag">
              Expert dental care in Hyderabad, presented with clarity and care.
            </p>
          </div>
          <div>
            <div className="footer-label">Explore</div>
            <nav className="footer-list" aria-label="Footer navigation">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-testid={`link-footer-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <div className="footer-label">Contact</div>
            <div className="footer-list">
              <a href={telPhone} data-testid="link-footer-phone">
                {phone}
              </a>
              <a href={directions} data-testid="link-footer-directions">
                Get directions
              </a>
              <span>04:00 PM – 09:00 PM</span>
              <span>Humayun Nagar · Nampally, Hyderabad</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Neodent Dental Hospitals</span>
          <span>Two Hyderabad locations · One standard of care</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingCta({ onBook }: { onBook: () => void }) {
  return (
    <div className="floating-cta">
      <a
        className="floating-cta-icon floating-cta-call"
        href={telPhone}
        aria-label={`Call Neodent Dental Hospitals at ${phone}`}
        data-testid="link-floating-call"
      >
        <Phone size={20} strokeWidth={2} />
        <span className="floating-cta-tooltip">Call {phone}</span>
      </a>
      <a
        className="floating-cta-icon floating-cta-whatsapp"
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        data-testid="link-floating-whatsapp"
      >
        <MessageCircle size={22} strokeWidth={2} />
        <span className="floating-cta-tooltip">Chat on WhatsApp</span>
      </a>
      <AppButton onClick={onBook} variant="primary" className="floating-cta-book">
        Book Appointment
      </AppButton>
    </div>
  );
}

function AppointmentModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    message: "",
  });
  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.phone.trim() || form.phone.trim().length < 10)
      next.phone = "Please enter a valid phone number.";
    if (!form.date) next.date = "Please choose a preferred date.";
    setErrors(next);
    if (!Object.keys(next).length) setSubmitted(true);
  };
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-title"
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close appointment form"
          data-testid="button-close-appointment"
        >
          <X size={20} />
        </button>
        {submitted ? (
          <div className="success-state">
            <div className="success-mark">
              <Check size={27} />
            </div>
            <div className="eyebrow">Request received</div>
            <h2>Thank you, {form.name.split(" ")[0]}.</h2>
            <p>
              Your appointment request is ready for the Neodent team. We’ll use
              the phone number you shared to follow up.
            </p>
            <AppButton onClick={onClose}>Return to the clinic</AppButton>
          </div>
        ) : (
          <>
            <div className="eyebrow">Book a visit</div>
            <h2 id="appointment-title">Start with a conversation.</h2>
            <p className="modal-sub">
              Share a few details and the clinic team can help plan your visit.
            </p>
            <form onSubmit={submit} noValidate>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="appointment-name">Name</label>
                  <input
                    id="appointment-name"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    data-testid="input-appointment-name"
                  />
                  {errors.name && (
                    <span className="error-text">{errors.name}</span>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="appointment-phone">Phone</label>
                  <input
                    id="appointment-phone"
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    placeholder="+91"
                    autoComplete="tel"
                    inputMode="tel"
                    data-testid="input-appointment-phone"
                  />
                  {errors.phone && (
                    <span className="error-text">{errors.phone}</span>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="appointment-date">Preferred date</label>
                  <input
                    id="appointment-date"
                    type="date"
                    value={form.date}
                    onChange={(event) => update("date", event.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    data-testid="input-appointment-date"
                  />
                  {errors.date && (
                    <span className="error-text">{errors.date}</span>
                  )}
                </div>
                <div className="field full">
                  <label htmlFor="appointment-message">
                    Message{" "}
                    <span style={{ fontWeight: 500, opacity: 0.6 }}>
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="appointment-message"
                    value={form.message}
                    onChange={(event) => update("message", event.target.value)}
                    placeholder="Anything you would like us to know?"
                    data-testid="input-appointment-message"
                  />
                </div>
              </div>
              <button
                className="button button-dark form-submit"
                type="submit"
                data-testid="button-submit-appointment"
              >
                Send appointment request <ArrowRight size={14} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function LeadCapture({
  onClose,
  onBook,
}: {
  onClose: () => void;
  onBook: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="lead-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="lead-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-capture-title"
      >
        <span className="lead-handle" aria-hidden="true" />
        <button
          className="lead-close"
          onClick={onClose}
          aria-label="Dismiss"
          data-testid="button-close-lead-capture"
        >
          <X size={18} />
        </button>
        <div className="eyebrow lead-eyebrow">Before you go</div>
        <h2 id="lead-capture-title">Let's make it easy to visit.</h2>
        <p className="lead-sub">
          Book a time, call the clinic, or find your way to Humayun Nagar —
          whichever feels right.
        </p>
        <div className="lead-hours">
          <Clock3 size={14} strokeWidth={2} />
          <span>Open today, 04:00 PM – 09:00 PM</span>
        </div>
        <div className="lead-actions">
          <AppButton onClick={onBook} variant="primary">
            Book an Appointment <ArrowRight size={14} />
          </AppButton>
          <AppButton href={telPhone} variant="ghost">
            <Phone size={14} /> Call the Clinic
          </AppButton>
        </div>
        <a
          className="lead-directions"
          href={directions}
          data-testid="link-lead-directions"
        >
          <MapPin size={13} strokeWidth={2} /> Get directions to the clinic
        </a>
      </div>
    </div>
  );
}

function Gallery({ onImage }: { onImage: (src: string, alt: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Track real scroll position to drive the progress bar and button states.
  // This replaces the old CSS transform animation, which was fighting with
  // native scrollLeft and made the buttons appear broken.
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const updateScrollState = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
      // Scroll-snap rests items against the carousel's own inline padding,
      // so the resting "start" position is ~paddingLeft, not exactly 0.
      const tolerance = parseFloat(getComputedStyle(el).paddingLeft || "0") + 4;
      setScrollProgress(progress);
      setAtStart(el.scrollLeft <= tolerance);
      setAtEnd(el.scrollLeft >= maxScroll - tolerance);
    };

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const handlePrevious = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`section gallery ${isVisible ? "gallery-visible" : ""}`}
      id="clinic"
      aria-labelledby="gallery-title"
      aria-describedby="gallery-intro"
    >
      <div className="gallery-decorative-bg" aria-hidden="true">
        <div className="gallery-glow gallery-glow-1"></div>
        <div className="gallery-glow gallery-glow-2"></div>
        {/* Decorative architectural elements */}
        <svg
          className="gallery-arch-accent gallery-arch-1"
          width="180"
          height="180"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 180 Q20 20 100 20 T180 180"
            stroke="rgba(90, 140, 140, 0.08)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M30 180 Q30 30 100 30 T170 180"
            stroke="rgba(90, 140, 140, 0.05)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="100" cy="20" r="3" fill="rgba(90, 140, 140, 0.1)" />
        </svg>
        <svg
          className="gallery-arch-accent gallery-arch-2"
          width="180"
          height="180"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 180 Q20 20 100 20 T180 180"
            stroke="rgba(90, 140, 140, 0.08)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M30 180 Q30 30 100 30 T170 180"
            stroke="rgba(90, 140, 140, 0.05)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="100" cy="20" r="3" fill="rgba(90, 140, 140, 0.1)" />
        </svg>
        {/* Decorative grid pattern */}
        <svg
          className="gallery-grid-accent"
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="40"
            y1="0"
            x2="40"
            y2="120"
            stroke="rgba(90, 140, 140, 0.06)"
            strokeWidth="1"
          />
          <line
            x1="80"
            y1="0"
            x2="80"
            y2="120"
            stroke="rgba(90, 140, 140, 0.06)"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="40"
            x2="120"
            y2="40"
            stroke="rgba(90, 140, 140, 0.06)"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="80"
            x2="120"
            y2="80"
            stroke="rgba(90, 140, 140, 0.06)"
            strokeWidth="1"
          />
          <circle cx="40" cy="40" r="2" fill="rgba(90, 140, 140, 0.1)" />
          <circle cx="80" cy="40" r="2" fill="rgba(90, 140, 140, 0.1)" />
          <circle cx="40" cy="80" r="2" fill="rgba(90, 140, 140, 0.1)" />
          <circle cx="80" cy="80" r="2" fill="rgba(90, 140, 140, 0.1)" />
        </svg>
      </div>
      <div className="container">
        <div className="gallery-head">
          <div>
            <p className="gallery-eyebrow eyebrow">
              <svg
                width="20"
                height="20"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 4v8M4 4h8M28 4v8M28 4h-8M4 28v-8M4 28h8M28 28v-8M28 28h-8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              The clinic
            </p>
            <h2 id="gallery-title" className="section-heading">
              Spaces designed around care.
            </h2>
          </div>
          <p id="gallery-intro" className="section-intro">
            Every corner of Neodent reflects our commitment to patient
            comfort—from the welcoming entrance to the carefully considered
            treatment rooms.
          </p>
        </div>
        <div className="gallery-carousel-container">
          <div className="gallery-carousel-wrapper">
            <div ref={carouselRef} className="gallery-carousel" role="list">
              {galleryItems.map((item, index) => (
                <button
                  key={`${item.src}-${index}`}
                  type="button"
                  className="gallery-item"
                  onClick={() => onImage(item.src, item.alt)}
                  aria-label={`View full image: ${item.label}`}
                  role="listitem"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                    className={loadedImages.has(index) ? "loaded" : ""}
                  />
                  <span className="gallery-caption">
                    {item.label}
                    <svg
                      className="gallery-zoom-hint"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M15 15l6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="gallery-controls">
            <button
              className="gallery-control gallery-control-prev"
              aria-label="View previous images"
              type="button"
              onClick={handlePrevious}
              disabled={atStart}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="gallery-control gallery-control-next"
              aria-label="View next images"
              type="button"
              onClick={handleNext}
              disabled={atEnd}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="gallery-progress">
            <div
              className="gallery-progress-bar"
              style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
const visitSteps = [
  {
    number: "01",
    title: "Arrival & check-in",
    description:
      "You're welcomed at reception and any paperwork is handled before you're shown through.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Clipboard with check — check-in / paperwork */}
        <rect
          className="icon-path"
          x="12"
          y="9"
          width="24"
          height="32"
          rx="2.5"
        />
        <path
          className="icon-path"
          d="M18 9V6.5C18 5.7 18.7 5 19.5 5H28.5C29.3 5 30 5.7 30 6.5V9"
        />
        <path className="icon-path" d="M18 23L22 27L31 17" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Consultation",
    description:
      "A direct conversation with Dr. Md. Sirajur Rahman about what's on your mind.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Speech bubble — consultation / conversation */}
        <path
          className="icon-path"
          d="M8 14.5C8 11.5 10.5 9 13.5 9H34.5C37.5 9 40 11.5 40 14.5V26.5C40 29.5 37.5 32 34.5 32H21L14 39V32H13.5C10.5 32 8 29.5 8 26.5V14.5Z"
        />
        <path className="icon-path" d="M16 17.5H32" />
        <path className="icon-path" d="M16 23.5H26" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Treatment",
    description:
      "Your procedure is carried out in the treatment room, at a measured, unhurried pace.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Tooth — treatment */}
        <path
          className="icon-path"
          d="M24 6C18 6 13 10.5 13 16.5C13 21.5 14.2 25.5 15.8 30.5C16.6 33 17.4 35.5 18.9 35.5C20.2 35.5 20.9 32.7 21.4 30C21.9 27.7 22.8 27 24 27C25.2 27 26.1 27.7 26.6 30C27.1 32.7 27.8 35.5 29.1 35.5C30.6 35.5 31.4 33 32.2 30.5C33.8 25.5 35 21.5 35 16.5C35 10.5 30 6 24 6Z"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Follow-up",
    description:
      "Clear guidance on next steps and aftercare before you leave, so nothing feels uncertain.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Calendar with check — follow-up / next appointment */}
        <rect
          className="icon-path"
          x="8"
          y="11"
          width="32"
          height="29"
          rx="2.5"
        />
        <path className="icon-path" d="M8 19H40" />
        <path className="icon-path" d="M15 6V13" />
        <path className="icon-path" d="M33 6V13" />
        <path className="icon-path" d="M17 29L21.5 33.5L31 24" />
      </svg>
    ),
  },
];

function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [lineFill, setLineFill] = useState<number[]>([0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(
          0,
          Math.min(1, (window.innerHeight - rect.top) / window.innerHeight),
        );
        setParallaxY((scrollProgress - 0.5) * 30);
      }

      if (timelineRef.current) {
        const trect = timelineRef.current.getBoundingClientRect();
        const overall = Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight - trect.top) /
              (window.innerHeight + trect.height),
          ),
        );
        setLineFill(
          [0, 1, 2].map((i) => Math.max(0, Math.min(1, overall * 3 - i))),
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`experience ${isVisible ? "experience-visible" : ""}`}
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="experience-ambient" aria-hidden="true" />
      <div className="container experience-layout">
        <div className="experience-intro">
          <div className="eyebrow">Patient experience</div>
          <h2 id="experience-title" className="experience-heading">
            What to expect from a visit to Neodent.
          </h2>
          <p className="section-intro experience-lede">
            A considered appointment from the first hello to the final goodbye.
          </p>
          <figure className="experience-photo">
            <div
              className="experience-photo-frame"
              style={
                { "--parallax-y": `${parallaxY}px` } as React.CSSProperties
              }
            >
              <img
                src={visitImage}
                alt="Dr. Md. Sirajur Rahman with a patient seated for treatment at Neodent"
                loading="lazy"
              />
            </div>
          </figure>
        </div>

        <ol className="experience-timeline" ref={timelineRef}>
          {visitSteps.map((step, index) => (
            <li
              key={step.number}
              className={`experience-step experience-step-${index + 1}`}
            >
              <div className="experience-step-marker">
                <div className="experience-step-icon" aria-hidden="true">
                  {step.icon}
                </div>
              </div>
              <div className="experience-step-content">
                <span className="experience-step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < visitSteps.length - 1 && (
                <div className="experience-connector" aria-hidden="true">
                  <span className="experience-connector-track" />
                  <span
                    className="experience-connector-fill"
                    style={{ height: `${lineFill[index] * 100}%` }}
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Home() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null,
  );
  const [leadCaptureOpen, setLeadCaptureOpen] = useState(false);
  const leadCaptureShown = useRef(false);

  useEffect(() => {
    const original = document.body.style.overflow;
    if (appointmentOpen || lightbox || leadCaptureOpen)
      document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [appointmentOpen, lightbox, leadCaptureOpen]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(LEAD_CAPTURE_SESSION_KEY) === "1") {
        leadCaptureShown.current = true;
      }
    } catch {
      // sessionStorage unavailable; fall back to in-memory tracking only.
    }

    const onScroll = () => {
      if (leadCaptureShown.current || appointmentOpen) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = window.scrollY / scrollable;
      if (progress >= 0.5) {
        leadCaptureShown.current = true;
        try {
          sessionStorage.setItem(LEAD_CAPTURE_SESSION_KEY, "1");
        } catch {
          // ignore storage errors
        }
        setLeadCaptureOpen(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [appointmentOpen]);

  const openBooking = () => {
    setLeadCaptureOpen(false);
    setAppointmentOpen(true);
  };

  return (
    <div className="site">
      <Navbar onBook={() => setAppointmentOpen(true)} />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <WhyNeodent />
        <Expertise />
        <Doctor />
        <Recognition />
        <Gallery onImage={(src, alt) => setLightbox({ src, alt })} />
        <Experience />
        <Contact onBook={() => setAppointmentOpen(true)} />
        <FinalCta onBook={() => setAppointmentOpen(true)} />
      </main>
      <Footer />
      <FloatingCta onBook={() => setAppointmentOpen(true)} />
      <div className="mobile-bar">
        <AppButton href={telPhone} variant="ghost">
          <Phone size={14} /> Call
        </AppButton>
        <AppButton onClick={() => setAppointmentOpen(true)} variant="primary">
          Book Appointment <ArrowRight size={14} />
        </AppButton>
      </div>
      {appointmentOpen && (
        <AppointmentModal onClose={() => setAppointmentOpen(false)} />
      )}
      {!appointmentOpen && leadCaptureOpen && (
        <LeadCapture
          onClose={() => setLeadCaptureOpen(false)}
          onBook={openBooking}
        />
      )}
      {lightbox && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setLightbox(null)}
        >
          <div
            className="modal"
            style={{
              padding: 10,
              width: "min(850px, 100%)",
              background: "var(--ink)",
            }}
          >
            <button
              className="modal-close"
              style={{ color: "var(--paper)" }}
              onClick={() => setLightbox(null)}
              aria-label="Close image"
              data-testid="button-close-gallery"
            >
              <X size={20} />
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              style={{
                display: "block",
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
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
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
