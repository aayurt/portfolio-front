const PAYLOAD_SLUG = process.env.NEXT_PUBLIC_SLUG || "test"

const getDomains = () => {
    const jsonList = process.env.NEXT_PUBLIC_DOMAIN_LIST || "[]"
    return JSON.parse(jsonList)
}
export async function getSlug(): Promise<string> {
    if (typeof window === "undefined") {
        // server
        const { headers } = require("next/headers");
        const getheader = await headers()
        const domainList = getDomains();
        const domain = domainList.find((d: any) => getheader.get("host")?.includes(d.domain))
        return domain?.slug || PAYLOAD_SLUG;
    } else {
        // client
        const host = window.location.hostname;
        const domainList = getDomains();
        const domain = domainList.find((d: any) => host.includes(d.domain))
        return domain?.slug || PAYLOAD_SLUG;
    }
}