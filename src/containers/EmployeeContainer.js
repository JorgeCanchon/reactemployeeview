import React from 'react';
import { Layout } from 'antd';
import Employees from '../components/Employees';
const { Header, Content, Footer } = Layout;

export const EmployeeContainer = () => {
    return (
        <Layout>
            <Header>
                <h3 style={color='#ffffff'}>Empleados</h3>
            </Header>
            <Content>
                <Employees />
            </Content>
            <Footer>Footer</Footer>
      </Layout>
    );
}

export default EmployeeContainer;