const subscribers = new Set();
let notifications = [];

export function addNotificationGlobal(message) {
  const item = {
    id: Date.now() + Math.random(),
    message,
    ts: new Date().toISOString(),
  };
  notifications = [item, ...notifications].slice(0, 50);
  subscribers.forEach((fn) => fn(notifications));
}

export function subscribeNotifications(callback) {
  subscribers.add(callback);
  // initial push
  callback(notifications);
  return () => subscribers.delete(callback);
}

export function getAllNotifications() {
  return notifications;
}


