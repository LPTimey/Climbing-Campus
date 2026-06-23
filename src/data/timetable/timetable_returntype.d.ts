export type Welcome = {
  issort: boolean;
  start: string;
  end: string;
  error: null;
  events: Array<EventElement[]>;
  events7: Array<EventElement[]>;
  events0: Array<EventElement[]>;
  stgru: Stgru;
  dozenten: { [key: string]: Dozenten };
  raeume: { [key: string]: Raeume };
  faecherlegende: { [key: string]: Faecherlegende };
  hinweise: any[];
  termine: Termine;
  mode: "stgru";
};

export type Dozenten = {
  id: string;
  kurzform: string;
  vorname: string;
  name: string;
  titel: string;
  anzeige: string;
  ausfall: number;
};

export type EventElement = EventClass | number | string;

export type EventClass = {
  kommentar: string;
  datum: string;
  zeitvon: string;
  zeitbis: string;
  rhythmus: string;
  teilgruppe: string;
  teilgruppe_anzeige: TeilgruppeAnzeige;
  lv_id: string;
  erstertermin: boolean;
  fach_id: string;
  fach_kurzform: FachKurzformEnum;
  fach_name: string;
  dozenten: string;
  stgru: "UXD6";
  raeume: string;
  stgru_kurzform: "UXD6";
  stgru_name: null;
  hinweise: string;
  status: number;
  stpltitel: string;
  stplkurzform: string;
  show_ausfall: boolean;
  b_kommentarpublic: FachKurzform;
  stg_id: string;
  orga_id: string;
  da_kommentarpublic: string;
  key: Key;
  fach_art: string[];
  titles: string[];
  modus: "stgru";
  title_zusatz: string;
};

export enum FachKurzform {
  Empty = "",
  TeamStudieSDUTHrRöthlingshöfer = "Team-Studie SDUT (Hr. Röthlingshöfer)",
}

export enum FachKurzformEnum {
  IRaumreservierung = "I-Raumreservierung",
  TeamStudieSDUTHrRöthlingshöfer = "Team-Studie SDUT (Hr. Röthlingshöfer)",
  UxdBddFw = "UXD_BDD_FW",
  UxdDfFw = "UXD_DF_FW",
  UxdFWS = "UXD_FWS",
  UxdImk = "UXD_IMK",
  UxdImkSpo2016W = "UXD_IMK_SPO2016W",
  UxdIv = "UXD_IV",
  UxdMpigFw = "UXD_MPIG_FW",
  UxdPR = "UXD_PR",
  UxdPlv2 = "UXD_PLV2",
  UxdSdut = "UXD_SDUT",
  UxdSmwa = "UXD_SMWA",
  UxdVar = "UXD_VAR",
  UxdVarp = "UXD_VARP",
  UxdVcuxFw = "UXD_VCUX_FW",
}

export enum Key {
  The74226_10_3800 = "74226_10_3800",
  The74226_20_3800 = "74226_20_3800",
  The74226_40_3800 = "74226_40_3800",
  The74226_50_3800 = "74226_50_3800",
  The74230_1_3859 = "74230_1_3859",
  The74230_2_3859 = "74230_2_3859",
  The74230_3_3859 = "74230_3_3859",
  The74232_0_3863 = "74232_0_3863",
  The74233_0_3871 = "74233_0_3871",
  The74234_0_5998 = "74234_0_5998",
  The74245_1_6544 = "74245_1_6544",
  The74245_2_6544 = "74245_2_6544",
  The74245_3_6544 = "74245_3_6544",
  The74246_0_6589 = "74246_0_6589",
  The74247_3_3760 = "74247_3_3760",
  The74247_3_6590 = "74247_3_6590",
  The74248_0_6591 = "74248_0_6591",
  The74249_0_6649 = "74249_0_6649",
  The74251_0_9022 = "74251_0_9022",
  The74252_0_9522 = "74252_0_9522",
  The74258_13_3800 = "74258_13_3800",
  The74870_0_10069 = "74870_0_10069",
  The76498_0_6495 = "76498_0_6495",
}

export enum TeilgruppeAnzeige {
  Empty = "",
  The1 = ".1 ",
  The10 = ".10 ",
  The13 = ".13 ",
  The2 = ".2 ",
  The20 = ".20 ",
  The3 = ".3 ",
  The40 = ".40 ",
  The50 = ".50 ",
}

