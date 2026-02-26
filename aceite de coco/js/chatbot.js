function toggleChat() {
    const window = document.getElementById('chatbotWindow');
    window.classList.toggle('active');
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message !== "") {
        addMessage(message, 'user');
        input.value = '';
        
        // Simular respuesta del bot después de un pequeño retraso
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 600);
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    // Si es del bot y contiene la palabra WhatsApp, permitimos HTML para el link
    if (sender === 'bot' && text.includes('href="https://wa.me/')) {
        messageDiv.innerHTML = text;
    } else {
        messageDiv.innerText = text;
    }
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll al final
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(input) {
    const msg = input.toLowerCase();
    const waLink = '<br><a href="https://wa.me/573116695876" target="_blank" class="chat-wa-btn">Hablar por WhatsApp 📲</a>';
    
    if (msg.includes('hola') || msg.includes('buenos dias') || msg.includes('buenas tardes')) {
        return "¡Hola! ¿Cómo puedo ayudarte con nuestro aceite de coco hoy?" + waLink;
    } else if (msg.includes('precio') || msg.includes('costo') || msg.includes('cuanto vale') || msg.includes('valor')) {
        let response = "";
        if (msg.includes('30')) {
            response = "La presentación de 30ml (viaje o prueba) tiene un precio de $15.000 pesos.";
        } else if (msg.includes('100ml') || (msg.includes('100') && !msg.includes('1000'))) {
            response = "La presentación de 100ml (uso personal) tiene un precio de $35.000 pesos.";
        } else if (msg.includes('250')) {
            response = "La presentación de 250ml (uso frecuente) tiene un precio de $65.000 pesos.";
        } else if (msg.includes('1000') || msg.includes('litro')) {
            response = "La presentación de 1000ml (uso familiar) tiene un precio de $200.000 pesos.";
        } else {
            response = "Manejamos estos precios:<br>- 30ml: $15.000<br>- 100ml: $35.000<br>- 250ml: $65.000<br>- 1000ml: $200.000<br>¿Cuál te gustaría pedir?";
        }
        return response + waLink;
    } else if (msg.includes('beneficio') || msg.includes('sirve') || msg.includes('para que')) {
        return "Nuestro aceite es 100% natural, prensado en frío. Sirve para hidratar la piel, el cabello y también para cocinar de forma saludable." + waLink;
    } else if (msg.includes('comprar') || msg.includes('pedido') || msg.includes('ordenar')) {
        return "¡Genial! Puedes hacer tu pedido directamente haciendo clic aquí:" + waLink;
    } else if (msg.includes('envio') || msg.includes('domicilio')) {
        return "Hacemos envíos a todo el país. El costo depende de tu ubicación. Cuéntanos por WhatsApp dónde te encuentras para cotizarte:" + waLink;
    } else if (msg.includes('gracias') || msg.includes('chao') || msg.includes('adios')) {
        return "¡Con gusto! Si tienes más dudas, aquí estaré. ¡Que tengas un gran día! 🥥";
    } else {
        return "No estoy seguro de entenderte, pero puedes preguntarme por precios, beneficios o cómo comprar. También puedes hablarnos directamente aquí:" + waLink;
    }
}
