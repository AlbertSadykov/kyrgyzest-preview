import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, FreeMode, Pagination } from "swiper/modules";
import {
  photos,
  tours,
  destinations,
  gallery,
  reviews,
  faqs,
  mapPoints,
} from "./data/content";
import kyrgyzstanOutline from "./data/kyrgyzstan-outline-detailed.json";

const publicFile = (path) => `${import.meta.env.BASE_URL}${path}`;
const asset = (filename) => publicFile(`assets/${filename}`);

const ORIGINAL = asset("kyrgyzest-original-logo.png");
const WHITE_LETTERING = asset("kyrgyzest-logo-white-lettering.png");
const OSHKA_LOGO = asset("oshka-logo.svg");
const PHONE = "996551057666";
const SITE = "https://kyrgyzest.com/";
const socials = {
  whatsapp: `https://wa.me/${PHONE}`,
  instagram: "https://www.instagram.com/kyrgyzest.tours/",
};
const nav = [
  ["Tours", "#tours"],
  ["Destinations", "#destinations"],
  ["About us", "#about"],
  ["Gallery", "#gallery"],
  ["Reviews", "#reviews"],
  ["FAQ", "#faq"],
];
function I({ name, className = "" }) {
  return <i aria-hidden="true" className={`ri-${name} ${className}`} />;
}
function ImageWithFallback({
  src,
  alt = "",
  className = "",
  style = {},
  loading = "lazy",
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return failed ? (
    <div
      role="img"
      aria-label={`${alt} — original photograph unavailable`}
      className={`image-fallback ${className}`}
      style={style}
    >
      <I name="image-line" className="text-3xl" />
      <span>Image temporarily unavailable</span>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
function Button({
  children,
  variant = "brand",
  className = "",
  icon = "arrow-right-up-line",
  onClick,
  href,
  type = "button",
  target,
}) {
  const cls = `ui-button ${variant === "brand" ? "ui-button-brand" : variant === "light" ? "ui-button-light" : variant === "ghost" ? "ui-button-ghost" : "ui-button-outline"} ${className}`;
  const contents = (
    <>
      <span>{children}</span>
      {icon && <I name={icon} className="text-lg" />}
    </>
  );
  return href ? (
    <a
      className={cls}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {contents}
    </a>
  ) : (
    <button type={type} className={cls} onClick={onClick}>
      {contents}
    </button>
  );
}
function Eyebrow({ children, light = false }) {
  return (
    <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span className="eyebrow-mark" />
      {children}
    </div>
  );
}
function SectionHeading({ eyebrow, title, desc, action, light = false }) {
  return (
    <div className="section-heading" data-aos="fade-up">
      <div>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
        <h2 className={`section-title ${light ? "text-white" : ""}`}>
          {title}
        </h2>
        {desc && (
          <p className={`section-description ${light ? "text-white/65" : ""}`}>
            {desc}
          </p>
        )}
      </div>
      {action && <div className="section-action">{action}</div>}
    </div>
  );
}

function Header({ openBooking }) {
  const [scrolled, setScrolled] = useState(false),
    [mobile, setMobile] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobile]);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner max-container">
        <a
          href="#home"
          className="header-logo"
          aria-label="Kyrgyzest Tours home"
          onClick={() => setMobile(false)}
        >
          <img src={WHITE_LETTERING} alt="Kyrgyzest Tours" />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([l, h]) => (
            <a href={h} key={h}>
              {l}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            href={socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="header-chat"
            aria-label="Contact on WhatsApp"
          >
            <I name="whatsapp-line" />
          </a>
          <button className="header-contact" onClick={openBooking}>
            Plan a trip <I name="arrow-right-up-line" />
          </button>
          <button
            className="mobile-toggle"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile((v) => !v)}
          >
            <I name={mobile ? "close-line" : "menu-4-line"} />
          </button>
        </div>
      </div>
      {mobile && (
        <div className="mobile-drawer">
          <nav aria-label="Mobile navigation">
            {nav.map(([l, h], i) => (
              <a href={h} key={h} onClick={() => setMobile(false)}>
                <span className="text-xs opacity-45">0{i + 1}</span>
                {l}
                <I name="arrow-right-up-line" />
              </a>
            ))}
          </nav>
          <button
            onClick={() => {
              setMobile(false);
              openBooking();
            }}
            className="mobile-drawer-cta"
          >
            Start planning <I name="arrow-right-line" />
          </button>
          <p>KYRGYZEST TOURS • KYRGYZSTAN</p>
        </div>
      )}
    </header>
  );
}
function VideoHero({ openBooking }) {
  const [muted, setMuted] = useState(false),
    [playing, setPlaying] = useState(false),
    [unavailable, setUnavailable] = useState(false);
  const playerRef = useRef(null);
  useEffect(() => {
    const video = playerRef.current;
    if (!video) return;

    video.play().catch(() => {
      video.muted = true;
      setMuted(true);
      video.play().catch(() => setUnavailable(true));
    });
  }, []);
  const toggleSound = () => {
    const video = playerRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(video.muted);
    if (!video.muted && video.paused) {
      video.play().catch(() => {
        video.muted = true;
        setMuted(true);
      });
    }
  };
  const togglePlay = () => {
    const video = playerRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setUnavailable(true));
    } else {
      video.pause();
    }
  };
  return (
    <section id="home" className="hero">
      {unavailable && (
        <ImageWithFallback
          src={photos.hero}
          className="hero-fallback-image"
          alt="Kyrgyzest mountain landscape"
          loading="eager"
        />
      )}
      <div
        className={`hero-video ${!unavailable ? "hero-video-visible" : ""}`}
      >
        <video
          ref={playerRef}
          className="hero-player"
          src={asset("kyrgyzstan-hero.mp4")}
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setUnavailable(true)}
        />
      </div>
      <div className="hero-shade" />
      <div className="hero-inner max-container">
        <div className="hero-main-grid">
          <div className="hero-content">
            {/* <p className="hero-eyebrow">
              <I name="sun-line" /> YOUR JOURNEY INTO KYRGYZSTAN
            </p> */}
            <h1>
              Travel Beyond the Ordinary.
              <br />
              <em>Experience the Soul of Kyrgyzstan.</em>
            </h1>
           
            <p className="hero-text">
              Thoughtfully planned small-group and private journeys, shaped by
              local knowledge and the warmth of Kyrgyz hospitality.
            </p>
            <div className="hero-buttons">
              <Button href="#tours" icon="arrow-right-up-line">
                Explore the journeys
              </Button>
              <button className="hero-secondary-cta" onClick={openBooking}>
                Plan a private journey <I name="arrow-right-line" />
              </button>
            </div>
            {/* <a href="#intro" className="hero-scroll-inline">
              <I name="arrow-down-line" /> SCROLL TO EXPLORE <span />
            </a> */}
          </div>
          <aside
            className="hero-aside hero-featured-tour"
            aria-label="Featured Kyrgyzest tour"
          >
            <div className="hero-aside-line" />
            <span className="hero-featured-eyebrow">
              <I name="sparkling-line" /> FEATURED JOURNEY
            </span>
            <a
              className="hero-featured-photo"
              href="https://kyrgyzest.com/tours/kyrgyzest-autumn-tour/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImageWithFallback
                src={photos.autumn}
                alt="Kyrgyzest Autumn Tour — original tour photography"
                loading="eager"
              />
              <span className="hero-featured-photo-arrow">
                <I name="arrow-right-up-line" />
              </span>
            </a>
            <div className="hero-featured-details">
              <div className="hero-featured-meta">
                <span>
                  <I name="calendar-event-line" /> October
                </span>
                <span>
                  <I name="time-line" /> 7 days
                </span>
              </div>
              <h2>
                Kyrgyzest
                <br />
                Autumn Tour
              </h2>
              <p>
                A week among alpine landscapes, local traditions and autumn
                light.
              </p>
              <a
                className="hero-featured-link"
                href="https://kyrgyzest.com/tours/kyrgyzest-autumn-tour/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore this tour <I name="arrow-right-up-line" />
              </a>
            </div>
          </aside>
        </div>
        <div className="hero-bottom">
          <div className="hero-location">
            <I name="map-pin-2-line" />
            <span>KYRGYZSTAN · CENTRAL ASIA</span>
          </div>
          <div className="hero-video-controls">
            <span className="hero-video-note">
              {playing ? "THE KYRGYZSTAN FILM" : "WATCH THE JOURNEY"}
            </span>
            <button
              className="hero-sound-toggle"
              aria-label={muted ? "Turn video sound on" : "Mute video"}
              aria-pressed={!muted}
              title={muted ? "Enable video sound" : "Mute video"}
              onClick={toggleSound}
            >
              <I name={muted ? "volume-mute-line" : "volume-up-line"} />
              {muted && <span>Enable sound</span>}
            </button>
            <button
              aria-label={playing ? "Pause video" : "Play video"}
              onClick={togglePlay}
              disabled={unavailable}
            >
              <I name={playing ? "pause-line" : "play-line"} />
            </button>
            <a
              href="https://drive.google.com/file/d/1uwNoXiyyjOwHhcj_oEQc5obvoadlbz1-/view"
              aria-label="Watch original film on Google Drive"
              title="Watch original film"
              target="_blank"
              rel="noopener noreferrer"
            >
              <I name="external-link-line" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