export type Faecherlegende = {
  kurzform: FachKurzformEnum;
  name: string;
  ziel: string;
  inhalt: string;
  literatur: string;
  zulassung: string;
  kommentar: string;
  medienformen: string;
  stpltitel: string;
  stplkurzform: string;
  showECTS: boolean;
  ects: string;
  sws: string;
};

export type Raeume = {
  id: string;
  nummer: string;
};

export type Stgru = {
  "539": The539;
};

export type The539 = {
  id: string;
  kurzform: "UXD6";
  parents: string[];
};

export type Termine = {
  "74246_0_6589": The74232_0_3863;
  "74226_50_3800": The742;
  "74251_0_9022": The74232_0_3863;
  "74248_0_6591": The74232_0_3863;
  "74226_10_3800": The742;
  "74245_3_6544": The742;
  "74233_0_3871": The74232_0_3863;
  "74258_13_3800": The742;
  "74226_40_3800": The742;
  "74226_20_3800": The742;
  "76498_0_6495": The76498_0_6495;
  "74245_2_6544": The742;
  "74234_0_5998": The74232_0_3863;
  "74230_3_3859": The742;
  "74230_2_3859": The742;
  "74230_1_3859": The742;
  "74247_3_6590": The742;
  "74247_3_3760": The742;
  "74232_0_3863": The74232_0_3863;
  "74245_1_6544": The742;
  "74870_0_10069": The74232_0_3863;
  "74252_0_9522": The74232_0_3863;
  "74249_0_6649": The74232_0_3863;
};

export type The742 = {
  lvid: string;
  tg: string;
  teilgruppe_anzeige: TeilgruppeAnzeige;
  kurztitel: string;
  langtitel: string;
  stplkurzform: string;
  stpltitel: string;
  fach_kurzform: FachKurzformEnum;
  fach_name: string;
  fach_art: string[];
  stgru: string[];
  dozenten: string[];
  raeume: string[];
  changed: string;
  status: number;
  zeiten: { [key: string]: ZeitenValue };
  kommentar: string;
  kommentarDA: string;
  kommentarFS: string;
  kommentarBE: string;
  fstgru: Fstgru[];
  key: Key;
  fstgru_id: string;
};

export type Fstgru = {
  stgru: string;
  fach: string;
  verantwortlich: boolean;
  fachkurz: FachKurzformEnum;
  fachname: string;
};

export type ZeitenValue = {
  datum: string;
  zeitvon: string;
  zeitbis: string;
  rhythmus: string;
  status: number;
  dozenten: string[];
  raeume: string[];
  bekommentarpublic: FachKurzform;
  dakommentarpublic: string;
  lvkommentarpublic: string;
  fachkommentarpublic: string;
};

export type The74232_0_3863 = {
  lvid: string;
  tg: string;
  teilgruppe_anzeige: string;
  kurztitel: FachKurzformEnum;
  langtitel: string;
  stplkurzform: string;
  stpltitel: string;
  fach_kurzform: FachKurzformEnum;
  fach_name: string;
  fach_art: string[];
  stgru: string[];
  dozenten: string[];
  raeume: string[];
  changed: string;
  status: number;
  zeiten: { [key: string]: ZeitenValue };
  kommentar: string;
  kommentarDA: string;
  kommentarFS: string;
  kommentarBE: string;
  fstgru: Fstgru[];
  key: Key;
  fstgru_id: string;
};

export type The76498_0_6495 = {
  lvid: string;
  tg: string;
  teilgruppe_anzeige: string;
  kurztitel: FachKurzform;
  langtitel: string;
  stplkurzform: string;
  stpltitel: string;
  fach_kurzform: FachKurzform;
  fach_name: string;
  fach_art: string[];
  stgru: string[];
  dozenten: string[];
  raeume: string[];
  changed: string;
  status: number;
  zeiten: The76498_0_6495_Zeiten;
  kommentar: string;
  kommentarDA: string;
  kommentarFS: string;
  kommentarBE: FachKurzform;
  fstgru: Fstgru[];
  key: Key;
  fstgru_id: string;
};

export type The76498_0_6495_Zeiten = {
  "19.05.2026_18.00_20.00": ZeitenValue;
};
