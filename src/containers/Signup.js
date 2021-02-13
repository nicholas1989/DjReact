import React from 'react';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth'; 
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Button,
} from 'antd';



const WrappedRegistrationForm = (props) => {
    const [form] = Form.useForm();

    const onFinish = (e, err, values) => {
        e.preventDefault();
        //props.form.validateFieldsAndScroll((err, values) => {
            if(!err) {
                props.onAuth(values.userName, values.email, values.password, values.confirm)
                props.history.push('/');
            }  
        //});
    };

    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            >
            <Form.Item
                name="userName"
                rules={[
                {
                    required: true,
                    message: 'Please input your Username!',
                },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} type="user" placeholder="Username" />
            </Form.Item>  
            <Form.Item
                name="email"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                    },
                }),
                ]}
            >
                <Input prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="Submit" style={{marginRight: '10px'}}>
                    Signup
                </Button>
                Or
                <NavLink 
                    style={{marginRight: '10px'}} 
                    to='/login/'>   Login
                </NavLink>
            </Form.Item>
        </Form>
    );
};


const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);