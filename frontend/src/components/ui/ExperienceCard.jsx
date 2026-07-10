import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import styles from "./ExperienceCard.module.css";

export default function ExperienceCard({ experience }) {
    const navigate = useNavigate();

    const image = experience.coverImage || experience.cover_image || null;
    const cost = experience.cost ? `$${Number(experience.cost).toFixed(0)}` : null;
    
    let services = [];
    if (experience.services) {
        if (Array.isArray(experience.services)) {
            services = experience.services;
        } else if (typeof experience.services === "string") {
            try {
                services = JSON.parse(experience.services);
            } catch (e) {
                services = [];
            }
        }
    }

    return (
        <div className={styles["exp-card"]} onClick={() => navigate(`/lugares/${experience.id}`)}>
            <div className={styles["exp-card__image"]}>
                {image ? (
                    <img src={image} alt={experience.title} />
                ) : (
                    <div className={styles["exp-card__placeholder"]} />
                )}
                <div className={styles["exp-card__overlay"]} />
                <div className={styles["exp-card__content"]}>
                    <p className={styles["exp-card__location"]}>
                        <MapPin size={12} /> {experience.location}
                    </p>
                    <h3 className={styles["exp-card__title"]}>{experience.title}</h3>
                    {experience.description && (
                        <p className={styles["exp-card__desc"]}>{experience.description}</p>
                    )}
                    {services.length > 0 && (
                        <div className={styles["exp-card__services"]}>
                            <span className={styles["exp-card__services-label"]}>Recomendaciones:</span>
                            {services.slice(0, 3).map((s, i) => (
                                <span key={i} className={styles["exp-card__service-tag"]}>{s}</span>
                            ))}
                        </div>
                    )}
                    <div className={styles["exp-card__footer"]}>
                        {cost && <span className={styles["exp-card__price"]}>{cost} <small>/persona</small></span>}
                        <span className="badge badge-exp">EXPERIENCIA</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
