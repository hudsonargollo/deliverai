/**
 * WhatsApp Message Variations
 * Multiple message templates that rotate to keep communications fresh and engaging
 */

import { OrderData } from './types';

/**
 * Get a random variation from an array
 */
function getRandomVariation<T>(variations: T[]): T {
  return variations[Math.floor(Math.random() * variations.length)];
}

/**
 * Payment Confirmed Message Variations (5 different versions)
 */
export function getPaymentConfirmedMessage(orderData: OrderData): string {
  const firstName = orderData.customerName.split(' ')[0];
  
  const itemsList = orderData.items
    .map(item => `• ${item.quantity}x ${item.itemName}`)
    .join('\n');

  const variations = [
    // Variation 1: Super casual and friendly
    `E aí, *${firstName}*! 😊

Seu pedido acabou de ser confirmado e já tá sendo preparado aqui!

${itemsList}

💰 Total: R$ ${orderData.totalAmount.toFixed(2)}

Fica tranquilo que em uns 15-20 min tá pronto. Te aviso quando puder buscar! �`,

    // Variation 2: Warm and conversational
    `Oi, *${firstName}*! 👋

Confirmado! Já comecei a preparar seu pedido aqui.

${itemsList}

💵 R$ ${orderData.totalAmount.toFixed(2)}

Daqui uns 15-20 minutos tá prontinho. Te mando mensagem quando estiver pronto pra você buscar! 💜`,

    // Variation 3: Friendly and direct
    `Opa, *${firstName}*! ✌️

Recebi seu pedido e já tô fazendo aqui!

${itemsList}

💰 R$ ${orderData.totalAmount.toFixed(2)}

Uns 15-20 min e tá pronto. Te chamo quando puder pegar! �`,

    // Variation 4: Upbeat and casual
    `Fala, *${firstName}*! 🤙

Beleza, pedido confirmado! Já tô preparando tudo aqui pra você.

${itemsList}

💵 R$ ${orderData.totalAmount.toFixed(2)}

Em 15-20 min tá na mão. Já te aviso! 💜`,

    // Variation 5: Simple and friendly
    `Oi, *${firstName}*! 😄

Confirmado! Seu pedido já tá sendo feito.

${itemsList}

💰 R$ ${orderData.totalAmount.toFixed(2)}

15-20 minutos e te chamo pra buscar! �💜`
  ];

  return getRandomVariation(variations);
}

/**
 * Order Ready Message Variations (5 different versions)
 */
export function getOrderReadyMessage(orderData: OrderData): string {
  const firstName = orderData.customerName.split(' ')[0];
  
  const itemsList = orderData.items
    .map(item => `• ${item.quantity}x ${item.itemName}`)
    .join('\n');

  const variations = [
    // Variation 1: Excited and friendly
    `*${firstName}*, prontinho! 🎉

Pode vir buscar aqui no balcão!

${itemsList}

Te espero aqui! �`,

    // Variation 2: Warm and inviting
    `Oi, *${firstName}*! 👋

Seu pedido tá pronto! Vem buscar aqui no balcão.

${itemsList}

Até já! 💜`,

    // Variation 3: Casual and direct
    `E aí, *${firstName}*! 🤙

Pronto! Pode vir pegar aqui no balcão.

${itemsList}

Te aguardo! �`,

    // Variation 4: Friendly and simple
    `Opa, *${firstName}*! ✌️

Tá pronto! Cola aqui pra buscar.

${itemsList}

Valeu! 💜`,

    // Variation 5: Warm and welcoming
    `*${firstName}*, pronto! 😊

Vem buscar aqui no balcão!

${itemsList}

Te espero! �💜`
  ];

  return getRandomVariation(variations);
}

/**
 * Order Preparing Message Variations (5 different versions)
 */
export function getOrderPreparingMessage(orderData: OrderData): string {
  const firstName = orderData.customerName.split(' ')[0];
  
  const itemsList = orderData.items
    .map(item => `• ${item.quantity}x ${item.itemName}`)
    .join('\n');

  const variations = [
    // Variation 1: Friendly and reassuring
    `Oi, *${firstName}*! 👨‍🍳

Já tô fazendo seu pedido aqui!

${itemsList}

Daqui uns 15-20 min tá pronto. Te aviso! �`,

    // Variation 2: Casual and warm
    `E aí, *${firstName}*! 👋

Seu pedido já tá sendo feito aqui na cozinha!

${itemsList}

Aguarda aí que logo tá pronto! 💜`,

    // Variation 3: Simple and friendly
    `Opa, *${firstName}*! 🤙

Tô preparando seu pedido!

${itemsList}

Uns 15-20 min e te chamo! �`,

    // Variation 4: Warm and conversational
    `Fala, *${firstName}*! ✌️

Já comecei a fazer aqui!

${itemsList}

Rapidinho tá pronto. Te aviso! 💜`,

    // Variation 5: Friendly and direct
    `*${firstName}*! 😊

Tô fazendo seu pedido agora!

${itemsList}

15-20 min e te chamo! �💜`
  ];

  return getRandomVariation(variations);
}

/**
 * Get notification type label in Portuguese
 */
export function getNotificationTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'order_created': 'Pedido Criado',
    'payment_confirmed': 'Pagamento Confirmado',
    'preparing': 'Em Preparo',
    'in_preparation': 'Em Preparo',
    'ready': 'Pronto para Retirada',
    'custom': 'Mensagem Personalizada',
    'confirmation': 'Confirmação',
    'status_update': 'Atualização de Status',
  };

  return labels[type] || type;
}

/**
 * Get notification status label in Portuguese
 */
export function getNotificationStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    'pending': 'Pendente',
    'sent': 'Enviada',
    'failed': 'Falhou',
    'cancelled': 'Cancelada',
  };

  return labels[status] || status;
}
