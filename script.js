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
    },
    "Relación entre tú y Nury": {
        conocidosEnElColegio: true,
        confesiones: "Nury se confesó primero por WhatsApp",
        experienciaRomantica: "Tú no tenías experiencia romántica en ese momento",
        estadoActual: "Ahora quieres reconquistarla y enamorarla",
        altibajos: "Habéis tenido altibajos en la relación, pero sigues interesado en ella"
    }
};

let context = {
    lastPerson: null,
    lastQuestion: null
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

function getResponse(message) {
    const normalizedMessage = message.toLowerCase();

    // Saludos y respuestas generales
    if (normalizedMessage.includes("hola") || normalizedMessage.includes("buenos días") || normalizedMessage.includes("buenas tardes") || normalizedMessage.includes("buenas noches")) {
        context.lastQuestion = "saludo";
        return "¡Hola! ¿En qué puedo ayudarte hoy?";
    }

    if (normalizedMessage.includes("cómo estás") || normalizedMessage.includes("qué tal")) {
        context.lastQuestion = "estado";
        return "Estoy bien, gracias por preguntar. ¿Y tú?";
    }

    // Preguntas sobre Stalin
    if (normalizedMessage.includes("stalin")) {
        context.lastPerson = "Stalin Fernando Armijo";
    } else if (normalizedMessage.includes("nury")) {
        context.lastPerson = "Nury";
    }

    // Respuestas basadas en el contexto
    if (context.lastPerson) {
        if (normalizedMessage.includes("edad") || normalizedMessage.includes("cuántos años")) {
            return `${context.lastPerson} tiene ${data[context.lastPerson].edad}.`;
        } else if (normalizedMessage.includes("hermanos")) {
            if (context.lastPerson === "Stalin Fernando Armijo") {
                return `Stalin Fernando Armijo tiene los siguientes hermanos: ${data["Stalin Fernando Armijo"].familia.hermanos.join(", ")}.`;
            } else if (context.lastPerson === "Nury") {
                return `Nury tiene un hermano mayor y su hermana mayor se fue con su madre.`;
            }
        } else if (normalizedMessage.includes("amigos")) {
            if (context.lastPerson === "Stalin Fernando Armijo") {
                return `El amigo de Stalin Fernando Armijo es ${data["Stalin Fernando Armijo"].amigo}.`;
            }
        } else if (normalizedMessage.includes("lugar de origen")) {
            if (context.lastPerson === "Stalin Fernando Armijo") {
                return `Stalin Fernando Armijo es de ${data["Stalin Fernando Armijo"].lugarOrigen}.`;
            }
        } else if (normalizedMessage.includes("estudios") || normalizedMessage.includes("qué estudia")) {
            if (context.lastPerson === "Stalin Fernando Armijo") {
                return `Stalin Fernando Armijo está en ${data["Stalin Fernando Armijo"].estudios}.`;
            }
        } else if (normalizedMessage.includes("intereses")) {
            if (context.lastPerson === "Stalin Fernando Armijo") {
                return `A Stalin Fernando Armijo le gusta ${data["Stalin Fernando Armijo"].intereses.join(" y ")}.`;
            }
        } else if (normalizedMessage.includes("personalidad")) {
            if (context.lastPerson === "Stalin Fernando Armijo") {
                return `La personalidad de Stalin Fernando Armijo es ${data["Stalin Fernando Armijo"].personalidad.join(", ")}.`;
            } else if (context.lastPerson === "Nury") {
                return `La personalidad de Nury no está especificada, pero parece ser una persona que te gusta y te inspira.`;
            }
        } else if (normalizedMessage.includes("relación") || normalizedMessage.includes("cómo va la relación")) {
            return `La relación entre tú y Nury es que se conocieron en el colegio y Nury se confesó primero por WhatsApp. Actualmente, quieres reconquistarla y enamorarla.`;
        }
    }

    // Preguntas relacionadas
    if (normalizedMessage.includes("hermanos") || normalizedMessage.includes("amigos") || normalizedMessage.includes("lugar de origen") || normalizedMessage.includes("estudios") || normalizedMessage.includes("intereses") || normalizedMessage.includes("personalidad")) {
        if (context.lastPerson) {
            return getResponse(`${context.lastPerson.toLowerCase()} ${message}`);
        }
    }

    // Respuesta predeterminada
    return "Lo siento, no tengo información sobre eso. ¿Hay algo más específico sobre Stalin o Nury que pueda ayudarte a responder?";
}

function appendMessage(sender, message) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
} 