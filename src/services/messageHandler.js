import whatsappService from './whatsappService.js';

class MessageHandler {
  async handleIncomingMessage(message) {
    if (message?.type === 'text') {
      const incomingMessage = message.text.body.toLowerCase().trim();
      // Extract and format the from number
      const fromNumber = message.from.slice(0, 2) + message.from.slice(3);

      if(this.isGreeting(incomingMessage)){
        await this.sendWelcomeMessage(fromNumber, message.id)
      } else {
        const response = `Echo: ${message.text.body}`;
        await whatsappService.sendMessage(fromNumber, response, message.id);
      }
      await whatsappService.markAsRead(message.id);
    }
  }

  isGreeting(message) {
    const greetings = ["hola", "hello", "hi", "buenas tardes"];
    return greetings.includes(message);
  }

  async sendWelcomeMessage(to, messageId) {
    const welcomeMessage = "Hola, Bienvenido a nuestro servicio de Veteria online." + 
    "¿En Qué puedo ayudarte Hoy?";
    await whatsappService.sendMessage(to, welcomeMessage, messageId);
  }

}

export default new MessageHandler();
