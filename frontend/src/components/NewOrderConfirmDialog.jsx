import React from "react";

// components
import {DialogContent, Dialog, DialogTitle} from '@material-ui/core';
import {OrderButton} from './Buttons/OrderButton';

export const NewOrderConfirmDialog = ({
                                          isOpen,
                                          onClose,
                                          existingExerciseName, // 他エクササイズの名前
                                          newExerciseName, // 現在選択したエクササイズの名前
                                          onClickSubmit, // 仮メニューの置き換えAPI
                                      }) => (
    <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="xs"
    >
        <DialogTitle>
            新規作成を開始しますか？
        </DialogTitle>
        <DialogContent>
            <p>
                新しくエクササイズを選択してトレーニングメニューを追加して下さい。
            </p>
            <OrderButton>
                新規作成
            </OrderButton>
        </DialogContent>
    </Dialog>
)