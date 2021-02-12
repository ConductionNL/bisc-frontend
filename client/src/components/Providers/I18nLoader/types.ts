export interface I18nLoaderContextType {
    language?: Languages
    toggleLanguage?: (language: Languages) => void
}

export enum Languages {
    en = 'en',
    nl = 'nl',
}
