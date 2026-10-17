"use client";

import { useMemo, useState } from "react";
import { ArrowUp, AudioLines, CalendarClock, Check, ChevronDown, Clock3, MapPin, MessageCircle, Navigation, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";

type Message = { role: "assistant" | "user"; text: string };

const quickPrompts = [
  "Znajdź najbliższy wolny termin",
  "Szukam dermatologa w Katowicach",
  "Pomóż mi dojechać na wizytę"
];

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Siema. Jestem Wazzaaap. Pomogę Ci ogarnąć wizytę i dojazd — bez przeklikiwania dziesięciu stron. Od czego zaczynamy?" }
  ]);
  const [specialty, setSpecialty] = useState("Dowolna specjalizacja");
  const [area, setArea] = useState("Katowice");
  const [when, setWhen] = useState("Jak najszybciej");
  const [showSearch, setShowSearch] = useState(false);

  const uberUrl = useMemo(() => {
    const destination = encodeURIComponent("Katowice, Polska");
    return `https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=${destination}`;
  }, []);

  function sendMessage(text = input) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      { role: "assistant", text: "Jasne, mam to. Żeby pokazać prawdziwe wolne terminy, muszę sprawdzić aktualne dane placówek. Na tym etapie interfejs jest gotowy, ale katalog i kalendarze nie są jeszcze podłączone. Możemy już ustawić kryteria wyszukiwania poniżej." }
    ]);
    setInput("");
    setShowSearch(true);
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#" aria-label="Wazzaaap AI — strona główna">
          <span className="brand-mark"><span /></span>
          <span>WAZZAAAP<span className="brand-ai">.AI</span></span>
        </a>
        <div className="topbar-right">
          <span className="status-dot" /> <span className="status-text">ASYSTENT ONLINE</span>
          <button className="icon-button" aria-label="Otwórz opcje"><ChevronDown size={17} /></button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14} /> TWÓJ OSOBISTY OGARNIACZ</div>
          <h1>Ty mówisz.<br /><span>Ja ogarniam.</span></h1>
          <p className="hero-subtitle">Wizyta, termin, dojazd. Wszystko w jednej rozmowie.</p>
          <div className="trust-row">
            <span><ShieldCheck size={15} /> Ty decydujesz</span>
            <span><MessageCircle size={15} /> Po polsku</span>
          </div>
        </div>
        <div className="character-stage" aria-label="Oryginalny, stylizowany awatar Wazzaaap AI">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="character-shadow" />
          <div className="hood">
            <div className="hood-highlight" />
            <div className="face-opening">
              <div className="mask-face">
                <div className="eye eye-left" /><div className="eye eye-right" />
                <div className="mask-seam" />
                <div className="mask-mouth"><i /><i /><i /><i /><i /></div>
              </div>
            </div>
            <div className="hood-fold fold-left" /><div className="hood-fold fold-right" />
          </div>
          <div className="character-caption"><span className="caption-pulse" /> WAZZAAAP JEST NA MIEJSCU</div>
        </div>
      </section>

      <section className="workspace">
        <div className="chat-panel">
          <div className="panel-heading">
            <div className="mini-avatar"><span /></div>
            <div><h2>Twoja rozmowa</h2><p>Powiedz, czego potrzebujesz</p></div>
            <span className="secure-label"><ShieldCheck size={13} /> PRYWATNIE</span>
          </div>
          <div className="messages" aria-live="polite">
            <div className="day-divider"><span>DZISIAJ</span></div>
            {messages.map((message, index) => (
              <div key={index} className={`message-row ${message.role === "user" ? "from-user" : "from-assistant"}`}>
                {message.role === "assistant" && <div className="message-avatar"><span /></div>}
                <div className="message-bubble">{message.text}</div>
              </div>
            ))}
          </div>
          <div className="quick-prompts">
            {quickPrompts.map((prompt) => <button key={prompt} onClick={() => sendMessage(prompt)}>{prompt}<span>↗</span></button>)}
          </div>
          <form className="composer" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
            <button type="button" className="composer-tool" aria-label="Funkcja głosowa w przygotowaniu" title="Głos — w przygotowaniu"><AudioLines size={18} /></button>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Napisz do Wazzaaapa..." aria-label="Wiadomość do asystenta" />
            <button type="submit" className="send-button" aria-label="Wyślij wiadomość"><ArrowUp size={19} /></button>
          </form>
          <p className="disclaimer">Wazzaaap pomaga organizować wizyty, ale nie zastępuje lekarza ani pomocy ratunkowej.</p>
        </div>

        <aside className="tools-column">
          <div className="side-card search-card">
            <div className="card-icon"><Stethoscope size={19} /></div>
            <div className="card-kicker">KROK 01</div>
            <h3>Znajdź wizytę</h3>
            <p>Ustaw, czego szukasz. Podłączymy rzeczywiste terminy z placówek.</p>
            <button className="primary-action" onClick={() => setShowSearch((value) => !value)}>{showSearch ? "Ukryj wyszukiwanie" : "Ustaw wyszukiwanie"} <ArrowUp size={16} /></button>
            {showSearch && <div className="search-fields">
              <label>Specjalizacja<select value={specialty} onChange={(event) => setSpecialty(event.target.value)}><option>Dowolna specjalizacja</option><option>Dermatolog</option><option>Psycholog</option><option>Stomatolog</option><option>Ortopeda</option><option>Internista</option></select></label>
              <label>Lokalizacja<div className="input-with-icon"><MapPin size={15} /><input value={area} onChange={(event) => setArea(event.target.value)} /></div></label>
              <label>Kiedy?<select value={when} onChange={(event) => setWhen(event.target.value)}><option>Jak najszybciej</option><option>Dzisiaj</option><option>Jutro</option><option>W tym tygodniu</option></select></label>
              <button className="secondary-action" onClick={() => sendMessage(`Szukam: ${specialty}; lokalizacja: ${area}; termin: ${when}.`)}><CalendarClock size={16} /> Zapisz kryteria</button>
              <p className="form-note"><Clock3 size={13} /> To wersja demonstracyjna — nie pokazuje potwierdzonych terminów.</p>
            </div>}
          </div>

          <div className="side-card ride-card">
            <div className="ride-top"><div className="card-icon ride-icon"><Navigation size={18} /></div><span className="card-kicker">KROK 02</span></div>
            <h3>Jak tam dojechać?</h3>
            <p>Gdy wybierzesz placówkę, przejdziemy do ustawienia celu przejazdu.</p>
            <a className="uber-action" href={uberUrl} target="_blank" rel="noreferrer">Otwórz Ubera <span>↗</span></a>
            <div className="ride-note"><Check size={14} /> Otwiera Ubera z lokalizacją Katowice</div>
          </div>

          <div className="bottom-note"><span className="note-symbol">✳</span><p><strong>Bez ściemy.</strong><br />Pokażemy tylko terminy, które uda się potwierdzić w źródle.</p></div>
        </aside>
      </section>
      <footer className="footer"><span>WAZZAAAP.AI <span className="footer-dot">●</span> WERSJA ROBOCZA</span><span>MADE TO GET THINGS DONE.</span></footer>
    </main>
  );
}
