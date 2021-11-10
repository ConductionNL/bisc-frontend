const { ENVIRONMENT = {} } = window as any

export const env = {
    apiUrl: ENVIRONMENT.API_URL || '/',
}
