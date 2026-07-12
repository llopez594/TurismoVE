"use strict";

// npx sequelize-cli db:seed --seed 20260603000001-seed-tourism-ve-catalog.cjs

const categories = [
    {
        "id": 1,
        "name": "Playas",
        "description": "Playas, islas, cayos, balnearios y zonas costeras de Venezuela."
    },
    {
        "id": 2,
        "name": "Montañas",
        "description": "Andes, tepuyes, parques de montaña, miradores naturales y paisajes de altura."
    },
    {
        "id": 3,
        "name": "Ciudades",
        "description": "Ciudades, pueblos turísticos, paseos urbanos, plazas y espacios para recorrer."
    },
    {
        "id": 4,
        "name": "Aventura",
        "description": "Excursiones, senderismo, navegación, buceo, kayak, safari y deportes al aire libre."
    },
    {
        "id": 5,
        "name": "Cultura",
        "description": "Patrimonio histórico, museos, monumentos, arquitectura, tradiciones y lugares emblemáticos."
    },
    {
        "id": 6,
        "name": "Gastronomía",
        "description": "Mercados, rutas gastronómicas, comida típica, cacao, café, dulces y sabores locales."
    },
    {
        "id": 7,
        "name": "Vida nocturna",
        "description": "Zonas nocturnas, malecones, terrazas, bares, restaurantes y entretenimiento al caer la noche."
    },
    {
        "id": 8,
        "name": "Compras",
        "description": "Centros comerciales, mercados artesanales, bulevares, ferias y compras turísticas."
    }
];

