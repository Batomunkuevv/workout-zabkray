import { Typograph } from "../Typograph";

const tags = ["Воркаут", "Паркур", "Стритлифтинг"];

export const HeroHomepage = () => {
    return (
        <section className="pt-[24px] px-[24px]">
            <div className="pt-[161px] pb-[29px] bg-g-black rounded-24 text-t-white">
                <div className="container">
                    <h1 className="h1 mb-[16px]">
                        <Typograph html="ФЕДЕРАЦИЯ ВОРКАУТА ЗАБАЙКАЛЬСКОГО КРАЯ" />
                    </h1>
                    <p className="mb-[32px] max-w-[744px] text-large">
                        <Typograph
                            html="Зал воркаута и паркура с продуманной системой тренировок – научим подтягиваться, делать элементы и развивать силу на любом уровне
                            подготовки"
                        />
                    </p>
                    <ul className="flex gap-[8px]">
                        {tags.map((tag, i) => (
                            <li
                                key={i}
                                className="
                                py-[10px] px-[24px] h-[48px] flex items-center justify-center bg-g-gray rounded-12 text-large text-center relative last:after:hidden
                                after:content-[''] after:absolute after:top-[50%] after:left-[calc(100%-8px)] after:w-[24px] after:h-[24px] after:translate-y-[-50%] after:bg-[url('/images/icons/star-white-24x24.svg')] after:z-[1]
                                "
                            >
                                {tag}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
