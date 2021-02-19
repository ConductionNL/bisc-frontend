import React, { useState } from 'react'
import { default as ReactModal } from 'react-modal'
import styles from './Modal.module.scss'

interface Props extends ReactModal.Props {
    children: (options: ContextState) => JSX.Element
}
interface ContextState {
    open: boolean
    closeModal: () => void
    openModal: () => void
}
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

export const ModalContext = React.createContext<ContextState>({
    open: false,
    closeModal: () => undefined,
    openModal: () => undefined,
})

const Modal: React.FunctionComponent<Props> = props => {
    const { children } = props
    const [open, setOpen] = useState(false)

    function openModal() {
        console.log('reee')
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    const values = {
        open,
        closeModal: () => closeModal(),
        openModal: () => console.log('reeee'),
    }

    return (
        <ModalContext.Provider value={values}>
            <ReactModal
                onRequestClose={closeModal}
                overlayClassName={styles.overlay}
                className={styles.modal}
                {...props}
            >
                {children(values)}
            </ReactModal>
        </ModalContext.Provider>
    )
}

export default Modal
