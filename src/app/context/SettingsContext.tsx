import React, { createContext, useContext, useEffect, useState } from 'react';
import { settingsApi } from '../services/api';

export interface ServiceItem {
  name: string;
  description: string;
  features: string[];
}

interface ContactInfo { phone: string; email: string; address: string; }
interface SocialInfo  { instagramUrl: string; tiktokUrl: string; facebookUrl: string; }

interface PublicSettings {
  contact: ContactInfo;
  social: SocialInfo;
  services: ServiceItem[];
}

const DEFAULT_SERVICES: ServiceItem[] = [
  { name: "Planification financière",    description: "Une stratégie financière complète et personnalisée pour atteindre vos objectifs de vie.", features: ["Analyse de votre situation financière","Plan financier personnalisé","Optimisation fiscale","Suivis réguliers"] },
  { name: "Solutions d'assurance",       description: "Protégez ce qui compte le plus. Vie, invalidité, maladies graves, assurance hypothécaire.", features: ["Assurance vie","Assurance invalidité","Maladies graves","Assurance hypothécaire"] },
  { name: "Stratégies d'investissement", description: "Faites fructifier votre patrimoine avec des stratégies éprouvées. REER, CELI, fonds communs.", features: ["Portefeuille diversifié","REER & CELI","Fonds communs de placement","Gestion du risque"] },
  { name: "Planification retraite",      description: "Commencez tôt, vivez sereinement. Nous bâtissons votre plan de retraite sur mesure.", features: ["Projection de retraite","REER et optimisation","Revenu de retraite stable","Transfert de patrimoine"] },
  { name: "Protection du patrimoine",    description: "Préservez le fruit de votre travail avec des stratégies successorales adaptées.", features: ["Planification successorale","Stratégies testamentaires","Protection des actifs","Transmission d'héritage"] },
  { name: "Analyse des besoins financiers", description: "Nous analysons votre situation pour identifier vos besoins réels et bâtir une stratégie sur mesure.", features: ["REEE pour les enfants","Épargne pour l'achat immobilier","Compte épargne libre d'impôt","Fonds d'urgence"] },
];

const DEFAULT: PublicSettings = {
  contact:     { phone: '+1 (438) 504-5033', email: 'jordan.beaulieu@agc.ia.ca', address: "7400, Boul. Les Galeries d'Anjou, Bureau 650, Montréal (Québec), H1M 3M2" },
  social:      { instagramUrl: 'https://instagram.com/financeaveejord', tiktokUrl: 'https://tiktok.com/@financeaveejord', facebookUrl: 'https://facebook.com/financeaveejord' },
  services:    DEFAULT_SERVICES,
};

const SettingsContext = createContext<PublicSettings>(DEFAULT);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<PublicSettings>(DEFAULT);

  useEffect(() => {
    settingsApi.getPublic().then(data => {
      // Normalise: handle old string[] or new object[] from API
      const rawServices: any[] = data.services || [];
      const services: ServiceItem[] = rawServices.map(s =>
        typeof s === 'string'
          ? { name: s, description: '', features: [] }
          : { name: s.name || '', description: s.description || '', features: s.features || [] }
      );
      setSettings({
        contact:     { ...DEFAULT.contact,  ...(data.contact  || {}) },
        social:      { ...DEFAULT.social,   ...(data.social   || {}) },
        services:    services.length ? services : DEFAULT_SERVICES,
      });
    }).catch(() => {});
  }, []);

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}

export function usePublicSettings() {
  return useContext(SettingsContext);
}
