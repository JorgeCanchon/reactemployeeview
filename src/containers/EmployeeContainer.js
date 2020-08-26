import React from 'react';
import { Layout } from 'antd';
import Employees from '../components/Employees';
const { Header, Content, Footer } = Layout;

export const EmployeeContainer = () => {
    return (
        <Layout>
            <Header>
                <h3 style={{color:'#ffffff'}}>Empleados</h3>
            </Header>
            <Content style={{margin: '15px'}}>
                <Employees />
            </Content>
            <Footer>Copyright&copy; 2020 - Página creada por Jorge Canchon - Todos los derechos reservados </Footer>
      </Layout>
    );
}

export default EmployeeContainer;