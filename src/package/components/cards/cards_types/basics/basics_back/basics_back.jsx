import React, { useMemo } from 'react';

import { createUseStyles } from 'react-jss';
import { FormattedMessage, useIntl } from 'react-intl';

import { ProfileCardAnimatedBack } from '../../../../commons/profile_card/profile_card_animated_back/profile_card_animated_back';
import { ProfileCardSectionTitle } from '../../../../commons/profile_card/profile_card_section_title/profile_card_section_title';
import { ProfileCardSectionText } from '../../../../commons/profile_card/profile_card_section_text/profile_card_section_text';
import { ProfileCardSection } from '../../../../commons/profile_card/profile_card_section/profile_card_section';
import { ContractType } from '../../../../commons/fields/contract_types/contract_types';

import { existsAndNotEmpty } from '../../../utils/exists_and_not_empty';

import { translations } from '../../../../../utils/enums/job_serachstate/job_search_state_translations';
import { styles } from './basics_back_styles';

const useStyles = createUseStyles(styles);

const BasicsBackComponent = ({ data }) => {
    const classes = useStyles();

    const {
        currentCity: { name: currentCityName },
        experienceYears,
        contractTypes,
        studiesLevel,
        codingYears,
        codingReason,
        searchState,
        visaSponsorship,
        personalDescription
    } = data;

    const sections = useMemo(
        () => ({
            visaSponsorship: {
                hide: !existsAndNotEmpty(visaSponsorship),
                value: (
                    <span className={classes.bold}>
                        <FormattedMessage
                            id="Basics.Back.VisaSponsorship"
                            defaultMessage="I require a visa sponsorship"
                        />
                    </span>
                )
            },
            work: {
                title: <FormattedMessage id="Basics.Back.Work.Title" defaultMessage="Work" />,
                hide: (!experienceYears && !existsAndNotEmpty(contractTypes) && !existsAndNotEmpty(searchState)),
                value: (
                    <>
                        <FormattedMessage
                            id="Basics.Back.Work"
                            defaultMessage={'{experienceYears} years of experience'}
                            values={{ experienceYears }}
                        />
                        <br />
                        <ContractType contractTypes={contractTypes} />
                        <br />
                        <JobSearchState searchState={searchState} />
                    </>
                )
            },
            studies: {
                title: <FormattedMessage id="Basics.Back.StudiesLevel.Title" defaultMessage="Training" />,
                hide: !studiesLevel,
                value: (
                    <FormattedMessage
                        id="Basics.Back.StudiesLevel"
                        defaultMessage={'{studiesLevel} years of higher education'}
                        values={{ studiesLevel }}
                    />
                )
            },
            codingYears: {
                title: <FormattedMessage id="Basics.Back.CodingYears.title" defaultMessage="Experience" />,
                hide: !personalDescription,
                value: (
                    <FormattedMessage
                        id="Basics.Back.CodingYears.value"
                        defaultMessage={'{codingYears} years coding'}
                        values={{ codingYears }}
                    />
                )
            },
            personalDescription: {
                title: (
                    <FormattedMessage id="Basics.Back.PersonalDescription" defaultMessage="A bit more about me : " />
                ),
                hide: !personalDescription,
                value: <span>{personalDescription}</span>
            }
        }),
        [
            currentCityName,
            experienceYears,
            contractTypes,
            studiesLevel,
            codingYears,
            codingReason,
            visaSponsorship,
            personalDescription,
            searchState
        ]
    );

    console.log({ personalDescription });

    return (
        <ProfileCardAnimatedBack title="Who ?">
            {Object.entries(sections)
                .filter(([, { hide }]) => !hide)
                .map(([id, { title, value }]) => (
                    <ProfileCardSection key={id}>
                        {title && <ProfileCardSectionTitle>{title}</ProfileCardSectionTitle>}
                        <ProfileCardSectionText>{value}</ProfileCardSectionText>
                    </ProfileCardSection>
                ))}
        </ProfileCardAnimatedBack>
    );
};

const JobSearchState = ({ searchState }) => {
    const { formatMessage } = useIntl();
    if (!searchState) {
        return null;
    }
    return <span>{formatMessage(translations[searchState] || translations.unknown)}</span>;
};

export const BasicsBack = BasicsBackComponent;
