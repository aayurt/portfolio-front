Resume / CV

The Resume buttons (header, homepage hero, About page) are hidden by
default and appear only when a CV is available:

1. PREFERRED — upload in the Payload admin:
   - Payload admin → Media → Create new → upload your PDF
   - Payload admin → Tenants → your tenant → CV field → select the PDF
   The buttons then link to the Payload media file route, e.g.
   https://aayurtshrestha.com.np/admin/api/media/file/<filename>

2. OPTIONAL static fallback — set person.resume in
   src/resources/content.tsx to a path (e.g. "/cv/Aayurt-Shrestha-CV.pdf")
   and place the file in public/. The buttons link to that path.
