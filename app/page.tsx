"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, AudioLines, CalendarDays, Check, Clock3, ExternalLink, HeartPulse, MapPin, MessageCircle, Navigation, Search, ShieldCheck, Sparkles, Stethoscope, Phone, X } from "lucide-react";

type Clinic = {
  id: string;
  name: string;
  address: string;
  phone?: string;
  specialties: string[];
  bookingUrl: string;
  bookingType: "Kalendarz online" | "Strona placówki";
  sourceLabel: string;
  sourceUrl: string;
  note: string;
};

const quickPrompts = [
  "Znajdź dermatologa",
  "Szukam wizyty jak najszybciej",
  "Pomóż mi dojechać do lekarza"
];

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: "assistant" | "user"; text: string}[]>([
    { role: "assistant", text: "Siema, tu Wazzaaap. 🖤 Pomogę Ci ogarnąć placówkę, rejestrację i dojazd. Na start mam kilka sprawdzonych punktów w Katowicach. Czego szukamy?" }
  ]);
  const [specialty, setSpecialty] = useState("Wszystkie");
  const [area, setArea] = useState("Katowice");
  const [when, setWhen] = useState("Jak najszybciej");
  const [query, setQuery] = useState("");
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loadingClinics, setLoadingClinics] = useState(true);
  const [showDirectory, setShowDirectory] = useState(true);
  const [directoryError, setDirectoryError] = useState("");
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  async function loadClinics() {
    setLoadingClinics(true);
    setDirectoryError("");
    try {
      const response = await fetch("/api/clinics", { cache: "no-store" });
      if (!response.ok) throw new Error("Nie udało się pobrać katalogu.");
      const data = await response.json();
      setClinics(data.clinics);
    } catch {
      setDirectoryError("Nie udało się odświeżyć katalogu. Spróbuj ponownie.");
    } finally {
      setLoadingClinics(false);
    }
  }

  useMemo(() => {
    void loadClinics();
  }, []);

  const filteredClinics = useMemo(() => clinics.filter((clinic) => {
    const searchText = query.trim().toLocaleLowerCase("pl");
    const matchesSpecialty = specialty === "Wszystkie" || clinic.specialties.some((item) => item.toLocaleLowerCase("pl").includes(specialty.toLocaleLowerCase("pl")));
    const matchesArea = !area.trim() || clinic.address.toLocaleLowerCase("pl").includes(area.toLocaleLowerCase("pl")) || clinic.name.toLocaleLowerCase("pl").includes(area.toLocaleLowerCase("pl"));
    const haystack = [clinic.name, clinic.address, ...clinic.specialties].join(" ").toLocaleLowerCase("pl");
    return matchesSpecialty && matchesArea && (!searchText || haystack.includes(searchText));
  }), [clinics, specialty, area, query]);

  const uberUrl = (clinic?: Clinic) => {
    const destination = encodeURIComponent(clinic ? `${clinic.name}, ${clinic.address}` : `${area || "Katowice"}, Polska`);
    return `https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=${destination}`;
  };

  function sendMessage(text = input) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const lower = trimmed.toLocaleLowerCase("pl");
    let reply = "Dobra, ogarniamy. Katalog poniżej zawiera placówki i ich oficjalne ścieżki rejestracji. Nie widzę jeszcze wspólnego dostępu do kalendarzy wszystkich klinik, więc potwierdzony termin wybierzesz w systemie placówki.";
    if (lower.includes("dermatolog")) {
      setSpecialty("Dermatolog");
      setShowDirectory(true);
      reply = "Dermatolog — zaznaczyłem specjalizację. Sprawdź profile placówek poniżej i przejdź do rejestracji, żeby zobaczyć aktualne terminy.";
    } else if (lower.includes("dojazd") || lower.includes("uber")) {
      reply = "Jasne. Wybierz placówkę na liście, a przy jej karcie otworzysz Ubera z wypełnionym adresem docelowym. Przed zamówieniem sprawdź cel w aplikacji.";
      setShowDirectory(true);
    } else if (lower.includes("termin") || lower.includes("najszybciej") || lower.includes("dzisiaj") || lower.includes("jutro")) {
      setWhen(lower.includes("jutro") ? "Jutro" : lower.includes("dzisiaj") ? "Dzisiaj" : "Jak najszybciej");
      setShowDirectory(true);
      reply = "Ustawiłem preferencję terminu. Żeby ustalić realnie najbliższy wolny termin, trzeba sprawdzić kalendarz każdej placówki — dlatego daję Ci bezpośrednie linki do rejestracji zamiast zgadywać.";
    }
    setMessages((current) => [...current, { role: "user", text: trimmed }, { role: "assistant", text: reply }]);
    setInput("");
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#" aria-label="Wazzaaap AI — strona główna">
          <span className="brand-mark"><span /></span>
          <span>CHILLERA <span className="brand-ai">× WAZZAAAP</span></span>
        </a>
        <div className="topbar-right"><span className="status-dot" /><span className="status-text">KATO MODE</span><span className="brand-pill">BETA</span></div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14} /> CHILLERA PRESENTS · TWÓJ OGARNIACZ</div>
          <h1>Zdrowie?<br /><span>Już ogarnięte.</span></h1>
          <p className="hero-subtitle">Wybierasz specjalistę. My skracamy drogę do rejestracji i pomagamy dojechać na miejsce.</p>
          <div className="trust-row"><span><ShieldCheck size={15} /> Bez zgadywania</span><span><MapPin size={15} /> Katowice i okolice</span></div>
        </div>
        <div className="character-stage" aria-label="Oryginalny awatar Wazzaaap AI">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="character-shadow" />
          <div className="hood"><div className="hood-highlight" /><div className="face-opening"><div className="mask-face"><div className="eye eye-left" /><div className="eye eye-right" /><div className="mask-seam" /><div className="mask-mouth"><i /><i /><i /><i /><i /></div></div></div><div className="hood-fold fold-left" /><div className="hood-fold fold-right" /></div>
          <div className="character-caption"><span className="caption-pulse" /> MATI ZAWSZE OGARNIE</div>
        </div>
      </section>

      <section className="workspace">
        <div className="chat-panel">
          <div className="panel-heading">
            <div className="mini-avatar"><span /></div>
            <div><h2>Chill chat</h2><p>Bez spiny, krok po kroku</p></div>
            <span className="secure-label"><ShieldCheck size={13} /> TWOJE DECYZJE</span>
          </div>
          <div className="messages" aria-live="polite">
            <div className="day-divider"><span>SIEMA, KATO</span></div>
            {messages.map((message, index) => <div key={index} className={`message-row ${message.role === "user" ? "from-user" : "from-assistant"}`}>
              {message.role === "assistant" && <div className="message-avatar"><span /></div>}
              <div className="message-bubble">{message.text}</div>
            </div>)}
          </div>
          <div className="quick-prompts">{quickPrompts.map((prompt) => <button key={prompt} onClick={() => sendMessage(prompt)}>{prompt}<span>↗</span></button>)}</div>
          <form className="composer" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
            <button type="button" className="composer-tool" aria-label="Głos — w przygotowaniu" title="Głos — w przygotowaniu"><AudioLines size={18} /></button>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Napisz do Wazzaaapa..." aria-label="Wiadomość do asystenta" />
            <button type="submit" className="send-button" aria-label="Wyślij wiadomość"><ArrowUpRight size={19} /></button>
          </form>
          <p className="disclaimer">Asystent organizacyjny, nie lekarz. W nagłym zagrożeniu dzwoń pod 112.</p>
        </div>

        <aside className="tools-column">
          <div className="side-card search-card">
            <div className="card-icon"><Stethoscope size={19} /></div><div className="card-kicker">01 / ZNAJDŹ</div>
            <h3>Znajdź swoją ekipę medyczną</h3>
            <p>Filtruj placówki i przejdź bezpośrednio do ich rejestracji online.</p>
            <div className="search-fields">
              <label>Specjalizacja<select value={specialty} onChange={(event) => setSpecialty(event.target.value)}>{["Wszystkie","Dermatolog","Stomatolog","Psycholog","Psychiatra","Kardiolog","Ortopeda","Internista","Lekarz rodzinny","Ginekolog","Neurolog","Pediatra","Diagnostyka"].map((item) => <option key={item}>{item}</option>)}</select></label>
              <label>Miasto lub okolica<div className="input-with-icon"><MapPin size={15} /><input value={area} onChange={(event) => setArea(event.target.value)} /></div></label>
              <label>Szukaj nazwy lub usługi<div className="input-with-icon"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="np. dermatolog, Brynów..." /></div></label>
              <label>Preferowany termin<select value={when} onChange={(event) => setWhen(event.target.value)}><option>Jak najszybciej</option><option>Dzisiaj</option><option>Jutro</option><option>W tym tygodniu</option></select></label>
              <div className="directory-summary"><span>{loadingClinics ? "Ładowanie katalogu…" : `${filteredClinics.length} placówek`}</span><button onClick={loadClinics} type="button" className="refresh-button">Odśwież</button></div>
            </div>
          </div>
          <div className="side-card ride-card">
            <div className="ride-top"><div className="card-icon ride-icon"><Navigation size={18} /></div><span className="card-kicker">02 / DOJAZD</span></div>
            <h3>Na wizytę bez kombinowania</h3><p>Otwórz Ubera z adresem wybranej placówki. Sprawdź szczegóły przed zamówieniem.</p>
            <a className="uber-action" href={uberUrl(selectedClinic ?? undefined)} target="_blank" rel="noreferrer">Otwórz Ubera <span>↗</span></a>
            <div className="ride-note"><Check size={14} /> Adres celu jest wstępnie uzupełniony</div>
          </div>
          <div className="bottom-note"><span className="note-symbol">✳</span><p><strong>Mati zawsze ogarnie.</strong><br />Aktualny termin potwierdzisz w rejestracji placówki.</p></div>
        </aside>
      </section>

      <section className="directory-section" id="placowki">
        <div className="directory-heading"><div><div className="eyebrow"><HeartPulse size={14} /> KATO HEALTH GUIDE</div><h2>Placówki na start<span>.</span></h2><p>Sprawdzone punkty i oficjalne ścieżki rejestracji — bez wymyślonych terminów.</p></div><button className="directory-toggle" onClick={() => setShowDirectory((value) => !value)}>{showDirectory ? <X size={15} /> : <Search size={15} />}{showDirectory ? "Ukryj listę" : "Pokaż listę"}</button></div>
        {directoryError && <div className="error-note">{directoryError}</div>}
        {showDirectory && <div className="clinic-grid">
          {loadingClinics && <div className="empty-state">Ładuję katalog…</div>}
          {!loadingClinics && filteredClinics.map((clinic, index) => <article className="clinic-card" key={clinic.id}>
            <div className="clinic-card-top"><span className="clinic-index">{String(index + 1).padStart(2, "0")}</span><span className="source-chip">{clinic.bookingType}</span></div>
            <h3>{clinic.name}</h3><p className="clinic-address"><MapPin size={14} />{clinic.address}</p>
            <div className="specialty-tags">{clinic.specialties.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
            <p className="clinic-note">{clinic.note}</p>
            <div className="clinic-actions"><a href={clinic.bookingUrl} target="_blank" rel="noreferrer" className="clinic-book">Rejestracja <ArrowUpRight size={16} /></a><button type="button" className="clinic-map" onClick={() => setSelectedClinic(clinic)} title="Ustaw jako cel przejazdu"><Navigation size={16} /> Uber</button></div>
            {clinic.phone && <a className="clinic-phone" href={`tel:${clinic.phone.replace(/[^+\d]/g, "")}`}><Phone size={13} />{clinic.phone}</a>}
            <a className="source-link" href={clinic.sourceUrl} target="_blank" rel="noreferrer"><ExternalLink size={12} /> Źródło: {clinic.sourceLabel}</a>
          </article>)}
          {!loadingClinics && filteredClinics.length === 0 && <div className="empty-state">Brak wyników dla tych filtrów. Zmień specjalizację lub lokalizację.</div>}
        </div>}
        <p className="directory-footnote"><Clock3 size={13} /> Katalog jest pierwszą wersją i nie pokazuje wspólnego podglądu dostępności. Linki prowadzą do źródeł rejestracji; termin i cenę potwierdź u placówki.</p>
      </section>
      <footer className="footer"><span>CHILLERA × WAZZAAAP <span className="footer-dot">●</span> KATO BETA</span><span>MATI ZAWSZE OGARNIE.</span></footer>
    </main>
  );
}
