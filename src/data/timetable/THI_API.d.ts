type Datum = `${number}${number}.${number}${number}.${number}${number}${number}${number}`;
type Uhrzeit = `${number}${number}.${number}${number}`;
type Rhythmus = `${number}`;
type ID = `${number}`;

type API = {
  issort: boolean;
  start: Date;
  end: Date;
  error: unknown | null;
  events: unknown[];
  events7: unknown[];
  events0: unknown[];
  stgru: Stgru;
  dozenten: Dozenten;
  raeume: Raeume;
  faecherlegende: Faecherlegende;
  hinweise: unknown[];
  termine: Termine;
  mode: "stgru";
};

type StgruItem<K extends ID> = {
  id: K;
  kurzform: string;
  parents: string[];
};

type Stgru = {
  [K in ID]: StgruItem<K>;
};

type Dozent<K extends ID> = {
  id: K;
  kurzform: string;
  vorname: string;
  name: string;
  title: string;
  anzeige: string;
  ausfall: number;
}

type Dozenten = {
  [K in ID]: Dozent<K>;
};

type Raum<K extends ID> = {
  id: K;
  nummer: `${string}${number}`;
}

type Raeume = {
  [K in ID]: Raum<K>;
};


type Fach = {
  "kurzform": string;
  "name": string;
  "ziel": string;
  "inhalt": string;
  "literatur": string;
  "zulassung": string;
  "kommentar": string;
  "medienformen": string;
  "stpltitel": string;
  "stplkurzform": string;
  "showECTS": boolean;
  "ects": ID;
  "sws": ID;
}

type Faecherlegende = {
  [K in ID]: Fach;
};



type Zeit<
  D extends Datum = Datum,
  S extends Uhrzeit = Uhrzeit,
  E extends Uhrzeit = Uhrzeit
> = {
  datum: D;
  zeitvon: S;
  zeitbis: E;
  /** Wochentakt: '7' -> alle 7 Tage */
  rhythmus: Rhythmus,
  status: number,
  dozenten: ID[],
  raeume: ID[],
  bekommentarpublic: string;
  dakommentarpublic: string;
  lvkommentarpublic: string;
  fachkommentarpublic: string;
}

type ZeitKey = `${Datum}_${Uhrzeit}_${Uhrzeit}`;

type ParseZeitKey<K extends ZeitKey> =
  K extends `${infer D}_${infer S}_${infer E}`
    ? Zeit<D, S, E>
    : never;

type Zeiten = {
  [K in ZeitKey]: ParseZeitKey<K>;
}

type Fstgru = {
  stgru:ID;
  fach:ID;
  verantwortlich: boolean;
  fachkurz: string;
  fachname: string;
}

type Termin<LV extends ID,TG extends ID,F extends ID> = {
  lvid:LV;
  tg:TG;
  teilgruppe_anzeige:string;
  kurztitel:string;
  langtitel:string;
  stplkurzform:string;
  stpltitel:string;
  fach_kurzform:string;
  fach_name:string;
  fach_art:string[];
  stgru:ID[];
  dozenten:ID[];
  raeume:ID[];
  changed:Date;
  status:number;
  zeiten:Zeiten;
  kommentar:string;
  kommentarDA:string;
  kommentarFS:string;
  kommentarBE:string;
  fstgru:Fstgru[];
  key: `${LV}_${TG}_${F}`;
  fstgru_id: ID;
}
type ParseTerminKey<K extends TerminKey> =
  K extends `${infer A}_${infer B}_${infer C}`
    ? Termin<A, B, C>
    : never;
type TerminKey = `${ID}_${ID}_${ID}`;
type Termine = {
  [K in TerminKey]: ParseTerminKey<K>;
};