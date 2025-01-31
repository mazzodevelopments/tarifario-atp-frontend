declare global {
  interface Number {
    formatNumber(locale?: string, options?: Intl.NumberFormatOptions): string;
  }
}

if (!Number.prototype.formatNumber) {
  Number.prototype.formatNumber = function (
    locale: string = "en-US",
    options: Intl.NumberFormatOptions = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  ): string {
    return this.toLocaleString(locale, options);
  };
}

export {};
