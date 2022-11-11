import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import LogoText from "../component/general/logotext";

import Link from "next/link";

export default function Home() {
	return (
		<div className={styles.indexHolder}>
			<Head>
				<title>Recipe Platform</title>
				<meta
					name="description"
					content="A platform for ingredient and recipe management"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>

			<div className="indexMain">
				{/* left content */}
				<div className="leftContent">
					<div className="topContent">
						<LogoText
							width={95}
							height={123}
							fontSize={50}
						/>
						<h5>Organize your ingredients, recipes, orders and costings.</h5>

						<button>
							<Link href="/auth/signin">Get Started</Link>
						</button>
					</div>
					<div className="bottomContent">
						<h6>Copyright (C) 2022 @profitables, All rights Reserved</h6>
					</div>
				</div>
				{/* end of left content */}

				{/* right content */}
				<div className="rightContent"></div>
				{/* end of left content */}
			</div>
		</div>
	);
}
