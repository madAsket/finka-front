import {useProjectStore} from "@/stores/project"

const currencyPolifyl = {
    aliases:{
        "USDT":"USD",
        "USDC":"USD",
        "BUSD":"USD",
        "AVAX":"AVA",
    },
    invalid:{
        "DOGE":"",
        "SHIB":"",
        "FLOW":"",
        "EGLD":"",
        "BTTC":"",
        "ATOM":""
    }
};

export default {
    install: (app, options) => {
        const projectStore = useProjectStore();
        const convertCurrency = (value, fromCurrency, toCurrency) => {
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
        app.config.globalProperties.$convertCurrency = convertCurrency;
        const getCurrencyValue = (symbol, valueToConvert) =>{
            if(valueToConvert >= 1){
                return `${symbol}${new Intl.NumberFormat().format(valueToConvert)}`;
            }else{
                return `${symbol}${new Intl.NumberFormat('en-EN', { minimumSignificantDigits: 1 }).format(valueToConvert)}`;
            }
        }
        const formatCurrency = (valueToConvert, toCurrency) => {
            //if fiat;
            let currencySettings = projectStore.currency.fiat[toCurrency];
            if(currencySettings){
                return getCurrencyValue(`${currencySettings.symbol}`, valueToConvert);
            }
            //if crypto;
            currencySettings = projectStore.currency.crypto[toCurrency];
            if(currencySettings){
                return getCurrencyValue(`${currencySettings.symbol} `, valueToConvert);
            }
            return valueToConvert;
        }
     
        app.config.globalProperties.$formatCurrency = formatCurrency;
        app.config.globalProperties.$currencyFieldProps = (currency) => {
            let props = {
                maxFractionDigits:10,
                minFractionDigits:2,
            };
            if(!currency){
                return props;
            }
            if(currencyPolifyl.invalid.hasOwnProperty(currency)){
                props.mode = "decimal",
                props.prefix = `${currency} `;
            }else{
                props.mode = "currency";
                props.currency = currencyPolifyl.aliases[currency] || currency;
            }
            return props;
        }
        app.provide('currencyFormatter', {
            convertCurrency,
            formatCurrency
        });
    }
  }