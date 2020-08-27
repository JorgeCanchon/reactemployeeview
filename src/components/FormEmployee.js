import React, { Fragment, useState } from 'react';
import { Form, Input, Button, Select, Switch } from 'antd';
import { useSelector, shallowEqual } from 'react-redux';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const FormEmployee = ({ onFinish, checked, onChange }) => {
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    const { bosses } = useSelector(
        state => ({
          bosses: state.employees.bosses
        }),
        shallowEqual
      );

    return (
        <Fragment>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="fullname" label="Nombre Completo:" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="position" label="Cargo:" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Es jefe">
                    <Switch checked={checked} onChange={onChange} />
                </Form.Item>
                {!checked && bosses.length > 0 &&
                    <Form.Item name="idboss" label="Jefe:" rules={[{ required: true }]}>
                        <Select
                        placeholder="Seleccione..."
                        allowClear
                        >
                            {bosses.map(x => (<Option key={x.idEmployee}>{x.fullName}</Option>))}
                        </Select>
                    </Form.Item>
                }
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Enviar
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Limpiar
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
}

export default FormEmployee;