function IntroBridge({ openBooking }) {
  return (
    <section
      id="intro"
      className="intro-bridge"
      aria-label="The Kyrgyzest philosophy"
    >
      <div className="max-container intro-bridge-inner">
        <div className="intro-bridge-copy" data-aos="fade-up">
          <span className="intro-eyebrow">
            A MORE PERSONAL WAY TO DISCOVER KYRGYZSTAN{" "}
            <span className="intro-rule" />
          </span>
          <p>
            Discover Kyrgyzstan through the landscapes, traditions and people
            that define it — guided by those who call it home.
          </p>
          <div className="intro-features">
            <span>
              <I name="compass-3-line" /> Local insight
            </span>
            <span>
              <I name="heart-3-line" /> Considered planning
            </span>
            <span>
              <I name="leaf-line" /> Kyrgyz hospitality
            </span>
          </div>
        </div>
        <div
          className="intro-image-side"
          data-aos="fade-up"
          data-aos-delay="90"
        >
          <div className="intro-photo">
            <ImageWithFallback
              src={asset("kyrgyzest-yurt-camp-dusk.png")}
              alt="Yurt camp beneath the evening sky in Kyrgyzstan"
            />
          </div>
          <div className="intro-photo-meta">
            <span>
              <I name="map-pin-2-line" /> YURT CAMP · KYRGYZSTAN
            </span>
            <button onClick={openBooking}>
              Let's plan your journey <I name="arrow-right-up-line" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
function Tours() {
  const prev = useRef(null),
    next = useRef(null);
  const [swiper, setSwiper] = useState(null);
  useEffect(() => {
    if (!swiper || !prev.current || !next.current) return;
    swiper.params.navigation.prevEl = prev.current;
    swiper.params.navigation.nextEl = next.current;
    swiper.navigation.init();
    swiper.navigation.update();
  }, [swiper]);
  return (
    <section id="tours" className="section section-tours">
      <div className="max-container">
        <SectionHeading
          eyebrow="SMALL-GROUP & PRIVATE JOURNEYS"
          title={
            <>
              Find your way
              <br />
              <em>into Kyrgyzstan.</em>
            </>
          }
          desc="Choose a small-group journey, set out on horseback or plan a private itinerary around your own pace. Each route is shaped by local knowledge and thoughtful detail."
          action={
            <div className="carousel-arrows">
              <button ref={prev} aria-label="Previous tour">
                <I name="arrow-left-line" />
              </button>
              <button ref={next} aria-label="Next tour">
                <I name="arrow-right-line" />
              </button>
            </div>
          }
        />
        <Swiper
          className="tours-swiper"
          modules={[Navigation]}
          slidesPerView={1.08}
          spaceBetween={18}
          speed={650}
          grabCursor
          onSwiper={setSwiper}
          breakpoints={{
            560: { slidesPerView: 1.7, spaceBetween: 20 },
            840: { slidesPerView: 2.25, spaceBetween: 24 },
            1140: { slidesPerView: 3, spaceBetween: 26 },
          }}
        >
          {tours.map((tour) => (
            <SwiperSlide key={tour.id}>
              <a
                href={tour.href}
                target="_blank"
                rel="noopener noreferrer"
                className="tour-card"
              >
                <div className="tour-image-wrap">
                  <ImageWithFallback
                    src={tour.img}
                    className="tour-image"
                    alt={tour.title}
                  />
                  <div className="tour-image-top">
                    <span className="tour-pill">
                      <I name="time-line" /> {tour.days}
                    </span>
                    <span className="tour-year">{tour.season}</span>
                  </div>
                  <div className="tour-photo-bottom">
                    <span>{tour.kicker}</span>
                    <span className="tour-round-arrow">
                      <I name="arrow-right-up-line" />
                    </span>
                  </div>
                </div>
                <div className="tour-info">
                  <h3>{tour.title}</h3>
                  <p>{tour.sub}</p>
                  <span className="tour-read">
                    Explore this journey <I name="arrow-right-line" />
                  </span>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="tours-footer">
          <div className="signature-line" />
          <a
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://kyrgyzest.com/tours/"
          >
            Explore all tours <I name="arrow-right-line" />
          </a>
        </div>
      </div>
    </section>
  );
}
function Why() {
  const perks = [
    {
      icon: "global-line",
      title: "Considered from the first conversation",
      desc: "Talk through your plans with our team before you book. For private travel, we shape the route around your interests and preferred pace.",
    },
    {
      icon: "compass-3-line",
      title: "Local knowledge, shared generously",
      desc: "Experienced guides and drivers bring context to the places, traditions and people you encounter.",
    },
    {
      icon: "group-line",
      title: "A more personal way to travel",
      desc: "Small groups leave room for conversation, connection and the moments that cannot be planned.",
    },
    {
      icon: "award-line",
      title: "Comfort, thoughtfully considered",
      desc: "We choose the best available stays for each location and reliable transport for the route, including in remote regions.",
    },
  ];
  return (
    <section className="section why-section" id="about">
      <div className="max-container why-grid">
        <div className="why-image-column" data-aos="fade-right">
          <ImageWithFallback
            src={photos.people}
            alt="Kyrgyzest travellers together on a trip"
            className="why-image"
          />
          <div className="why-image-caption">
            <I name="double-quotes-l" />
            <span>The best journeys make a country feel personal.</span>
          </div>
        </div>
        <div className="why-content" data-aos="fade-up">
          <Eyebrow>THE KYRGYZEST DIFFERENCE</Eyebrow>
          <h2 className="section-title">
            The details matter.
            <br />
            <em>Every step of the way.</em>
          </h2>
          <p className="why-lead">
            From your first conversation to the final transfer, our team brings
            together local knowledge, thoughtful planning and the warmth of a
            genuinely personal welcome.
          </p>
          <div className="why-benefits">
            {perks.map((p, i) => (
              <div
                className="why-benefit"
                key={p.title}
                data-aos="fade-up"
                data-aos-delay={i * 65}
              >
                <div className="why-benefit-icon">
                  <I name={p.icon} />
                </div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            icon="arrow-right-line"
            href="https://kyrgyzest.com/about-us/"
            target="_blank"
          >
            Our story
          </Button>
        </div>
      </div>
    </section>
  );
}
function Destinations() {
  return (
    <section className="section destinations-section" id="destinations">
      <div className="dest-ornament" aria-hidden="true" />
      <div className="max-container">
        <SectionHeading
          eyebrow="A COUNTRY OF CONTRASTS"
          title={
            <>
              The mountains
              <br />
              are only <em>the beginning.</em>
            </>
          }
          desc="High pastures, forested valleys, a vast alpine lake and the red cliffs of Jeti-Oguz — each place reveals a different side of Kyrgyzstan."
        />
        <div className="dest-grid">
          {destinations.map((d, i) => (
            <a
              data-aos="fade-up"
              data-aos-delay={Math.min(i * 80, 240)}
              key={d.name}
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`dest-card dest-card-${i}`}
            >
              <ImageWithFallback
                src={d.img}
                className="dest-photo"
                alt={`${d.name}, Kyrgyzstan`}
              />
              <div className="dest-overlay" />
              <span className="dest-region">{d.region}</span>
              <div className="dest-caption">
                <h3>{d.name}</h3>
                <span>
                  <I name="arrow-right-up-line" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
function MapSection() {
  const [tour, setTour] = useState("grand"),
    [mapReady, setMapReady] = useState(false),
    mapRef = useRef(null),
    mounted = useRef(false),
    mapInstance = useRef(null),
    layerRef = useRef(null);
  const routeTours = tours.filter((x) => x.id !== "private");
  const chosen = routeTours.find((x) => x.id === tour);
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    let alive = true;
    import("leaflet")
      .then(({ default: L }) => {
        if (!alive || !mapRef.current || mapInstance.current) return;
        const map = L.map(mapRef.current, {
          zoomControl: false,
          scrollWheelZoom: false,
          attributionControl: true,
        }).setView([41.6, 75.95], 7);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            "&copy; OpenStreetMap contributors · Boundary: Basemap / World Data Bank II (visualization)",
          maxZoom: 15,
        }).addTo(map);
        // Use the bundled 533-point country outline. No external boundary request or 35-point fallback.
        map.createPane("kg-focus-pane");
        map.getPane("kg-focus-pane").style.zIndex = "390";
        map.getPane("kg-focus-pane").style.pointerEvents = "none";
        map.createPane("kg-border-pane");
        map.getPane("kg-border-pane").style.zIndex = "405";
        map.getPane("kg-border-pane").style.pointerEvents = "none";
        let countryLayers = null;
        const createCountryFocus = (feature) => {
          if (!alive) return;
          if (countryLayers)
            countryLayers.forEach((layer) => map.removeLayer(layer));
          const geo =
            feature.type === "FeatureCollection"
              ? feature.features[0]
              : feature;
          if (
            !geo?.geometry ||
            !["Polygon", "MultiPolygon"].includes(geo.geometry.type)
          )
            return;
          const polygonGroups =
            geo.geometry.type === "Polygon"
              ? [geo.geometry.coordinates]
              : geo.geometry.coordinates;
          const countryExteriorRings = polygonGroups.map((group) =>
            group[0].map(([lon, lat]) => [lat, lon]),
          );
          // A real cutout: shade the rectangle OUTSIDE the country, no fake freehand borders.
          const worldRing = [
            [35, 66],
            [35, 85],
            [48, 85],
            [48, 66],
          ];
          const mask = L.polygon([worldRing, ...countryExteriorRings], {
            pane: "kg-focus-pane",
            stroke: false,
            fill: true,
            fillColor: "#101d19",
            fillOpacity: 0.59,
            fillRule: "evenodd",
            interactive: false,
            smoothFactor: 0,
            className: "kg-country-mask",
          }).addTo(map);
          const halo = L.geoJSON(geo, {
            pane: "kg-border-pane",
            interactive: false,
            style: {
              color: "#ffffff",
              weight: 5,
              opacity: 0.78,
              fill: false,
              smoothFactor: 0,
              lineCap: "round",
              lineJoin: "round",
              className: "kg-country-halo",
            },
          }).addTo(map);
          const border = L.geoJSON(geo, {
            pane: "kg-border-pane",
            interactive: false,
            style: {
              color: "#de783e",
              weight: 2.5,
              opacity: 1,
              fill: false,
              smoothFactor: 0,
              lineCap: "round",
              lineJoin: "round",
              className: "kg-country-border",
            },
          }).addTo(map);
          countryLayers = [mask, halo, border];
        };
        createCountryFocus(kyrgyzstanOutline);
        L.control.zoom({ position: "bottomright" }).addTo(map);
        mapInstance.current = map;
        layerRef.current = L.layerGroup().addTo(map);
        mounted.current = true;
        setMapReady(true);
        setTimeout(() => map.invalidateSize(), 400);
      })
      .catch(() => {});
    return () => {
      alive = false;
      try {
        mapInstance.current?.remove();
      } catch {}
      mapInstance.current = null;
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (!mapInstance.current || !layerRef.current) return;
    let active = true;
    import("leaflet").then(({ default: L }) => {
      if (!active || !layerRef.current) return;
      layerRef.current.clearLayers();
      const points = mapPoints.filter((p) => p.tours.includes(tour));
      points.forEach((p) => {
        const icon = L.divIcon({
          className: "custom-marker",
          html: '<span class="map-pin-marker"></span>',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });
        L.marker([p.lat, p.lng], { icon })
          .bindPopup(
            `<div class="map-popup"><b>${p.name}</b><small>${chosen?.title || ""}</small></div>`,
          )
          .addTo(layerRef.current);
      });
      if (points.length > 1) {
        const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
        mapInstance.current.fitBounds(bounds, {
          padding: [38, 38],
          maxZoom: 8,
          animate: true,
          duration: 0.7,
        });
      }
    });
    return () => {
      active = false;
    };
  }, [tour, chosen, mapReady]);
  return (
    <section className="section map-section" id="map">
      <div className="max-container">
        <SectionHeading
          eyebrow="THE ROUTE, AT A GLANCE"
          title={
            <>
              See the country
              <br />
              <em>take shape.</em>
            </>
          }
          desc="Follow the places featured in our published itineraries. Select a journey to see its destinations."
        />
        <div className="map-shell" data-aos="fade-up">
          <div className="map-sidebar">
            <span className="small-label">EXPLORE THE ITINERARIES</span>
            <h3>
              Choose a
              <br />
              journey.
            </h3>
            <p>See how each journey moves across the country.</p>
            <div
              className="map-tour-options"
              role="group"
              aria-label="Select a tour route"
            >
              {routeTours.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTour(t.id)}
                  aria-pressed={tour === t.id}
                  className={`map-option ${tour === t.id ? "active" : ""}`}
                >
                  <span>{t.title}</span>
                  <I name="arrow-right-up-line" />
                </button>
              ))}
            </div>
            <span className="map-note">
              <I name="information-line" /> Nearby countries are dimmed to
              highlight Kyrgyzstan. Pins show approximate centres, not driving
              routes.
            </span>
          </div>
          <div className="map-canvas-wrap">
            <div
              ref={mapRef}
              className="map-canvas"
              aria-label="Interactive map of Kyrgyzest tour locations"
            />
            <div className="map-floating-label">
              <I name="map-pin-range-line" />
              <div>
                <strong>
                  {mapPoints.filter((p) => p.tours.includes(tour)).length}{" "}
                  destinations
                </strong>
                <span>{chosen?.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Gallery({ openPhoto }) {
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);
  const renderSet = (duplicate = false) => (
    <div
      className="gallery-marquee-set"
      aria-hidden={duplicate ? "true" : undefined}
      key={duplicate ? "clone" : "original"}
    >
      {gallery.map((item, i) => (
        <button
          type="button"
          key={`${duplicate ? "duplicate-" : "primary-"}${item.src}`}
          tabIndex={duplicate ? -1 : 0}
          onClick={() => {
            setPaused(true);
            openPhoto(i);
          }}
          className={`gallery-marquee-card gallery-card-${i % 4}`}
          aria-label={`Open photo: ${item.label}`}
        >
          <ImageWithFallback src={item.src} alt={item.label} />
          <span className="gallery-card-caption">
            {item.label}
            <I name="arrow-right-up-line" />
          </span>
        </button>
      ))}
    </div>
  );
  return (
    <section className="section gallery-section" id="gallery">
      <div className="max-container">
        <SectionHeading
          eyebrow="THE COUNTRY, UP CLOSE"
          title={
            <>
              A closer look
              <br />
              <em>at Kyrgyzstan.</em>
            </>
          }
          desc="The landscapes, stays and shared moments that give each journey its character."
          action={
            <a
              className="text-link"
              href="https://kyrgyzest.com/gallery/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Original gallery <I name="arrow-right-line" />
            </a>
          }
        />
      </div>
      <div
        className="gallery-marquee-shell"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
        }}
      >
        <div
          className={`gallery-marquee-track ${paused ? "is-paused" : ""}`}
          aria-label="A continuous carousel of Kyrgyzest travel photography"
        >
          {renderSet(false)}
          {renderSet(true)}
        </div>
      </div>
      <div className="gallery-footnote max-container">
        <span>
          <I name="image-line" /> REAL MOMENTS FROM KYRGYZEST
        </span>
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          aria-label={paused ? "Resume gallery" : "Pause gallery"}
        >
          <I name={paused ? "play-line" : "pause-line"} />{" "}
          {paused ? "Resume gallery" : "Pause gallery"}
        </button>
      </div>
    </section>
  );
}
// External providers retain their own public review records. No made-up Google rating or reviews.
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Kyrgyzest+Tours+Bishkek+reviews#lrd=0x605528f46be010d9:0x92952fc2c71f0b82,1,,,";
const TRIPADVISOR_REVIEWS_URL =
  "https://www.tripadvisor.co.uk/Attraction_Review-g293948-d34449965-Reviews-Kyrgyzest_Tours-Bishkek.html";
const reviewPlatforms = [
  { id: "site", label: "Guest stories", count: "09" },
  { id: "google", label: "Google Reviews" },
  { id: "tripadvisor", label: "Tripadvisor" },
];
function ReviewBrand({ platform }) {
  if (platform === "google")
    return (
      <span className="review-brand review-brand-google">
        <img src={publicFile("brands/google-g.svg")} alt="" loading="lazy" />
      </span>
    );
  if (platform === "tripadvisor")
    return (
      <span className="review-brand review-brand-trip">
        <img
          src={publicFile("brands/tripadvisor-owl.svg")}
          alt=""
          loading="lazy"
        />
      </span>
    );
  return (
    <span className="review-brand review-brand-site">
      <I name="chat-quote-line" />
    </span>
  );
}

function reviewExcerpt(text, maxLength = 180) {
  if (text.length <= maxLength) return text;
  const excerpt = text.slice(0, maxLength);
  return `${excerpt.slice(0, excerpt.lastIndexOf(" ")).trimEnd()}…`;
}

function Reviews() {
  const [active, setActive] = useState("site");
  const [instance, setInstance] = useState(null);
  const [expandedReview, setExpandedReview] = useState(null);
  useEffect(() => {
    instance?.update();
  }, [expandedReview, instance]);
  const handleTabs = (event, idx) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIdx =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? reviewPlatforms.length - 1
          : event.key === "ArrowRight"
            ? (idx + 1) % reviewPlatforms.length
            : (idx + reviewPlatforms.length - 1) % reviewPlatforms.length;
    setActive(reviewPlatforms[nextIdx].id);
    document
      .getElementById("review-tab-" + reviewPlatforms[nextIdx].id)
      ?.focus();
  };
  return (
    <section className="section review-section" id="reviews">
      <div className="review-scene" aria-hidden="true">
        <img src={photos.galleryWide} alt="" loading="lazy" />
      </div>
      <div className="review-ornament-pattern" aria-hidden="true" />
      <div className="max-container">
        <div className="review-platform-heading">
          <div>
            <Eyebrow light>REAL STORIES, REAL PEOPLE</Eyebrow>
            <h2>
              Journeys remembered.
              <br />
              <em>Stories shared.</em>
            </h2>
            <p>
              First-hand accounts of the places, people and small details
              travellers remember. Read each story at its original source.
            </p>
          </div>
          <div className="review-platform-proof">
            <I name="shield-check-line" />
            <span>
              Words from our guests
              <br />
              <small>Every story links to its original source</small>
            </span>
          </div>
        </div>
        <div
          className="review-tabs"
          role="tablist"
          aria-label="Choose reviews source"
        >
          {reviewPlatforms.map((p, i) => (
            <button
              type="button"
              role="tab"
              id={"review-tab-" + p.id}
              aria-controls="review-active-panel"
              aria-selected={active === p.id}
              tabIndex={active === p.id ? 0 : -1}
              key={p.id}
              className={"review-tab " + (active === p.id ? "is-active" : "")}
              onClick={() => setActive(p.id)}
              onKeyDown={(e) => handleTabs(e, i)}
            >
              <ReviewBrand platform={p.id} />
              <span className="review-tab-title">{p.label}</span>
              {p.count && <span className="review-tab-count">{p.count}</span>}
            </button>
          ))}
        </div>
        <div
          id="review-active-panel"
          role="tabpanel"
          aria-labelledby={"review-tab-" + active}
          className="review-tab-panel"
          key={active}
        >
          {active === "site" && (
            <div className="reviews-v10">
              <div className="reviews-v10-intro">
                <div>
                  <span className="review-panel-kicker">
                    KYRGYZEST GUEST STORIES
                  </span>
                  <p>
                    First-hand accounts of travelling through Kyrgyzstan with
                    our team. Each story opens at its original source.
                  </p>
                </div>
                <div className="review-nav carousel-arrows">
                  <button
                    type="button"
                    onClick={() => instance?.slidePrev()}
                    aria-label="Previous guest story"
                  >
                    <I name="arrow-left-line" />
                  </button>
                  <button
                    type="button"
                    onClick={() => instance?.slideNext()}
                    aria-label="Next guest story"
                  >
                    <I name="arrow-right-line" />
                  </button>
                </div>
              </div>
              <div className="review-carousel-viewport">
                <Swiper
                  key="kyrgyzest-stories"
                  onSwiper={setInstance}
                  className="reviews-swiper reviews-swiper-v10"
                  spaceBetween={22}
                  slidesPerView={1.08}
                  speed={650}
                  grabCursor
                  watchOverflow
                  breakpoints={{
                    640: { slidesPerView: 1.55, spaceBetween: 22 },
                    950: { slidesPerView: 2.6, spaceBetween: 24 },
                    1140: { slidesPerView: 3.5, spaceBetween: 24 },
                    1280: { slidesPerView: 4.2, spaceBetween: 22 },
                  }}
                >
                  {reviews.map((r, i) => (
                    <SwiperSlide key={r.name}>
                      <article className="review-card">
                        <div className="review-card-top">
                          <span className="review-quote">
                            <I name="double-quotes-l" />
                          </span>
                          <span className="review-counter">
                            {String(i + 1).padStart(2, "0")} / 09
                          </span>
                        </div>
                        <div className="review-person">
                          <ImageWithFallback
                            src={r.photo}
                            className="review-person-photo"
                            alt={`Photo from ${r.name}'s Kyrgyzest journey`}
                          />
                          <span className="review-person-copy">
                            <strong>{r.name}</strong>
                            <small>{r.place}</small>
                          </span>
                        </div>
                        <span className="review-topic">
                          KYRGYZEST GUEST REVIEW
                        </span>
                        <div
                          className={`review-preview ${
                            expandedReview === r.name ? "is-hidden" : ""
                          }`}
                          aria-hidden={expandedReview === r.name}
                        >
                          <span>{reviewExcerpt(r.text)}</span>
                        </div>
                        <div
                          id={`review-full-${i}`}
                          className={`review-full-text ${
                            expandedReview === r.name ? "is-expanded" : ""
                          }`}
                          aria-hidden={expandedReview !== r.name}
                          tabIndex={expandedReview === r.name ? 0 : -1}
                          role="region"
                          aria-label={`Full review by ${r.name}`}
                        >
                          <div className="review-full-text-inner">
                            <p>{r.text}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="review-expand-button"
                          aria-expanded={expandedReview === r.name}
                          aria-controls={`review-full-${i}`}
                          onClick={() =>
                            setExpandedReview((current) =>
                              current === r.name ? null : r.name,
                            )
                          }
                        >
                          {expandedReview === r.name
                            ? "Show less"
                            : "Read full review"}
                          <I
                            name={
                              expandedReview === r.name
                                ? "arrow-up-s-line"
                                : "arrow-down-s-line"
                            }
                          />
                        </button>
                        <div className="review-source">
                          <a
                            href="https://kyrgyzest.com/#reviews"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="review-link"
                            aria-label={`Read ${r.name}'s original review on Kyrgyzest`}
                          >
                            Original review <I name="arrow-right-up-line" />
                          </a>
                        </div>
                      </article>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
          {active === "google" && (
            <div className="review-external-layout">
              <div className="review-external-intro">
                <span className="review-panel-kicker">INDEPENDENT REVIEWS</span>
                <div className="review-external-heading">
                  <ReviewBrand platform="google" />
                  <h3>
                    See what travellers
                    <br />
                    <em>say on Google.</em>
                  </h3>
                </div>
                <p>
                  Read the most current reviews, ratings and traveller photos
                  directly in Google's business listing.
                </p>
                <a
                  className="review-source-cta"
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore Google Reviews <I name="arrow-right-up-line" />
                </a>
              </div>
              <div className="review-google-card">
                <div className="review-google-card-head">
                  <ReviewBrand platform="google" />
                  <span>
                    GOOGLE REVIEWS <I name="external-link-line" />
                  </span>
                </div>
                <div className="review-google-big">
                  Guest feedback,
                  <br />
                  <em>straight from the source.</em>
                </div>
                <p>
                  Explore the latest guest feedback, ratings and traveller
                  photos on Google.
                </p>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="review-external-bottom"
                >
                  Open business reviews <I name="arrow-right-up-line" />
                </a>
              </div>
            </div>
          )}
          {active === "tripadvisor" && (
            <div className="review-external-layout review-trip-layout">
              <div className="review-external-intro">
                <span className="review-panel-kicker">
                  TRIPADVISOR COMMUNITY
                </span>
                <div className="review-external-heading">
                  <ReviewBrand platform="tripadvisor" />
                  <h3>
                    Hear from guests
                    <br />
                    <em>on Tripadvisor.</em>
                  </h3>
                </div>
                <p>
                  Read travellers' experiences on the original Tripadvisor
                  listing, with author names, publication dates and up-to-date
                  ratings.
                </p>
                <a
                  className="review-source-cta"
                  href={TRIPADVISOR_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore Tripadvisor reviews <I name="arrow-right-up-line" />
                </a>
              </div>
              <div className="review-provider-card review-provider-trip">
                <div className="review-provider-heading">
                  <ReviewBrand platform="tripadvisor" />
                  <span>TRIPADVISOR REVIEWS</span>
                </div>
                <h4>
                  Real reviews.
                  <br />
                  Directly from travellers.
                </h4>
                <p>
                  Explore the latest guest reviews and traveller photos on the
                  Kyrgyzest Tripadvisor listing.
                </p>
                <a
                  href={TRIPADVISOR_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open the verified listing <I name="arrow-right-up-line" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
function Story() {
  return (
    <section className="section story-section" id="story">
      <div className="max-container story-grid">
        <div className="story-editorial" data-aos="fade-up">
          <Eyebrow>THE PEOPLE BEHIND THE JOURNEY</Eyebrow>
          <h2 className="section-title">
            A personal
            <br />
            <em>way of seeing home.</em>
          </h2>
          <p className="story-copy">
            I founded Kyrgyzest to share the country I call home — not simply
            its landscapes, but the people, traditions and everyday moments
            that give them meaning.
          </p>
          <p className="story-copy second">
            My name is Jamilia. Studying and living in London broadened my
            perspective on travel; my roots in Kyrgyzstan keep every journey
            grounded in local knowledge, careful planning and the hospitality
            I would offer at home.
          </p>
          <Button
            variant="outline"
            href="https://kyrgyzest.com/about-us/"
            target="_blank"
          >
            Meet Kyrgyzest
          </Button>
        </div>
        <div
          className="story-img-wrap story-portrait"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <img
            src={asset("jamilia-story.webp")}
            alt="A guest beside a yurt in the Kyrgyz mountains"
            className="story-img"
          />
          <div className="story-badge">
            ROOTED IN KYRGYZSTAN <I name="heart-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
const journalPosts = [
  {
    id: "grand",
    category: "Real Kyrgyzest itinerary",
    index: "01 / 03",
    title: "Kyrgyzest Grand Tour",
    desc: "Moderate walks, off-road rides and horseback riding, with stays in 4-star hotels, yurt camps and guesthouses.",
    image: "https://kyrgyzest.com/wp-content/uploads/2025/12/photo_2026-08-26_14-46-29.jpg",
    href: "https://kyrgyzest.com/tours/kyrgyzest-grand-tour/",
  },
];
function Blog() {
  return (
    <section className="section journal-section" id="journal">
      <div className="max-container">
        <SectionHeading
          eyebrow="REAL KYRGYZEST JOURNEYS · 01 / 03"
          title={
            <>
              One journey
              <br />
              <em>to begin.</em>
            </>
          }
          desc="Starting with a real Kyrgyzest itinerary. We’ll add more stories as they’re ready."
        />
        <div className="journal-posts">
          {journalPosts.map((post, i) => (
            <article
              className="journal-post"
              data-aos="fade-up"
              data-aos-delay={i * 85}
              key={post.id}
            >
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="journal-post-photo"
                aria-label={`Explore ${post.title}`}
              >
                <ImageWithFallback src={post.image} alt={post.title} />
                <span className="journal-post-corner">
                  <I name="arrow-right-up-line" />
                </span>
              </a>
              <div className="journal-post-info">
                <div className="journal-post-meta">
                  <span>{post.category}</span>
                  <span className="journal-post-index">{post.index}</span>
                </div>
                <h3>
                  <a href={post.href} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                </h3>
                <p>{post.desc}</p>
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="journal-post-link"
                >
                  Explore the itinerary <I name="arrow-right-line" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq-section" id="faq">
      <div className="max-container faq-grid">
        <div data-aos="fade-up">
          <Eyebrow>BEFORE YOU SET OUT</Eyebrow>
          <h2 className="section-title">
            The details,
            <br />
            <em>made clear.</em>
          </h2>
          <p className="section-description">
            Practical answers for a more confident start. If you have a
            question specific to your journey, our team is here to help.
          </p>
          <a
            className="faq-contact"
            href={socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <I name="whatsapp-line" /> Ask our team{" "}
            <I name="arrow-right-up-line" />
          </a>
        </div>
        <div className="faq-accordion">
          {faqs.map((f, i) => (
            <div key={f.q} className={`faq-item ${open === i ? "open" : ""}`}>
              <button
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpen((v) => (v === i ? -1 : i))}
              >
                <span className="faq-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{f.q}</span>
                <I name={open === i ? "subtract-line" : "add-line"} />
              </button>
              <div id={`faq-answer-${i}`} className="faq-answer" role="region">
                <div className="faq-answer-content">
                  {f.a.map((block, index) => {
                    if (block.type === "list") {
                      return (
                        <ul key={index}>
                          {block.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (block.type === "link") {
                      return (
                        <a
                          key={index}
                          href={block.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {block.label}
                        </a>
                      );
                    }
                    return <p key={index}>{block.text}</p>;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Cta({ openBooking }) {
  return (
    <section className="cta-section">
      <div className="cta-backdrop">
        <ImageWithFallback
          src={photos.galleryWide}
          alt="Kyrgyz mountains — high-resolution Kyrgyzest gallery photo"
        />
      </div>
      <div className="cta-noise" aria-hidden="true" />
      <div className="max-container cta-inner">
        <div className="cta-copy" data-aos="fade-up">
          <Eyebrow light>PLAN YOUR JOURNEY</Eyebrow>
          <h2>
            See more than
            <br />
            <em>the scenery.</em>
          </h2>
          <p>
            Tell us what draws you to Kyrgyzstan. Our team will help you choose
            an itinerary or shape a private journey around the details that
            matter to you.
          </p>
          <div className="cta-buttons">
            <Button icon="arrow-right-line" onClick={openBooking}>
              Plan your journey
            </Button>
            <Button
              variant="ghost"
              icon="whatsapp-line"
              href={socials.whatsapp}
              target="_blank"
            >
              Chat with our team
            </Button>
          </div>
        </div>
        <div className="cta-side-label">
          KYRGYZEST TOURS <span /> MADE WITH HEART IN KYRGYZSTAN
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="footer footer-v6">
      <div className="max-container">
        <div className="footer-hero">
          <div className="footer-hero-copy">
            <span className="footer-kicker">
              <I name="sun-line" /> MADE IN KYRGYZSTAN, SHARED WITH CARE
            </span>
            <h2>
              The road may end.
              <br />
              <em>The connection stays.</em>
            </h2>
            <p>
              Let us introduce you to the landscapes, traditions and people of
              our home.
            </p>
          </div>
          <a
            className="footer-plan-link"
            href={socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Talk with the Kyrgyzest team on WhatsApp"
          >
            <span>
              Let's start
              <br />
              planning.
            </span>
            <I name="arrow-right-up-line" />
          </a>
        </div>
        <div className="footer-main">
          <div className="footer-brand">
            <img
              src={ORIGINAL}
              alt="Kyrgyzest Tours original brand typography"
            />
            <p>
              Local insight, considered journeys and a warm welcome in the
              country we call home.
            </p>
            <div className="footer-social">
              <a
                href={socials.instagram}
                className="footer-social-instagram"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <I name="instagram-line" />
                <span>Instagram</span>
              </a>
              <a
                href={socials.whatsapp}
                className="footer-social-whatsapp"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <I name="whatsapp-line" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
          <div className="footer-nav">
            <div>
              <h4>EXPLORE</h4>
              <a href="#tours">Our tours</a>
              <a href="#destinations">Destinations</a>
              <a href="#gallery">Gallery</a>
            </div>
            <div>
              <h4>THE COMPANY</h4>
              <a href="#about">About Kyrgyzest</a>
              <a href="#reviews">Guest stories</a>
              <a href="#faq">FAQ</a>
              <a href="#journal">Itinerary notes</a>
            </div>
            <div>
              <h4>LET'S CONNECT</h4>
              <a href="mailto:kyrgyzest.tour@gmail.com">
                kyrgyzest.tour@gmail.com
              </a>
              <a className="footer-phone" href="tel:+996551057666">
                <img src={OSHKA_LOGO} alt="" />
                <span>+996 551 057 666</span>
              </a>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                @kyrgyzest.tours
              </a>
              <span>
                <I name="map-pin-2-line" /> Bishkek, Kyrgyzstan
              </span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} KYRGYZEST TOURS · ALL RIGHTS RESERVED.
          </span>
          <div
            className="footer-payments"
            aria-label="Planned payment method brands; online payments not yet enabled"
          >
            <span className="footer-payments-note">
              ONLINE PAYMENTS · COMING SOON
            </span>
            <span className="payment-brand">
              <img
                alt="Visa"
                loading="lazy"
                src="https://commons.wikimedia.org/wiki/Special:FilePath/Visa_Inc._logo_%282021%E2%80%93present%29.svg"
              />
            </span>
            <span className="payment-brand">
              <img
                alt="Mastercard"
                loading="lazy"
                src="https://commons.wikimedia.org/wiki/Special:FilePath/Mastercard_2019_logo.svg"
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
function BookingModal({ open, onClose }) {
  const [state, setState] = useState({
    tour: "",
    date: "",
    guests: "2",
    name: "",
    email: "",
    notes: "",
  });
  const [error, setError] = useState("");
  useEffect(() => {
    if (!open) return;
    const cb = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", cb);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", cb);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  const change = (e) =>
    setState((v) => ({ ...v, [e.target.name]: e.target.value }));
  const send = (e) => {
    e.preventDefault();
    if (!state.name.trim() || !state.email.includes("@")) {
      setError("Please enter your name and a valid email address.");
      return;
    }
    setError("");
    const message = [
      `Hello Kyrgyzest! I would like to plan a trip.`,
      `Name: ${state.name}`,
      `Email: ${state.email}`,
      `Tour: ${state.tour || "Please advise"}`,
      `Travel date: ${state.date || "Flexible"}`,
      `Travellers: ${state.guests}`,
      `Notes: ${state.notes || "None"}`,
    ].join("\n");
    window.open(
      `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Plan your Kyrgyzest tour"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-top">
          <div>
            <span className="small-label">PLAN YOUR JOURNEY</span>
            <h2>Where to next?</h2>
            <p>
              Tell us what you have in mind. Your message will open in WhatsApp.
            </p>
          </div>
          <button aria-label="Close dialog" onClick={onClose}>
            <I name="close-line" />
          </button>
        </div>
        <form onSubmit={send}>
          <div className="form-grid">
            <label className="form-field full">
              Which experience?
              <select name="tour" value={state.tour} onChange={change}>
                <option value="">Help me choose</option>
                {tours.map((t) => (
                  <option key={t.id}>{t.title}</option>
                ))}
              </select>
            </label>
            <label className="form-field">
              Preferred date
              <input
                name="date"
                value={state.date}
                onChange={change}
                type="date"
              />
            </label>
            <label className="form-field">
              Travellers
              <select name="guests" value={state.guests} onChange={change}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "traveller" : "travellers"}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-field">
              Your name *
              <input
                placeholder="Full name"
                name="name"
                value={state.name}
                onChange={change}
                required
              />
            </label>
            <label className="form-field">
              Email address *
              <input
                placeholder="you@example.com"
                name="email"
                type="email"
                value={state.email}
                onChange={change}
                required
              />
            </label>
            <label className="form-field full">
              Anything else?{" "}
              <textarea
                placeholder="Dates, preferences, special requests..."
                rows={3}
                value={state.notes}
                name="notes"
                onChange={change}
              />
            </label>
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <div className="modal-foot">
            <span>
              <I name="lock-line" /> No payment required. This is an enquiry.
            </span>
            <Button type="submit" icon="whatsapp-line">
              Send via WhatsApp
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
function Lightbox({ item, onClose, prev, next }) {
  useEffect(() => {
    if (!item) return;
    const key = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = "";
    };
  }, [item, onClose, prev, next]);
  if (!item) return null;
  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      onClick={onClose}
    >
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close photo"
      >
        <I name="close-line" />
      </button>
      <button
        className="lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Previous photo"
      >
        <I name="arrow-left-line" />
      </button>
      <ImageWithFallback
        src={item.src}
        alt={item.label}
        className="lightbox-image"
      />
      <button
        className="lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Next photo"
      >
        <I name="arrow-right-line" />
      </button>
      <div className="lightbox-caption">{item.label}</div>
    </div>
  );
}
export default function App() {
  const [booking, setBooking] = useState(false),
    [photo, setPhoto] = useState(null),
    [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    AOS.init({
      duration: 1050,
      offset: 35,
      once: true,
      mirror: false,
      easing: "ease-out-cubic",
      anchorPlacement: "top-bottom",
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
    const refresh = () => AOS.refresh();
    window.addEventListener("load", refresh, { once: true });
    return () => {
      window.removeEventListener("load", refresh);
    };
  }, []);
  useEffect(() => {
    const updateScrollTopVisibility = () =>
      setShowScrollTop(window.scrollY > 420);
    updateScrollTopVisibility();
    window.addEventListener("scroll", updateScrollTopVisibility, {
      passive: true,
    });
    return () =>
      window.removeEventListener("scroll", updateScrollTopVisibility);
  }, []);
  const openBooking = useCallback(() => setBooking(true), []),
    closeBooking = useCallback(() => setBooking(false), []),
    closePhoto = useCallback(() => setPhoto(null), []);
  const photoPrev = useCallback(
      () => setPhoto((i) => (i + gallery.length - 1) % gallery.length),
      [],
    ),
    photoNext = useCallback(
      () => setPhoto((i) => (i + 1) % gallery.length),
      [],
    );
  return (
    <>
      <Header openBooking={openBooking} />
      <main>
        <VideoHero openBooking={openBooking} />
        <IntroBridge openBooking={openBooking} />
        <Tours />
        <Why />
        <Destinations />
        <Gallery openPhoto={setPhoto} />
        <Reviews />
        <Story />
        <Blog />
        <Faq />
      </main>
      <Footer />
      {showScrollTop && (
        <button
          type="button"
          className="floating-scroll-top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <I name="arrow-up-line" />
        </button>
      )}
      <BookingModal open={booking} onClose={closeBooking} />
      <Lightbox
        item={photo !== null ? gallery[photo] : null}
        onClose={closePhoto}
        prev={photoPrev}
        next={photoNext}
      />
    </>
  );
}
