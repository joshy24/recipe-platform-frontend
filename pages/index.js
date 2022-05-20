import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Link from "next/link"

export default function Home() {
    return (
        <div className="pageHolder">
            <Head>
                <title>Recipe Platform</title>
                <meta name="description" content="A platform for ingredient and recipe management" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="indexMain">
                <h3>A platform to organize your ingredients, recipes and costings.</h3>

                <button><Link href="/auth/signin">Get Started</Link></button>
            </div>
        </div>
    )
}
