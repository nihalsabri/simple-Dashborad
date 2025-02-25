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
    const historyUrl = "https://api.spacexdata.com/v4/history";
let allEvents = [];

async function fetchEvents() {
    try {
        const response = await fetch(historyUrl);
        if (!response.ok) throw new Error("Failed to fetch history");
        allEvents = await response.json();

        updateChart();

    } catch (error) {
        console.error(error);
        document.body.innerHTML = `Failed to load history`;
    }
}


function updateChart() { 
const eventsByYear = {}; 
allEvents.forEach(event => {
 const year = new Date(event.event_date_utc).getFullYear(); 
if (eventsByYear[year]) {
 eventsByYear[year]++; 
} else
 { eventsByYear[year] = 1; 

 }
 }); 
const years = Object.keys(eventsByYear);
 const counts = Object.values(eventsByYear);

    Highcharts.chart('containerL', {
        chart: {
           
            backgroundColor: '#0e0e0e'
        },
        title: {
            text: 'SpaceX successfully launches humans to ISS',
            align: 'left',
            style: { color: '#ffffff'  }
        },
    
        subtitle: {
            text: 'spaceX .... ',
            align: 'left'
        },
    
        yAxis: {
            title: {
                text: 'Number of Events',   
            style: { color: '#ffffff'  }
            }
          
        },
    
        xAxis: {
            categories: years,
             title: {
                 text: 'Year' ,
                
                 style: { color: '#ffffff'  }
                }

        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false,
                
                    style: {
                         color: '#ffffff' 
                         }
                },
                pointStart: 2010
               
            }
        },
    
        series: [{
            name: 'Number of Events', 
            data: counts
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });
    
    
}

fetchEvents();
});    