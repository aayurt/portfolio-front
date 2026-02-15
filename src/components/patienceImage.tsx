"use client";
export default function PatienceImage({ width = "12rem", height = "12rem" }: { width?: string, height?: string }) {
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
                src={"/images/og/preview.png"}
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