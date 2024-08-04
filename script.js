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

function saveConversation() {
    const messagesDiv = document.getElementById('messages');
    localStorage.setItem('conversation', messagesDiv.innerHTML);
}

function loadConversation() {
    const savedConversation = localStorage.getItem('conversation');
    if (savedConversation) {
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = savedConversation;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}

function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userMessage = inputField.value.toLowerCase().trim();

    if (!userMessage) return;

    appendMessage('You', inputField.value);
    const response = getResponse(userMessage);
    appendMessage('AI', response);
    inputField.value = '';
    saveConversation();
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
        return "¡Hola! Soy una IA creada por Fernando para servirte. ¿En qué puedo ayudarte hoy? Si tienes preguntas sobre Stalin Fernando Armijo o Nury, estaré encantado de responderlas.";
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
    } else if (normalizedMessage.includes("dudas comunes") || normalizedMessage.includes("preguntas frecuentes")) {
        return "Puedes preguntar sobre aspectos específicos de Stalin Fernando Armijo o Nury, incluyendo su edad, familia, estudios, intereses, y más. También puedo responder a preguntas generales sobre cómo uso esta información.";
    } else {
        return "Lo siento, no entendí tu pregunta. Puedes intentar preguntar algo sobre Stalin Fernando Armijo o Nury, o decir 'hola' para obtener más información.";
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
    return `Aquí tienes información sobre ${person}: ${Object.entries(data[person]).map(([key, value]) => `${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`).join(", ")}.`;
}

function getFamilyDetails(person) {
    if (person === "Stalin Fernando Armijo") {
        return `Stalin Fernando Armijo tiene los siguientes hermanos: ${data["Stalin Fernando Armijo"].familia.hermanos.join(", ")}. Su madre es ${data["Stalin Fernando Armijo"].familia.madre}.`;
    } else if (person === "Nury") {
        return `Nury tiene un hermano mayor y su hermana mayor se fue con su madre. Su padre está separado de su madre.`;
    }
}

function getFriendDetails(person) {
    if (person === "Stalin Fernando Armijo") {
        return `El amigo de Stalin Fernando Armijo es ${data["Stalin Fernando Armijo"].amigo}.`;
    }
    return "No tengo información sobre los amigos de esa persona.";
}

function getEducationDetails(person) {
    if (person === "Stalin Fernando Armijo") {
        return `Stalin Fernando Armijo está estudiando 2º de Bachillerato en el colegio Distacia los fines de semana.`;
    }
    return "No tengo información sobre la educación de esa persona.";
}

function getHobbiesDetails(person) {
    if (person === "Stalin Fernando Armijo") {
        return `A Stalin Fernando Armijo le interesa jugar a "Solo Leveling: Arcie" y pasar tiempo con Nury.`;
    }
    return "No tengo información sobre los pasatiempos de esa persona.";
}

function getJobDetails(person) {
    if (person === "Stalin Fernando Armijo") {
        return `No tengo información sobre el empleo de Stalin Fernando Armijo.`;
    }
    return "No tengo información sobre el empleo de esa persona.";
}

function getFuturePlans(person) {
    if (person === "Stalin Fernando Armijo") {
        return `No tengo información sobre los planes futuros de Stalin Fernando Armijo.`;
    }
    return "No tengo información sobre los planes futuros de esa persona.";
}

function getAchievements(person) {
    if (person === "Stalin Fernando Armijo") {
        return `No tengo información sobre los logros de Stalin Fernando Armijo.`;
    }
    return "No tengo información sobre los logros de esa persona.";
}

function getChallenges(person) {
    if (person === "Stalin Fernando Armijo") {
        return `No tengo información sobre los desafíos que ha enfrentado Stalin Fernando Armijo.`;
    }
    return "No tengo información sobre los desafíos de esa persona.";
}

function appendMessage(sender, message, instant = false) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender.toLowerCase()}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    if (sender === 'AI' && !instant) {
        let index = 0;
        const typingSpeed = 50; // Velocidad de escritura en milisegundos

        function type() {
            if (index < message.length) {
                messageElement.textContent += message.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            }
        }

        type();
    } else {
        messageElement.innerHTML = message;
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            appendMessage('You', `<img src="${imageUrl}" alt="Uploaded Image">`);
        };
        reader.readAsDataURL(file);
    }
}

window.onload = function() {
    loadConversation();
    const messagesDiv = document.getElementById('messages');
    if (!messagesDiv.hasChildNodes()) {
        // Solo envía el mensaje de bienvenida si no hay mensajes en el div
        setTimeout(() => {
            appendMessage('AI', "Hola, bienvenido. Soy una IA creada por Fernando para servirte. ¿En qué puedo ayudarte hoy?");
        }, 500); // 0.5 segundos de retraso para simular escritura
    }
};

document.getElementById('upload-button').addEventListener('click', () => {
    document.getElementById('upload-input').click();
});

document.getElementById('upload-input').addEventListener('change', handleImageUpload);
