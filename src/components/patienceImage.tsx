"use client";
export default function PatienceImage({ width = "12rem", height = "12rem" }: { width?: string, height?: string }) {
    const image = window.location.hostname.includes("aayurtshrestha.com.np") ? "/images/og/preview.png" : "/images/og/woman.png"
    return <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    }}>
        <div style={{
            display: "flex",
            justifyContent: "center",
        }}>
            <img
                src={image}
                style={{
                    width,
                    height,
                    objectFit: "cover",
                    borderRadius: "100%",
                    animation: "upDown 3s ease-in-out infinite",
                }}
            />
        </div>
    </div>
}