import Headline from 'components/Chrome/Headline'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {}

export const PublicRegistrationView: React.FunctionComponent<Props> = () => {
    // const { i18n } = useLingui()
    // const history = useHistory()

    return (
        <>
            <Headline title={'Hallo?'} />
        </>
    )
}
