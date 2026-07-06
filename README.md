# Ray's Mobile Repair Website

Standalone static client website for Ray's Mobile Repair in Monroe, WI.

This repo is intentionally separate from the Aethralion SaaS project. Do not add Aethralion app code, Supabase configuration, auth, platform routes, DNS changes, or Aethralion Netlify configuration here.

## Files

- `index.html`, `services.html`, `fleet-service.html`, `careers.html`, `about.html`, `contact.html`: static website pages.
- `assets/css/styles.css`: shared site styling.
- `assets/js/main.js`: mobile navigation and shared content hydration.
- `assets/images/`: public website photos copied from the Ray's handoff materials.
- `data/site-content.json`: editable shared business details, messages, image paths, and services.
- `_handoff/`: reference only. Do not publish or edit as live site content.

## Updating Shared Content

To update common phone, email, service area, hero messaging, or service cards, edit:

```text
data/site-content.json
```

To update a photo, add the new image to:

```text
assets/images/
```

Then update the matching path in `data/site-content.json`.

## Deployment

This is a plain static Netlify site. The Netlify publish directory is the project root:

```text
.
```

Recommended standalone Netlify site name:

```text
rays-mobile-repair-preview
```

Temporary deployment may use a Netlify preview URL or the subdomain `rays.aethralion.com` until Ray's final domain is available.
