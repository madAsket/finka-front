import {useProjectStore} from "@/stores/project"

export default {
    install: (app, options) => {
        const projectStore = useProjectStore();
        app.config.globalProperties.$convertCurrency = (value, fromCurrency, toCurrency) => {
            let valueToConvert = value;
            if(fromCurrency !== toCurrency){
                const rate = projectStore.rates[fromCurrency];
                if(rate){
                    valueToConvert = value * rate;
                }else{
                    return "Waiting for rate";
                }
            }
            return app.config.globalProperties.$formatCurrency(valueToConvert, toCurrency);
        }
        app.config.globalProperties.$formatCurrency = (valueToConvert, toCurrency) => {
            //if fiat;
            let currencySettings = projectStore.currency.fiat[toCurrency];
            if(currencySettings){
                return `${currencySettings.symbol}${new Intl.NumberFormat().format(valueToConvert)}`;
            }
            //if crypto;
            currencySettings = projectStore.currency.crypto[toCurrency];
            if(currencySettings){
                return `${currencySettings.symbol} ${new Intl.NumberFormat().format(valueToConvert)}`;
            }
            return valueToConvert;
        }
    }
  }