export enum EventDetailTypes {
    finalInterview = 'finalInterview',
    comment = 'comment',
    followUp = 'folowUp',
    storytelling = 'storytelling',
    intake = 'intake',
}

interface Props {
    type: EventDetailTypes
}

// export const EventDetail: React.FC<Props> = ({ type }) => {
//     const containerClassNames = classNames(styles.container, {
//         [styles.finalInterview]: type === EventDetailTypes.finalInterview,
//         [styles.comment]: type === EventDetailTypes.comment,
//         [styles.followUp]: type === EventDetailTypes.followUp,
//         [styles.storytelling]: type === EventDetailTypes.storytelling,
//         [styles.intake]: type === EventDetailTypes.intake,
//     })
//     return (
//         <div className={containerClassNames}>
//             <div className={styles.border} />
//             <div className={styles.contentContainer}>
//                 <div className={styles.titleContainer}>
//                     <SectionTitle title={'Vervolggesprek'} />
//                     <Paragraph className={styles.subtitle}>27 januari 2021 • Suzanne Boelsma</Paragraph>
//                 </div>
//                 <div className={styles.descriptionContainer}>
//                     <Column spacing={4}>
//                         <Paragraph className={styles.sectionTitle}>Omschrijving</Paragraph>
//                         <Paragraph>
//                             Proin imperdiet mauris eget gravida faucibus. In sed venenatis elit. Praesent viverra
//                             eleifend quam quis mattis. Duis vitae volutpat lorem, ac eleifend nunc. Praesent quis tellus
//                             ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed
//                             molestie ex, non efficitur dolor.
//                         </Paragraph>
//                         <Paragraph className={styles.sectionTitle}>Checklist</Paragraph>
//                         <div className={styles.containerList}>
//                             <ul>
//                                 <li>Welk aanbod volg je?</li>
//                                 <li>Past het aanbod bij wat je wil leren?</li>
//                                 <li>Ben je tevreden over wat je leert?</li>
//                                 <li>Gebruik je wat je leert al in je dagelijks leven?</li>
//                                 <li>Zou je wat anders willen leren?</li>
//                             </ul>
//                         </div>
//                     </Column>
//                 </div>
//             </div>
//         </div>
//     )
// }
