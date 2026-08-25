"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import Link from "next/link";

import { MAX_LEAD_COMMENT_LENGTH, MAX_LEAD_NAME_LENGTH } from "@entities/leads";
import { LEGAL_HREFS } from "@entities/legal";
import { submitLead } from "@features/leads/submitLead";
import { Button, Checkbox, Input, Modal, Textarea, Typography } from "@shared/ui";

import styles from "./LeadModal.module.scss";

type LeadModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
};

type FormErrors = {
    name?: string;
    phone?: string;
    consent?: string;
    form?: string;
};

type FormStatus = "idle" | "submitting" | "error";

const countDigits = (value: string) => value.replace(/\D/g, "").length;

export const LeadModal = ({ isOpen, onClose, onSuccess }: LeadModalProps) => {
    const formId = useId();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [comment, setComment] = useState("");
    const [consent, setConsent] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<FormStatus>("idle");

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        setName("");
        setPhone("");
        setComment("");
        setConsent(false);
        setErrors({});
        setStatus("idle");
    }, [isOpen]);

    const validate = (): FormErrors => {
        const nextErrors: FormErrors = {};
        const trimmedName = name.trim();
        const trimmedPhone = phone.trim();

        if (!trimmedName) {
            nextErrors.name = "Укажите имя";
        } else if (trimmedName.length > MAX_LEAD_NAME_LENGTH) {
            nextErrors.name = "Слишком длинное имя";
        }

        const digits = countDigits(trimmedPhone);

        if (!trimmedPhone) {
            nextErrors.phone = "Укажите телефон";
        } else if (digits < 10 || digits > 15) {
            nextErrors.phone = "Проверьте номер телефона";
        }

        if (!consent) {
            nextErrors.consent = "Нужно согласие на обработку данных";
        }

        return nextErrors;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors = validate();
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        setStatus("submitting");

        const result = await submitLead({
            name: name.trim(),
            phone: phone.trim(),
            comment: comment.trim() || undefined,
        });

        if (!result.ok) {
            setStatus("error");
            setErrors({ form: "Не удалось отправить. Попробуйте ещё раз." });
            return;
        }

        onSuccess();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Запись на тренировку"
            description="Оставьте контакты — перезвоним и подберём группу."
            panelClassName={styles.panel}
        >
            <form id={formId} className={styles.form} onSubmit={handleSubmit} noValidate>
                <Input
                    id={`${formId}-name`}
                    label="Имя"
                    name="name"
                    autoComplete="name"
                    placeholder="Как к вам обращаться"
                    value={name}
                    maxLength={MAX_LEAD_NAME_LENGTH}
                    error={errors.name}
                    onChange={(event) => setName(event.target.value)}
                />

                <Input
                    id={`${formId}-phone`}
                    label="Телефон"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="8 (914) 497 94-71"
                    value={phone}
                    error={errors.phone}
                    onChange={(event) => setPhone(event.target.value)}
                />

                <Textarea
                    id={`${formId}-comment`}
                    label="Комментарий"
                    name="comment"
                    placeholder="Удобное время, опыт, вопросы"
                    value={comment}
                    maxLength={MAX_LEAD_COMMENT_LENGTH}
                    rows={4}
                    onChange={(event) => setComment(event.target.value)}
                />

                <Checkbox
                    id={`${formId}-consent`}
                    name="consent"
                    checked={consent}
                    error={errors.consent}
                    onChange={(event) => setConsent(event.target.checked)}
                    label={
                        <>
                            Согласен с{" "}
                            <Link
                                href={LEGAL_HREFS.privacyPolicy}
                                className={styles.policyLink}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onClose();
                                }}
                            >
                                политикой конфиденциальности
                            </Link>{" "}
                            и{" "}
                            <Link
                                href={LEGAL_HREFS.personalData}
                                className={styles.policyLink}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onClose();
                                }}
                            >
                                обработкой персональных данных
                            </Link>
                        </>
                    }
                />

                {errors.form ? (
                    <Typography as="p" variant="caption" className={styles.formError} role="alert">
                        {errors.form}
                    </Typography>
                ) : null}

                <Button
                    type="submit"
                    tone="dark"
                    className={styles.submit}
                    isLoading={status === "submitting"}
                    disabled={status === "submitting"}
                >
                    {status === "submitting" ? "Отправляем…" : "Отправить заявку"}
                </Button>
            </form>
        </Modal>
    );
};
