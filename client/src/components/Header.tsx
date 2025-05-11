'use client'

import { CookieManager } from "@/utils/CookieManager"
import Link from "next/link"
import { useEffect, useState } from "react"

const Header = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
      if (CookieManager.getUserIdFromCookie() !== null) {
        let id = CookieManager.getUserIdFromCookie()
        fetch("http://localhost:3000/getUser/" + id).then(res => res.json()).then(res => {
          console.log(res)
          setUser(res)
        })
        }
    }, [])
    return <>
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <Link href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <img
                        src={'https://placehold.co/50'}
                        alt="Профиль"
                        width={50}
                        height={50}
                        className="rounded-circle img-fluid"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />

                </Link>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link href="/" className="nav-link px-2 link-secondary">Home</Link></li>
                    <li><Link href="/services" className="nav-link px-2 link-dark">Services</Link></li>
                </ul>

                <div className="col-md-3 text-end">
                    {!user ? (<>
                        <Link href="/login" className="btn btn-outline-primary me-2">Login</Link>
                        <Link href="/register" className="btn btn-primary">Register</Link>
                    </>) : (<>
                        <div><Link href="/profile" className="nav-link px-2 link-dark">{user.firstName} {user.lastName}</Link></div>
                    </>)}
                </div>
            </header>
        </div>
    </>
}

export default Header
