// script.js

const data = {
    "Stalin Fernando Armijo": {
        edad: "16 años",
        fechaNacimiento: "4 de agosto de 2007",
        lugarOrigen: "San Luis de Pambil, Ecuador",
        familia: {
            madre: "Marylin",
            hermanos: ["Ingrid", "Deymar", "Rafael"]
        },
        estudios: "2º de Bachillerato en el colegio Distacia (solo fines de semana)",
        amigo: "Diego Macias",
        intereses: ["Juegos (Solo Leveling: Arcie)", "Pasar tiempo con Nury"],
        personalidad: ["Sincero", "Auténtico", "Motivado"]
    },
    "Nury": {
        edad: "15 años",
        familia: {
            padre: "separado de su madre",
            hermanaMayor: "se fue con su madre",
            hermanoMayor: true
        },
        situacionFamiliar: "Padres separados, madre ausente",
        relacionConStalin: {
            confesiones: "Se confesó primero por WhatsApp",
            estado: "Tú quieres reconquistarla y enamorarla"
        },
        personalidad: "No se especifica, pero parece ser una persona que te gusta y te inspira"
    }
};

let context = {
    lastPerson: null
};

function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userMessage = inputField.value.toLowerCase().trim();

    if (!userMessage) return;

    appendMessage('You', inputField.value);
    const response = getResponse(userMessage);
    appendMessage('AI', response);
    inputField.value = '';
}

function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function getResponse(message) {
    const normalizedMessage = message.toLowerCase();

    const personMentioned = identifyPerson(normalizedMessage);

    if (personMentioned) {
        context.lastPerson = personMentioned;
    }

    if (context.lastPerson) {
        if (normalizedMessage.includes("edad") || normalizedMessage.includes("cuántos años")) {
            return `${context.lastPerson} tiene ${data[context.lastPerson].edad}.`;
        } else if (normalizedMessage.includes("hermanos") || normalizedMessage.includes("familia") || normalizedMessage.includes("familiares")) {
            return getFamilyDetails(context.lastPerson);
        } else if (normalizedMessage.includes("amigo") || normalizedMessage.includes("amigos")) {
            return getFriendDetails(context.lastPerson);
        } else if (normalizedMessage.includes("educación") || normalizedMessage.includes("estudios")) {
            return getEducationDetails(context.lastPerson);
        } else if (normalizedMessage.includes("pasatiempos") || normalizedMessage.includes("intereses")) {
            return getHobbiesDetails(context.lastPerson);
        } else if (normalizedMessage.includes("empleo") || normalizedMessage.includes("trabajo")) {
            return getJobDetails(context.lastPerson);
        } else if (normalizedMessage.includes("futuro") || normalizedMessage.includes("planes futuros")) {
            return getFuturePlans(context.lastPerson);
        } else if (normalizedMessage.includes("logros") || normalizedMessage.includes("éxitos")) {
            return getAchievements(context.lastPerson);
        } else if (normalizedMessage.includes("desafíos") || normalizedMessage.includes("dificultades")) {
            return getChallenges(context.lastPerson);
        } else if (normalizedMessage.includes("información") || normalizedMessage.includes("detalles") || normalizedMessage.includes("qué sabes")) {
            return getPersonDetails(context.lastPerson);
        }
    }

    if (normalizedMessage.includes("hola") || normalizedMessage.includes("buenos días") || normalizedMessage.includes("buenas tardes") || normalizedMessage.includes("buenas noches")) {
        return "¡Hola! ¿En qué puedo ayudarte hoy? Si tienes preguntas sobre Stalin Fernando Armijo o Nury, estaré encantado de responderlas.";
    } else if (normalizedMessage.includes("cómo estás") || normalizedMessage.includes("qué tal") || normalizedMessage.includes("cómo te va")) {
        return "Estoy bien, gracias por preguntar. ¿Y tú? ¿Cómo puedo asistirte hoy?";
    } else if (normalizedMessage.includes("ayuda") || normalizedMessage.includes("asistencia") || normalizedMessage.includes("necesito ayuda")) {
        return "Claro, estoy aquí para ayudarte. ¿Sobre qué tema necesitas información o asistencia?";
    } else if (normalizedMessage.includes("adiós") || normalizedMessage.includes("hasta luego") || normalizedMessage.includes("nos vemos")) {
        return "¡Hasta luego! Si necesitas más información en el futuro, no dudes en preguntar. ¡Que tengas un buen día!";
    } else if (normalizedMessage.includes("información general") || normalizedMessage.includes("detalles generales") || normalizedMessage.includes("de qué trata esto")) {
        return "Este bot está diseñado para proporcionar información sobre dos personas específicas: Stalin Fernando Armijo y Nury. Puedes preguntar sobre sus detalles personales, familia, intereses, estudios y mucho más.";
    } else if (normalizedMessage.includes("preguntas frecuentes") || normalizedMessage.includes("cómo funciona") || normalizedMessage.includes("dudas comunes")) {
        return "Puedes preguntar sobre aspectos específicos de Stalin Fernando Armijo o Nury, incluyendo su edad, familia, estudios, intereses, y más. También puedo responder a preguntas generales sobre cómo uso esta información.";
    } else if (normalizedMessage.includes("cuál es tu propósito") || normalizedMessage.includes("por qué existes") || normalizedMessage.includes("qué puedes hacer")) {
        return "Mi propósito es proporcionar información detallada sobre Stalin Fernando Armijo y Nury, así como responder a preguntas generales relacionadas con ellos. Si tienes alguna pregunta específica, no dudes en hacerla.";
    } else if (normalizedMessage.includes("error") || normalizedMessage.includes("problema") || normalizedMessage.includes("no entiendo")) {
        return "Lo siento si algo no quedó claro. Por favor, proporciona más detalles o reformula tu pregunta y estaré encantado de ayudarte.";
    } else {
        return "No estoy seguro de a qué te refieres. ¿Puedes proporcionar más detalles o hacer una pregunta específica sobre Stalin Fernando Armijo o Nury?";
    }
}

