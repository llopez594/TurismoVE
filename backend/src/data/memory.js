import bcrypt from "bcryptjs";

export const users = [
    {
        id: 1,
        name: "Administrador TurismoVE",
        email: "admin@turismove.com",
        passwordHash: bcrypt.hashSync("Admin1234", 10),
        role: "admin",
        createdAt: new Date().toISOString()
    }
];

export const categories = [
    {
        id: 1,
        name: "Playas",
        description: "Playas, balnearios y zonas costeras de Venezuela."
    },
    {
        id: 2,
        name: "Sitios históricos",
        description: "Plazas, monumentos, cascos históricos y patrimonio cultural."
    },
    {
        id: 3,
        name: "Restaurantes y comida típica",
        description: "Gastronomía venezolana, restaurantes y experiencias culinarias."
    },
    {
        id: 4,
        name: "Experiencias y actividades",
        description: "Excursiones, paseos guiados, deportes acuáticos y aventura."
    }
];

export const places = [
    {
        id: 1,
        title: "Parque Nacional Canaima",
        description: "Destino turístico natural reconocido por sus tepuyes, saltos de agua y paisajes únicos.",
        location: "Bolívar, Venezuela",
        categoryId: 4,
        type: "lugar",
        ratingAverage: 5,
        status: "approved",
        createdBy: 1,
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Playa El Agua",
        description: "Una de las playas más conocidas de la Isla de Margarita.",
        location: "Nueva Esparta, Venezuela",
        categoryId: 1,
        type: "lugar",
        ratingAverage: 4.7,
        status: "approved",
        createdBy: 1,
        createdAt: new Date().toISOString()
    }
];