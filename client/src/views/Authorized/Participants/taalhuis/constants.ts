import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { routes } from '../../../../routes/routes'

export enum Tabs {
    participants = 'participants',
    registrations = 'registrations',
}

export const tabPaths = {
    [Tabs.participants]: routes.authorized.participants.taalhuis.participants.index,
    [Tabs.registrations]: routes.authorized.participants.taalhuis.registrations.index,
}

export const tabTranslations = {
    [Tabs.participants]: i18n._(t`Deelnemers`),
    [Tabs.registrations]: i18n._(t`Aanmeldingen`),
}

export enum ReadDetailTabs {
    intake = 'Intake',
    registration = 'Aanmelding',
    dossier = 'Dossier',
    learningNeeds = 'Leervragen',
    documents = 'Documenten',
}

export const readDetailTabPaths = {
    [ReadDetailTabs.intake]: '',
    [ReadDetailTabs.registration]: '',
    [ReadDetailTabs.dossier]: '',
    [ReadDetailTabs.learningNeeds]: '',
    [ReadDetailTabs.documents]: '',
}

export const readDetailTabsTranslations = {
    [ReadDetailTabs.intake]: i18n._(t`Intake`),
    [ReadDetailTabs.registration]: i18n._(t`Aanmelding`),
    [ReadDetailTabs.dossier]: i18n._(t`Dossier`),
    [ReadDetailTabs.learningNeeds]: i18n._(t`Leervragen`),
    [ReadDetailTabs.documents]: i18n._(t`Documenten`),
}
