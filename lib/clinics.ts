export type Clinic = {
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

export const clinics: Clinic[] = [
  {
    id: "bluemed-brynow",
    name: "BlueMed Clinic — Brynów",
    address: "Świętego Huberta 6, 40-542 Katowice",
    phone: "+48 32 889 89 89",
    specialties: ["Kardiolog", "Neurolog", "Endokrynolog", "Ortopeda", "Laryngolog", "Ginekolog", "Urolog", "Diagnostyka"],
    bookingUrl: "https://www.znanylekarz.pl/placowki/bluemed-clinic-katowice-brynow",
    bookingType: "Kalendarz online",
    sourceLabel: "ZnanyLekarz",
    sourceUrl: "https://www.znanylekarz.pl/placowki/bluemed-clinic-katowice-brynow",
    note: "W profilu placówki dostępna jest rejestracja online i informacje o konsultacjach."
  },
  {
    id: "skin-clinic",
    name: "Centrum Medyczne Skin Clinic",
    address: "Meteorologów 7/7, 40-526 Katowice",
    specialties: ["Dermatolog", "Kardiolog", "Endokrynolog", "Chirurg plastyczny", "Medycyna estetyczna"],
    bookingUrl: "https://www.znanylekarz.pl/placowki/centrum-medyczne-skin-clinic",
    bookingType: "Kalendarz online",
    sourceLabel: "ZnanyLekarz",
    sourceUrl: "https://www.znanylekarz.pl/placowki/centrum-medyczne-skin-clinic",
    note: "Profil placówki prezentuje specjalizacje i aktualny kalendarz rezerwacji."
  },
  {
    id: "you-clinic",
    name: "Centrum Medyczne YOU CLINIC",
    address: "Kłodnicka 10, 40-702 Katowice",
    phone: "+48 880 501 115",
    specialties: ["Lekarz rodzinny", "Internista", "Kardiolog", "Psycholog", "Pediatra", "Fizjoterapeuta", "Diagnostyka"],
    bookingUrl: "https://www.znanylekarz.pl/placowki/centrum-medyczne-you-clinic",
    bookingType: "Kalendarz online",
    sourceLabel: "ZnanyLekarz",
    sourceUrl: "https://www.znanylekarz.pl/placowki/centrum-medyczne-you-clinic",
    note: "Profil obejmuje m.in. medycynę rodzinną i rejestrację wizyt."
  },
  {
    id: "hygge-clinic",
    name: "Hygge Clinic",
    address: "Ignacego Paderewskiego 63, 40-282 Katowice",
    specialties: ["Kardiolog", "Ginekolog", "Położnik", "Diagnostyka", "Lekarz rodzinny"],
    bookingUrl: "https://www.znanylekarz.pl/placowki/hygge-clinic",
    bookingType: "Kalendarz online",
    sourceLabel: "ZnanyLekarz",
    sourceUrl: "https://www.znanylekarz.pl/placowki/hygge-clinic",
    note: "W profilu dostępne są informacje o lekarzach i rezerwacji wizyt."
  },
  {
    id: "instytut-stomatologii",
    name: "Instytut Stomatologii i Medycyny Ogólnej",
    address: "Katowice — Brynów",
    specialties: ["Stomatolog", "Okulista", "Laryngolog", "Psychiatra", "Lekarz rodzinny", "Diagnostyka"],
    bookingUrl: "https://nzozkatowice.pl/",
    bookingType: "Strona placówki",
    sourceLabel: "Oficjalna strona",
    sourceUrl: "https://nzozkatowice.pl/",
    note: "Na stronie placówki znajdziesz ofertę, kontakt i informacje o rejestracji."
  }
];

export const specialties = [
  "Wszystkie",
  "Dermatolog",
  "Stomatolog",
  "Psycholog",
  "Psychiatra",
  "Kardiolog",
  "Ortopeda",
  "Internista",
  "Lekarz rodzinny",
  "Ginekolog",
  "Neurolog",
  "Pediatra",
  "Diagnostyka"
];
