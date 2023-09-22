(()=>{
    var createDomElement = (tagName='', options = {}, parent = null) => {
           var temp = document.createElement(tagName);

            for (const key in options) {
                temp.setAttribute(key, options[key]);
            }
           if(parent !== null){
               parent.appendChild(temp);
           }
           return temp;
    }



    window.addEventListener('load', () =>{

        var listCurencies = [];

        var context = {
            date: '20230917',
            currencies: [],
            selectСurrencyFrom:null,
            selectСurrencyTo:null,
        }

        var currContainer = document.querySelector('.currency-container');
        var dataTable = currContainer.querySelector('.currency-data-body table');
        var calcBtn = currContainer.querySelector('.btn-success');
        var selectedFromValuteName = currContainer.querySelector('.select-currency-from');
        var selectedFromCount = currContainer.querySelector('.fromCount');
        var selectedToValuteName = currContainer.querySelector('.select-currency-to');
        var selectedToCount = currContainer.querySelector('.toCount');


        context.getUrlApi = function () {
            return `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${this.date}&json`;
        }
        fetch(context.getUrlApi()).then((response) => {
            return response.json()
        }).then((currencies) => {
            context.currencies = currencies;
            
            context.selectСurrencyFrom = selectedFromValuteName;
            context.selectСurrencyTo = selectedToValuteName;

            context.currencies.forEach((oneCurrency, index) => {
                listCurencies.push(oneCurrency);

                var tr = createDomElement('tr', {}, dataTable);
                createDomElement('td', {}, tr).innerHTML = oneCurrency.r030;
                createDomElement('td', {}, tr).innerHTML = oneCurrency.txt;
                createDomElement('td', {}, tr).innerHTML = oneCurrency.rate;
                createDomElement('td', {}, tr).innerHTML = oneCurrency.cc;

                createDomElement('option', {
                    value:oneCurrency.cc
                }, context.selectСurrencyFrom).innerHTML = oneCurrency.txt;
                createDomElement('option', {
                    value:oneCurrency.cc
                }, context.selectСurrencyTo).innerHTML = oneCurrency.txt;
            });

        });


        var oneCurrency = {
            r030: 0,
            txt: 'Українська ГРИВНЯ',
            rate: 1,
            cc: 'UAH'
        };

        listCurencies.push(oneCurrency);

        var tr = createDomElement('tr', {}, dataTable);
        createDomElement('td', {}, tr).innerHTML = oneCurrency.r030;
        createDomElement('td', {}, tr).innerHTML = oneCurrency.txt;
        createDomElement('td', {}, tr).innerHTML = oneCurrency.rate;
        createDomElement('td', {}, tr).innerHTML = oneCurrency.cc;

        createDomElement('option', {
            value:oneCurrency.cc
        }, currContainer.querySelector('.select-currency-from')).innerHTML = oneCurrency.txt;
        createDomElement('option', {
            value:oneCurrency.cc
        }, currContainer.querySelector('.select-currency-to')).innerHTML = oneCurrency.txt;

        calcBtn.addEventListener('click', ()=> {
            if(selectedFromCount.value != 0 && !isNaN(selectedFromCount.value)) {
                let moneyFrom = selectedFromCount.value;
                let rateMoneyFrom = listCurencies.find(s => s.cc == selectedFromValuteName.value).rate;
                let rateMoneyTo = listCurencies.find(s => s.cc == selectedToValuteName.value).rate;
                selectedToCount.value = Math.round((moneyFrom * rateMoneyFrom / rateMoneyTo) * 100) / 100;
            }
        });


    });
    


})()