import { useCallback, useEffect, useRef, useState } from 'react';

const BOOKING_URL = 'https://n1381235.alteg.io/';
const PHONE_DISPLAY = '+998 93 700 24-42';
const PHONE_TEL = '+998937002442';
const INSTAGRAM = 'https://www.instagram.com/thems.barberia/';
const TELEGRAM = 'https://t.me/+998937002442';

/** Изображения с сайта Tilda (static.tildacdn.ink) */
const IMG_HERO =
  'https://static.tildacdn.ink/tild3865-3062-4539-a464-646539366332/5379773398592385212.jpg';

const GALLERY_IMGS = [
  {
    src: 'https://static.tildacdn.ink/tild3233-3638-4364-a431-393964306633/5325963260874325905.jpg',
    alt: 'Thems Barberia — интерьер и работа мастеров',
  },
  {
    src: 'https://static.tildacdn.ink/tild3035-3733-4264-b439-353662336436/476c5d49-7746-45aa-a.jpg',
    alt: 'Thems Barberia — атмосфера салона',
  },
  {
    src: 'https://static.tildacdn.ink/tild6637-3630-4238-b039-633036303236/5379773398592385214.jpg',
    alt: 'Thems Barberia — детали сервиса',
  },
];

const IMG_ABOUT =
  'https://static.tildacdn.ink/tild3738-6431-4438-b061-633461386661/noroot.png';

const NAV = [
  { href: '#services', label: 'Услуги' },
  { href: '#masters', label: 'Мастера' },
  { href: '#about', label: 'О нас' },
  { label: 'Запись', booking: true },
  { href: '#contacts', label: 'Контакты' },
];

const BARBER_SERVICE_GROUPS = [
  {
    title: 'Мужские стрижки',
    items: [
      { name: 'Стрижка', note: '', price: '200 000 сум' },
      { name: 'Стрижка под машинку', note: '', price: '120 000 сум' },
      { name: 'Детская стрижка', note: '', price: '150 000 сум' },
    ],
  },
  {
    title: 'Уход за бородой',
    items: [
      { name: 'Моделирование бороды', note: '', price: '130 000 сум' },
      { name: 'Бритьё бороды', note: '', price: '150 000 сум' },
      { name: 'Стрижка бороды', note: '', price: '100 000 сум' },
    ],
  },
  {
    title: 'Бритьё и тонировка',
    items: [
      { name: 'Бритьё головы', note: '', price: '120 000 сум' },
      { name: 'Тонировка головы', note: '', price: '150 000 сум' },
      { name: 'Тонировка бороды', note: '', price: '120 000 сум' },
    ],
  },
  {
    title: 'Дополнительные услуги',
    items: [
      { name: 'Укладка', note: '', price: '50 000 сум' },
      { name: 'Окантовка', note: '', price: '50 000 сум' },
      { name: 'Удаление воском', note: '', price: '50 000 сум' },
      { name: 'Чистка лица', note: '', price: '120 000 сум' },
      {
        name: 'Королевский уход за лицом от THEMS',
        note: 'Royal Facial by THEMS',
        price: '200 000 сум',
      },
    ],
  },
];

const THERAPY_GROUPS = [
  {
    titleRu: 'Ритуалы джентльмена',
    titleEn: 'GENTLEMAN RITUALS',
    items: [
      {
        name: 'Терапия джентльмена',
        note: 'Полный массаж тела. Глубокое восстановление. Энергия и баланс в каждом движении.',
        duration: '1 час',
        price: '500 000 сум',
      },
      {
        name: 'Экспресс-уход для джентльмена',
        note: 'Когда каждая минута важна. Короткий формат максимум расслабления.',
        duration: '15 мин',
        price: '150 000 сум',
      },
    ],
  },
  {
    titleRu: 'Классический уход',
    titleEn: 'CLASSIC CARE',
    items: [
      {
        name: 'Массаж спины',
        note: 'Снятие напряжения и лёгкость в теле.',
        duration: '30 мин',
        price: '300 000 сум',
      },
      {
        name: 'Спина + голова',
        note: 'Концентрация и отдых одновременно.',
        duration: '40 мин',
        price: '350 000 сум',
      },
      {
        name: 'Массаж ног',
        note: 'Сила, лёгкость и уверенность в каждом шаге.',
        duration: '30 мин',
        price: '300 000 сум',
      },
      {
        name: 'Массаж стоп',
        note: 'Для тех, кто ценит детали. Полное расслабление через касание.',
        duration: '25 мин',
        price: '250 000 сум',
      },
    ],
  },
  {
    titleRu: 'Глубинная работа',
    titleEn: 'DEEP WORK',
    items: [
      {
        name: 'Сухой массаж «Триггерные точки»',
        note: 'Работа с напряжением. Точечно, глубоко, профессионально.',
        duration: '1 час',
        price: '450 000 сум',
      },
    ],
  },
];

