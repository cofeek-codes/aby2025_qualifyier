'use client'

import React, { useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import { CookieManager } from '@/utils/CookieManager';
import { useRouter } from 'next/navigation';

export default function RegistrationForm() {
    const router = useRouter()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        // manually call validation
        setError(null)
        if (!event.currentTarget.checkValidity()) {
            event.currentTarget.reportValidity()
            return
        }
      
            fetch('http://localhost:3000/auth/login', {
                method: 'post',
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(res => {
                console.log(res)
                if (res['error'])
                    setError(res['error'])
                else {
                    // successful login
                    console.log(res)
                    CookieManager.setUserIdInCookie(res.user.id)
                    // storing full user information in localStorage
                    // localStorage.setItem('user', JSON.stringify(res.user))
                    // No; we will fetch user in every component that needs it

                    // redirect to home
                    router.push('/')
                }

            }).catch(e => setError(e.message))
        

    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title text-center">Вход</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                {/* Email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Электронная почта</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Пароль */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Пароль</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                </div>

                                {error && (<div className='alert alert-danger'>{error}</div>)}
                                <button type="submit" className="btn btn-primary w-100">
                                    Войти
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