function identifyPerson(message) {
    if (message.includes("stalin") || message.includes("fernando") || message.includes("armijo")) {
        return "Stalin Fernando Armijo";
    } else if (message.includes("nury")) {
        return "Nury";
    }
    return null;
}

function getPersonDetails(person) {
    const details = data[person];
    if (!details) return `No tengo información sobre ${person}.`;
    return `Aquí tienes información sobre ${person}: Edad: ${details.edad}, Fecha de nacimiento: ${details.fechaNacimiento}, Lugar de origen: ${details.lugarOrigen}, Familia: Madre: ${details.familia.madre}, Hermanos: ${details.familia.hermanos.join(", ")}, Estudios: ${details.estudios}, Amigo: ${details.amigo}, Intereses: ${details.intereses.join(", ")}, Personalidad: ${details.personalidad.join(", ")}.`;
}

function getFamilyDetails(person) {
    const details = data[person]?.familia;
    if (!details) return `No tengo información sobre la familia de ${person}.`;
    return `La familia de ${person} incluye: Padre: ${details.padre || "No especificado"}, Hermana mayor: ${details.hermanaMayor || "No especificado"}, Hermano mayor: ${details.hermanoMayor ? "Sí" : "No"}.`;
}

function getFriendDetails(person) {
    const friend = data[person]?.amigo;
    if (!friend) return `No tengo información sobre los amigos de ${person}.`;
    return `El amigo de ${person} es ${friend}.`;
}

function getEducationDetails(person) {
    const studies = data[person]?.estudios;
    if (!studies) return `No tengo información sobre la educación de ${person}.`;
    return `${person} está cursando ${studies}.`;
}

function getHobbiesDetails(person) {
    const hobbies = data[person]?.intereses;
    if (!hobbies) return `No tengo información sobre los pasatiempos de ${person}.`;
    return `${person} tiene los siguientes intereses: ${hobbies.join(", ")}.`;
}

function getJobDetails(person) {
    // Aquí puedes agregar detalles sobre el empleo si se especifican en el futuro.
    return `No tengo información sobre el empleo de ${person}.`;
}

function getFuturePlans(person) {
    // Aquí puedes agregar detalles sobre los planes futuros si se especifican en el futuro.
    return `No tengo información sobre los planes futuros de ${person}.`;
}

function getAchievements(person) {
    // Aquí puedes agregar detalles sobre los logros si se especifican en el futuro.
    return `No tengo información sobre los logros de ${person}.`;
}

function getChallenges(person) {
    // Aquí puedes agregar detalles sobre los desafíos si se especifican en el futuro.
    return `No tengo información sobre los desafíos de ${person}.`;
}