const MASTERS = [
  {
    name: 'Doniyor',
    role: 'Master barber',
    quote: 'Геометрия и чистые линии — основа уверенного образа.',
    img: 'https://static.tildacdn.ink/tild3566-6238-4833-a439-623262343432/photo_52446453909324.jpg',
  },
  {
    name: 'Abduvoxid',
    role: 'Barber',
    quote: 'Борода и контуры — как архитектура: баланс формы и текстуры.',
    img: 'https://static.tildacdn.ink/tild3139-6530-4464-a636-643865313030/photo_52446453909324.jpg',
  },
  {
    name: 'Abdurashid',
    role: 'Barber',
    quote: 'Спокойный ритм работы и внимание к деталям на каждом визите.',
    img: 'https://static.tildacdn.ink/tild6665-3565-4133-b561-396334356336/IMG_7370.JPG',
  },
];

function IconMenu({ open, variant }) {
  const line = variant === 'dark' ? 'bg-white' : 'bg-[#163a2e]';
  return (
    <span className="relative block h-[14px] w-[22px]">
      <span
        className={`absolute left-0 top-0 h-px w-full ${line} transition-transform duration-300 ${
          open ? 'translate-y-[6px] rotate-45' : ''
        }`}
      />
      <span
        className={`absolute left-0 top-[6px] h-px w-full ${line} transition-opacity duration-300 ${
          open ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`absolute left-0 top-[12px] h-px w-full ${line} transition-transform duration-300 ${
          open ? '-translate-y-[6px] -rotate-45' : ''
        }`}
      />
    </span>
  );
}

export default function App() {
  const [headerOnDark, setHeaderOnDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const openBooking = useCallback(() => {
    setBookingModalOpen(true);
    setMenuOpen(false);
  }, []);

  const closeBooking = useCallback(() => {
    setBookingModalOpen(false);
  }, []);

  const gallerySliderRef = useRef(null);
  const galleryAnimRef = useRef(null);
  const galleryPausedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let slider = gallerySliderRef.current;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduceMotion) return;

    let scrollPos = 0;

    const animate = () => {
      if (cancelled) return;
      slider = gallerySliderRef.current;
      if (!slider) {
        galleryAnimRef.current = requestAnimationFrame(animate);
        return;
      }
      if (!galleryPausedRef.current && !document.hidden) {
        scrollPos += 0.65;
        const half = slider.scrollWidth / 2;
        if (half > 0 && scrollPos >= half) {
          scrollPos = 0;
        }
        slider.scrollLeft = scrollPos;
      }
      galleryAnimRef.current = requestAnimationFrame(animate);
    };

    galleryAnimRef.current = requestAnimationFrame(animate);
    return () => {
      cancelled = true;
      if (galleryAnimRef.current != null) {
        cancelAnimationFrame(galleryAnimRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const probeLine = () => {
      const headerEl = document.getElementById('site-header');
      const h = headerEl?.offsetHeight ?? 76;
      return h + 2;
    };

    const update = () => {
      const y = probeLine();
      const sections = document.querySelectorAll('[data-header-theme]');
      let theme = 'dark';

      sections.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) {
          theme = el.getAttribute('data-header-theme') ?? 'light';
        }
      });

      setHeaderOnDark(theme === 'dark');
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || bookingModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, bookingModalOpen]);

  useEffect(() => {
    if (!bookingModalOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeBooking();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [bookingModalOpen, closeBooking]);

  const headerShell =
    headerOnDark && !menuOpen
      ? 'bg-[#163a2e] border-b border-[rgba(255,255,255,0.15)]'
      : 'bg-[#ffffff] border-b border-[rgba(22,58,46,0.2)]';

  const navLink =
    headerOnDark && !menuOpen
      ? 'text-white/85 hover:text-white'
      : 'text-[#163a2e]/85 hover:text-[#163a2e]';

  const sepClass =
    headerOnDark && !menuOpen ? 'text-white/35' : 'text-[#163a2e]/25';

  const logoMain =
    headerOnDark && !menuOpen ? 'text-white' : 'text-[#163a2e]';

  const logoSub =
    headerOnDark && !menuOpen ? 'text-white/70' : 'text-[#4a7060]';

  const ctaPrimary =
    headerOnDark && !menuOpen
      ? 'border border-white text-white hover:bg-white hover:text-[#163a2e]'
      : 'border border-transparent bg-[#163a2e] text-white hover:bg-[#1f5040]';

  const burgerRing =
    headerOnDark && !menuOpen
      ? 'border-white/35 hover:border-white/55'
      : 'border-[rgba(22,58,46,0.2)] hover:border-[rgba(22,58,46,0.35)]';

  const mobilePanel =
    menuOpen && headerOnDark ? 'bg-[#163a2e]' : menuOpen ? 'bg-[#ffffff]' : 'bg-transparent';

  const mobileLink =
    menuOpen && headerOnDark ? 'text-white' : 'text-[#163a2e]';

  const mobileCta =
    menuOpen && headerOnDark
      ? 'border-white text-white hover:bg-white hover:text-[#163a2e]'
      : 'border-[#163a2e] bg-[#163a2e] text-white hover:bg-[#1f5040]';

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <header
        id="site-header"
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${menuOpen ? 'border-transparent bg-[#ffffff]' : headerShell}`}
      >
        <div className="relative mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
          <a href="#top" className="group relative z-10 flex flex-col gap-0.5">
            <span
              className={`font-serif text-[22px] font-semibold tracking-[6px] transition-colors duration-300 ${menuOpen ? 'text-[#163a2e]' : logoMain}`}
            >
              THEMS
            </span>
            <span
              className={`font-sans text-[9px] font-medium uppercase tracking-[5px] transition-colors duration-300 ${menuOpen ? 'text-[#4a7060]' : logoSub}`}
            >
              BARBERIA
            </span>
          </a>

          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-4 md:flex"
            aria-label="Основная навигация"
          >
            {NAV.map((item, i) => (
              <span key={item.booking ? 'nav-booking' : item.href} className="flex items-center gap-4">
                {i > 0 ? (
                  <span
                    className={`font-sans text-[12px] transition-colors duration-300 ${menuOpen ? 'text-[#163a2e]/25' : sepClass}`}
                    aria-hidden
                  >
                    ·
                  </span>
                ) : null}
                {item.booking ? (
                  <button
                    type="button"
                    onClick={openBooking}
                    className={`font-sans text-[12px] uppercase tracking-[3px] transition-colors duration-300 ${menuOpen ? 'text-[#163a2e]/85 hover:text-[#163a2e]' : navLink}`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className={`font-sans text-[12px] uppercase tracking-[3px] transition-colors duration-300 ${menuOpen ? 'text-[#163a2e]/85 hover:text-[#163a2e]' : navLink}`}
                  >
                    {item.label}
                  </a>
                )}
              </span>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-4">
            <button
              type="button"
              onClick={openBooking}
              className={`hidden rounded-none px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[2px] transition-colors duration-300 md:inline-flex ${menuOpen ? 'border border-[#163a2e] bg-[#163a2e] text-white hover:bg-[#1f5040]' : ctaPrimary}`}
            >
              Записаться
            </button>

            <button
              type="button"
              className={`flex h-11 w-11 touch-manipulation items-center justify-center rounded border transition-colors duration-300 md:hidden ${burgerRing}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <IconMenu open={menuOpen} variant={menuOpen || !headerOnDark ? 'light' : 'dark'} />
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={`md:hidden ${menuOpen ? 'pointer-events-auto max-h-[calc(100vh-72px)] opacity-100' : 'pointer-events-none max-h-0 opacity-0'} overflow-hidden transition-all duration-300 ease-out`}
        >
          <nav
            className={`flex flex-col gap-8 border-t px-8 py-10 transition-colors duration-300 ${mobilePanel} ${menuOpen ? (headerOnDark ? 'border-[rgba(255,255,255,0.15)]' : 'border-[rgba(22,58,46,0.12)]') : 'border-transparent'}`}
            aria-label="Мобильная навигация"
          >
            {NAV.map((item) =>
              item.booking ? (
                <button
                  key="nav-booking-mobile"
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openBooking();
                  }}
                  className={`text-left font-serif text-3xl italic transition-colors duration-300 ${mobileLink}`}
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className={`font-serif text-3xl italic transition-colors duration-300 ${mobileLink}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ),
            )}
            <button
              type="button"
              className={`mt-2 inline-flex w-fit rounded-none border px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[2px] transition-colors duration-300 ${mobileCta}`}
              onClick={openBooking}
            >
              Записаться
            </button>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section
          data-header-theme="dark"
          className="relative flex min-h-[100vh] items-center justify-center overflow-hidden bg-[#163a2e]"
        >
          <img
            src={IMG_HERO}
            alt="Thems Barberia — салон в Ташкенте"
            className="absolute inset-0 h-full w-full object-cover"
            width={1920}
            height={1080}
            decoding="async"
          />
          <div className="absolute inset-0 bg-[rgba(22,58,46,0.72)]" aria-hidden />

          <div className="relative z-10 mx-auto max-w-[920px] px-6 py-28 text-center lg:px-10">
            <p className="font-sans text-[11px] uppercase tracking-[6px] text-white/70">
              BARBERSHOP · TASHKENT
            </p>
            <div className="mx-auto my-5 h-px w-[50px] bg-[rgba(255,255,255,0.35)]" aria-hidden />

            <h1 className="font-serif text-[clamp(48px,6vw,90px)] font-normal italic leading-[1.05] text-white">
              Место, где стрижка — это искусство
            </h1>

            <p className="mt-5 font-sans text-[14px] text-white/65">
              Премиальный барбершоп в центре Ташкента
            </p>

            <button
              type="button"
              onClick={openBooking}
              className="mt-10 inline-flex w-full max-w-[min(100%,320px)] justify-center bg-white px-8 py-4 font-sans text-[12px] font-semibold uppercase tracking-[3px] text-[#163a2e] transition-colors duration-300 hover:bg-[#f4f7f5] sm:w-auto sm:max-w-none sm:px-[52px]"
            >
              ЗАПИСАТЬСЯ ОНЛАЙН
            </button>
          </div>
        </section>

        {/* ПРЕИМУЩЕСТВА */}
        <section data-header-theme="light" className="scroll-mt-28 bg-[#ffffff] py-20 lg:py-[80px]">
          <div className="mx-auto mb-16 h-px w-[60px] bg-[rgba(22,58,46,0.12)]" aria-hidden />
          <div className="mx-auto grid max-w-[1200px] gap-14 px-6 md:grid-cols-3 md:gap-10 lg:px-10">
            {[
              { title: 'Мастерство', body: 'Опытные барберы с многолетним стажем' },
              { title: 'Атмосфера', body: 'Пространство уверенности и стиля' },
              { title: 'Детали', body: 'Каждый визит — это безупречный результат' },
            ].map((item) => (
              <div key={item.title} className="text-center md:text-left">
                <p className="font-serif text-xl text-[#163a2e]">✦</p>
                <h3 className="mt-4 font-serif text-[26px] text-[#163a2e]">{item.title}</h3>
                <p className="mt-3 font-sans text-[14px] leading-relaxed text-[#4a7060]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* УСЛУГИ */}
        <section
          id="services"
          data-header-theme="dark"
          className="scroll-mt-28 bg-[#163a2e] py-24 lg:py-32"
        >
          <div className="mx-auto max-w-[900px] px-6 lg:px-10">
            <h2 className="font-serif text-[clamp(48px,8vw,72px)] italic leading-none text-white">
              Наши услуги
            </h2>
            <div className="mt-5 h-px w-16 bg-[rgba(255,255,255,0.25)]" aria-hidden />
            <p className="mt-8 max-w-xl font-sans text-[14px] leading-relaxed text-white/65">
              Актуальное меню и цены в сумах. Итоговую стоимость уточняйте при записи.
            </p>

            <div className="mt-16 space-y-14">
              {BARBER_SERVICE_GROUPS.map((group) => (
                <div key={group.title}>
                  <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[5px] text-white/55">
                    {group.title}
                  </h3>
                  <ul className="mt-8 space-y-10">
                    {group.items.map((s) => (
                      <li key={s.name}>
                        <div className="flex items-baseline justify-between gap-4 md:items-end md:gap-3">
                          <span className="min-w-0 flex-1 font-serif text-[20px] leading-snug text-white md:flex-none md:text-[22px] lg:text-[24px]">
                            {s.name}
                          </span>
                          <span
                            className="mb-[7px] hidden min-h-[1px] min-w-[12px] flex-1 border-b border-dotted border-white/25 md:block"
                            aria-hidden
                          />
                          <span className="shrink-0 font-sans text-[12px] uppercase tracking-[1px] text-white/90 sm:text-[13px]">
                            {s.price}
                          </span>
                        </div>
                        {s.note ? (
                          <p className="mt-2 font-sans text-[13px] text-white/55">{s.note}</p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-16 flex flex-wrap gap-6">
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex bg-white px-10 py-4 font-sans text-[11px] font-semibold uppercase tracking-[2px] text-[#163a2e] transition-colors duration-300 hover:bg-[#f4f7f5]"
              >
                Выбрать время
              </button>
            </div>
          </div>
        </section>

        {/* THEMS THERAPY */}
        <section id="therapy" data-header-theme="light" className="scroll-mt-28 bg-[#f4f7f5] py-24 lg:py-32">
          <div className="mx-auto max-w-[900px] px-6 lg:px-10">
            <h2 className="text-center font-serif text-[clamp(40px,6vw,56px)] italic leading-tight text-[#163a2e]">
              THEMS THERAPY
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-[rgba(22,58,46,0.12)]" aria-hidden />

            <div className="mt-16 space-y-16">
              {THERAPY_GROUPS.map((group) => (
                <div key={group.titleRu}>
                  <h3 className="text-center font-sans text-[12px] font-semibold uppercase leading-relaxed tracking-[4px] text-[#163a2e]">
                    {group.titleRu}
                    <span className="mt-1 block font-normal tracking-[3px] text-[#4a7060]">{group.titleEn}</span>
                  </h3>
                  <ul className="mt-10 space-y-10">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <span className="font-serif text-[22px] text-[#163a2e] md:text-[24px]">{item.name}</span>
                          <span className="font-sans text-[13px] font-semibold uppercase tracking-[1px] text-[#163a2e]">
                            {item.price}
                          </span>
                        </div>
                        <p className="mt-2 font-sans text-[13px] leading-relaxed text-[#4a7060]">{item.note}</p>
                        <p className="mt-1 text-right font-sans text-[12px] uppercase tracking-[2px] text-[#163a2e]/70">
                          {item.duration}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-14 flex justify-center">
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex bg-[#163a2e] px-10 py-4 font-sans text-[11px] font-semibold uppercase tracking-[2px] text-white transition-colors duration-300 hover:bg-[#1f5040]"
              >
                Записаться
              </button>
            </div>
          </div>
        </section>

        {/* ГАЛЕРЕЯ — горизонтальный автоскролл (как слайдер услуг Uncle Chill) */}
        <section id="photos" data-header-theme="light" className="scroll-mt-28 bg-[#ffffff] py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <h2 className="font-serif text-[clamp(36px,5vw,52px)] italic text-[#163a2e]">Атмосфера салона</h2>
            <div className="mt-5 h-px w-16 bg-[rgba(22,58,46,0.12)]" aria-hidden />
            <p className="mt-6 max-w-xl font-sans text-[14px] leading-relaxed text-[#4a7060]">
              Лента фото медленно движётся сама — наведите курсор, чтобы остановить и рассмотреть детали.
            </p>
          </div>

          <div
            className="mt-12 flex w-full overflow-hidden"
            onMouseEnter={() => {
              galleryPausedRef.current = true;
            }}
            onMouseLeave={() => {
              galleryPausedRef.current = false;
            }}
            onTouchStart={() => {
              galleryPausedRef.current = true;
            }}
            onTouchEnd={() => {
              galleryPausedRef.current = false;
            }}
          >
            <div
              ref={gallerySliderRef}
              className="scrollbar-hide flex min-h-0 min-w-0 w-4/5 mx-auto shrink-0 flex-nowrap gap-4 overflow-x-auto pb-2 pl-6 pr-6 md:gap-5 lg:pl-10 lg:pr-10"
              aria-label="Галерея салона, автоматическая прокрутка"
            >
              {[...GALLERY_IMGS, ...GALLERY_IMGS].map((item, i) => (
                <figure
                  key={`${item.src}-${i}`}
                  className="w-[78vw] max-w-[420px] shrink-0 overflow-hidden border border-[rgba(22,58,46,0.2)] shadow-[0_2px_12px_rgba(22,58,46,0.15)] sm:w-[340px] md:w-[380px]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="aspect-[4/5] h-full w-full object-cover md:aspect-[3/4]"
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* МАСТЕРА */}
        <section
          id="masters"
          data-header-theme="light"
          className="scroll-mt-28 bg-[#f4f7f5] py-24 lg:py-32"
        >
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="font-serif text-[clamp(48px,6vw,64px)] italic text-[#163a2e]">Мастера</h2>
              <p className="max-w-md font-sans text-[14px] leading-relaxed text-[#4a7060]">
                Команда, которая держит планку качества на каждом этапе — от консультации до финальной укладки.
              </p>
            </div>
            <div className="mx-auto mt-16 grid gap-10 md:grid-cols-3">
              {MASTERS.map((m) => (
                <article
                  key={m.name}
                  className="overflow-hidden border border-[rgba(22,58,46,0.2)] bg-[#ffffff] shadow-[0_2px_12px_rgba(22,58,46,0.15)] transition-colors hover:border-[rgba(22,58,46,0.35)]"
                >
                  <div className="relative aspect-[360/450] bg-gradient-to-br from-[#163a2e] to-[#1f5040]">
                    <img
                      src={m.img}
                      alt={`${m.name}, ${m.role}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="px-8 pb-10 pt-8">
                    <div className="h-px w-12 bg-[rgba(22,58,46,0.12)]" aria-hidden />
                    <h3 className="mt-8 font-serif text-[28px] italic text-[#163a2e]">{m.name}</h3>
                    <p className="mt-2 font-sans text-[11px] uppercase tracking-[3px] text-[#4a7060]">{m.role}</p>
                    <p className="mt-6 font-sans text-[14px] leading-relaxed text-[#4a7060]">{m.quote}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* О НАС */}
        <section id="about" data-header-theme="dark" className="scroll-mt-28 bg-[#163a2e] py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1100px] items-center gap-14 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-[clamp(48px,6vw,64px)] italic text-white">О нас</h2>
              <div className="mx-auto mt-6 h-px w-16 bg-[rgba(255,255,255,0.25)] lg:mx-0" aria-hidden />
              <p className="mt-12 font-serif text-[clamp(22px,3vw,28px)] italic leading-snug text-white/95">
                Thems Barberia — место, где стрижка превращается в искусство, а уход становится частью стиля жизни.
              </p>
              <p className="mx-auto mt-8 max-w-xl font-sans text-[15px] leading-[1.85] text-white/65 lg:mx-0">
                Мы создаём атмосферу, в которой мужчина чувствует себя уверенно и по-настоящему премиально. Здесь важна
                каждая деталь — от мастерства барберов до настроения после визита. Запись онлайн помогает спланировать
                время без ожидания на ресепшене.
              </p>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="overflow-hidden border border-[rgba(255,255,255,0.15)] shadow-[0_2px_12px_rgba(22,58,46,0.15)]">
                <img
                  src={IMG_ABOUT}
                  alt="Thems Barberia — о компании"
                  className="aspect-[560/560] w-full bg-[#e8f0ec] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* КОНТАКТЫ */}
        <section id="contacts" data-header-theme="light" className="scroll-mt-28 bg-[#ffffff] py-24 lg:py-32">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
            <h2 className="font-serif text-[clamp(48px,6vw,64px)] italic text-[#163a2e]">Контакты</h2>
            <div className="mt-6 h-px w-16 bg-[rgba(22,58,46,0.12)]" aria-hidden />

            <div className="mt-16 grid gap-14 lg:grid-cols-2">
              <div className="space-y-10">
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[4px] text-[#163a2e]">Адрес</p>
                  <p className="mt-3 max-w-md font-sans text-[15px] leading-relaxed text-[#163a2e]">
                    Ташкент, Мирабадский район, массив Госпитальный, 4
                  </p>
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[4px] text-[#163a2e]">Режим</p>
                  <p className="mt-3 font-sans text-[15px] text-[#163a2e]">10:00 – 22:00, без выходных</p>
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[4px] text-[#163a2e]">Телефон</p>
                  <a
                    className="mt-3 block font-sans text-[15px] text-[#163a2e] transition-colors hover:text-[#1f5040]"
                    href={`tel:${PHONE_TEL}`}
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex flex-col justify-between border border-[rgba(22,58,46,0.2)] bg-[#f4f7f5] p-10 lg:p-12 shadow-[0_2px_12px_rgba(22,58,46,0.15)]">
                <div className="space-y-8">
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[4px] text-[#163a2e]">Соцсети</p>
                    <div className="mt-4 flex flex-wrap gap-6">
                      <a
                        href={INSTAGRAM}
                        target="_blank"
                        rel="noreferrer"
                        className="font-sans text-[13px] uppercase tracking-[2px] text-[#163a2e] underline decoration-[rgba(22,58,46,0.12)] underline-offset-8 transition-colors hover:text-[#1f5040]"
                      >
                        Instagram · @thems.barberia
                      </a>
                      <a
                        href={TELEGRAM}
                        target="_blank"
                        rel="noreferrer"
                        className="font-sans text-[13px] uppercase tracking-[2px] text-[#163a2e] underline decoration-[rgba(22,58,46,0.12)] underline-offset-8 transition-colors hover:text-[#1f5040]"
                      >
                        Telegram · {PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[4px] text-[#163a2e]">Запись</p>
                    <button
                      type="button"
                      onClick={openBooking}
                      className="mt-4 inline-flex font-sans text-[14px] text-[#163a2e] underline decoration-[rgba(22,58,46,0.2)] underline-offset-[6px] transition-opacity hover:opacity-75"
                    >
                      Открыть форму записи
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={openBooking}
                  className="mt-12 inline-flex w-fit bg-[#163a2e] px-10 py-4 font-sans text-[12px] font-semibold uppercase tracking-[3px] text-white transition-colors duration-300 hover:bg-[#1f5040] lg:mt-0"
                >
                  Онлайн-запись
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer data-header-theme="dark" className="border-t border-[rgba(255,255,255,0.15)] bg-[#163a2e] py-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-left lg:px-10">
          <div>
            <p className="font-serif text-lg tracking-[4px] text-white">THEMS BARBERIA</p>
            <p className="mt-2 font-sans text-[12px] text-white/55">© {new Date().getFullYear()} · Ташкент</p>
          </div>
          <p className="max-w-md font-sans text-[12px] leading-relaxed text-white/55">
            Премиальный сервис и спокойная атмосфера в центре города.
          </p>
        </div>
      </footer>

      {/* Модалка записи (Altegio в iframe), как на Uncle Chill */}
      {bookingModalOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#163a2e]/70 backdrop-blur-[2px]"
            aria-label="Закрыть"
            onClick={closeBooking}
          />
          <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[18px] border border-[rgba(22,58,46,0.2)] bg-[#ffffff] shadow-[0_-8px_40px_rgba(22,58,46,0.2)] sm:rounded-sm sm:shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-[rgba(22,58,46,0.12)] px-4 py-4 md:px-6">
              <h3 id="booking-modal-title" className="font-serif text-2xl italic text-[#163a2e] md:text-3xl">
                Онлайн-запись
              </h3>
              <button
                type="button"
                onClick={closeBooking}
                className="flex h-10 w-10 touch-manipulation items-center justify-center text-3xl leading-none text-[#4a7060] transition-colors hover:text-[#163a2e]"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden bg-[#f4f7f5] p-2 md:p-4">
              <iframe
                title="Онлайн-запись Thems Barberia (Altegio)"
                src={BOOKING_URL}
                className="h-[min(72vh,720px)] w-full border-0 bg-white sm:h-[65vh]"
              />
            </div>
            <p className="shrink-0 border-t border-[rgba(22,58,46,0.12)] px-4 py-3 text-center font-sans text-[12px] text-[#4a7060]">
              Не загружается?{' '}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="text-[#163a2e] underline underline-offset-2 hover:text-[#1f5040]"
              >
                Открыть Altegio в новой вкладке
              </a>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
