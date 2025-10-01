import templateConfig from '../../template.config.json';

export interface PortfolioConfig {
  personal: {
    name: string;
    title: string;
    description: string;
    email: string;
    location: string;
    availability: string;
    branding: string;
  };
  professional: {
    yearsOfExperience: number;
    bio: string;
    personalBio: string;
    focus: string;
    interests: string;
  };
  social: {
    github: string;
    linkedin: string;
    discord: string | null;
    whatsapp: string | null;
    resumeUrl: string;
  };
  api?: {
    baseUrl: string;
  };
}

// Load configuration from template.config.json
export const config: PortfolioConfig = templateConfig as PortfolioConfig;

// Helper functions to get specific configuration values
export const getPersonalInfo = () => config.personal;
export const getProfessionalInfo = () => config.professional;
export const getSocialLinks = () => config.social;
export const getApiConfig = () => config.api;
