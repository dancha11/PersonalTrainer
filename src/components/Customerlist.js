import React, {useState, useEffect, useRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import DeleteButtonRenderer from './DeleteButtonRenderer';
import EditButtonRenderer from './EditButtonRenderer';
import Addcustomer from './Addcustomer';
import Stack from '@mui/material/Stack';
import Addtraining from './Addtraining';
import CustomerTrainingsButtonRenderer from './CustomerTrainingsButtonRenderer';
import Button from '@mui/material/Button';

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const gridRef = useRef();

  useEffect(()=> fetchData(), []);

  const fetchData =() => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response=>response.json())
    .then(data=>setCustomers(data.content))
    .catch(err=>console.log(err))
  }

  const deleteCustomer = (link) => {
    if (window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      fetch(link, {method: 'DELETE'})
      .then(_ => fetchData())
      .catch(err => console.error(err))
    }
  }
  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(res=> fetchData())
    .catch(err=>console.error(err))
  }

  const saveCustomer=(customer)=> {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(res=> fetchData())
    .catch(err=>console.error(err))
  }

  const saveTraining=(training)=> {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(training)
    })
    .then(res=> {fetchData()
      if (res.status>=200 && res.status<300) {
        alert(`Training ${training.activity} was added successfully`)
      } else {alert("Something went wrong, please try again")}
    })
    .catch(err=>console.error(err))
  }

  const columns = [
    {field: 'firstname', headerName:'First Name', sortable: true, filter: true, width:140},
    {field: 'lastname', headerName:'Last Name', sortable: true, filter: true, width:140},
    {field: 'email', headerName:'Email', sortable: true, filter: true},
    {field: 'phone', headerName:'Phone number', sortable: true, filter: true, width:160},
    {field: 'streetaddress', headerName:'Street address', sortable: true, filter: true},
    {field: 'postcode', headerName:'Post code', sortable: true, filter: true, width:130},
    {field: 'city', headerName:'City', sortable: true, filter: true, width:120},
    {field: 'links.2.href', sortable: false, filter: false, headerName: "", width:150,
      cellRendererFramework : params => <CustomerTrainingsButtonRenderer link={params.value} />},
    {field: 'links.0.href', sortable: false, filter: false, headerName: "", width:180,
      cellRendererFramework : params => <Addtraining saveTraining={saveTraining} link={params.value}/>
    },
    {field: 'links.0.href', sortable: false, filter: false, headerName: "", width:100,
      cellRenderer: "editButtonRenderer",
      cellRendererParams: {
        update: updateCustomer,
        text: "customerlist"
      }
    },
    {field: 'links.0.href', sortable: false, filter: false, headerName: "", width:150,
      cellRenderer: "deleteButtonRenderer",
      cellRendererParams: {
        delete: deleteCustomer
      }      
    }
  ]
  const stackStyle={
    backgroundColor:"#00394e",
    padding: "15px"
  }
  const searchStyle = {width:"400px", margin: "15px"}

  function onGridReady(params) {
    setGridApi(params.api);
    // gridApi.sizeColumnsToFit();
  }

  const onBtnExport = () => {
    gridApi.exportDataAsCsv();
  };
  
  const defaultColDef = {
    resizable: true,
  };

  const handleQuickFilter = event => {
    gridApi.setQuickFilter(event.target.value);
  };

  return (
    <div className="ag-theme-material" style={{marginTop: 20, height: 650,  margin: 'auto'}}>
                    <h1>Customer list</h1>

      <Stack 
        direction="row" 
        spacing={3} 
        justifyContent="left" 
        style={stackStyle}
        >
        <Addcustomer saveCustomer={saveCustomer} />

        <Button style={{margin:8}} size="medium" variant="contained" onClick={() => onBtnExport()}>
          Export customers in CSV file
        </Button>
        <div >
          <input
            style={searchStyle}
            type="search"
            placeholder="Search"
            onChange={handleQuickFilter}
          />
        </div>
        
        </Stack>
        <AgGridReact
          frameworkComponents={{
          deleteButtonRenderer: DeleteButtonRenderer,
          editButtonRenderer: EditButtonRenderer
          }}
          ref={gridRef}
          onGridReady={onGridReady}
          rowSelection="single"
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={defaultColDef}
        />
      </div>
    
  )
}