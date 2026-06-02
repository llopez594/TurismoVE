import { useEffect, useState } from "react";
import api, { unwrapResponse } from "../../services/api";
import ExperienceCard from "../ui/ExperienceCard";

export default function RecommendedExperiences() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/places?type=actividad&limit=2")
            .then(res => {
                const data = unwrapResponse(res.data);
                setExperiences(data.data || []);
            })
            .catch(() => setExperiences([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <section style={{ padding: "40px 0", display: "flex", justifyContent: "center" }}>
            <div className="spinner" />
        </section>
    );

    if (experiences.length === 0) return null;

    return (
        <section className="rec-exp">
            <h2 className="rec-exp__title">Experiencias Recomendadas</h2>
            <div className="rec-exp__grid">
                {experiences.map(exp => (
                    <ExperienceCard key={exp.id} experience={exp} />
                ))}
            </div>

            <style>{`
                .rec-exp { padding: 40px 0; }
                .rec-exp__title { font-size: var(--font-size-xl); font-weight: 700; color: var(--color-text); margin-bottom: 24px; }
                .rec-exp__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
                @media (max-width: 700px) { .rec-exp__grid { grid-template-columns: 1fr; } }
            `}</style>
        </section>
    );
}
