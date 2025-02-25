document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname; 
    if (currentPath.includes('index.html')) { 
        document.getElementById('payloadPage').classList.add('active'); } 
        else if (currentPath.includes('event.html')) { 
        document.getElementById('Events').classList.add('active'); }
document.getElementById('payloadPage').addEventListener("click", () => {
    window.location.href = `index.html`;
}
);

document.getElementById('Events').addEventListener("click", () => {
    window.location.href = `event.html`;
}
);
    


const apiUrl = "https://api.spacexdata.com/v4/payloads";
const tableBody = document.getElementById("payloaddata");
const payloadTypeSelect = document.getElementById('payloadType');
let allPayload =[];
async function fetchPayload() {
   try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Failed to fetch payload");
            allPayload = await response.json();

            populateDropdown(); 
            updateChartAndTable();

        } catch (error) {
            console.error(error);
            tableBody.innerHTML = `<tr><td colspan="6">Failed to load payload</td></tr>`;
        }
    }
    
function populateDropdown() { const uniqueTypes = [...new Set(allPayload.map(payload => payload.type))]; 
    uniqueTypes.forEach(type => { const option = document.createElement('option'); 
        option.value = type; 
        option.text = type; 
        payloadTypeSelect.add(option);
     }); 
        payloadTypeSelect.addEventListener('mousedown', (event) => {
             event.preventDefault();  
            const selectedOption = event.target; 
            if (selectedOption.tagName === 'OPTION') {
                 selectedOption.selected = !selectedOption.selected;

  updateChartAndTable(); } });

}


        
  function updateChartAndTable(filteredData = allPayload) {  

const selectedTypes = Array.from(document.getElementById('payloadType').selectedOptions).map(option => option.value);
if (selectedTypes.length > 0) { filteredData = allPayload.filter(payload => selectedTypes.includes(payload.type)); }
const chartData = filteredData.reduce((acc, payload) => { const type = payload.type; 
    const existing = acc.find(d => d.name === type); 
    if (existing) { existing.y += 1; } else { acc.push({ name: type, y: 1 }); } 
return acc; }, []);

tableBody.innerHTML = filteredData
.map(payload => `

    <tr>
    <td>${payload.id}</td>
    <td>${payload.name}</td>
    <td>${payload.type}</td>
    <td>${payload.reused}</td>
    <td>${payload.customers}</td>
    <td>${payload.nationalities}</td>
    </tr>
`)
.join("");

    ////////// Pie Chart //////////

    Highcharts.chart('container', {
        chart: {
            type: 'pie',
            backgroundColor: '#0e0e0e'
        },
        title: {
            text: 'SpaceX Payload',
       
            style: { color: '#ffffff'  }
        },
        tooltip: {
            valueSuffix: '%'
        },
        subtitle: {
            // text:
            // 'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20
                }, {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.1f}%',
                    style: {
                        fontSize: '1.2em',
                        textOutline: 'none',
                        opacity: 0.7
                    },
                    filter: {
                        operator: '>',
                        property: 'percentage',
                        value: 10
                    }
                }]
            }
        },
        series: [
            { name: 'Payload Type', 
            colorByPoint: true,
             data: chartData }
            ]
        

    });
}

fetchPayload();

});