// Función para mostrar mensajes con animación de escritura lenta
function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Función para añadir mensajes al área de mensajes
function appendMessage(sender, message) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: `;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    if (sender === 'AI') {
        typeWriter(messageElement, message, 50); // Ajusta la velocidad de escritura aquí (en milisegundos)
    } else {
        messageElement.textContent = `${sender}: ${message}`;
    }
}

// Función principal para manejar mensajes del usuario
function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userMessage = inputField.value.toLowerCase().trim();

    if (!userMessage) return;

    appendMessage('You', inputField.value);
    const response = getResponse(userMessage);
    appendMessage('AI', response);
    inputField.value = '';
}

// Función para obtener respuesta basada en el mensaje del usuario
function getResponse(message) {
    const normalizedMessage = message.toLowerCase();

    const personMentioned = identifyPerson(normalizedMessage);

    if (personMentioned) {
        context.lastPerson = personMentioned;
    }

    if (context.lastPerson) {
        if (normalizedMessage.includes("edad") || normalizedMessage.includes("cuántos años")) {
            return `${context.lastPerson} tiene ${data[context.lastPerson].edad}.`;
        } else if (normalizedMessage.includes("hermanos") || normalizedMessage.includes("familia") || normalizedMessage.includes("familiares")) {
            return getFamilyDetails(context.lastPerson);
        } else if (normalizedMessage.includes("amigo") || normalizedMessage.includes("amigos")) {
            return getFriendDetails(context.lastPerson);
        } else if (normalizedMessage.includes("educación") || normalizedMessage.includes("estudios")) {
            return getEducationDetails(context.lastPerson);
        } else if (normalizedMessage.includes("pasatiempos") || normalizedMessage.includes("intereses")) {
            return getHobbiesDetails(context.lastPerson);
        } else if (normalizedMessage.includes("empleo") || normalizedMessage.includes("trabajo")) {
            return getJobDetails(context.lastPerson);
        } else if (normalizedMessage.includes("futuro") || normalizedMessage.includes("planes futuros")) {
            return getFuturePlans(context.lastPerson);
        } else if (normalizedMessage.includes("logros") || normalizedMessage.includes("éxitos")) {
            return getAchievements(context.lastPerson);
        } else if (normalizedMessage.includes("desafíos") || normalizedMessage.includes("dificultades")) {
            return getChallenges(context.lastPerson);
        } else if (normalizedMessage.includes("información") || normalizedMessage.includes("detalles") || normalizedMessage.includes("qué sabes")) {
            return getPersonDetails(context.lastPerson);
        }
    }

    if (normalizedMessage.includes("hola") || normalizedMessage.includes("buenos días") || normalizedMessage.includes("buenas tardes") || normalizedMessage.includes("buenas noches")) {
        return "¡Hola! ¿En qué puedo ayudarte hoy? Si tienes preguntas sobre Stalin Fernando Armijo o Nury, estaré encantado de responderlas.";
    } else if (normalizedMessage.includes("cómo estás") || normalizedMessage.includes("qué tal") || normalizedMessage.includes("cómo te va")) {
        return "Estoy bien, gracias por preguntar. ¿Y tú? ¿Cómo puedo asistirte hoy?";
    } else if (normalizedMessage.includes("ayuda") || normalizedMessage.includes("asistencia") || normalizedMessage.includes("necesito ayuda")) {
        return "Claro, estoy aquí para ayudarte. ¿Sobre qué tema necesitas información o asistencia?";
    } else if (normalizedMessage.includes("adiós") || normalizedMessage.includes("hasta luego") || normalizedMessage.includes("nos vemos")) {
        return "¡Hasta luego! Si necesitas más información en el futuro, no dudes en preguntar. ¡Que tengas un buen día!";
    } else if (normalizedMessage.includes("información general") || normalizedMessage.includes("detalles generales") || normalizedMessage.includes("de qué trata esto")) {
        return "Este bot está diseñado para proporcionar información sobre dos personas específicas: Stalin Fernando Armijo y Nury. Puedes preguntar sobre sus detalles personales, familia, intereses, y más.";
    } else if (normalizedMessage.includes("preguntas frecuentes") || normalizedMessage.includes("cómo funciona") || normalizedMessage.includes("dudas comunes")) {
        return "Puedes preguntar sobre aspectos específicos de Stalin Fernando Armijo o Nury, incluyendo su edad, familia, estudios, intereses, y más. También puedo responder a preguntas generales sobre cómo uso esta información.";
    } else if (normalizedMessage.includes("cuál es tu propósito") || normalizedMessage.includes("por qué existes") || normalizedMessage.includes("qué puedes hacer")) {
        return "Mi propósito es proporcionar información detallada sobre Stalin Fernando Armijo y Nury, así como responder a preguntas generales relacionadas con ellos. Si tienes alguna pregunta específica, no dudes en hacerla.";
    } else if (normalizedMessage.includes("error") || normalizedMessage.includes("problema") || normalizedMessage.includes("no entiendo")) {
        return "Lo siento si algo no quedó claro. Por favor, proporciona más detalles o reformula tu pregunta y estaré encantado de ayudarte.";
    } else {
        return "No estoy seguro de a qué te refieres. ¿Puedes proporcionar más detalles o hacer una pregunta específica sobre Stalin Fernando Armijo o Nury?";
    }
}

function identifyPerson(message) {
    if (message.includes("stalin") || message.includes("fernando") || message.includes("armijo")) {
        return "Stalin Fernando Armijo";
    } else if (message.includes("nury")) {
        return "Nury";
    }
    return null;
}
