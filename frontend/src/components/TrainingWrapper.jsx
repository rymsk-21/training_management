import React from 'react';
import styled from 'styled-components';

// components
import {SubText} from './StyledText';

// constants
import {COLORS} from '../style_constants';

const Wrapper = styled.div`
  display: flex;
  width: 450px;
  height: 180px;
  border-width: 1px;
  border-style: solid;
  border-color: ${COLORS.BORDER};
  border-image: initial;
  cursor: pointer;
`;

const TrainingDetail = styled.div`
  padding: 24px 16px;
  width: 250px;
`;

const DescriptionWrapper = styled.div`
  height: 75px;
`

const CalorieWrapper = styled.div`
  margin-top: 16px;
`

const TrainingImageNode = styled.img`
  width: 250px;
`;

export const TrainingWrapper = ({
                                    training,
                                    onClickTrainingWrapper,
                                    imageUrl,
                                }) => (
    <Wrapper onClick={() => onClickTrainingWrapper(training)}>
        <TrainingDetail>
            {training.name}
            <DescriptionWrapper>
                <SubText>
                    {training.description}
                </SubText>
            </DescriptionWrapper>
            <CalorieWrapper>
                {training.calorie}kcal
            </CalorieWrapper>
        </TrainingDetail>
        <TrainingImageNode src={imageUrl}/>
    </Wrapper>
)
