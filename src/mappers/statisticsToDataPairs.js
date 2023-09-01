export default function (apiStats) {
    apiStats = apiStats || {};
    apiStats.restaurantsCount = apiStats.restaurantsCount || {};
    apiStats.countriesCount = apiStats.countriesCount || {};
    apiStats.revenues = apiStats.revenues || [];
    apiStats.countriesOverall = apiStats.countriesOverall
        || apiStats.countriesCount.Dodopizza
        || 1;

    const revenues = apiStats.revenues.reduce((acc, i) => {
        const x = acc[i.type] = acc[i.type] || {};
        if (i.currency === 'USD') x.revenueUsd = i.revenue;
        if (i.currency === 'RUB') x.revenueRub = i.revenue;
        if (i.increasePercentage) x.percentIncrease = i.increasePercentage;
        return acc;
    }, {});

    let unitsOverall = 0;
    function unitsInfo(key) {
        const units = apiStats.restaurantsCount[key] || 1;
        const countries = apiStats.countriesCount[key] || 1;
        const r = [
            {title: units === 1 ? 'unit' : 'units', value: units},
        ];
        if (countries > 1) {
            r.push({ title: 'countries', value: countries });
        }
        unitsOverall += units;
        return r;
    }

    return {
        global: {
            dodopizza: unitsInfo('Dodopizza'),
            drinkit: unitsInfo('Drinkit'),
            doner42: unitsInfo('Doner42'),
            people: [
                {title: 'team members', value: apiStats.employeesCount || 1},
            ],
            units: [
                {title: 'units', value: unitsOverall},
            ],
            countries: [
                {title: 'countries', value: apiStats.countriesOverall || 1},
            ],
        },
        moneyOrders: {
            thisYear: revenues.Year || {},
            thisMonth: revenues.Month || {},
            today: revenues.Day || {},
            ordersPerMinute: apiStats.ordersPerMinute || 420,
        },
    };

}