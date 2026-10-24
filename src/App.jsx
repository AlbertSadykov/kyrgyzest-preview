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
  const [muted, setMuted] = useState(true),
    [playing, setPlaying] = useState(false),
    [unavailable, setUnavailable] = useState(false);
  const playerRef = useRef(null),
    playerId = useRef(`yt-background-${Math.floor(Math.random() * 1e6)}`),
    mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    let poll,
      id = "kyrgyzest-yt-api";
    const setup = () => {
      if (!window.YT?.Player || playerRef.current) return;
      try {
        playerRef.current = new window.YT.Player(playerId.current, {
          videoId: "D-l3dSWbEtg",
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            start: 50,
            playsinline: 1,
            rel: 0,
            modestbranding: 1,
            loop: 1,
            playlist: "D-l3dSWbEtg",
            disablekb: 1,
            iv_load_policy: 3,
            origin: window.location.origin,
          },
          events: {
            onReady: (e) => {
              e.target.mute();
              e.target.seekTo(50, true);
              e.target.playVideo();
            },
            onStateChange: (e) => {
              if (!mounted.current) return;
              setPlaying(e.data === window.YT.PlayerState.PLAYING);
              if (e.data === window.YT.PlayerState.ENDED) e.target.seekTo(50);
            },
            onError: () => {
              if (mounted.current) setUnavailable(true);
            },
          },
        });
      } catch {
        setUnavailable(true);
      }
    };
    if (window.YT?.Player) setup();
    else {
      if (!document.getElementById(id)) {
        const s = document.createElement("script");
        s.id = id;
        s.src = "https://www.youtube.com/iframe_api";
        s.async = true;
        document.head.appendChild(s);
      }
      poll = window.setInterval(() => {
        if (window.YT?.Player) {
          clearInterval(poll);
          setup();
        }
      }, 350);
    }
    return () => {
      mounted.current = false;
      clearInterval(poll);
      try {
        playerRef.current?.destroy();
      } catch {}
      playerRef.current = null;
    };
  }, []);
  const toggleSound = () => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (muted) {
        p.unMute();
        p.setVolume(65);
      } else p.mute();
      setMuted(!muted);
    } catch {}
  };
  const togglePlay = () => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (playing) p.pauseVideo();
      else p.playVideo();
    } catch {}
  };
  return (
    <section id="home" className="hero">
      <ImageWithFallback
        src={photos.hero}
        className="hero-fallback-image"
        alt="Kyrgyzest mountain landscape"
        loading="eager"
      />
      <div
        className={`hero-video ${playing && !unavailable ? "hero-video-visible" : ""}`}
      >
        <div id={playerId.current} className="hero-player" />
      </div>
      <div className="hero-shade" />
      <div className="hero-inner max-container">
        <div className="hero-main-grid">
          <div className="hero-content">
            <p className="hero-eyebrow">
              <I name="sun-line" /> YOUR JOURNEY INTO KYRGYZSTAN
            </p>
            <h1>
              Travel Beyond the Ordinary.
              <br />
              <em>Experience the Soul of Kyrgyzstan.</em>
            </h1>
            <p className="hero-tagline">Kyrgyzstan is one of them.</p>
            <p className="hero-text">
              Discover vast mountain landscapes, nomadic traditions and the
              remarkable people who call this place home.
            </p>
            <div className="hero-buttons">
              <Button href="#tours" icon="arrow-right-up-line">
                Discover our journeys
              </Button>
              <button className="hero-secondary-cta" onClick={openBooking}>
                Plan a private trip <I name="arrow-right-line" />
              </button>
            </div>
            <a href="#intro" className="hero-scroll-inline">
              <I name="arrow-down-line" /> SCROLL TO EXPLORE <span />
            </a>
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
                  <I name="calendar-event-line" /> October departures
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
              <p>Golden landscapes, mountain valleys and local traditions.</p>
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
              aria-label={muted ? "Turn video sound on" : "Mute video"}
              disabled={!playing}
              onClick={toggleSound}
            >
              <I name={muted ? "volume-mute-line" : "volume-up-line"} />
            </button>
            <button
              aria-label={playing ? "Pause video" : "Play video"}
              onClick={togglePlay}
              disabled={!playerRef.current}
            >
              <I name={playing ? "pause-line" : "play-line"} />
            </button>
            <a
              href="https://youtu.be/D-l3dSWbEtg?t=50"
              aria-label="Watch film on YouTube"
              title="Watch film"
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
            WELCOME TO KYRGYZEST <span className="intro-rule" />
          </span>
          <p>
            Come closer to the <em>real Kyrgyzstan.</em> The landscapes are
            extraordinary. The people make it unforgettable.
          </p>
          <div className="intro-features">
            <span>
              <I name="compass-3-line" /> Local perspectives
            </span>
            <span>
              <I name="heart-3-line" /> Thoughtful journeys
            </span>
            <span>
              <I name="leaf-line" /> Authentic experiences
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
              src={photos.mountains}
              alt="Mountain scenery from a Kyrgyzest journey"
            />
          </div>
          <div className="intro-photo-meta">
            <span>
              <I name="map-pin-2-line" /> MADE FOR THE CURIOUS
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
          eyebrow="THE JOURNEYS"
          title={
            <>
              Every journey has
              <br />
              <em>a story to tell.</em>
            </>
          }
          desc="Thoughtfully designed adventures, extraordinary places and moments that stay with you."
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
      title: "High-Quality Service with an International Touch",
      desc: "International standards of organisation, paired with genuine Kyrgyz hospitality.",
    },
    {
      icon: "compass-3-line",
      title: "Experts",
      desc: "Experienced local guides, drivers and trusted partners who know the country deeply.",
    },
    {
      icon: "group-line",
      title: "Authentic Small-Group Tours",
      desc: "Small, personal groups travel together with a dedicated guide for a more connected experience.",
    },
    {
      icon: "award-line",
      title: "Quality",
      desc: "Thoughtfully selected accommodation, comfortable vehicles and careful planning at every stage.",
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
            <span>Travel becomes extraordinary when it feels personal.</span>
          </div>
        </div>
        <div className="why-content" data-aos="fade-up">
          <Eyebrow>THE KYRGYZEST DIFFERENCE</Eyebrow>
          <h2 className="section-title">
            Why travel
            <br />
            <em>with Kyrgyzest?</em>
          </h2>
          <p className="why-lead">
            Inspired by Jamilia's experience in London and rooted in Kyrgyz
            heritage, every journey brings together knowledgeable people,
            reliable organisation and warm local hospitality.
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
          eyebrow="PLACES THAT STAY WITH YOU"
          title={
            <>
              Find your kind
              <br />
              of <em>wonder.</em>
            </>
          }
          desc="From alpine lakes to dramatic canyons — landscapes woven into the journeys we share."
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
          eyebrow="FOLLOW THE LAND"
          title={
            <>
              Every route leads
              <br />
              <em>somewhere remarkable.</em>
            </>
          }
          desc="Explore real places featured in our published itineraries. Select a tour to view its destinations."
        />
        <div className="map-shell" data-aos="fade-up">
          <div className="map-sidebar">
            <span className="small-label">DISCOVER THE ROUTES</span>
            <h3>
              Choose your
              <br />
              journey.
            </h3>
            <p>See where each experience can take you across Kyrgyzstan.</p>
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
          eyebrow="MOMENTS FROM OUR JOURNEYS"
          title={
            <>
              Every frame
              <br />
              <em>tells a story.</em>
            </>
          }
          desc="Beautiful places, unhurried moments and the feeling of being somewhere extraordinary."
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

function Reviews() {
  const [active, setActive] = useState("site");
  const [instance, setInstance] = useState(null);
  const subjects = [
    "Mountains, people and a journey to remember",
    "Carefully planned from the very first day",
    "Culture, local life and remarkable scenery",
    "Thoughtful details and a welcoming team",
    "Beautiful places, yurts and unforgettable memories",
    "The food, the people and the landscapes",
    "Hospitality and family travel",
    "A tour made truly personal",
    "History, nature and local experiences",
  ];
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
              Explore guest experiences directly from Kyrgyzest and trusted
              travel platforms.
            </p>
          </div>
          <div className="review-platform-proof">
            <I name="shield-check-line" />
            <span>
              Source-first reviews
              <br />
              <small>No invented ratings or testimonials</small>
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
                    Nine experiences from travellers who explored Kyrgyzstan
                    with our team. Read their original reviews on Kyrgyzest.
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
                    950: { slidesPerView: 2.1, spaceBetween: 24 },
                    1280: { slidesPerView: 2.78, spaceBetween: 24 },
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
                        <span className="review-topic">
                          TRAVELLER EXPERIENCE
                        </span>
                        <h3>{subjects[i]}</h3>
                        <p className="review-preview">
                          Read the original experience shared by {r.name} after
                          travelling with Kyrgyzest.
                        </p>
                        <a
                          href="https://kyrgyzest.com/#reviews"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="review-link"
                        >
                          Read on Kyrgyzest <I name="arrow-right-up-line" />
                        </a>
                        <div className="review-author">
                          <span className="author-avatar">
                            {r.name.slice(0, 1)}
                          </span>
                          <span>
                            <strong>{r.name}</strong>
                            <small>{r.place}</small>
                          </span>
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
                  Google reviews are displayed on Google to keep every review
                  linked to its author, original date and current rating.
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
                  We can embed Tripadvisor's official reviews widget here after
                  enabling it in the business Widget Center. No scraping or
                  copied text is needed.
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
            The Story
            <br />
            <em>Behind Kyrgyzest</em>
          </h2>
          <p className="story-copy">
            Kyrgyzest was born from a simple idea: to share the true beauty of
            Kyrgyzstan with the same care, quality, and attention found in the
            world’s most thoughtfully designed travel experiences.
          </p>
          <p className="story-copy second">
            My name is Jamilia. While I have been studying and living in London,
            my heart has always remained in my home country, Kyrgyzstan.
            Exposure to international standards, cultures, and travel
            expectations showed me how powerful a well-crafted journey can be —
            and inspired me to bring that level of excellence back home.
          </p>
          <Button
            variant="outline"
            href="https://kyrgyzest.com/about-us/"
            target="_blank"
          >
            Read our story
          </Button>
        </div>
        <div
          className="story-img-wrap story-portrait"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <img
            src={asset("jamilia-story.webp")}
            alt="Photo provided for the Kyrgyzest story: a guest near a yurt surrounded by Kyrgyz mountains"
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
    label: "JOURNAL CONCEPT 01",
    category: "The Journey",
    date: "2026-08-18",
    displayDate: "18 AUG 2026",
    title: "Eight days with Kyrgyzest: the Grand Tour",
    desc: "Nomadic culture, high-mountain lakes and alpine valleys on the signature Kyrgyzest journey.",
    image: photos.galleryRoad,
    href: "https://kyrgyzest.com/tours/kyrgyzest-grand-tour/",
  },
  {
    id: "horse",
    label: "JOURNAL CONCEPT 02",
    category: "Experiences",
    date: "2026-09-26",
    displayDate: "26 SEP 2026",
    title: "A journey on horseback through Kyrgyzstan",
    desc: "A closer look at the landscapes and nomadic traditions behind the Horseback Adventure Tour.",
    image: photos.trek,
    href: "https://kyrgyzest.com/tours/horseback-adventure-tour/",
  },
  {
    id: "autumn",
    label: "JOURNAL CONCEPT 03",
    category: "Seasonal travel",
    date: "2026-10-12",
    displayDate: "12 OCT 2026",
    title: "The beauty of Kyrgyzstan in autumn",
    desc: "A quieter season of mountain colour and authentic local experiences with Kyrgyzest.",
    image: photos.galleryLife,
    href: "https://kyrgyzest.com/tours/kyrgyzest-autumn-tour/",
  },
];
function Blog() {
  return (
    <section className="section journal-section" id="journal">
      <div className="max-container">
        <SectionHeading
          eyebrow="THE KYRGYZEST JOURNAL"
          title={
            <>
              Stories from
              <br />
              <em>the road.</em>
            </>
          }
          desc="A first look at the stories we want to share. These are editorial concepts based on real Kyrgyzest tours, not published blog posts."
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
                  <span className="journal-date">
                    <I name="calendar-line" />{" "}
                    <time dateTime={post.date}>{post.displayDate}</time>{" "}
                    <span className="journal-draft-tag">DRAFT</span>
                  </span>
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
                  Explore the real tour <I name="arrow-right-line" />
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
          <Eyebrow>GOOD TO KNOW</Eyebrow>
          <h2 className="section-title">
            A few things
            <br />
            <em>before you go.</em>
          </h2>
          <p className="section-description">
            Answers to some of the questions we hear most often. For the full
            details, our team is only a message away.
          </p>
          <a
            className="faq-contact"
            href={socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <I name="whatsapp-line" /> Still have a question? Ask us{" "}
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
          <Eyebrow light>YOUR NEXT STORY AWAITS</Eyebrow>
          <h2>
            Come for the views.
            <br />
            <em>Leave with a feeling.</em>
          </h2>
          <p>
            Tell us what you dream of seeing. We'll help create the Kyrgyzstan
            experience you'll carry with you.
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
              <I name="sun-line" /> EXPERIENCE THE SOUL OF KYRGYZSTAN
            </span>
            <h2>
              Some places stay
              <br />
              <em>with you forever.</em>
            </h2>
            <p>
              Discover landscapes, traditions and stories worth bringing home.
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
              Let's make it
              <br />
              your journey.
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
              Thoughtfully designed journeys through the land we call home. Made
              in Kyrgyzstan.
            </p>
            <div className="footer-social">
              <a
                href={socials.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <I name="instagram-line" />
              </a>
              <a
                href={socials.whatsapp}
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <I name="whatsapp-line" />
              </a>
            </div>
          </div>
          <div className="footer-nav">
            <div>
              <h4>EXPLORE</h4>
              <a href="#tours">Our tours</a>
              <a href="#destinations">Destinations</a>
              <a href="#gallery">Gallery</a>
              <a href="#map">Tour map</a>
            </div>
            <div>
              <h4>THE COMPANY</h4>
              <a href="#about">About Kyrgyzest</a>
              <a href="#reviews">Guest stories</a>
              <a href="#faq">FAQ</a>
              <a href="#journal">Journal</a>
            </div>
            <div>
              <h4>LET'S CONNECT</h4>
              <a href="mailto:kyrgyzest.tour@gmail.com">
                kyrgyzest.tour@gmail.com
              </a>
              <a href="tel:+996551057666">+996 551 057 666</a>
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
          <a href="#home">
            BACK TO TOP <I name="arrow-up-line" />
          </a>
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
    [photo, setPhoto] = useState(null);
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
        <MapSection />
        <Gallery openPhoto={setPhoto} />
        <Reviews />
        <Story />
        <Blog />
        <Faq />
        <Cta openBooking={openBooking} />
      </main>
      <Footer />
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
