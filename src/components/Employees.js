import React, { useState, Fragment, useEffect } from 'react';
import { Table, Input, Button, Space, Spin , message, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { GetEmployees, GetBosses, DeleteEmployee } from '../services/employeeRequest';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setEmployees, setBosses } from '../redux/employee/index';

export const Employees = () => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { employees } = useSelector(
    state => ({
      employees: state.employees.employees
    }),
    shallowEqual
  );

  useEffect(() => {
    getDataEmployee();
  }, []);

  const getDataEmployee = async () => {
    let data = await GetEmployees();
    if(data.status === 200){
      data = data.data.map(x => ({ ...x, key: x.idEmployee}));
      dispatch(setEmployees(data));
    }else{
      message.error('Ocurrio un error al consultar los datos');
    }
    setLoading(false);
  }

  const getDataBoss = async () => {
    let data = await GetBosses();
    if(data.status === 200){
      data = data.data.map(x => ({ ...x, key: x.idEmployee}));
      dispatch(setBosses(data));
    }else{
      message.error('Ocurrio un error al consultar los datos');
    }
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
          text
        ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const handleDelete = async key => {
    let res = await DeleteEmployee(key);
    if(res === 200){
      //eliminar dato del store dispatch(setBosses(data));
      message.success('Empleado eliminado con éxito');
    }else{
      message.error('Ocurrio un error al eliminar el empleado');
    }
    console.log(key, res);
  }

  const handleAdd = (key) => {
    
    console.log(key);
  }

  const columns = [
    {
      title: 'Id Empleado',
      dataIndex: 'idEmployee',
      key: 'idEmployee',
      width: '30%',
    },
    {
      title: 'Nombre Empleado',
      dataIndex: 'fullName',
      key: 'idEmployee',
      width: '30%',
    },
    {
      title: 'Cargo',
      dataIndex: 'position',
      key: 'idEmployee',
      width: '20%',
    },
    {
      title: 'Eliminar',
      dataIndex: 'Eliminar',
      render: (text, record) =>
          employees.length >= 1 ? (
              <Popconfirm title="¿Esta seguro de eliminar?" onConfirm= { () => handleDelete(record.key)}>
                <a>Eliminar</a>
              </Popconfirm> 
          ) : null,
    }
  ];
  
  if (loading)
      return(
      <Fragment>
          <Spin />
      </Fragment>);
  return (
    <Fragment>
      <Button onClick={handleAdd} type='primary' style ={{marginBottom:16}}>
        Agregar empleado
      </Button>
      <Table columns={columns} dataSource={employees} />
    </Fragment>
  );
}

export default Employees;