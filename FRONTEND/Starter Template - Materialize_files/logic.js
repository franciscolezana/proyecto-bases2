const colors = [];


const random_hex_color_code = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  };

function getLabels(data){
    const labels = [];
    const tmp = data[0];
    for (const [key, value] of Object.entries(tmp)) {
        if(key === 'nombre')
            continue;
        labels.push(key);
    }
    return labels;
}

function getDataSet(obj){
    const color = random_hex_color_code();
    const dataset = {
        label: '',
        data: [],
        borderColor: color,
        backgroundColor: color
    }
    for (const [key, value] of Object.entries(obj)) {
        if(key === 'nombre'){
            dataset.label = value;
            colors[value] = color;
            continue;
        }
        dataset.data.push(value);
    }
    return dataset;
}

function getDataSets(data){
    const datasets = [];
    data.forEach(element => {
        datasets.push(getDataSet(element));
    });
    return datasets;
}

function fillTable(data){
  let flag = true;
data.forEach(d => {
  let head = '<tr style="background-color: #36A3FB; color: white">';
  let row = '<tr>';
  for (const [key, value] of Object.entries(d)) {
      let color = '#FFF';
      if(key === 'nombre'){
        color = colors[value];
      }
      row += `<td style="background-color: ${color}">${value}</td>`;
      if(flag){
        head += `<th>${key.toUpperCase()}</th>`;
      }
  }
  $('#myTableBody').append(row + '</tr>');
  if(flag){
    $('#myTableHead').append(head + '</tr>');
    flag = false;
  }
  
});
  
var t = $("#myTable").DataTable({
  responsive: true,
  searching: false
});

}

$(document).ready(() => {

  
  axios.get('http://35.188.195.89:3000/perfiles_financieros')
  .then(res => {






  const labels = ['E', 'F', 'M', 'A', 'M', 'J'];
  const data = {
    labels: getLabels(res.data),
    datasets: getDataSets(res.data)
  };

  const config = {
  type: 'line',
  data: data,
  options: {
      scales:{
        y:
            {
                reverse:true
            }
        
      },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          position: 'right'
        }
      },
      title: {
        display: true,
        text: 'Promedios de Ranking Bancario'
      }
    }
  }
};




var chart = new Chart(
  document.getElementById('myChart'),
  config
);


fillTable(res.data);
});

});
