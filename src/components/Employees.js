import React, { useState, Fragment, useEffect } from 'react';
import { Table, Button, Spin , message, Popconfirm } from 'antd';
import { GetEmployees, GetBosses, DeleteEmployee, AddEmployee } from '../services/employeeRequest';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setEmployees, setBosses, deleteBoss, deleteEmployee, addEmployee } from '../redux/employee/index';
import MyModal from '../components/Modal';
import FormEmployee from '../components/FormEmployee';

export const Employees = () => {

  const columns = [
    {
      title: 'Id Empleado',
      dataIndex: 'idEmployee',
      width: '10%',
    },
    {
      title: 'Nombre Empleado',
      dataIndex: 'fullName',
      width: '20%',
    },
    {
      title: 'Cargo',
      dataIndex: 'position',
      width: '20%',
    },
    {
      title: 'Jefe',
      dataIndex: 'boss',
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

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [employeeState, setEmployeeState] = useState([]);

  const onChangeSwitch = e => {
      setChecked(e);
  }
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
    switch(data.status){
      case 200:
        data = data.data.map(x => ({ ...x, key: x.idEmployee, 
          boss: x.isBoss ? 'SI': 'NO'}
        ));
        setEmployeeState(data);
        dispatch(setEmployees(data));
        break;
      case 204:
        message.warning('No se encontraron empleados');
        break;
      default:
        message.error('Ocurrio un error al consultar los datos');
    }
    setLoading(false);
  }

  const getDataBoss = async () => {
    let data = await GetBosses();
    switch(data.status){
      case 200:
        data = data.data.map(x => ({ ...x, key: x.idEmployee}));
        dispatch(setBosses(data));
        break;
      case 204:
        message.warning('No se encontraron jefes');
        setChecked(true);
        break;
      default:
        message.error('Ocurrio un error al consultar los datos');
    }
  }

  const handleDelete = async key => {    
    let res = await DeleteEmployee(key);
    if(res.status === 200){
      message.success('Empleado eliminado con éxito');
      let data = employeeState.filter(x => x.idEmployee !== key);
      setEmployeeState(data);
      dispatch(deleteEmployee(key));
    }else{
      message.error('Ocurrio un error al eliminar el empleado');
    }
  }

  const handleAdd = _ => {
    getDataBoss();
    setVisible(true);
  }

  const handleOk = async e => {
    let entity = {
      "FullName": e.fullname,
      "Position": e.position,
      "IdBoss": parseInt(e.idboss),
      "IsBoss": checked
    };
    let res = await AddEmployee(entity);
    switch(res.status){
      case 200:
        let data = { 
          ...res.data, 
          boss: res.data.isBoss ? 'SI': 'NO',
          key: res.data.idEmployee
        };
        setEmployeeState([...employeeState, data]);
        dispatch(addEmployee(data));
        message.success('Empleado agregado con éxito');
        break;
      case 201:
        message.warning(`el empleado ${e.fullname} ya exite`);
        break;
        default:
          message.error('Ocurrio un error al agregar el empleado');
    }
    setVisible(false);
  }

  const handleCancel = _ => {
    setVisible(false);
  };

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
      <MyModal 
        title='Agregar empleado'
        content={<FormEmployee onFinish={handleOk.bind(this)} checked={checked} onChange={onChangeSwitch} />}
        visible={visible}
        handleCancel={handleCancel.bind(this)}
       />
      <Table columns={columns} dataSource={employeeState} rowKey="idEmployee" />
    </Fragment>
  );
}

export default Employees;