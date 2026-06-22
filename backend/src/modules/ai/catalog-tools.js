import { Op } from "sequelize";
import { Category, Place } from "../../models/index.js";

const MAX_RESULTS = 8;
const LOCATION_SCOPES = {
    "puerto ordaz": {
        primary: ["Puerto Ordaz", "Ciudad Guayana"],
        fallback: ["Estado Bolívar", "Bolívar"],
        fallbackLabel: "el estado Bolívar"
    },
    "ciudad guayana": {
        primary: ["Ciudad Guayana", "Puerto Ordaz"],
        fallback: ["Estado Bolívar", "Bolívar"],
        fallbackLabel: "el estado Bolívar"
    },
    "llano": {
        primary: ["Apure", "Barinas", "Guárico", "Portuguesa", "Cojedes"],
        interpretedLabel: "los Llanos venezolanos",
        defaultCategory: "Aventura"
    },
    "llano de venezuela": {
        primary: ["Apure", "Barinas", "Guárico", "Portuguesa", "Cojedes"],
        interpretedLabel: "los Llanos venezolanos",
        defaultCategory: "Aventura"
    },
    "llanos": {
        primary: ["Apure", "Barinas", "Guárico", "Portuguesa", "Cojedes"],
        interpretedLabel: "los Llanos venezolanos",
        defaultCategory: "Aventura"
    },
    "llanos de venezuela": {
        primary: ["Apure", "Barinas", "Guárico", "Portuguesa", "Cojedes"],
        interpretedLabel: "los Llanos venezolanos",
        defaultCategory: "Aventura"
    },
    "llanos venezolanos": {
        primary: ["Apure", "Barinas", "Guárico", "Portuguesa", "Cojedes"],
        interpretedLabel: "los Llanos venezolanos",
        defaultCategory: "Aventura"
    }
};

export const CATALOG_TOOLS = [
    {
        type: "function",
        function: {
            name: "buscar_lugares",
            description: "Busca lugares y actividades aprobados que existen actualmente en el catálogo de TurismoVE. Úsala antes de recomendar destinos o afirmar que un lugar está disponible en la plataforma.",
            parameters: {
                type: "object",
                properties: {
                    categoria: {
                        type: "string",
                        description: "Nombre de una categoría disponible, por ejemplo Playas, Montañas, Ciudades, Aventura, Cultura, Gastronomía, Vida nocturna o Compras."
                    },
                    ubicacion: {
                        type: "string",
                        description: "Estado, ciudad o zona solicitada por el usuario."
                    },
                    tipo: {
                        type: "string",
                        enum: ["lugar", "actividad"],
                        description: "Tipo de elemento solicitado."
                    },
                    busqueda: {
                        type: "string",
                        description: "Nombre, característica o palabra clave adicional para buscar en el catálogo."
                    },
                    limite: {
                        type: "integer",
                        minimum: 1,
                        maximum: MAX_RESULTS,
                        description: "Cantidad máxima de resultados."
                    },
                    excluir_ids: {
                        type: "array",
                        items: { type: "integer" },
                        description: "IDs de lugares que no deben repetirse en los resultados."
                    }
                },
                additionalProperties: false
            }
        }
    }
];

function cleanText(value) {
    return typeof value === "string" ? value.trim().slice(0, 100) : "";
}

function normalizeText(value) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function resolveLocationScope(location) {
    const normalized = normalizeText(location)
        .replace(/^(?:el|los|las)\s+/, "");

    return LOCATION_SCOPES[normalized] ?? {
        primary: [location],
        interpretedLabel: null
    };
}

function buildLocationFilter(terms) {
    return {
        [Op.or]: terms.flatMap((term) => [
            { location: { [Op.like]: `%${term}%` } },
            { address: { [Op.like]: `%${term}%` } }
        ])
    };
}

function searchIsMentioned(search, message) {
    const genericTerms = new Set(["parque", "lugar", "sitio", "actividad"]);
    const relevantTerms = normalizeText(search)
        .split(/\s+/)
        .filter((term) => term.length >= 4 && !genericTerms.has(term));
    const normalizedMessage = normalizeText(message);

    return relevantTerms.some((term) => normalizedMessage.includes(term));
}

function filterIsMentioned(value, message) {
    const normalizedValue = normalizeText(value).replace(/s$/, "");
    return normalizeText(message).includes(normalizedValue);
}

