export enum Event {
    success = 'success',
    warning = 'warning',
    error = 'error',
}

export declare module Notification {
    interface Parameters {
        id: string
        type: string
        title: string
        message: string
        timeout: number
        dismiss: () => void
    }

    interface Options {
        wait?: number
        timeout?: number
        onClick?: (notification: Parameters) => void
    }
}
