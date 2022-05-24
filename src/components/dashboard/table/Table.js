import React from 'react'
import MaterialTable from '@material-table/core'
import { columns } from './columns'


function Table () {
 
//   const [ products, setProducts ] = useState()
//   const [selectedRows, setSelectedRows] = useState([])
  const data = [
    { 
        id:1, nombre_empresa:"Pepsi", vacantes:15, fecha:'18-05-22'
    },
    { 
        id:2, nombre_empresa:"Adidas", vacantes:35, fecha:'15-03-22'
    },
    { 
        id:3, nombre_empresa:"Nike", vacantes:20, fecha:'08-05-22'
    },
    { 
        id:4, nombre_empresa:"Coca Cola", vacantes:5, fecha:'07-03-22'
    },
    { 
        id:5, nombre_empresa:"Brive", vacantes:22, fecha:'12-04-22'
    }
  ]
  
  return (
    <div style={{ display: 'flex', justifyContent:'center', alignItems:'center'}}>
        
        <div style={{display:'flex', width:'97%', margin:'0 auto', marginTop:'90px', overflowX: 'scroll'}}>
        <MaterialTable
            title= 'VACANTES'
            columns={columns}
            data={ data }
            // onSelectionChange ={(rows) => setSelectedRows(rows)}
            options={{
            exportButton:true,
            exportAllData:true,
            //   selection: true,
            search: true,
            sorting: true,
            searchAutoFocus: false,
            searchFieldVariant: 'standard',
            filtering: true,
            paging: true,
            pageSizeOptions: [1, 5, 10],
            pageSize: 10,
            paginationType: 'stepped',
            paginationPosition: 'both',
            addRowPosition: 'first',
            actionsColumnIndex: -1,
            showFirstLastPageButtons: false,
            columnsButton: true,
            rowStyle: (data, index) =>
                index % 2 === 0 ? { background: '#EFF2F8' } : null,
            headerStyle: {
                fontSize: '16px',
                fontWeight: '600',
                borderRight: '2px solid #ECEFF1'
            }
            }}
            
        />
        </div> 
    
    </div>
  )
}

export default Table
