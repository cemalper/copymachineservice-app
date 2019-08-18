const KP = (value, text) => ({ value, text });
Array.prototype.toValue = function() {
  this.map(arr => arr.value);
};

export const currenyTypePair = [KP("TL", "TL"), KP("Dolar", "Dolar"), KP("Euro", "Euro")];
export const cppAgreementStatusTypePair = [KP("Active", "Aktif"), KP("Draft", "Taslak"), KP("Canceled", "İptal Edildi"), KP("Completed", "Tamamlandı")];
export const cppAgreementDeviceTypePair = [KP("Rent", "Kiralık"), KP("Client", "Müşteri")];
export const cppAgreementPrintedPagePriceTypePair = [KP("Normal", "Normal"), KP("Reduced", "İndirimli"), KP("Wastage", "Ücretsiz")];
export const deviceColourTypePair = [KP("Black", "Siyah"), KP("Colour", "Renkli")];
export const deviceTypePair = [KP("PhotoCopier", "Fotokopi"), KP("Printer", "Yazıcı")];
export const deviceCostTypePair = [KP("Service", "Servis"), KP("Toner", "Toner"), KP("ReplacementPart", "Yedek Parça")];
export const brandNamesPair = [KP("Kyocera", "Kyocera"), KP("Minolta", "Minolta"), KP("Canon", "Canon"), KP("HP", "HP"), KP("Xerox", "Xerox"), KP("Olivetti", "Olivetti")];

export const currenyType = currenyTypePair.toValue();
export const cppAgreementStatusType = cppAgreementStatusTypePair.toValue();
export const cppAgreementDeviceType = cppAgreementDeviceTypePair.toValue();
export const cppAgreementPrintedPagePriceType = cppAgreementPrintedPagePriceTypePair.toValue();
export const deviceColourType = deviceColourTypePair.toValue();
export const deviceType = deviceTypePair.toValue();
export const deviceCostType = deviceCostTypePair.toValue();
export const brandNames = brandNamesPair.toValue();