const places = [
    {
        "title": "Archipiélago de Los Roques",
        "description": "Conjunto de islas y cayos de aguas claras, ideal para descanso, fotografía, navegación y experiencias de playa caribeña.",
        "location": "Dependencias Federales",
        "type": "lugar",
        "cover_image": "https://viajes-indigo.com/uploads/0000/9/2025/12/22/coche.jpg",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 1,
        "cost": null,
        "address": "Dependencias Federales",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Gran Roque",
        "description": "Poblado principal de Los Roques, punto de llegada para excursiones a cayos, posadas, muelle y paseos costeros.",
        "location": "Archipiélago de Los Roques",
        "type": "lugar",
        "cover_image": "https://posadamacondo.com/wp-content/uploads/2020/05/los-roques-arcipelago-village-venezuela-gran-roque-posada-macondo-by-air-posadamacondo.jpg",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 1,
        "cost": null,
        "address": "Archipiélago de Los Roques",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Cayo de Agua",
        "description": "Cayo famoso por sus bancos de arena, aguas turquesas y paisajes abiertos para fotografía y caminatas suaves.",
        "location": "Archipiélago de Los Roques",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Cayo_de_Agua%2C_Archipi%C3%A9lago_de_Los_Roques%2C_Venezuela.jpg",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 1,
        "cost": null,
        "address": "Archipiélago de Los Roques",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Cayo Crasquí",
        "description": "Isla de arena blanca y ambiente tranquilo, recomendada para pasar el día, nadar y disfrutar vistas marinas.",
        "location": "Archipiélago de Los Roques",
        "type": "lugar",
        "cover_image": "https://losroques360.com/wp-content/uploads/2022/02/DJI_0263-3-scaled.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 1,
        "cost": null,
        "address": "Archipiélago de Los Roques",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Cayo Madrisquí",
        "description": "Cayo cercano a Gran Roque, muy usado para visitas de día, actividades acuáticas y descanso familiar.",
        "location": "Archipiélago de Los Roques",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/f/f7/Madrisqui.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 1,
        "cost": null,
        "address": "Archipiélago de Los Roques",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Cayo Francisquí",
        "description": "Cayo popular por sus aguas calmadas, servicios turísticos de playa y cercanía al poblado principal.",
        "location": "Archipiélago de Los Roques",
        "type": "lugar",
        "cover_image": "https://i.pinimg.com/736x/6c/97/65/6c97657427499452cd662979fcdc90a5.jpg",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 1,
        "cost": null,
        "address": "Archipiélago de Los Roques",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Cayo Sombrero",
        "description": "Uno de los cayos más visitados de Morrocoy, con arena clara, palmeras y aguas tranquilas para bañarse.",
        "location": "Parque Nacional Morrocoy, Falcón",
        "type": "lugar",
        "cover_image": "https://deguantasoy.com/wp-content/uploads/2023/05/cayo-sobrero-2.jpg",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 1,
        "cost": null,
        "address": "Parque Nacional Morrocoy, Falcón",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Cayo Sal",
        "description": "Cayo de ambiente caribeño dentro de Morrocoy, recomendado para paseos en lancha y un día de playa.",
        "location": "Parque Nacional Morrocoy, Falcón",
        "type": "lugar",
        "cover_image": "https://media-cdn.tripadvisor.com/media/photo-s/0f/2a/86/03/cayo-sal-morrocoy.jpg",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 1,
        "cost": null,
        "address": "Parque Nacional Morrocoy, Falcón",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Cayo Muerto",
        "description": "Cayo cercano a Chichiriviche, apropiado para familias, descanso costero y recorridos cortos en embarcación.",
        "location": "Parque Nacional Morrocoy, Falcón",
        "type": "lugar",
        "cover_image": "https://i.ytimg.com/vi/Zlu1jTAZnbw/maxresdefault.jpg",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 1,
        "cost": null,
        "address": "Parque Nacional Morrocoy, Falcón",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Cayo Paiclás",
        "description": "Cayo de aguas bajas y paisaje abierto, ideal para relajarse y tomar fotografías del entorno marino.",
        "location": "Parque Nacional Morrocoy, Falcón",
        "type": "lugar",
        "cover_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7aRnXYzgAZfn7p35bjE-Oih-ugFKOtu9zg&s",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 1,
        "cost": null,
        "address": "Parque Nacional Morrocoy, Falcón",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Los Juanes",
        "description": "Zona de bancos de arena y agua cristalina dentro de Morrocoy, conocida para paseos en lancha y baño recreativo.",
        "location": "Parque Nacional Morrocoy, Falcón",
        "type": "lugar",
        "cover_image": "https://i.pinimg.com/736x/f1/29/5c/f1295c4c29c56fd0bcbec530035487e6.jpg",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 1,
        "cost": null,
        "address": "Parque Nacional Morrocoy, Falcón",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Chichiriviche",
        "description": "Pueblo costero usado como entrada a varios cayos de Morrocoy, con muelles, posadas y servicios turísticos.",
        "location": "Municipio Monseñor Iturriza, Falcón",
        "type": "lugar",
        "cover_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ6EAm4ZodOajBNQj1Cmkp7Vz4iWkinf9qgA&s",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 1,
        "cost": null,
        "address": "Municipio Monseñor Iturriza, Falcón",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Tucacas",
        "description": "Ciudad costera y punto de salida hacia los cayos de Morrocoy, con marina, hospedajes y comercios turísticos.",
        "location": "Municipio Silva, Falcón",
        "type": "lugar",
        "cover_image": "https://t4.ftcdn.net/jpg/04/96/28/35/360_F_496283589_P1GzkpQVyhW7sePBcSe40Z73PCCt32XM.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 1,
        "cost": null,
        "address": "Municipio Silva, Falcón",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Playa El Agua",
        "description": "Playa extensa de arena clara y oleaje caribeño, una de las zonas más conocidas de Margarita.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://i.ytimg.com/vi/a4BPJ6dxn-0/maxresdefault.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 1,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Playa Parguito",
        "description": "Playa amplia con ambiente juvenil, oleaje frecuente y servicios para visitantes en la isla de Margarita.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/b9/bf/bc/vista-desde-el-morro.jpg?w=1200&h=-1&s=1",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 1,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Playa El Yaque",
        "description": "Playa reconocida por el viento constante, ambiente deportivo y actividades acuáticas como windsurf y kitesurf.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://casamayaelyaque.com/wp-content/uploads/2021/10/Playa-El-Yaque-000a-Isla-Margarita-Venezuela-Casa-Maya-Hostel-Hostal_50.webp",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 1,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Playa Caribe",
        "description": "Bahía de paisaje abierto, atardeceres llamativos y ambiente tranquilo para visitas de playa.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMh6OpnrxXAiC4ka8SjKlIXX-cvbE8P321Ng&s",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 1,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Playa Punta Arenas",
        "description": "Playa ubicada al oeste de Margarita, apreciada por su ambiente tranquilo, arena suave y vistas abiertas.",
        "location": "Península de Macanao, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/f/f4/Punta_Arenas.jpg",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 1,
        "cost": null,
        "address": "Península de Macanao, Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Playa La Galera",
        "description": "Playa cercana a Juan Griego, conocida por sus atardeceres y ambiente costero relajado.",
        "location": "Juan Griego, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://www.turismoregiondemurcia.es/webs/murciaturistica/fotos/1/playas/recurso-1-624-3p_g.jpg",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 1,
        "cost": null,
        "address": "Juan Griego, Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Isla de Coche",
        "description": "Isla cercana a Margarita con playas amplias, clima seco y actividades de descanso frente al mar.",
        "location": "Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://www.felizviaje.com/wp-content/uploads/2020/08/coche4.jpg",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 1,
        "cost": null,
        "address": "Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Playa La Punta",
        "description": "Playa emblemática de Coche, recomendada para caminatas, descanso y actividades náuticas ligeras.",
        "location": "Isla de Coche, Nueva Esparta",
        "type": "lugar",
        "cover_image": "Playa La Punta",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 1,
        "cost": null,
        "address": "Isla de Coche, Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Isla Cubagua",
        "description": "Isla histórica y árida con playas tranquilas, ruinas coloniales y paisajes marinos poco urbanizados.",
        "location": "Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/2/29/El_Faro_de_Isla_de_cubagua.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 1,
        "cost": null,
        "address": "Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Parque Nacional Mochima",
        "description": "Área costera con islas, playas, montañas frente al mar y rutas en lancha entre Anzoátegui y Sucre.",
        "location": "Anzoátegui y Sucre",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/4/44/Parque_Nacional_mochima.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 1,
        "cost": null,
        "address": "Anzoátegui y Sucre",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Playa Colorada",
        "description": "Playa de arena rojiza y ambiente familiar, cercana al Parque Nacional Mochima y a rutas costeras del oriente.",
        "location": "Estado Sucre",
        "type": "lugar",
        "cover_image": "https://www.noticias24hrs.com.ve/wp-content/uploads/2025/08/colorada-8-edited.jpg",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 1,
        "cost": null,
        "address": "Estado Sucre",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Isla Arapo",
        "description": "Isla de aguas claras dentro de Mochima, ideal para paseos marítimos, baño y fotografía.",
        "location": "Parque Nacional Mochima, Sucre",
        "type": "lugar",
        "cover_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMpS22ymzOo1Aw6XWhVyqctIG8RM9fMJQirw&s",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 1,
        "cost": null,
        "address": "Parque Nacional Mochima, Sucre",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Isla La Borracha",
        "description": "Isla del entorno de Mochima, apreciada por sus paisajes marinos y recorridos en embarcación.",
        "location": "Parque Nacional Mochima, Anzoátegui",
        "type": "lugar",
        "cover_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi-ikpn07Bx3lGxp3cRXl_ch9MqJuoMZ4ZBg&s",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 1,
        "cost": null,
        "address": "Parque Nacional Mochima, Anzoátegui",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Playa Medina",
        "description": "Playa de palmeras, arena clara y ambiente natural en la Península de Paria.",
        "location": "Península de Paria, Sucre",
        "type": "lugar",
        "cover_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM-iyOmrfBshyIZt37KtJJ7NdEXsJ_dmFpiA&s",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 1,
        "cost": null,
        "address": "Península de Paria, Sucre",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Playa Pui Puy",
        "description": "Playa amplia y tranquila del oriente venezolano, con paisaje tropical y ambiente menos masivo.",
        "location": "Península de Paria, Sucre",
        "type": "lugar",
        "cover_image": "https://i.ytimg.com/vi/ZXSEwXk22yw/maxresdefault.jpg",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 1,
        "cost": null,
        "address": "Península de Paria, Sucre",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Playa Uva",
        "description": "Playa de ambiente natural en Paria, recomendada para descanso, fotografía y contacto con comunidades costeras.",
        "location": "Península de Paria, Sucre",
        "type": "lugar",
        "cover_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNI6KuIgRN4OJE-pb1kauQwTt0qmmV05u4-Q&s",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 1,
        "cost": null,
        "address": "Península de Paria, Sucre",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Playa Querepare",
        "description": "Zona costera de Paria con paisaje tropical y tradición local ligada a la naturaleza marina.",
        "location": "Península de Paria, Sucre",
        "type": "lugar",
        "cover_image": "https://www.tuplaya.com/noticias/playaquerepare.jpg",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 1,
        "cost": null,
        "address": "Península de Paria, Sucre",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Choroní - Playa Grande",
        "description": "Playa de referencia en la costa de Aragua, rodeada de montaña, tradición costeña y ambiente turístico.",
        "location": "Choroní, Aragua",
        "type": "lugar",
        "cover_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Hy062Wg0bA-DicMkviQfcSrN1gVIhgGAUg&s",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 1,
        "cost": null,
        "address": "Choroní, Aragua",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Bahía de Cata",
        "description": "Bahía amplia, popular entre visitantes de Aragua, con paisaje de costa y servicios de playa.",
        "location": "Ocumare de la Costa, Aragua",
        "type": "lugar",
        "cover_image": "https://mmedia.eluniversal.com/20186/bahia-de-cata-172748.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 1,
        "cost": null,
        "address": "Ocumare de la Costa, Aragua",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Cuyagua",
        "description": "Playa de oleaje fuerte, ambiente natural y tradición surfista en la costa aragüeña.",
        "location": "Costa de Aragua",
        "type": "lugar",
        "cover_image": "https://i.ytimg.com/vi/2hRUx3YH2lU/maxresdefault.jpg",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 1,
        "cost": null,
        "address": "Costa de Aragua",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Cepe",
        "description": "Playa accesible por vía marítima desde Choroní, rodeada de vegetación y aguas caribeñas.",
        "location": "Costa de Aragua",
        "type": "lugar",
        "cover_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3zgUuUKi9H8HA2hWeecUaDEdyJ1K8l6tQGA&s",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 1,
        "cost": null,
        "address": "Costa de Aragua",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Puerto Cruz",
        "description": "Playa y pueblo costero con ambiente tranquilo, posadas y paisaje de litoral central.",
        "location": "Estado La Guaira",
        "type": "lugar",
        "cover_image": "https://deguantasoy.com/wp-content/uploads/2022/06/paseo-colon-de-puerto-la-cruz.jpg",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 1,
        "cost": null,
        "address": "Estado La Guaira",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Los Caracas",
        "description": "Zona costera cercana a Caracas, utilizada para escapadas de playa, surf y actividades al aire libre.",
        "location": "Estado La Guaira",
        "type": "lugar",
        "cover_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8zN46ClUIohXroeipBekO7z0otEDq13_y8A&s",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 1,
        "cost": null,
        "address": "Estado La Guaira",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Adícora",
        "description": "Pueblo costero de viento constante, playas amplias y ambiente ideal para deportes acuáticos.",
        "location": "Península de Paraguaná, Falcón",
        "type": "lugar",
        "cover_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQuQ-q0HbAlEIYDdWj3ktEhltvourV4kt44Q&s",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 1,
        "cost": null,
        "address": "Península de Paraguaná, Falcón",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "La Tortuga",
        "description": "Isla de aguas claras y playas extensas, valorada por su paisaje poco intervenido y naturaleza marina.",
        "location": "Dependencias Federales",
        "type": "lugar",
        "cover_image": "https://costadevenezuela.com/2022/12/01/isla-la-tortuga-2/tortuga-island-2/",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 1,
        "cost": null,
        "address": "Dependencias Federales",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "La Blanquilla",
        "description": "Isla caribeña de aguas transparentes, playas claras y entorno natural de gran atractivo visual.",
        "location": "Dependencias Federales",
        "type": "lugar",
        "cover_image": "https://pbs.twimg.com/media/CzPvpCCWgAAtH8A.jpg",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 1,
        "cost": null,
        "address": "Dependencias Federales",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Laguna de La Restinga",
        "description": "Parque nacional con manglares, canales navegables y salida a playa extensa en Margarita.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtO8qLURFl9HGjfekPuHN6jALKPLzJcwoBgA&s",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 1,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Fotografía",
            "Zona de baño",
            "Paseos en lancha",
            "Paisaje natural"
        ]
    },
    {
        "title": "Pico Bolívar",
        "description": "La cumbre más emblemática de Venezuela, ubicada en los Andes y rodeada de paisajes de alta montaña.",
        "location": "Sierra Nevada de Mérida",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/0/0f/PicoBolivar2.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 2,
        "cost": null,
        "address": "Sierra Nevada de Mérida",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Pico Espejo",
        "description": "Punto alto de la Sierra Nevada asociado al sistema teleférico, con vistas andinas y clima frío de montaña.",
        "location": "Mérida",
        "type": "lugar",
        "cover_image": "https://i.pinimg.com/564x/22/83/23/2283238e91fef096e93bcfa2e22c4dc8.jpg",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 2,
        "cost": null,
        "address": "Mérida",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Parque Nacional Sierra Nevada",
        "description": "Área andina protegida con picos, lagunas, páramos y rutas de montaña de gran valor paisajístico.",
        "location": "Mérida y Barinas",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Bol%C3%ADvar_usgs.jpg",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 2,
        "cost": null,
        "address": "Mérida y Barinas",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Parque Nacional Sierra de La Culata",
        "description": "Parque de páramos, lagunas y pueblos andinos, ideal para rutas de naturaleza y fotografía.",
        "location": "Estado Mérida",
        "type": "lugar",
        "cover_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkHP_yySy-QVYaWzbTeAqZgQlh4JSfxc7sGA&s",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 2,
        "cost": null,
        "address": "Estado Mérida",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Laguna de Mucubají",
        "description": "Laguna andina de fácil acceso, rodeada de páramo, frailejones y paisajes fríos.",
        "location": "Páramo merideño, Mérida",
        "type": "lugar",
        "cover_image": "https://i.ytimg.com/vi/YbWP585lWGw/maxresdefault.jpg",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 2,
        "cost": null,
        "address": "Páramo merideño, Mérida",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Laguna Negra",
        "description": "Laguna de montaña visitada mediante caminatas desde el entorno de Mucubají.",
        "location": "Parque Nacional Sierra Nevada, Mérida",
        "type": "lugar",
        "cover_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpm75Bn_mxvQ3svNjjJbVY6e33VOl6H2ZSAQ&s",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 2,
        "cost": null,
        "address": "Parque Nacional Sierra Nevada, Mérida",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Collado del Cóndor",
        "description": "Paso de altura en los Andes venezolanos, conocido por sus vistas, clima frío y tradición paramera.",
        "location": "Carretera Trasandina, Mérida",
        "type": "lugar",
        "cover_image": "https://i.pinimg.com/736x/40/df/0d/40df0d6c3619e7b6725660ac0a03be3e.jpg",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 2,
        "cost": null,
        "address": "Carretera Trasandina, Mérida",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Páramo La Culata",
        "description": "Zona de montaña con paisajes de páramo, rutas escénicas y caseríos andinos.",
        "location": "Mérida",
        "type": "lugar",
        "cover_image": "https://i.ytimg.com/vi/CwKZlvpZILU/maxresdefault.jpg",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 2,
        "cost": null,
        "address": "Mérida",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Parque Nacional Waraira Repano",
        "description": "Montaña emblemática de Caracas, conocida por senderos, miradores, vegetación y conexión con Galipán.",
        "location": "Caracas, La Guaira y Miranda",
        "type": "lugar",
        "cover_image": "https://haimaneltroudi.com/wp-content/uploads/2019/07/haiman-el-troudi-waraira-repano-guardian-eterno-de-caracas-7.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 2,
        "cost": null,
        "address": "Caracas, La Guaira y Miranda",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Galipán",
        "description": "Poblado de montaña sobre Caracas, famoso por flores, comida, clima fresco y vistas al litoral.",
        "location": "Waraira Repano, Distrito Capital",
        "type": "lugar",
        "cover_image": "https://t4.ftcdn.net/jpg/02/59/94/13/360_F_259941378_L7oMPw5pBw9FzY9TiDiuz3DaYyB5ul55.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 2,
        "cost": null,
        "address": "Waraira Repano, Distrito Capital",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Parque Nacional Henri Pittier",
        "description": "Primer parque nacional del país, con bosque nublado, rutas de montaña y conexión hacia playas de Aragua.",
        "location": "Aragua y Carabobo",
        "type": "lugar",
        "cover_image": "https://www.inparques.gob.ve/wp-content/uploads/2018/02/henripittier-g-181114.jpg",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 2,
        "cost": null,
        "address": "Aragua y Carabobo",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Rancho Grande",
        "description": "Sector de bosque nublado dentro de Henri Pittier, reconocido por naturaleza, aves y clima fresco.",
        "location": "Parque Nacional Henri Pittier, Aragua",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/6/68/Rancho_Grande.jpg",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 2,
        "cost": null,
        "address": "Parque Nacional Henri Pittier, Aragua",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Colonia Tovar",
        "description": "Pueblo de montaña de influencia alemana, con clima fresco, arquitectura particular y rutas cercanas.",
        "location": "Estado Aragua",
        "type": "lugar",
        "cover_image": "https://www.noticiasbarquisimeto.com/wp-content/uploads/2025/02/image-547.png",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 2,
        "cost": null,
        "address": "Estado Aragua",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Parque Nacional Guaramacal",
        "description": "Área montañosa andina con bosques nublados, nacientes de agua y rutas naturales.",
        "location": "Trujillo y Portuguesa",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/3/35/Laguna_Los_Cedros_%2811846232765%29.jpg",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 2,
        "cost": null,
        "address": "Trujillo y Portuguesa",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Parque Nacional Dinira",
        "description": "Parque de montañas, nacientes de ríos y paisajes verdes entre la región centro-occidental y andina.",
        "location": "Lara, Portuguesa y Trujillo",
        "type": "lugar",
        "cover_image": "https://radio.otilca.org/wp-content/uploads/2021/11/01-134.jpg",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 2,
        "cost": null,
        "address": "Lara, Portuguesa y Trujillo",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Parque Nacional Tapo-Caparo",
        "description": "Área natural del occidente venezolano con bosques, ríos y paisajes de piedemonte andino.",
        "location": "Barinas, Mérida y Táchira",
        "type": "lugar",
        "cover_image": "https://www.inparques.gob.ve/cms/src/galeria/img/7bee6882258ff4e43573f67aa65d43eb.jpg",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 2,
        "cost": null,
        "address": "Barinas, Mérida y Táchira",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Parque Nacional Guatopo",
        "description": "Área boscosa cercana a la región capital, adecuada para contacto con naturaleza y caminatas ecológicas.",
        "location": "Miranda y Guárico",
        "type": "lugar",
        "cover_image": "https://www.inparques.gob.ve/cms/src/galeria/img/1daba2ccd074acedd3b848279a672ed3.jpg",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 2,
        "cost": null,
        "address": "Miranda y Guárico",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Parque Nacional Yacambú",
        "description": "Parque de montaña con bosques nublados, quebradas y paisajes naturales del estado Lara.",
        "location": "Estado Lara",
        "type": "lugar",
        "cover_image": "https://mmedia.notitarde.com.ve/19886/parque-nacional-yacambu-52526.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 2,
        "cost": null,
        "address": "Estado Lara",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Parque Nacional El Tamá",
        "description": "Área andina fronteriza con montañas, biodiversidad y paisajes de altura.",
        "location": "Estado Táchira",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/1/15/Cerro_el_Cobre.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 2,
        "cost": null,
        "address": "Estado Táchira",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Cerro El Copey",
        "description": "Montaña principal de Margarita, con clima más fresco, vegetación y miradores naturales.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/5/5a/San_Juan_Valley.jpg",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 2,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Cerro Santa Ana",
        "description": "Elevación aislada con senderos y vistas hacia el paisaje árido y costero de Paraguaná.",
        "location": "Península de Paraguaná, Falcón",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/a/af/Cerro_Santa_Ana_-_Estado_Flac%C3%B3n.JPG",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 2,
        "cost": null,
        "address": "Península de Paraguaná, Falcón",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Cerro Autana",
        "description": "Tepuy sagrado para pueblos indígenas, reconocido por su silueta única y valor natural.",
        "location": "Estado Amazonas",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/e/eb/CerroAutanaNorthExposure.jpg",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 2,
        "cost": null,
        "address": "Estado Amazonas",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Cueva del Guácharo",
        "description": "Cueva y parque nacional asociado a formaciones naturales, fauna nocturna y recorridos guiados.",
        "location": "Monagas",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Cueva_del_Guacharo.jpg",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 2,
        "cost": null,
        "address": "Monagas",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Mirador",
            "Senderismo",
            "Fotografía",
            "Clima de montaña"
        ]
    },
    {
        "title": "Parque Nacional Canaima",
        "description": "Destino natural de tepuyes, lagunas, saltos de agua y excursiones de gran escala en el sur de Venezuela.",
        "location": "Estado Bolívar",
        "type": "actividad",
        "cover_image": "https://radio.otilca.org/wp-content/uploads/2019/06/22281828_10155019226585954_646260805919122650_n-2.jpg",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 4,
        "cost": null,
        "address": "Estado Bolívar",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Quebrada de Jaspe",
        "description": "Quebrada de roca rojiza y agua clara, parada frecuente en recorridos por la Gran Sabana.",
        "location": "Gran Sabana, Bolívar",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/7/76/BellaJaspe.JPG",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 4,
        "cost": null,
        "address": "Gran Sabana, Bolívar",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Salto Ángel",
        "description": "Cascada icónica de Venezuela, visitada mediante rutas fluviales, sobrevuelos y caminatas organizadas.",
        "location": "Parque Nacional Canaima, Bolívar",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/d/de/SaltoAngel4.jpg",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 4,
        "cost": null,
        "address": "Parque Nacional Canaima, Bolívar",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Laguna de Canaima",
        "description": "Laguna rodeada de saltos de agua y tepuyes, punto base para excursiones en Canaima.",
        "location": "Parque Nacional Canaima, Bolívar",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/9/90/Laguna-de-Canaima.jpg",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 4,
        "cost": null,
        "address": "Parque Nacional Canaima, Bolívar",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Monte Roraima",
        "description": "Tepuy fronterizo y destino clásico de trekking de varios días por la Gran Sabana.",
        "location": "Gran Sabana, Bolívar",
        "type": "actividad",
        "cover_image": "https://www.montesclarosecoturismo.com.br/wp-content/uploads/2024/06/monteroraima11-1075x600.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 4,
        "cost": null,
        "address": "Gran Sabana, Bolívar",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "La Gran Sabana",
        "description": "Región de sabanas, tepuyes, saltos de agua y comunidades, ideal para rutas terrestres de naturaleza.",
        "location": "Estado Bolívar",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Kukenan_Tepuy_at_Sunset.jpg/500px-Kukenan_Tepuy_at_Sunset.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 4,
        "cost": null,
        "address": "Estado Bolívar",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Salto Kama",
        "description": "Cascada de fácil contemplación en rutas por la Gran Sabana, con paisaje abierto y fotográfico.",
        "location": "Gran Sabana, Bolívar",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Salto_Kama_-_Gran_Sabana.jpg",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 4,
        "cost": null,
        "address": "Gran Sabana, Bolívar",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Salto Kawi",
        "description": "Salto de agua rodeado de sabana y vegetación, recomendado para recorridos naturales del estado Bolívar.",
        "location": "Gran Sabana, Bolívar",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Kawi_Falls_-_Salto_Kawi_%2823636787272%29.jpg",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 4,
        "cost": null,
        "address": "Gran Sabana, Bolívar",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Salto Aponguao",
        "description": "Cascada amplia cercana a comunidades pemón, visitada en excursiones guiadas por la Gran Sabana.",
        "location": "Gran Sabana, Bolívar",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Venezuela_-_Gran_sabana_-_Salto_Aponwao.jpg",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 4,
        "cost": null,
        "address": "Gran Sabana, Bolívar",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Kavac",
        "description": "Comunidad y zona de excursión hacia cañones, ríos y paisajes cercanos al Auyantepuy.",
        "location": "Parque Nacional Canaima, Bolívar",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Kavac-2023.jpg",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 4,
        "cost": null,
        "address": "Parque Nacional Canaima, Bolívar",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Auyantepuy",
        "description": "Tepuy asociado al Salto Ángel, símbolo de la geografía del Escudo Guayanés.",
        "location": "Parque Nacional Canaima, Bolívar",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Auyan_Tepui_01.JPG",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 4,
        "cost": null,
        "address": "Parque Nacional Canaima, Bolívar",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Jaua-Sarisariñama",
        "description": "Zona de tepuyes y simas naturales, representativa de paisajes remotos y formaciones geológicas únicas.",
        "location": "Estado Bolívar",
        "type": "actividad",
        "cover_image": "https://turismodeestrellas.com/media/files/9646_jaua-sarisarinama-cesardiaz.jpg",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 4,
        "cost": null,
        "address": "Estado Bolívar",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Delta del Orinoco",
        "description": "Región de caños, manglares y comunidades ribereñas, ideal para navegación, naturaleza y cultura warao.",
        "location": "Estado Delta Amacuro",
        "type": "actividad",
        "cover_image": "https://radio.otilca.org/wp-content/uploads/2019/05/Calendario-2017-DICIEMBRE-RS-17.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 4,
        "cost": null,
        "address": "Estado Delta Amacuro",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Caño Manamo",
        "description": "Brazo del Orinoco usado para recorridos fluviales, observación de paisaje y contacto con el delta.",
        "location": "Delta del Orinoco, Delta Amacuro",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Orcanomanamo.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 4,
        "cost": null,
        "address": "Delta del Orinoco, Delta Amacuro",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Parque Nacional Mariusa",
        "description": "Área protegida del Delta del Orinoco, con caños, humedales, fauna y experiencias de navegación.",
        "location": "Delta Amacuro",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Deltaorinoco.jpg",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 4,
        "cost": null,
        "address": "Delta Amacuro",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Cinaruco-Capanaparo",
        "description": "Paisaje llanero de ríos, playas fluviales y sabanas, apropiado para naturaleza y observación de fauna.",
        "location": "Estado Apure",
        "type": "actividad",
        "cover_image": "https://pbs.twimg.com/media/Ebm7qHSWsAE_G1p.jpg",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 4,
        "cost": null,
        "address": "Estado Apure",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Aguaro-Guariquito",
        "description": "Parque nacional de llanos, ríos y morichales, ideal para observación de paisajes abiertos y vida silvestre.",
        "location": "Estado Guárico",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Pozo_La_Zorra_Parque_Nacional_Aguaro_Guariquito.jpg",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 4,
        "cost": null,
        "address": "Estado Guárico",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Río Caura",
        "description": "Río de gran importancia natural en el sur del país, usado para expediciones fluviales y ecoturismo.",
        "location": "Estado Bolívar",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/6/62/R%C3%ADo_Caura.jpg",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 4,
        "cost": null,
        "address": "Estado Bolívar",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Tobogán de la Selva",
        "description": "Formación rocosa natural donde el agua crea un deslizadero, visitado en rutas cercanas a Puerto Ayacucho.",
        "location": "Puerto Ayacucho, Amazonas",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Tobogan_de_la_Selva.jpg",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 4,
        "cost": null,
        "address": "Puerto Ayacucho, Amazonas",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Raudales de Atures",
        "description": "Zona de rocas y corrientes del Orinoco, con paisajes amazónicos y valor histórico-natural.",
        "location": "Amazonas",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Raudales_de_Atures._Estado_Amazonas._Venezuela.JPG",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 4,
        "cost": null,
        "address": "Amazonas",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Relámpago del Catatumbo",
        "description": "Fenómeno natural luminoso observado en zonas lacustres y de ciénaga del occidente venezolano.",
        "location": "Sur del Lago de Maracaibo, Zulia",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Catatumbo_Lightning_-_Rayo_del_Catatumbo_%2825217861751%29.jpg",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 4,
        "cost": null,
        "address": "Sur del Lago de Maracaibo, Zulia",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Safari llanero en Hato El Cedral",
        "description": "Experiencia de naturaleza en los llanos, orientada a observación de fauna, amaneceres y recorridos rurales.",
        "location": "Estado Apure",
        "type": "actividad",
        "cover_image": "https://s3.amazonaws.com/bookingmotor.cdn.virginia/elements/cms/business/mydestiny/images/hotelesven/hatoelcedral/hatoelcedral004.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 4,
        "cost": null,
        "address": "Estado Apure",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Senderismo al Waraira Repano",
        "description": "Actividad clásica de Caracas para subir por rutas de montaña, ejercitarse y observar la ciudad desde altura.",
        "location": "Caracas",
        "type": "actividad",
        "cover_image": "https://haimaneltroudi.com/wp-content/uploads/2026/04/Haiman-el-troudi-senderismo-en-el-waraira-repano-tradicion-caraquena-13.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 4,
        "cost": null,
        "address": "Caracas",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Buceo en Los Roques",
        "description": "Actividad acuática para explorar fondos marinos, arrecifes y aguas claras del Caribe venezolano.",
        "location": "Archipiélago de Los Roques",
        "type": "actividad",
        "cover_image": "https://media-cdn.tripadvisor.com/media/photo-s/12/78/72/4c/snorkeling-con-tortugas.jpg",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 4,
        "cost": null,
        "address": "Archipiélago de Los Roques",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Kitesurf en El Yaque",
        "description": "Actividad deportiva impulsada por vientos constantes y ambiente náutico de la playa El Yaque.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "actividad",
        "cover_image": "https://www.iksurfmag.com/wp-content/uploads/2016/07/IMG_5370.jpg",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 4,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Kayak en La Restinga",
        "description": "Recorrido en kayak o bote por canales de manglar y paisajes tranquilos del parque nacional.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "actividad",
        "cover_image": "https://www.venezuelatuya.com//actividades/fotos/00/04/kayakmargarita003.jpg",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 4,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Paseo en lancha por Morrocoy",
        "description": "Ruta en embarcación hacia cayos, manglares y zonas de baño dentro del Parque Nacional Morrocoy.",
        "location": "Falcón",
        "type": "actividad",
        "cover_image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/64/62/ce/viaje-de-paseo-a-bajo.jpg?w=700&h=700&s=1",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 4,
        "cost": null,
        "address": "Falcón",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Rafting en Barinas",
        "description": "Actividad de río en el piedemonte andino, asociada a aventura, agua y paisajes naturales.",
        "location": "Estado Barinas",
        "type": "actividad",
        "cover_image": "https://arassari.com/images/arafotos/Rafting/0216a.jpg",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 4,
        "cost": null,
        "address": "Estado Barinas",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Parapente en Mérida",
        "description": "Actividad aérea para contemplar valles andinos y paisajes de montaña desde otra perspectiva.",
        "location": "Estado Mérida",
        "type": "actividad",
        "cover_image": "https://www.extreme-sports.com.ve/wp-content/uploads/2015/12/FOTOS-JOSE-LIMONGI-FLY-MOTO-BIKE-MERIDA-2010-059.jpg",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 4,
        "cost": null,
        "address": "Estado Mérida",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Observación de aves en Henri Pittier",
        "description": "Actividad naturalista en bosques nublados y rutas de montaña del Parque Nacional Henri Pittier.",
        "location": "Estado Aragua",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/0/09/Keel_billed_toucan.jpg",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 4,
        "cost": null,
        "address": "Estado Aragua",
        "check_in": "07:00",
        "check_out": "17:00",
        "services": [
            "Actividad al aire libre",
            "Guía local",
            "Excursión",
            "Fotografía"
        ]
    },
    {
        "title": "Caracas",
        "description": "Capital del país, con museos, plazas históricas, montaña, gastronomía y zonas urbanas de interés turístico.",
        "location": "Distrito Capital",
        "type": "lugar",
        "cover_image": "https://www.latamairlines.com/content/dam/latamxp/sites/vamos-latam/art%C3%ADculos-destacados/caracas/caracas%20(1).png",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 3,
        "cost": null,
        "address": "Distrito Capital",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Mérida",
        "description": "Ciudad andina con clima fresco, plazas, teleférico, vida estudiantil y rutas hacia páramos y pueblos cercanos.",
        "location": "Estado Mérida",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/4/40/El_cruce_de_las_bandas._Merida..jpg?utm_source=es.wikivoyage.org&utm_campaign=index&utm_content=original",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 3,
        "cost": null,
        "address": "Estado Mérida",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Coro",
        "description": "Ciudad histórica de arquitectura colonial y tradiciones del occidente venezolano.",
        "location": "Estado Falcón",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/6/67/Monumento_a_la_Federaci%C3%B3n_Venezolana_I.jpg",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 3,
        "cost": null,
        "address": "Estado Falcón",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Ciudad Bolívar",
        "description": "Ciudad a orillas del Orinoco, con casco histórico, miradores y conexión hacia rutas del sur.",
        "location": "Estado Bolívar",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/d/d8/Ciudad_Bol%C3%ADvar_historical_zone.jpg",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 3,
        "cost": null,
        "address": "Estado Bolívar",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Maracaibo",
        "description": "Ciudad lacustre con identidad cultural fuerte, gastronomía, devoción mariana y vistas al Lago de Maracaibo.",
        "location": "Estado Zulia",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/c/cf/Vista_de_Maracaibo.png",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 3,
        "cost": null,
        "address": "Estado Zulia",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Valencia",
        "description": "Ciudad central con parques, plazas, centros comerciales y cercanía a sitios históricos y naturales.",
        "location": "Estado Carabobo",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Vista_de_la_ciudad_desde_las_urbanizacion_la_trigale%C3%B1a.jpg/250px-Vista_de_la_ciudad_desde_las_urbanizacion_la_trigale%C3%B1a.jpg",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 3,
        "cost": null,
        "address": "Estado Carabobo",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Barquisimeto",
        "description": "Ciudad musical y cultural, conocida por monumentos, plazas, gastronomía y conexión con pueblos artesanales.",
        "location": "Estado Lara",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/2/2b/BarquisimetoCollage.png",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 3,
        "cost": null,
        "address": "Estado Lara",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "San Cristóbal",
        "description": "Ciudad andina de tradición ferial, arquitectura religiosa y rutas hacia pueblos de montaña.",
        "location": "Estado Táchira",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/6/64/Stairway_in_San_Crist%C3%B3bal.jpg",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 3,
        "cost": null,
        "address": "Estado Táchira",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "La Asunción",
        "description": "Capital histórica de Nueva Esparta, con castillo, plazas y ambiente colonial tranquilo.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Panoramic_view_of_La_Asunci%C3%B3n%2C_Isla_Margarita.jpg/500px-Panoramic_view_of_La_Asunci%C3%B3n%2C_Isla_Margarita.jpg",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 3,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Juan Griego",
        "description": "Poblado costero famoso por sus atardeceres, bahía y cercanía a fortificaciones históricas.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/6/67/Panoramic_of_Juan_Griego_45.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 3,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Pampatar",
        "description": "Ciudad costera con castillo, bahía, restaurantes y ambiente turístico frente al mar.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/b/b7/Turismo_en_Pampatar_4.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 3,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Porlamar",
        "description": "Centro comercial y urbano de Margarita, con hoteles, tiendas, gastronomía y vida turística.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/b/b8/Porlamar.JPG",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 3,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Puerto La Cruz",
        "description": "Ciudad costera oriental con paseos marítimos, salidas hacia islas de Mochima y servicios turísticos.",
        "location": "Estado Anzoátegui",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/d/df/PuertoLaCruzSkyline2.jpg",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 3,
        "cost": null,
        "address": "Estado Anzoátegui",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Cumaná",
        "description": "Ciudad histórica oriental, cercana a playas, castillos y rutas hacia la Península de Araya y Paria.",
        "location": "Estado Sucre",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/2/26/Cumana_sucre.jpg",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 3,
        "cost": null,
        "address": "Estado Sucre",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "La Guaira",
        "description": "Ciudad litoral cercana a Caracas, con playas, malecón, casco histórico y conexión al aeropuerto.",
        "location": "Estado La Guaira",
        "type": "lugar",
        "cover_image": "https://www.civitatis.com/f/venezuela/la-guaira/la-guaira.jpg",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 3,
        "cost": null,
        "address": "Estado La Guaira",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Puerto Cabello",
        "description": "Ciudad portuaria con fortines, casco histórico, playas cercanas y tradición marítima.",
        "location": "Estado Carabobo",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Noche_en_Puerto_Cabello.jpg",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 3,
        "cost": null,
        "address": "Estado Carabobo",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "El Hatillo",
        "description": "Pueblo turístico dentro del área metropolitana de Caracas, con casas coloridas, gastronomía y artesanía.",
        "location": "Miranda",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Iglesia_de_Santa_Rosalia_-_El_Hatillo_2012_000.jpg",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 3,
        "cost": null,
        "address": "Miranda",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Choroní",
        "description": "Pueblo colonial de costa, con tradición cultural, cacao, música y salida hacia playas cercanas.",
        "location": "Estado Aragua",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/a/af/Colores_de_Pueblo.JPG",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 3,
        "cost": null,
        "address": "Estado Aragua",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "La Grita",
        "description": "Pueblo andino de tradición religiosa, clima fresco y arquitectura típica.",
        "location": "Estado Táchira",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Vista_de_parte_alta_de_la_Grita_desde_el_Hotel_Monta%C3%B1a.JPG",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 3,
        "cost": null,
        "address": "Estado Táchira",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Mucuchíes",
        "description": "Pueblo del páramo merideño, conocido por su clima frío, paisajes y cercanía a rutas andinas.",
        "location": "Estado Mérida",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/a/af/Poblacion_de_Mucuchies_Estado_Merida.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 3,
        "cost": null,
        "address": "Estado Mérida",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Jají",
        "description": "Pueblo andino restaurado, con calles empedradas, plaza central y ambiente rural de montaña.",
        "location": "Estado Mérida",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Jaji_-_un_pueblo_de_Ejido2.JPG",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 3,
        "cost": null,
        "address": "Estado Mérida",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Apartaderos",
        "description": "Poblado de altura en el páramo, punto de paso hacia lagunas, miradores y rutas andinas.",
        "location": "Estado Mérida",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Vista_del_Pueblo_de_Apartaderos.jpg",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 3,
        "cost": null,
        "address": "Estado Mérida",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Quíbor",
        "description": "Pueblo larense asociado a artesanía, cerámica, mercados y tradiciones regionales.",
        "location": "Estado Lara",
        "type": "lugar",
        "cover_image": "https://noticias.com.ve/wp-content/uploads/2016/03/qu%C3%ADbor-1200x675.jpg",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 3,
        "cost": null,
        "address": "Estado Lara",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Carora",
        "description": "Ciudad histórica de Lara con arquitectura colonial, tradición musical, bodegas y gastronomía regional.",
        "location": "Estado Lara",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Iglesia_matriz_de_Carora.jpg",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 3,
        "cost": null,
        "address": "Estado Lara",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Paseo urbano",
            "Fotografía",
            "Restaurantes cercanos",
            "Transporte público"
        ]
    },
    {
        "title": "Casa Natal de Simón Bolívar",
        "description": "Casa histórica relacionada con la vida de Simón Bolívar, visitada por su valor patrimonial y educativo.",
        "location": "Caracas",
        "type": "lugar",
        "cover_image": "https://iamvenezuela.org/wp-content/uploads/sites/4/2015/08/casa-natal-del-libertador.png",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 5,
        "cost": null,
        "address": "Caracas",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Panteón Nacional",
        "description": "Monumento histórico donde reposan figuras relevantes de la historia venezolana.",
        "location": "Caracas",
        "type": "lugar",
        "cover_image": "https://www.mincultura.gob.ve/wp-content/uploads/2022/10/Panteo%CC%81n-Nacional_JAC-DESTACADA.jpg",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 5,
        "cost": null,
        "address": "Caracas",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Plaza Bolívar de Caracas",
        "description": "Plaza central del casco histórico caraqueño, rodeada de edificios institucionales y patrimonio urbano.",
        "location": "Caracas",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/8/8e/PlazaBolivar2004-8.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 5,
        "cost": null,
        "address": "Caracas",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Museo de Bellas Artes de Caracas",
        "description": "Museo dedicado a exposiciones artísticas, colecciones visuales y actividades culturales.",
        "location": "Caracas",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/7/75/Museo_de_Arte_contempor%C3%A1neo_de_Caracas%2C_Venezuela.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 5,
        "cost": null,
        "address": "Caracas",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Galería de Arte Nacional",
        "description": "Espacio cultural dedicado al arte venezolano, exposiciones y memoria visual del país.",
        "location": "Caracas",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/2/26/Galer%C3%ADa_de_Arte_Nacional_de_Venezuela.jpg",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 5,
        "cost": null,
        "address": "Caracas",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Teatro Teresa Carreño",
        "description": "Complejo cultural emblemático de la capital, sede de conciertos, teatro, danza y eventos artísticos.",
        "location": "Caracas",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Vista_Teatro_teresa_carre%C3%B1o.jpg",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 5,
        "cost": null,
        "address": "Caracas",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Paseo Los Próceres",
        "description": "Paseo monumental de valor cívico e histórico, usado para recorridos urbanos y fotografía.",
        "location": "Caracas",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Los_Pr%C3%B3ceres%2C_Caracas%2C_Venezuela.jpg",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 5,
        "cost": null,
        "address": "Caracas",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Casco histórico de Coro",
        "description": "Conjunto urbano de arquitectura tradicional, calles coloniales y patrimonio cultural del occidente.",
        "location": "Coro, Falcón",
        "type": "lugar",
        "cover_image": "https://images.mnstatic.com/33/f8/33f82ac8930a69db7db665d217b35472.jpg",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 5,
        "cost": null,
        "address": "Coro, Falcón",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "La Vela de Coro",
        "description": "Puerto histórico vinculado a la ciudad de Coro, con arquitectura patrimonial y tradición costera.",
        "location": "Estado Falcón",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/5/50/Monumento_a_la_Bandera_en_La_Vela_de_Coro.jpg",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 5,
        "cost": null,
        "address": "Estado Falcón",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Médanos de Coro",
        "description": "Paisaje de dunas cercano a Coro, símbolo natural y turístico del estado Falcón.",
        "location": "Estado Falcón",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/0/08/Los_medanos_de_coro_PN.jpg",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 5,
        "cost": null,
        "address": "Estado Falcón",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Campo de Carabobo",
        "description": "Lugar histórico asociado a la Batalla de Carabobo y a la independencia de Venezuela.",
        "location": "Estado Carabobo",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Monumento_del_campo_de_Carabobo_2.JPG",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 5,
        "cost": null,
        "address": "Estado Carabobo",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Castillo San Carlos de Borromeo",
        "description": "Fortificación colonial frente al mar, símbolo histórico de la isla de Margarita.",
        "location": "Pampatar, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Castillo_San_Carlos_de_Borromeo_%282%29.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 5,
        "cost": null,
        "address": "Pampatar, Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Castillo de Santa Rosa",
        "description": "Fortaleza colonial ubicada en La Asunción, vinculada a la historia independentista de la isla.",
        "location": "La Asunción, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/e/e7/VE-islamarg-asunc-cast-s-rosa.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 5,
        "cost": null,
        "address": "La Asunción, Nueva Esparta",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Castillo San Antonio de la Eminencia",
        "description": "Fortificación colonial con vistas a Cumaná y valor histórico en el oriente venezolano.",
        "location": "Cumaná, Sucre",
        "type": "lugar",
        "cover_image": "https://i.pinimg.com/736x/bf/de/9a/bfde9ade5db76f35b4f8ca94bc2fbb39.jpg",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 5,
        "cost": null,
        "address": "Cumaná, Sucre",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Fortín Solano",
        "description": "Antigua fortificación con vistas sobre Puerto Cabello y el litoral carabobeño.",
        "location": "Puerto Cabello, Carabobo",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/a/af/Fort%C3%ADn_Solano_Venezuela.jpg",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 5,
        "cost": null,
        "address": "Puerto Cabello, Carabobo",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Casa del Congreso de Angostura",
        "description": "Lugar histórico asociado al Congreso de Angostura y a la memoria republicana venezolana.",
        "location": "Ciudad Bolívar, Bolívar",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/6/64/House_of_the_Congress_of_Angostura.jpg",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 5,
        "cost": null,
        "address": "Ciudad Bolívar, Bolívar",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Puente sobre el Lago de Maracaibo",
        "description": "Obra emblemática que conecta zonas del estado Zulia y forma parte de la identidad visual de Maracaibo.",
        "location": "Zulia",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/c/ce/General_Rafael_Urdaneta_Bridge_view_from_the_lake_to_Cabimas_side.jpg",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 5,
        "cost": null,
        "address": "Zulia",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Basílica de Nuestra Señora de Chiquinquirá",
        "description": "Templo religioso emblemático del Zulia, centro de devoción y tradición mariana.",
        "location": "Maracaibo, Zulia",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/1/16/Basilica_de_Nuestra_Se%C3%B1ora_de_Chiquinquira.jpg",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 5,
        "cost": null,
        "address": "Maracaibo, Zulia",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Monumento a la Virgen de la Paz",
        "description": "Monumento de gran altura ubicado sobre la ciudad de Trujillo, con miradores y valor religioso.",
        "location": "Trujillo",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Monumento_Virgen_de_La_Paz_I.jpg",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 5,
        "cost": null,
        "address": "Trujillo",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Flor de Venezuela",
        "description": "Estructura arquitectónica y cultural icónica de Barquisimeto, asociada a exposiciones y eventos.",
        "location": "Barquisimeto, Lara",
        "type": "lugar",
        "cover_image": "https://haimaneltroudi.com/wp-content/uploads/2019/09/haiman-el-troudi-la-flor-de-venezuela-espectaculo-capital-larense.jpg",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 5,
        "cost": null,
        "address": "Barquisimeto, Lara",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Obelisco de Barquisimeto",
        "description": "Monumento urbano representativo de la ciudad musical de Venezuela.",
        "location": "Barquisimeto, Lara",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Barquisimeto%27s_Obelisk.jpg/1280px-Barquisimeto%27s_Obelisk.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 5,
        "cost": null,
        "address": "Barquisimeto, Lara",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Catedral de Mérida",
        "description": "Templo principal de la ciudad andina, ubicado frente a la Plaza Bolívar de Mérida.",
        "location": "Mérida",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Catedral_Metropolitana_de_M%C3%A9rida.jpg/1280px-Catedral_Metropolitana_de_M%C3%A9rida.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 5,
        "cost": null,
        "address": "Mérida",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Jardín Botánico de Mérida",
        "description": "Espacio educativo y natural con colecciones vegetales, recorridos y actividades ambientales.",
        "location": "Mérida",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/8/87/Entrada_Jard%C3%ADn_Bot%C3%A1nico_M%C3%A9rida.JPG",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 5,
        "cost": null,
        "address": "Mérida",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Ateneo de Valencia",
        "description": "Institución cultural de la ciudad, asociada a exposiciones, eventos y actividad artística.",
        "location": "Valencia, Carabobo",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Ateneodevalenciacarabobo.jpg",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 5,
        "cost": null,
        "address": "Valencia, Carabobo",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Museo de Arte Contemporáneo del Zulia",
        "description": "Espacio museístico dedicado al arte moderno y contemporáneo en el occidente venezolano.",
        "location": "Maracaibo, Zulia",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Museo_de_Arte_Contemporaneo_del_Zulia.jpg",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 5,
        "cost": null,
        "address": "Maracaibo, Zulia",
        "check_in": "08:00",
        "check_out": "18:00",
        "services": [
            "Recorrido histórico",
            "Fotografía",
            "Arquitectura",
            "Guía local"
        ]
    },
    {
        "title": "Mercado Principal de Mérida",
        "description": "Mercado tradicional con platos andinos, dulces, artesanía y productos locales.",
        "location": "Mérida",
        "type": "actividad",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/8/8d/Mercado_Principal_de_Merida.jpg",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 6,
        "cost": null,
        "address": "Mérida",
        "check_in": "09:00",
        "check_out": "22:00",
        "services": [
            "Actividad al aire libre",
            "Comida típica",
            "Mercado local",
            "Degustación"
        ]
    },
    {
        "title": "Mercado de Chacao",
        "description": "Mercado urbano con productos frescos, panadería, cafés, comida local y ambiente gastronómico.",
        "location": "Chacao, Miranda",
        "type": "actividad",
        "cover_image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/56/4b/f9/verduras-y-hortalizas.jpg?w=1200&h=1200&s=1",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 6,
        "cost": null,
        "address": "Chacao, Miranda",
        "check_in": "09:00",
        "check_out": "22:00",
        "services": [
            "Actividad al aire libre",
            "Comida típica",
            "Mercado local",
            "Degustación"
        ]
    },
    {
        "title": "Ruta del cacao de Chuao",
        "description": "Experiencia ligada al cacao, la tradición agrícola y la cultura afrovenezolana de la costa aragüeña.",
        "location": "Chuao, Aragua",
        "type": "actividad",
        "cover_image": "https://i0.wp.com/www.venezuelanprofiles.com/wp-content/uploads/2016/09/chuao.jpg?fit=624%2C351&ssl=1",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 6,
        "cost": null,
        "address": "Chuao, Aragua",
        "check_in": "09:00",
        "check_out": "22:00",
        "services": [
            "Actividad al aire libre",
            "Comida típica",
            "Mercado local",
            "Degustación"
        ]
    },
    {
        "title": "Ruta del cacao de Barlovento",
        "description": "Recorrido por zonas productoras de cacao, tradición local y sabores del centro-norte venezolano.",
        "location": "Miranda",
        "type": "actividad",
        "cover_image": "https://pbs.twimg.com/media/C7NTQEsXUAA5ja9.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 6,
        "cost": null,
        "address": "Miranda",
        "check_in": "09:00",
        "check_out": "22:00",
        "services": [
            "Actividad al aire libre",
            "Comida típica",
            "Mercado local",
            "Degustación"
        ]
    },
    {
        "title": "Ruta del café en Biscucuy",
        "description": "Experiencia rural asociada al café, paisajes verdes y cultura agrícola de la región andina-llanera.",
        "location": "Portuguesa",
        "type": "actividad",
        "cover_image": "https://images.mnstatic.com/3b/4a/3b4a45362e06900f00aea74e26e7556a.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 6,
        "cost": null,
        "address": "Portuguesa",
        "check_in": "09:00",
        "check_out": "22:00",
        "services": [
            "Actividad al aire libre",
            "Comida típica",
            "Mercado local",
            "Degustación"
        ]
    },
    {
        "title": "Ruta de dulces de Coro",
        "description": "Recorrido de sabores tradicionales falconianos, conservas, dulces criollos y gastronomía local.",
        "location": "Coro, Falcón",
        "type": "actividad",
        "cover_image": "https://pbs.twimg.com/media/FVnfNY2XsAQ9SQL.jpg",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 6,
        "cost": null,
        "address": "Coro, Falcón",
        "check_in": "09:00",
        "check_out": "22:00",
        "services": [
            "Actividad al aire libre",
            "Comida típica",
            "Mercado local",
            "Degustación"
        ]
    },
    {
        "title": "Ruta de comida zuliana",
        "description": "Experiencia gastronómica con platos regionales como patacones, mandocas y sabores propios del Zulia.",
        "location": "Maracaibo, Zulia",
        "type": "actividad",
        "cover_image": "https://media.diarioversionfinal.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-29-at-9.36.42-AM-1.jpeg",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 6,
        "cost": null,
        "address": "Maracaibo, Zulia",
        "check_in": "09:00",
        "check_out": "22:00",
        "services": [
            "Actividad al aire libre",
            "Comida típica",
            "Mercado local",
            "Degustación"
        ]
    },
    {
        "title": "Ruta de arepas en Caracas",
        "description": "Recorrido urbano para probar diferentes estilos de arepas, rellenos tradicionales y propuestas modernas.",
        "location": "Caracas",
        "type": "actividad",
        "cover_image": "https://oceandrive.com.ve/wp-content/uploads/2021/09/rellenos-de-arepa-1280x720-1.jpg",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 6,
        "cost": null,
        "address": "Caracas",
        "check_in": "09:00",
        "check_out": "22:00",
        "services": [
            "Actividad al aire libre",
            "Comida típica",
            "Mercado local",
            "Degustación"
        ]
    },
    {
        "title": "Ruta de cachapas en Miranda",
        "description": "Experiencia de comida típica centrada en cachapas, queso de mano y paradas gastronómicas de carretera.",
        "location": "Estado Miranda",
        "type": "actividad",
        "cover_image": "https://amamoscaracas.com/wp-content/uploads/2025/07/Gemini_Generated_Image_3p2afy3p2afy3p2a-scaled.png",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 6,
        "cost": null,
        "address": "Estado Miranda",
        "check_in": "09:00",
        "check_out": "22:00",
        "services": [
            "Actividad al aire libre",
            "Comida típica",
            "Mercado local",
            "Degustación"
        ]
    },
    {
        "title": "Ruta de cochino frito en la Colonia Tovar",
        "description": "Propuesta gastronómica de montaña con comida típica, postres, embutidos y platos de influencia europea.",
        "location": "Colonia Tovar, Aragua",
        "type": "actividad",
        "cover_image": "https://www.diariomomento.com/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-10-at-9.19.06-PM.jpeg",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 6,
        "cost": null,
        "address": "Colonia Tovar, Aragua",
        "check_in": "09:00",
        "check_out": "22:00",
        "services": [
            "Actividad al aire libre",
            "Comida típica",
            "Mercado local",
            "Degustación"
        ]
    },
    {
        "title": "Mercado de Conejeros",
        "description": "Mercado popular con comida, productos locales, pescados, frutas y vida cotidiana insular.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "actividad",
        "cover_image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/d1/fe/6a/conejeros.jpg?w=1200&h=-1&s=1",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 6,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "09:00",
        "check_out": "22:00",
        "services": [
            "Actividad al aire libre",
            "Comida típica",
            "Mercado local",
            "Degustación"
        ]
    },
    {
        "title": "Mercado Las Pulgas",
        "description": "Mercado tradicional marabino con comercio popular, sabores locales y ambiente urbano del Zulia.",
        "location": "Maracaibo, Zulia",
        "type": "actividad",
        "cover_image": "https://www.buenosairesfreewalks.com/spanish/wp-content/uploads/2022/02/MercadoPulgas_portada.jpg",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 6,
        "cost": null,
        "address": "Maracaibo, Zulia",
        "check_in": "09:00",
        "check_out": "22:00",
        "services": [
            "Actividad al aire libre",
            "Comida típica",
            "Mercado local",
            "Degustación"
        ]
    },
    {
        "title": "Pescados y mariscos de Pampatar",
        "description": "Zona costera ideal para disfrutar gastronomía marina, restaurantes frente al mar y platos insulares.",
        "location": "Pampatar, Nueva Esparta",
        "type": "actividad",
        "cover_image": "https://santiagomontenegro.com/wp-content/uploads/2021/01/pescados-y-mariscos-de-temporada-1080x675.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 6,
        "cost": null,
        "address": "Pampatar, Nueva Esparta",
        "check_in": "09:00",
        "check_out": "22:00",
        "services": [
            "Actividad al aire libre",
            "Comida típica",
            "Mercado local",
            "Degustación"
        ]
    },
    {
        "title": "Dulces abrillantados de Mérida",
        "description": "Tradición dulce andina asociada a frutas, conservas y productos típicos de la región merideña.",
        "location": "Mérida",
        "type": "actividad",
        "cover_image": "https://i.pinimg.com/564x/a2/fd/81/a2fd81b263f7d466051e456015d9f8c3.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 6,
        "cost": null,
        "address": "Mérida",
        "check_in": "09:00",
        "check_out": "22:00",
        "services": [
            "Actividad al aire libre",
            "Comida típica",
            "Mercado local",
            "Degustación"
        ]
    },
    {
        "title": "Las Mercedes",
        "description": "Zona caraqueña con restaurantes, terrazas, cafés, bares y movimiento nocturno.",
        "location": "Caracas",
        "type": "lugar",
        "cover_image": "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/118BB/production/_128276817_47ddb678-f0e8-4a33-916e-5d0fdb1d78a6.jpg.webp",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 7,
        "cost": null,
        "address": "Caracas",
        "check_in": "18:00",
        "check_out": "02:00",
        "services": [
            "Restaurantes",
            "Terrazas",
            "Música",
            "Paseo nocturno"
        ]
    },
    {
        "title": "Altamira",
        "description": "Área urbana con plazas, restaurantes, cafés y opciones para paseos nocturnos en el este de la ciudad.",
        "location": "Caracas",
        "type": "lugar",
        "cover_image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/23/5e/b2/caption.jpg?w=1200&h=-1&s=1",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 7,
        "cost": null,
        "address": "Caracas",
        "check_in": "18:00",
        "check_out": "02:00",
        "services": [
            "Restaurantes",
            "Terrazas",
            "Música",
            "Paseo nocturno"
        ]
    },
    {
        "title": "Los Palos Grandes",
        "description": "Zona de restaurantes, cafés, librerías, terrazas y ambiente nocturno moderado.",
        "location": "Caracas",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Parque_Cristal%2C_Caracas.JPG",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 7,
        "cost": null,
        "address": "Caracas",
        "check_in": "18:00",
        "check_out": "02:00",
        "services": [
            "Restaurantes",
            "Terrazas",
            "Música",
            "Paseo nocturno"
        ]
    },
    {
        "title": "Juan Griego al atardecer",
        "description": "Paseo costero conocido por atardeceres, restaurantes y ambiente tranquilo junto a la bahía.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOrRdxS_ylinSJkFWlw_MEmgMZ-GFWN2ongQ&s",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 7,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "18:00",
        "check_out": "02:00",
        "services": [
            "Restaurantes",
            "Terrazas",
            "Música",
            "Paseo nocturno"
        ]
    },
    {
        "title": "Paseo Colón de Puerto La Cruz",
        "description": "Paseo marítimo con restaurantes, vistas al mar y movimiento turístico nocturno.",
        "location": "Puerto La Cruz, Anzoátegui",
        "type": "lugar",
        "cover_image": "https://i.pinimg.com/736x/d4/14/38/d414384b415609587ac10b8c326eb6a5.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 7,
        "cost": null,
        "address": "Puerto La Cruz, Anzoátegui",
        "check_in": "18:00",
        "check_out": "02:00",
        "services": [
            "Restaurantes",
            "Terrazas",
            "Música",
            "Paseo nocturno"
        ]
    },
    {
        "title": "Malecón de La Guaira",
        "description": "Espacio costero para caminar, comer y disfrutar el ambiente del litoral central.",
        "location": "Estado La Guaira",
        "type": "lugar",
        "cover_image": "https://www.carpemundi.com.br/wp-content/uploads/2024/06/la-guaira-praia.jpg.webp",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 7,
        "cost": null,
        "address": "Estado La Guaira",
        "check_in": "18:00",
        "check_out": "02:00",
        "services": [
            "Restaurantes",
            "Terrazas",
            "Música",
            "Paseo nocturno"
        ]
    },
    {
        "title": "Vereda del Lago",
        "description": "Parque urbano frente al lago, usado para caminatas, eventos, vistas y paseos al final del día.",
        "location": "Maracaibo, Zulia",
        "type": "lugar",
        "cover_image": "https://www.noticias24hrs.com.ve/wp-content/uploads/2025/05/vereda-del-lago-e1542990160834.jpg",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 7,
        "cost": null,
        "address": "Maracaibo, Zulia",
        "check_in": "18:00",
        "check_out": "02:00",
        "services": [
            "Restaurantes",
            "Terrazas",
            "Música",
            "Paseo nocturno"
        ]
    },
    {
        "title": "Paseo Orinoco",
        "description": "Paseo ribereño con vistas al Orinoco, actividad local y ambiente urbano al atardecer.",
        "location": "Ciudad Bolívar, Bolívar",
        "type": "lugar",
        "cover_image": "https://i.pinimg.com/736x/50/f0/0a/50f00a3d8a726f5d767933abb1024108.jpg",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 7,
        "cost": null,
        "address": "Ciudad Bolívar, Bolívar",
        "check_in": "18:00",
        "check_out": "02:00",
        "services": [
            "Restaurantes",
            "Terrazas",
            "Música",
            "Paseo nocturno"
        ]
    },
    {
        "title": "Zona Rosa de Mérida",
        "description": "Sector con cafés, restaurantes, bares y vida estudiantil en la ciudad andina.",
        "location": "Mérida",
        "type": "lugar",
        "cover_image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/a6/b0/ba/caption.jpg?w=1200&h=-1&s=1",
        "status": "approved",
        "rating_average": 4.5,
        "category_id": 7,
        "cost": null,
        "address": "Mérida",
        "check_in": "18:00",
        "check_out": "02:00",
        "services": [
            "Restaurantes",
            "Terrazas",
            "Música",
            "Paseo nocturno"
        ]
    },
    {
        "title": "Centro Sambil Caracas",
        "description": "Centro comercial amplio con tiendas, restaurantes, entretenimiento y servicios para visitantes.",
        "location": "Caracas",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/en/d/d8/SambilCCS.JPG",
        "status": "approved",
        "rating_average": 4.3,
        "category_id": 8,
        "cost": null,
        "address": "Caracas",
        "check_in": "10:00",
        "check_out": "21:00",
        "services": [
            "Tiendas",
            "Artesanía",
            "Gastronomía cercana",
            "Paseo familiar"
        ]
    },
    {
        "title": "CCCT",
        "description": "Centro comercial tradicional de Caracas con tiendas, servicios, restaurantes y espacios de paseo.",
        "location": "Caracas",
        "type": "lugar",
        "cover_image": "https://i.ytimg.com/vi/hZDvcDgE9H0/maxresdefault.jpg",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 8,
        "cost": null,
        "address": "Caracas",
        "check_in": "10:00",
        "check_out": "21:00",
        "services": [
            "Tiendas",
            "Artesanía",
            "Gastronomía cercana",
            "Paseo familiar"
        ]
    },
    {
        "title": "Bulevar de Sabana Grande",
        "description": "Bulevar peatonal con comercios, librerías, comida, transporte cercano y vida urbana.",
        "location": "Caracas",
        "type": "lugar",
        "cover_image": "https://ultimasnoticias.com.ve/wp-content/uploads/2022/08/Sabana-Grande.jpeg",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 8,
        "cost": null,
        "address": "Caracas",
        "check_in": "10:00",
        "check_out": "21:00",
        "services": [
            "Tiendas",
            "Artesanía",
            "Gastronomía cercana",
            "Paseo familiar"
        ]
    },
    {
        "title": "Mercado Artesanal de Mérida",
        "description": "Espacio para comprar artesanía, tejidos, recuerdos, dulces y productos andinos.",
        "location": "Mérida",
        "type": "lugar",
        "cover_image": "https://merida.es/wp-content/uploads/2023/07/mercado-a-mano-sin-prisas.jpg",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 8,
        "cost": null,
        "address": "Mérida",
        "check_in": "10:00",
        "check_out": "21:00",
        "services": [
            "Tiendas",
            "Artesanía",
            "Gastronomía cercana",
            "Paseo familiar"
        ]
    },
    {
        "title": "Mercado de Tintorero",
        "description": "Mercado artesanal conocido por tejidos, hamacas, textiles y productos tradicionales larenses.",
        "location": "Estado Lara",
        "type": "lugar",
        "cover_image": "https://media-cdn.tripadvisor.com/media/photo-s/08/d2/54/10/feria-de-tintorero.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 8,
        "cost": null,
        "address": "Estado Lara",
        "check_in": "10:00",
        "check_out": "21:00",
        "services": [
            "Tiendas",
            "Artesanía",
            "Gastronomía cercana",
            "Paseo familiar"
        ]
    },
    {
        "title": "Centro Sambil Margarita",
        "description": "Centro comercial importante de Margarita con tiendas, restaurantes y entretenimiento.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/7f/75/ee/sambil.jpg?w=700&h=400&s=1",
        "status": "approved",
        "rating_average": 4.9,
        "category_id": 8,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "10:00",
        "check_out": "21:00",
        "services": [
            "Tiendas",
            "Artesanía",
            "Gastronomía cercana",
            "Paseo familiar"
        ]
    },
    {
        "title": "Parque Costazul",
        "description": "Centro comercial moderno de Margarita con tiendas, gastronomía, cine y espacios familiares.",
        "location": "Isla de Margarita, Nueva Esparta",
        "type": "lugar",
        "cover_image": "https://forprojectpros.com/wp-content/uploads/2017/10/costaazul-1024x433.png",
        "status": "approved",
        "rating_average": 4.7,
        "category_id": 8,
        "cost": null,
        "address": "Isla de Margarita, Nueva Esparta",
        "check_in": "10:00",
        "check_out": "21:00",
        "services": [
            "Tiendas",
            "Artesanía",
            "Gastronomía cercana",
            "Paseo familiar"
        ]
    },
    {
        "title": "Mercado Turístico de Puerto La Cruz",
        "description": "Zona de compras y recuerdos asociada al turismo costero del oriente venezolano.",
        "location": "Puerto La Cruz, Anzoátegui",
        "type": "lugar",
        "cover_image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/12/aa/d5/mercado-municipal-del.jpg?w=1200&h=1200&s=1",
        "status": "approved",
        "rating_average": 4.1,
        "category_id": 8,
        "cost": null,
        "address": "Puerto La Cruz, Anzoátegui",
        "check_in": "10:00",
        "check_out": "21:00",
        "services": [
            "Tiendas",
            "Artesanía",
            "Gastronomía cercana",
            "Paseo familiar"
        ]
    },
    {
        "title": "Centro Sambil Valencia",
        "description": "Centro comercial de gran formato con tiendas, comida, entretenimiento y servicios.",
        "location": "Valencia, Carabobo",
        "type": "lugar",
        "cover_image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/7f/75/ee/sambil.jpg?w=700&h=700&s=1",
        "status": "approved",
        "rating_average": 4.8,
        "category_id": 8,
        "cost": null,
        "address": "Valencia, Carabobo",
        "check_in": "10:00",
        "check_out": "21:00",
        "services": [
            "Tiendas",
            "Artesanía",
            "Gastronomía cercana",
            "Paseo familiar"
        ]
    },
    {
        "title": "Metrópolis Valencia",
        "description": "Centro comercial ubicado en Valencia, con comercios, restaurantes y espacios de recreación.",
        "location": "Valencia, Carabobo",
        "type": "lugar",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Ccmetropolis.JPG",
        "status": "approved",
        "rating_average": 4.6,
        "category_id": 8,
        "cost": null,
        "address": "Valencia, Carabobo",
        "check_in": "10:00",
        "check_out": "21:00",
        "services": [
            "Tiendas",
            "Artesanía",
            "Gastronomía cercana",
            "Paseo familiar"
        ]
    },
    {
        "title": "Las Trinitarias",
        "description": "Centro comercial de Barquisimeto con tiendas, comida y servicios para visitantes.",
        "location": "Barquisimeto, Lara",
        "type": "lugar",
        "cover_image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/96/2c/96/centro-comercial-las.jpg?w=1200&h=1200&s=1",
        "status": "approved",
        "rating_average": 4.4,
        "category_id": 8,
        "cost": null,
        "address": "Barquisimeto, Lara",
        "check_in": "10:00",
        "check_out": "21:00",
        "services": [
            "Tiendas",
            "Artesanía",
            "Gastronomía cercana",
            "Paseo familiar"
        ]
    },
    {
        "title": "Mercado Artesanal de Quíbor",
        "description": "Zona de artesanía y cerámica larense, recomendada para comprar recuerdos y productos locales.",
        "location": "Quíbor, Lara",
        "type": "lugar",
        "cover_image": "https://media-cdn.tripadvisor.com/media/photo-s/08/d2/54/10/feria-de-tintorero.jpg",
        "status": "approved",
        "rating_average": 4.2,
        "category_id": 8,
        "cost": null,
        "address": "Quíbor, Lara",
        "check_in": "10:00",
        "check_out": "21:00",
        "services": [
            "Tiendas",
            "Artesanía",
            "Gastronomía cercana",
            "Paseo familiar"
        ]
    }
];

