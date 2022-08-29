import Image from "next/image"

export default function LogoText({width, height, fontSize}){
    return <div style={logoTextStyle}>
        <Image src="/images/recipe_logo.png" width={width} height={height} />
        <h2 style={{...textStyle, fontSize: fontSize}} className="nameLogo">Profit Table</h2>
    </div>

}

const logoTextStyle = {
    display: "flex",
    alignItems: "center",
}

const textStyle = {
    color: "#ffcc00"
}