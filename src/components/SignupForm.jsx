import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';

function SignUpForm() {
    
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    //Validaciones del formulario
    const validate = (data) => {
        let errors = {};

        if (!data.name) {
            errors.name = 'Se requiere el nombre.';
        }

        if (!data.email) {
            errors.email = 'Se requiere un email.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Email invalido. Debe tener el formato: example@email.com';
        }

        if (!data.password) {
            errors.password = 'Se requiere una contraseña.';
        }

        if (!data.accept) {
            errors.accept = 'Tiene que aceptar los términos y condiciones para continuar.';
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

    //Dialogo al momento de ingresar la contraseña
    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false) } /></div>;
    const passwordHeader = <h6>Nivel de seguridad de su contraseña</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="p-mt-2">Sugerencias</p>
            <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
                <li>Al menos contener una minúscula</li>
                <li>Al menos contener una mayúscula</li>
                <li>Al menos contener un número</li>
                <li>Contener al menos 8 carácteres</li>
            </ul>
        </React.Fragment>
    );


    return (
        <div className="container">
            <div className="form-demo">
    
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registro exitoso</h5>
                    <p style={{ lineHeight: 1.5, textAlign: 'center' }}>
                        Su cuenta ha sido registrada bajo el usuario <b>{formData.name}</b>
                    </p>
                </div>
            </Dialog>

            <div className="p-d-flex p-jc-center">
                <div className="card">
                    <h1 className="p-text-center">Registrarse</h1>
                    <Form onSubmit={onSubmit} initialValues={{ name: '', email: '', password: '', date: null, accept: false }} validate={validate} render={({ handleSubmit }) => (
                        
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


                            <Field name="email" render={({ input, meta }) => (
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="password" render={({ input, meta }) => (
                                <div className="p-field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Contraseña*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="date" render={({ input }) => (
                                <div className="p-field">
                                    <span className="p-float-label">
                                        <Calendar id="date" {...input } dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                                        <label htmlFor="date">Fecha</label>
                                    </span>
                                </div>
                            )} />

                            <Field name="accept" type="checkbox" render={({ input, meta }) => (
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>I agree to the terms and conditions*</label>
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

export default SignUpForm;