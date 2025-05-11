'use client'

import React, { useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import { CookieManager } from '@/utils/CookieManager';
import { useRouter } from 'next/navigation';

export default function RegistrationForm() {
  const router = useRouter()
  
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: ''
    });

    const [profileImage, setProfileImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      // manually call validation
      setError(null)
      if (!event.currentTarget.checkValidity()) {
        event.currentTarget.reportValidity()
        return
      }
      
      if (formData.password == formData.confirmPassword) {
          fetch('http://localhost:3000/auth/register', {
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
                // successful registration
                console.log(res)
                CookieManager.setUserIdInCookie(res.user.id)
                // storing full user information in localStorage
                // localStorage.setItem('user', JSON.stringify(res.user))
                // No; we will fetch user in every component that needs it

                // redirect to home
                router.push('/')
              }
              
            }).catch(e => setError(e.message))
        } else {
            setError("passwords don't match")
        }

    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title text-center">Регистрация</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                {/* Блок изображения профиля */}
                                <div className="mb-4 text-center">
                                    <div className="d-flex justify-content-center">
                                        <div className="position-relative">
                                            <img
                                                src={previewUrl || 'https://placehold.co/150'}
                                                alt="Профиль"
                                                width={150}
                                                height={150}
                                                className="rounded-circle img-fluid"
                                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                            />
                                            <div className="mt-2">
                                                <label
                                                    htmlFor="profileImage"
                                                    className="btn btn-outline-secondary"
                                                >
                                                    Загрузить фото профиля
                                                </label>
                                                <input
                                                    id="profileImage"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="d-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Имя */}
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">Имя</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="form-control"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Фамилия */}
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Фамилия</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="form-control"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        required
                                    />
                                </div>

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

                                {/* Телефон */}
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Номер телефона</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="form-control"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Адрес */}
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Адрес</label>
                                    <textarea
                                        id="address"
                                        className="form-control"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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

                                {/* Подтверждение пароля */}
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Подтверждение пароля</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        className="form-control"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                    />
                                </div>
                                {error && (<div className='alert alert-danger'>{error}</div>)}
                                <button type="submit" className="btn btn-primary w-100">
                                    Зарегистрироваться
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

