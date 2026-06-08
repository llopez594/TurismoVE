import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({ value = 0, interactive = false, onChange, size = 24 }) {
    const [hovered, setHovered] = useState(0);
    const display = interactive ? (hovered || value) : value;

    return (
        <div style={{ display: "flex", gap: "4px" }}>
            {[1, 2, 3, 4, 5].map(n => (
                <button
                    key={n}
                    type="button"
                    onClick={() => interactive && onChange && onChange(n)}
                    onMouseEnter={() => interactive && setHovered(n)}
                    onMouseLeave={() => interactive && setHovered(0)}
                    style={{
                        background: "none", border: "none", cursor: interactive ? "pointer" : "default",
                        padding: 0, lineHeight: 1
                    }}
                    disabled={!interactive}
                >
                    <Star
                        size={size}
                        fill={n <= display ? "#F5A623" : "none"}
                        color={n <= display ? "#F5A623" : "#D1D5DB"}
                        strokeWidth={1.5}
                    />
                </button>
            ))}
        </div>
    );
}