module.exports = {
    async up(queryInterface) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            const [[user]] = await queryInterface.sequelize.query(
                "SELECT id FROM users ORDER BY id ASC LIMIT 1",
                { transaction }
            );

            if (!user) {
                throw new Error("No existe ningún usuario. Ejecuta primero el seeder del usuario administrador.");
            }

            // Limpiar datos dependientes para evitar conflictos por FK en ambiente de desarrollo.
            await queryInterface.bulkDelete("photos", null, { transaction }).catch(() => null);
            await queryInterface.bulkDelete("reviews", null, { transaction }).catch(() => null);
            await queryInterface.bulkDelete("places", null, { transaction });
            await queryInterface.bulkDelete("categories", null, { transaction });

            await queryInterface.sequelize.query("ALTER TABLE categories AUTO_INCREMENT = 1", { transaction }).catch(() => null);
            await queryInterface.sequelize.query("ALTER TABLE places AUTO_INCREMENT = 1", { transaction }).catch(() => null);

            const now = new Date();

            await queryInterface.bulkInsert(
                "categories",
                categories.map((category) => ({
                    id: category.id,
                    name: category.name,
                    description: category.description,
                    created_at: now,
                    updated_at: now
                })),
                { transaction }
            );

            await queryInterface.bulkInsert(
                "places",
                places.map((place) => ({
                    title: place.title,
                    description: place.description,
                    location: place.location,
                    type: place.type,
                    cover_image: place.cover_image,
                    status: place.status,
                    rating_average: place.rating_average,
                    category_id: place.category_id,
                    user_id: user.id,
                    created_by_label: "system",
                    created_at: now,
                    updated_at: now,
                    cost: place.cost,
                    address: place.address,
                    check_in: place.check_in,
                    check_out: place.check_out,
                    services: JSON.stringify(place.services || [])
                })),
                { transaction }
            );

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    async down(queryInterface) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.bulkDelete("photos", null, { transaction }).catch(() => null);
            await queryInterface.bulkDelete("reviews", null, { transaction }).catch(() => null);
            await queryInterface.bulkDelete("places", null, { transaction });
            await queryInterface.bulkDelete("categories", null, { transaction });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
};
