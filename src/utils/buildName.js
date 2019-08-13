export const buildCustomerName = ({ code, title }) => `${code} ${title}`;
export const buildDeviceName = ({ code, serialNumber, brandName, model }) => `${code} ${serialNumber} ${brandName} ${model}`;
export const buildMoneyName = ({ price, currency }) => (price != null ? `${price} ${currency}` : '');
export const buildCppAgreementName = (code, customerTitle) => `${code} - ${customerTitle}`;
