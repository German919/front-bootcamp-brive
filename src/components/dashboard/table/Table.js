import React from 'react'
import MaterialTable from '@material-table/core'
import { columns } from './columns'


function Table ( ) {

    const res = localStorage.getItem('vacants')
    const vacants = JSON.parse(res)
  
  return (
    <div style={{ display: 'flex', justifyContent:'center', alignItems:'center'}}>
        
        <div style={{display:'flex', width:'97%', margin:'0 auto', marginTop:'90px', overflowX: 'scroll'}}>
        <MaterialTable
            title= 'VACANTES'
            columns={columns}
            data={ vacants ? vacants.data : [] }
            options={{
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
