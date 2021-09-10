import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';

function LoginForm() {
    
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    //Validaciones del formulario
    const validate = (data) => {
        let errors = {};

        if (!data.name) {
            errors.name = 'Se requiere el nombre.';
        }
    
        if (!data.password) {
            errors.password = 'Se requiere una contraseña.';
        }

        return errors;
    };

    //Cuando se envie el form
    const onSubmit = (data, form) => {
        setFormData(data);
        setShowMessage(true);

        form.restart();
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };


    return (
        <div className="container">
            <div className="form-demo" style={{ height:'300px' }}>
    
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Bienvenido</h5>
                    <p style={{ lineHeight: 1.5, textAlign: 'center' }}>
                        <b>{formData.name}</b>
                    </p>
                </div>
            </Dialog>

            <div className="p-d-flex p-jc-center">
                <div className="card">
                    <h1 className="p-text-center">Ingresar</h1>
                    <Form onSubmit={onSubmit} initialValues={{ name: '', email: '', password: '' }} validate={validate} render={({ handleSubmit }) => (
                        
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <Field name="name" render={({ input, meta }) => (
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-user" />
                                        <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Usuario*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />


                            <Field name="password" render={({ input, meta }) => (
                                <div className="p-field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input} toggleMask/>
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Contraseña*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Button type="submit" label="Submit" className="btn p-mt-2" style={{ backgroundColor: '#11B3C9'}}/>
                        </form>
                    )} />
                </div>
            </div>
        </div>
        </div>
    );
}

export default LoginForm;