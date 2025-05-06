'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
    const [label, setLabel] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        fetch("http://localhost:3000/")
            .then(res => res.json())
            .then(setLabel)
            .catch((e) => {
                console.log('error caught')
                setError(e.message)
            })
    })
    return (
        <div>
            hello world should be here: {label ?? error}
        </div>
    );
}
