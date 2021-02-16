export const routes = {
    unauthorized: {
        index: '/auth',
        login: `/auth/login`,

        // dev only
        translationsExample: '/translations-example',
        kitchensink: '/kitchensink',
    },
    authorized: {
        index: '/',
        persons: `/persons`,
        addPerson: `/addPerson`,
        addPersonToProgram: `/addPersonToProgram`,
        programs: `/programs`,
        myPrograms: `/myPrograms`,
    },

    // TODO: delete - for design review/check only
}
