export default {
  logAction: ({ object, from, to, event, context }) => {
    context.sendNotification({
      notification: {
        message: `Object with id: ${object.id} was pushed [${from} -> ${to}] by event: ${event}`,
        level: 'info'
      }
    });
  }
}
