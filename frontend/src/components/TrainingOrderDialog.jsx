import React from 'react';
import {DialogContent, Dialog, DialogTitle, DialogActions} from '@material-ui/core'
import styled from 'styled-components';

// components
import {SubText} from "./StyledText";
import {CountUpButton} from "./Buttons/CountUpButton";
import {CountDownButton} from "./Buttons/CountDownButton";
import {OrderButton} from "./Buttons/OrderButton";

// images
import OrderHeaderImage from '../images/order-header.png'

const OrderHeader = styled.img`
  width: 100%;
  height: 350px;
`;

const DescriptionWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

const CountersWrapper = styled.div`
  margin-right: auto;
  display: flex;
  padding: 0 16px;
`;

const CountItem = styled.div`
  margin: 0 8px;
`

const CountNum = styled.div`
  padding-top: 10px;
`

const OrderTextWrapper = styled.div`
  display: flex;
`;

const OrderButtonTextWrapper = styled.div`
  width: 300px;
`;

const CalorieWrapper = styled.div`
  padding-top: 4px;
`;

export const TrainingOrderDialog = ({
                                        training,
                                        countNumber,
                                        isOpen,
                                        onClose,
                                        onClickCountUp,
                                        onClickCountDown,
                                        onClickOeder,
                                    }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <OrderHeader src={OrderHeaderImage} alt="order header"/>
            <DialogTitle>
                {training.name}
            </DialogTitle>
            <DialogContent>
                <DescriptionWrapper>
                    <SubText>
                        {training.description}
                    </SubText>
                </DescriptionWrapper>
            </DialogContent>
            <DialogActions>
                <CountersWrapper>
                    <CountItem>
                        <CountDownButton
                            onClick={() => onClickCountDown()}
                            // 数量が1以下だったらカウントダウンさせない
                            isDisabled={countNumber <= 1}
                        />
                    </CountItem>
                    <CountItem>
                        <CountUpButton
                            onClick={() => onClickCountUp()}
                            // 数量が20以上だったらカウントアップさせない
                            isDisabled={countNumber >= 20}
                        />
                    </CountItem>
                </CountersWrapper>
                <OrderButton onClick={() => onClickOeder()}>
                    <OrderTextWrapper>
                        {`${countNumber}セットを追加`}
                    </OrderTextWrapper>
                    <CalorieWrapper>
                        {`${countNumber * training.calorie}カロリー`}
                    </CalorieWrapper>
                </OrderButton>
            </DialogActions>
        </Dialog>
    )
}
