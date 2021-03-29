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
    read = 'read',
    registration = 'registration',
    folder = 'folder',
    goals = 'goals',
    documents = 'documents',
}

export const readDetailTabPaths = {
    [ReadDetailTabs.read]: routes.authorized.participants.taalhuis.participants.detail.intake.read,
    [ReadDetailTabs.registration]: routes.authorized.participants.taalhuis.participants.detail.registration.index,
    [ReadDetailTabs.folder]: routes.authorized.participants.taalhuis.participants.detail.folder.index,
    [ReadDetailTabs.goals]: routes.authorized.participants.taalhuis.participants.detail.goals.index,
    [ReadDetailTabs.documents]: routes.authorized.participants.taalhuis.participants.detail.documents.index,
}

export const readDetailTabsTranslations = {
    [ReadDetailTabs.read]: i18n._(t`Intake`),
    [ReadDetailTabs.registration]: i18n._(t`Aanmelding`),
    [ReadDetailTabs.folder]: i18n._(t`Dossier`),
    [ReadDetailTabs.goals]: i18n._(t`Leervragen`),
    [ReadDetailTabs.documents]: i18n._(t`Documenten`),
}
