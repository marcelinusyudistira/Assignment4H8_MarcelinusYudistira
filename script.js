let dataCovid = {}

document.getElementById('submitButton').addEventListener('click', function() {
    var countryInputValue = document.getElementById('countryInput').value.trim();
    let covidArray = []
    
    // cek apakah input negara kosong atau tidak
    if (!countryInputValue) {
        alert('Masukkan nama negara terlebih dahulu.');
        return;
    }

    tempHtml = ``

    const url = `https://covid-193.p.rapidapi.com/statistics?country=${countryInputValue}`;

    fetch(url, {
        method: "GET",
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        },
    })
        .then((result) => result.json())
        .then((data) => {
            if (data.response.length === 0) {
                throw new Error('Data tidak ditemukan untuk negara ini.');
            }

            //assign data ke object baru
            Object.assign(dataCovid, data.response[0]);

            //push nilai yang diperlukan kedalam sebuah array
            covidArray.push(dataCovid.cases.active, dataCovid.cases.new, dataCovid.cases.recovered,
                dataCovid.cases.total, dataCovid.deaths.total, dataCovid.tests.total)

            //buat nilai untuk menampung class html
            objectHtml = [
                {valueName : 'Active Cases', valueHtml : 'end', valueIcon : 'bi-person-check', colorBg: 'bg-blue', valueCol: '5'},
                {valueName : 'New Cases', valueHtml : 'center', valueIcon : 'bi-person-plus', colorBg: 'bg-yellow', valueCol: '2'},
                {valueName : 'Recovered Cases', valueHtml : 'start', valueIcon : 'bi-ui-checks',colorBg: 'bg-white', valueCol: '5'},
                {valueName : 'Total Cases', valueHtml : 'end', valueIcon : 'bi-file-earmark-person', colorBg: 'bg-coklat', valueCol: '5'},
                {valueName : 'Total Deaths', valueHtml : 'center', valueIcon : 'bi-box-arrow-right', colorBg: 'bg-red', valueCol: '2'},
                {valueName : 'Total Tests', valueHtml : 'start', valueIcon : 'bi-card-list', colorBg: 'bg-blue2', valueCol: '5'}
            ]

            //string html ditampung dalam tempHtml
            tempHtml += `<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-sm-1 mb-3 text-center">`

            for(i=0; i<=5; i++){
                tempHtml += `
                <div class="col-${objectHtml[i].valueCol} d-flex justify-content-lg-${objectHtml[i].valueHtml} justify-content-md-${i%2 == 0 ? 'end' : 'start'} justify-content-sm-center mb-4">
                    <div class="card ${objectHtml[i].colorBg}">
                        <div class="card-header"><h5>${objectHtml[i].valueName}</h5></div>
                        <div class="card-body">
                            <h3 class="bi ${objectHtml[i].valueIcon}"></h3>
                            <h3>${covidArray[i] == null ? 0 : covidArray[i]}</h3>
                        </div>
                    </div>
                </div>
                `
            }

            tempHtml += `</div>`

            document.getElementById('bodyCard').innerHTML = tempHtml
        })
        .catch(error => {
            console.error('Terjadi kesalahan:', error);
            
            //string html ditampung dalam tempHtml
            tempHtml = `
                <div class="row mb-3 text-center d-flex justify-content-center">
                    <div class="col-5 d-flex justify-content-center mb-4">
                        <div class="card text-bg-warning">
                        <div class="card-header"><h5>Warning</h5></div>
                        <div class="card-body">
                            <h2 class="bi bi-exclamation-triangle-fill"></h2>
                            <p>Data Covid dari Negara ini tidak ditemukan!
                                Mohon memasukkan data yang sesuai.
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            `
            document.getElementById('bodyCard').innerHTML = tempHtml
        });
});


