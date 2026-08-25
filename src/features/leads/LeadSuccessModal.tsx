"use client";

import { Button, Modal } from "@shared/ui";

import styles from "./LeadSuccessModal.module.scss";

type LeadSuccessModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const LeadSuccessModal = ({ isOpen, onClose }: LeadSuccessModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            align="center"
            title="Заявка ушла"
            description="Свяжемся в ближайшее время и расскажем, с чего начать."
            panelClassName={styles.panel}
        >
            <Button type="button" tone="dark" className={styles.closeButton} onClick={onClose}>
                Закрыть
            </Button>
        </Modal>
    );
};
