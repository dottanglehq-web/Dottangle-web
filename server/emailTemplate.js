export const emailLinks = {
  website: 'https://dottangle.vercel.app',
  services: 'https://dottangle.vercel.app/services',
  instagram: 'https://www.instagram.com/dottangle/'
};
export const studioIntroduction = 'Dottangle is a digital design and development studio in Ludhiana. We build websites, mobile apps, brand identities, SEO strategies and AI solutions that help businesses grow.';
export function renderEmail(heading, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${heading}</title><style>:root{color-scheme:light}body{margin:0;background:#ffffff;color:#334155}a{color:#6d28d9}@media(max-width:480px){.email-pad{padding:22px 18px!important}.email-label,.email-value{display:block!important;width:auto!important}.email-label{padding-bottom:2px!important}.email-value{padding-top:0!important}}</style></head>
<body style="margin:0;padding:0;background:#ffffff;color:#334155;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:620px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px">
<tr><td class="email-pad" style="padding:30px 30px 24px;border-bottom:1px solid #e2e8f0"><a href="${emailLinks.website}" style="text-decoration:none"><img src="cid:dottangle-logo@dottangle" alt="Dottangle" width="200" height="60" style="display:block;width:200px;max-width:100%;height:auto;border:0"></a><p style="font-size:12px;color:#64748b;letter-spacing:.5px;margin:14px 0 0">DESIGN · TECHNOLOGY · GROWTH</p></td></tr>
<tr><td class="email-pad" style="padding:28px 30px;color:#334155;font-size:15px;line-height:1.7;overflow-wrap:anywhere"><h1 style="font-size:24px;line-height:1.3;color:#0f172a;margin:0 0 22px">${heading}</h1>${body}</td></tr>
<tr><td class="email-pad" style="padding:24px 30px;border-top:1px solid #e2e8f0;background:#ffffff"><p style="font-size:14px;font-weight:bold;color:#0f172a;margin:0 0 8px">A little about Dottangle</p><p style="font-size:13px;line-height:1.7;color:#64748b;margin:0 0 18px">${studioIntroduction}</p><a href="${emailLinks.services}" style="display:inline-block;padding:11px 18px;background:#6d28d9;border-radius:8px;font-size:13px;font-weight:bold;color:#ffffff;text-decoration:none">Explore our services ↗</a></td></tr>
<tr><td class="email-pad" style="padding:22px 30px;border-top:1px solid #e2e8f0;font-size:13px;line-height:1.9;color:#64748b"><strong style="color:#334155">Team Dottangle</strong><br><a href="${emailLinks.website}" style="color:#6d28d9;text-decoration:none">Website</a> &nbsp;·&nbsp; <a href="${emailLinks.instagram}" style="color:#6d28d9;text-decoration:none">Instagram</a> &nbsp;·&nbsp; <a href="mailto:dottanglehq@gmail.com" style="color:#6d28d9;text-decoration:none">Email us</a><br><a href="tel:+917973574376" style="color:#475569;text-decoration:none">+91 7973574376</a><br><span style="font-size:12px">Ludhiana, Punjab, India</span></td></tr>
</table></td></tr></table></body></html>`;
}
