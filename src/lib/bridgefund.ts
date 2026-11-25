export type Module = { id: string; name: string; weeks: number; kes: number };
export type Profession = { id: string; title: string; competencies: string[]; modules: (Module & { covers: string })[] };

export const USD_RATE = 129;
export const PROFESSIONS: Profession[] = [
  { id: "nurse", title: "Registered Nurse", competencies: ["Patient assessment & vitals", "Medication administration", "Wound care & dressing", "IV cannulation", "Infection prevention", "Maternal & child health"],
    modules: [
      { id: "n1", name: "Kenya Nursing Council Ethics & Law", weeks: 2, kes: 6500, covers: "" },
      { id: "n2", name: "Local Pharmacology Formulary", weeks: 3, kes: 8200, covers: "Medication administration" },
      { id: "n3", name: "KNC Licensure Bridging Exam", weeks: 1, kes: 12000, covers: "" },
    ] },
  { id: "solar", title: "Solar PV Technician", competencies: ["PV panel mounting", "Battery bank wiring", "Charge controller setup", "Load calculation", "Working at heights", "Customer system handover"],
    modules: [
      { id: "s1", name: "Local Electrical Code (EPRA)", weeks: 2, kes: 7500, covers: "" },
      { id: "s2", name: "Solar PV Class T3 Licence Exam", weeks: 1, kes: 9800, covers: "" },
      { id: "s3", name: "Occupational Safety & First Aid", weeks: 1, kes: 4200, covers: "Working at heights" },
    ] },
  { id: "civil", title: "Civil Engineer", competencies: ["Structural analysis", "AutoCAD / Civil 3D drafting", "Site supervision", "Concrete mix design", "Bill of quantities", "Road & drainage design"],
    modules: [
      { id: "c1", name: "Kenya Building Code & Eurocodes", weeks: 3, kes: 11000, covers: "" },
      { id: "c2", name: "EBK Professional Practice Exam", weeks: 2, kes: 15000, covers: "" },
      { id: "c3", name: "NEMA Environmental Impact Basics", weeks: 1, kes: 5500, covers: "" },
    ] },
];

export const SAMPLES = [
  { label: "Foreign-Trained Nurse (Kenya)", name: "Amina Wanjiru", profession: "nurse", years: 6, country: "Uganda", skills: ["Patient assessment & vitals", "Medication administration", "Wound care & dressing", "IV cannulation", "Infection prevention"] },
  { label: "Self-Taught Solar Technician", name: "Brian Otieno", profession: "solar", years: 4, country: "Self-taught (YouTube & apprenticeship)", skills: ["PV panel mounting", "Battery bank wiring", "Charge controller setup", "Load calculation", "Customer system handover"] },
  { label: "Displaced Civil Engineer", name: "Yusuf Abdi", profession: "civil", years: 9, country: "Somalia", skills: ["Structural analysis", "AutoCAD / Civil 3D drafting", "Site supervision", "Concrete mix design", "Bill of quantities", "Road & drainage design"] },
];

export type Voucher = { code: string; candidate: string; module: string; kes: number; phone: string; receipt: string; at: number };

export const SEED_VOUCHERS: Voucher[] = [
  { code: "BF-7Q2K-91", candidate: "Grace Mutua", module: "KNC Licensure Bridging Exam", kes: 12000, phone: "0712***845", receipt: "SKL4H2J9PA", at: Date.now() - 36e5 * 3 },
  { code: "BF-3MZP-44", candidate: "Peter Kamau", module: "Local Electrical Code (EPRA)", kes: 7500, phone: "0722***301", receipt: "SKK8Q1M3ZT", at: Date.now() - 36e5 * 20 },
  { code: "BF-9XTR-07", candidate: "Halima Noor", module: "EBK Professional Practice Exam", kes: 15000, phone: "0790***118", receipt: "SKJ2W7N5LB", at: Date.now() - 36e5 * 46 },
];

export function readiness(p: Profession, skills: string[], funded: string[]) {
  const total = p.competencies.length + p.modules.length;
  const done = p.competencies.filter((c) => skills.includes(c)).length + p.modules.filter((m) => funded.includes(m.id)).length;
  return Math.round((done / total) * 100);
}

export const rand = (n: number) => Array.from({ length: n }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join("");
export const usd = (kes: number) => (kes / USD_RATE).toFixed(0);
