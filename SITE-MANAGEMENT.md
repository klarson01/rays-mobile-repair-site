# Ray's Mobile Repair — Site Management

This site is intentionally kept simple so routine updates do not require a rebuild or a framework.

## Change a photo

All website photos live in `assets/images/`.

The easiest method is to replace an existing image with a new image using the **same filename**. When GitHub saves the replacement, Netlify will redeploy the site automatically.

The more flexible method is to upload a new image into `assets/images/` and then edit `data/site-content.json`. The `images` section contains named photo slots such as:

- `homeHero`
- `homeFieldRepair`
- `homeFleet`
- `servicesHero`
- `servicesSign`
- `servicesTrailer`
- `fleetHero`
- `fleetWork`
- `aboutHero`
- `aboutOwner`
- `aboutValues`
- `careersHero`
- `careersWork`
- `contactHero`
- `contactLogo`

Change only the path on the right side of the slot you want to update. Example:

`"homeHero": "assets/images/new-service-truck.jpg"`

Use web-friendly JPG, PNG, or WebP images and avoid very large original camera files when possible.

## Contact/service request delivery

The contact form is named `service-request` and is handled by Netlify Forms. It accepts an optional photo attachment.

In the Netlify site dashboard, configure an email notification for the `service-request` form so new requests are delivered to Ray's preferred inbox.

## Technician application delivery

The careers form is named `careers` and is handled by Netlify Forms. It accepts an optional resume/work-history file.

To route applications to Ray, a recruiter/headhunter, or both, change the form notification recipient in the Netlify site dashboard. The website code does not need to change.

This is intentional: changing recruiters should be an administrative setting, not a code change.

## Suggested Netlify form notifications

- `service-request` → Ray's normal customer-service email
- `careers` → Ray, recruiter/headhunter, or both as appropriate

## Business contact details

Phone, email, service area, and other shared business details are stored in `data/site-content.json` under `business`. Updating those values automatically updates the matching items across the site.
