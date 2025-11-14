---
date: 2025-11-15
tags:
  - "#engineering"
---
While I was deploying the [[I built a website to convince a viral internet girl to collaborate|Bandana Girl Website]], I made a mistake where I hosted my DNS onto Cloudflare with the Proxied settings enabled.

While the site itself was hosted on Netlify.

So GoDaddy (site registrar) points nameservers to Cloudflare allowing it to configure DNS, the DNS is proxied via Cloudflare CDN where a CNAME links Netlify subdomain. I assume Netlify is default running its CDN while routing to Cloudflare which also has its own CDN layer enabled.

To solve this I simply removed DNS from Cloudflare and hosted it onto Netlify DNS - and updated Netlify nameservers in GoDaddy.

I had no issue hosting my portfolio website with Vercel + Cloudflare, where DNS only option was selected on Cloudflare.

I should explore when and when not to use Cloudflare - its strong and weak suits for future projects.

The website is now properly functioning. Would also write on how DNS works would be a nice topic to explore more engineering rabbitholes.