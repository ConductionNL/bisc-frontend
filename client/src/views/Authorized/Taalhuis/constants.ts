import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'

export enum Tabs {
    participants = 'participants',
    registrations = 'registrations',
}

export const tabPaths = {
    [Tabs.participants]: taalhuisRoutes.participants.index,
    [Tabs.registrations]: taalhuisRoutes.participants.registrations,
}

export const tabTranslations = {
    [Tabs.participants]: i18n._(t`Deelnemers`),
    [Tabs.registrations]: i18n._(t`Aanmeldingen`),
}

export enum ReadDetailTabs {
    read = 'read',
    registration = 'registration',
    files = 'files',
    goals = 'goals',
    documents = 'documents',
}

export const readDetailTabPaths = (participantId: string) => ({
    [ReadDetailTabs.read]: taalhuisRoutes.participants.detail(participantId).data.index,
    [ReadDetailTabs.registration]: taalhuisRoutes.participants.detail(participantId).data.registration,
    [ReadDetailTabs.files]: taalhuisRoutes.participants.detail(participantId).data.dossier.index,
    [ReadDetailTabs.goals]: taalhuisRoutes.participants.detail(participantId).data.learningNeeds.index,
    [ReadDetailTabs.documents]: taalhuisRoutes.participants.detail(participantId).data.documents,
})

export const readDetailTabsTranslations = {
    [ReadDetailTabs.read]: i18n._(t`Intake`),
    [ReadDetailTabs.registration]: i18n._(t`Aanmelding`),
    [ReadDetailTabs.files]: i18n._(t`Dossier`),
    [ReadDetailTabs.goals]: i18n._(t`Leervragen`),
    [ReadDetailTabs.documents]: i18n._(t`Documenten`),
}