function parseServices(services) {
    if (Array.isArray(services)) return services;
    if (!services || typeof services !== "string") return [];

    try {
        const parsed = JSON.parse(services);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export async function getCategoriesContext() {
    const categories = await Category.findAll({
        attributes: ["name"],
        order: [["id", "ASC"]]
    });

    if (!categories.length) {
        return "La plataforma no tiene categorías registradas actualmente.";
    }

    const names = categories.map((category) => category.name);

    return `Categorías disponibles actualmente en TurismoVE: ${names.join(", ")}.`;
}

export async function executeCatalogTool(toolCall, options = {}) {
    if (toolCall.function.name !== "buscar_lugares") {
        return JSON.stringify({ error: "Herramienta no disponible." });
    }

    let args = {};

    try {
        args = JSON.parse(toolCall.function.arguments || "{}");
    } catch {
        return JSON.stringify({ error: "Los filtros de búsqueda no son válidos." });
    }

    const currentMessage = options.currentMessage || "";
    const previousLocation = cleanText(options.defaults?.ubicacion);
    const location = cleanText(args.ubicacion || previousLocation);
    const locationScope = location ? resolveLocationScope(location) : null;
    const locationChanged = Boolean(
        args.ubicacion
        && previousLocation
        && normalizeText(args.ubicacion) !== normalizeText(previousLocation)
    );
    const requestedCategory = locationChanged
        && args.categoria
        && !filterIsMentioned(args.categoria, currentMessage)
        ? null
        : args.categoria;
    const category = cleanText(
        requestedCategory
        || (!locationChanged ? options.defaults?.categoria : null)
        || locationScope?.defaultCategory
    );
    let search = cleanText(args.busqueda);

    if (
        locationChanged
        && search
        && !searchIsMentioned(search, currentMessage)
    ) {
        search = "";
    }
    const requestedType = locationChanged
        && args.tipo
        && !filterIsMentioned(args.tipo, currentMessage)
        ? null
        : args.tipo || (!locationChanged ? options.defaults?.tipo : null);
    const type = ["lugar", "actividad"].includes(requestedType) ? requestedType : null;
    const limit = Math.min(Math.max(Number(args.limite) || 5, 1), MAX_RESULTS);
    const excludeIds = [...(args.excluir_ids ?? []), ...(options.excludeIds ?? [])]
        .map(Number)
        .filter((id) => Number.isInteger(id) && id > 0);
    const where = { status: "approved" };
    const filters = [];
    let searchFilter = null;
    let locationFilter = null;

    if (type) where.type = type;
    if (excludeIds.length) where.id = { [Op.notIn]: [...new Set(excludeIds)] };

    if (location) {
        locationFilter = buildLocationFilter(locationScope.primary);
        filters.push(locationFilter);
    }

    if (search) {
        const searchTokens = search
            .split(/\s+/)
            .filter((token) => token.length >= 3)
            .slice(0, 5);
        const terms = searchTokens.length ? searchTokens : [search];

        searchFilter = {
            [Op.and]: terms.map((term) => ({
                [Op.or]: [
                    { title: { [Op.like]: `%${term}%` } },
                    { description: { [Op.like]: `%${term}%` } },
                    { location: { [Op.like]: `%${term}%` } },
                    { address: { [Op.like]: `%${term}%` } }
                ]
            }))
        };
        filters.push(searchFilter);
    }

    if (filters.length) where[Op.and] = filters;

    const findPlaces = () => Place.findAll({
        where,
        attributes: [
            "id",
            "title",
            "description",
            "location",
            "address",
            "type",
            "cost",
            "checkIn",
            "checkOut",
            "services",
            "ratingAverage"
        ],
        include: [
            {
                model: Category,
                as: "category",
                attributes: ["id", "name"],
                ...(category
                    ? { where: { name: { [Op.like]: `%${category}%` } }, required: true }
                    : {})
            }
        ],
        order: [
            ["ratingAverage", "DESC"],
            ["title", "ASC"]
        ],
        limit
    });

    let places = await findPlaces();
    let expandedSearch = false;
    let expandedLocation = false;

    if (!places.length && searchFilter && options.allowExpandedSearch) {
        const broaderFilters = filters.filter((filter) => filter !== searchFilter);

        if (broaderFilters.length) {
            where[Op.and] = broaderFilters;
        } else {
            delete where[Op.and];
        }

        places = await findPlaces();
        expandedSearch = true;
    }

    if (!places.length && locationFilter && locationScope.fallback?.length) {
        const broaderLocationFilter = buildLocationFilter(locationScope.fallback);
        const locationIndex = filters.indexOf(locationFilter);

        filters[locationIndex] = broaderLocationFilter;
        locationFilter = broaderLocationFilter;
        where[Op.and] = filters;
        places = await findPlaces();
        expandedLocation = true;
    }

    const results = places.map((place) => {
        const item = place.get({ plain: true });

        return {
            id: item.id,
            titulo: item.title,
            descripcion: item.description,
            ubicacion: item.location,
            direccion: item.address,
            tipo: item.type,
            categoria: item.category?.name ?? null,
            puntuacion: Number(item.ratingAverage),
            costo: item.cost === null ? null : Number(item.cost),
            horario: item.checkIn || item.checkOut
                ? { entrada: item.checkIn, salida: item.checkOut }
                : null,
            servicios: parseServices(item.services)
        };
    });

    return JSON.stringify({
        total: results.length,
        busqueda_ampliada: expandedSearch,
        ubicacion_interpretada: locationScope?.interpretedLabel ?? null,
        ubicacion_ampliada: expandedLocation
            ? locationScope.fallbackLabel
            : null,
        nota: expandedSearch
            ? "No hubo coincidencias literales con la preferencia indicada; se conservaron los demás filtros. No afirmes que los resultados cumplen esa preferencia sin evidencia en sus datos."
            : expandedLocation
                ? `No hubo resultados exactos en ${location}; se amplió la búsqueda a ${locationScope.fallbackLabel}. Aclara que las opciones no necesariamente están dentro de ${location}.`
                : locationScope?.interpretedLabel
                    ? `La ubicación solicitada se interpretó como ${locationScope.interpretedLabel}.`
                    : null,
        filtros: {
            categoria: category || null,
            ubicacion: location || null,
            tipo: type,
            busqueda: search || null,
            excluir_ids: [...new Set(excludeIds)]
        },
        resultados: results
    });
}
