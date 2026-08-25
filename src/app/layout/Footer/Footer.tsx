import Link from "next/link";

import { CONTACT_LINKS } from "@entities/contacts";
import { LEGAL_DOCUMENTS } from "@entities/legal";
import { getMenuItemHref, MENU_ITEMS } from "@entities/navigation";
import { SOCIAL_LINKS } from "@entities/social";
import { OpenLeadButton } from "@features/leads";

import { Container, Logo, SocialLinks, Typography } from "@shared/ui";

import styles from "./Footer.module.scss";

const FOOTER_META_LINKS = LEGAL_DOCUMENTS.map((document) => ({
    title: document.menuTitle,
    href: document.href,
}));

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.shell}>
                <Container className={styles.container}>
                    <div className={styles.cta}>
                        <div className={styles.ctaContent}>
                            <span className={styles.eyebrow}>Федерация воркаута Забайкальского края</span>
                            <Typography variant="h2" tone="inverse" className={styles.title}>
                                Вступай в движение. Тренируйся, выступай, становись сильнее.
                            </Typography>
                        </div>
                        <OpenLeadButton tone="light" className={styles.ctaButton}>
                            Записаться
                        </OpenLeadButton>
                    </div>

                    <div className={styles.main}>
                        <div className={styles.brand}>
                            <Logo className={styles.logo} />
                            <Typography variant="body" tone="inverse" className={styles.description}>
                                Развиваем воркаут в регионе: тренировки, соревнования, события и комьюнити для тех, кто
                                выбирает силу, дисциплину и движение.
                            </Typography>
                            <SocialLinks links={SOCIAL_LINKS} className={styles.socials} />
                        </div>

                        <nav className={styles.navigation} aria-label="Навигация в подвале">
                            <span className={styles.columnTitle}>Разделы</span>
                            <ul className={styles.links}>
                                {MENU_ITEMS.map((item) => (
                                    <li key={item.title}>
                                        <Link href={getMenuItemHref(item)} className={styles.link}>
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className={styles.contacts}>
                            <span className={styles.columnTitle}>Контакты</span>
                            <ul className={styles.contactList}>
                                {CONTACT_LINKS.map((item) => (
                                    <li key={item.id} className={styles.contactItem}>
                                        <span className={styles.contactLabel}>{item.label}</span>
                                        <Link href={item.href} className={styles.contactLink}>
                                            {item.value}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={styles.bottom}>
                        <span className={styles.copyright}>© {currentYear} Федерация воркаута Забайкальского края</span>
                        <ul className={styles.metaLinks}>
                            {FOOTER_META_LINKS.map((item) => (
                                <li key={item.title}>
                                    <Link href={item.href} className={styles.metaLink}>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.decorationWord} aria-hidden>
                        <svg
                            viewBox="0 0 1497 175"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMinYMid meet"
                        >
                            <path
                                d="M1305.03 41.888V3.58398H1496.77L1305.03 41.888ZM1496.77 3.58398V42.112H1424.64V169.344H1378.05V42.112H1305.03V3.58398H1496.77Z"
                                fill="currentColor"
                            />
                            <path
                                d="M1249.57 3.58398H1297.06V89.824C1297.06 105.952 1292.73 120.437 1284.07 133.28C1275.41 146.123 1263.69 156.128 1248.9 163.296C1234.12 170.464 1217.69 174.048 1199.62 174.048C1180.95 174.048 1163.86 170.464 1148.33 163.296C1132.79 156.128 1120.47 146.197 1111.37 133.504C1102.26 120.661 1097.63 106.176 1097.48 90.048V3.58398H1145.64V90.72C1145.64 101.472 1148.47 110.208 1154.15 116.928C1159.97 123.499 1166.99 128.203 1175.21 131.04C1183.42 133.877 1191.63 135.296 1199.85 135.296C1207.16 135.296 1214.63 133.877 1222.25 131.04C1229.86 128.203 1236.28 123.499 1241.51 116.928C1246.89 110.208 1249.57 101.472 1249.57 90.72V3.58398Z"
                                fill="currentColor"
                            />
                            <path
                                d="M985.894 0C1005.9 0 1023.9 3.808 1039.88 11.424C1055.86 18.8907 1068.4 29.2693 1077.51 42.56C1086.62 55.7013 1091.17 70.56 1091.17 87.136C1091.17 103.563 1086.62 118.347 1077.51 131.488C1068.4 144.629 1055.86 155.008 1039.88 162.624C1023.9 170.091 1005.9 173.824 985.894 173.824C966.63 173.824 948.859 170.091 932.582 162.624C916.454 155.008 903.611 144.629 894.054 131.488C884.497 118.197 879.718 103.413 879.718 87.136C879.718 70.7093 884.422 55.8507 893.83 42.56C903.387 29.2693 916.305 18.8907 932.582 11.424C948.859 3.808 966.63 0 985.894 0ZM985.894 137.312C995.601 137.312 1004.78 135.371 1013.45 131.488C1022.11 127.456 1029.13 121.707 1034.5 114.24C1039.88 106.624 1042.57 97.5893 1042.57 87.136C1042.57 76.832 1039.88 67.872 1034.5 60.256C1029.13 52.4907 1022.11 46.592 1013.45 42.56C1004.78 38.528 995.601 36.512 985.894 36.512C975.889 36.512 966.481 38.528 957.67 42.56C949.009 46.4427 942.065 52.192 936.838 59.808C931.611 67.424 928.998 76.384 928.998 86.688C928.998 97.1413 931.611 106.251 936.838 114.016C942.214 121.632 949.233 127.456 957.894 131.488C966.705 135.371 976.038 137.312 985.894 137.312Z"
                                fill="currentColor"
                            />
                            <path
                                d="M819.033 79.52L916.249 169.344H855.993L780.729 96.992V169.344H734.361V3.58398H780.729V63.84L851.961 3.58398H912.889L819.033 79.52Z"
                                fill="currentColor"
                            />
                            <path
                                d="M671.514 169.12L625.594 115.584H578.778V169.12H533.978V3.35986H655.162C669.05 3.35986 681.295 5.67453 691.898 10.3039C702.65 14.9332 710.938 21.4292 716.762 29.7919C722.735 38.0052 725.722 47.5625 725.722 58.4639V59.3599C725.722 73.5465 721.54 85.2692 713.178 94.5279C704.964 103.787 693.54 109.984 678.906 113.12L727.066 169.12H671.514ZM680.698 59.8079C680.698 52.6399 679.279 47.4132 676.442 44.1279C673.604 40.8425 669.946 38.8265 665.466 38.0799C660.986 37.3332 654.639 36.9599 646.426 36.9599C642.842 36.9599 639.78 37.0345 637.242 37.1839C624.996 37.4825 605.508 37.6319 578.778 37.6319V81.3119H646.202H646.426C654.639 81.3119 660.986 81.0132 665.466 80.4159C669.946 79.6692 673.604 77.7279 676.442 74.5919C679.279 71.4559 680.698 66.5279 680.698 59.8079Z"
                                fill="currentColor"
                            />
                            <path
                                d="M421.274 0C441.285 0 459.279 3.808 475.258 11.424C491.237 18.8907 503.781 29.2693 512.89 42.56C521.999 55.7013 526.554 70.56 526.554 87.136C526.554 103.563 521.999 118.347 512.89 131.488C503.781 144.629 491.237 155.008 475.258 162.624C459.279 170.091 441.285 173.824 421.274 173.824C402.01 173.824 384.239 170.091 367.962 162.624C351.834 155.008 338.991 144.629 329.434 131.488C319.877 118.197 315.098 103.413 315.098 87.136C315.098 70.7093 319.802 55.8507 329.21 42.56C338.767 29.2693 351.685 18.8907 367.962 11.424C384.239 3.808 402.01 0 421.274 0ZM421.274 137.312C430.981 137.312 440.165 135.371 448.826 131.488C457.487 127.456 464.506 121.707 469.882 114.24C475.258 106.624 477.946 97.5893 477.946 87.136C477.946 76.832 475.258 67.872 469.882 60.256C464.506 52.4907 457.487 46.592 448.826 42.56C440.165 38.528 430.981 36.512 421.274 36.512C411.269 36.512 401.861 38.528 393.05 42.56C384.389 46.4427 377.445 52.192 372.218 59.808C366.991 67.424 364.378 76.384 364.378 86.688C364.378 97.1413 366.991 106.251 372.218 114.016C377.594 121.632 384.613 127.456 393.274 131.488C402.085 135.371 411.418 137.312 421.274 137.312Z"
                                fill="currentColor"
                            />
                            <path
                                d="M230.496 113.12L286.72 3.58398H334.88L249.76 169.344H201.6L167.776 68.992L134.4 169.344H86.24L0 3.58398H49.28L105.728 113.344L143.584 3.58398H192.864L230.496 113.12Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </Container>
            </div>
        </footer>
    );
};
