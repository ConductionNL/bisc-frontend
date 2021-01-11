import uniqueId from 'lodash/uniqueId'
import { toast, ToastOptions } from 'react-toastify'

import Notifications from '../components/Core/Feedback/Notifications/Notifications'

interface Args {
    title: string
    message: string
    notificationEvent: NotificationEvent
}

export enum NotificationEvent {
    success = 'success',
    warning = 'warning',
    error = 'error',
}

export function notify(args: Args) {
    const toastId = uniqueId()
    const options: ToastOptions = {
        closeButton: false,
        closeOnClick: true,
        draggable: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        toastId,
    }

    toast(Notifications({ ...args }), options)

    setTimeout(() => toast.dismiss(toastId), 3000)
}
