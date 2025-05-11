'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Header from "@/components/Header";

export default function Services() {
  const [services, setServices] = useState([])
    const [error, setError] = useState(null)
    useEffect(() => {
      fetch("http://localhost:3000/services/all")
            .then(res => res.json())
        .then((r) => {
          console.log(r)
          setServices(r)
        })
            .catch((e) => {
                console.log('error caught')
                console.log(e.message)
                setError(e.message)
            })
    }, [])
  return (
    <>
      <Header />
        <div>
          {error && error}
          {(!error && services.length > 0) && services.map((s) => (
            <div key={s.id}>service title: {s.title}</div>
          ))}
        </div>
    </>
    );
}
