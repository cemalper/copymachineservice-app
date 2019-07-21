const entityGenerator = (entityName, entityDisplayName) => ({ entityName, entityDisplayName });

export default {
  customer: entityGenerator("customer", "Müşteri"),
  device: entityGenerator("device", "Cihaz"),
};
