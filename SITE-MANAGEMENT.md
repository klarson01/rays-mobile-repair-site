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

## Service request delivery

The Service Request page (`/service-request`, also served at `/contact`) uses Ray's Fullbay request link: https://app.fullbay.com/TNEAZS. The primary buttons open Fullbay's hosted form. The button uses the site's accessible text styling instead of Fullbay's image button.

Fullbay handles customer/contact/unit/service-request creation. Fullbay notification settings must be configured on the receiving employee profile: use raysmobilerepair@yahoo.com as that profile's email, select Ray's shop under Bell > Settings > Details > Notification Preferences > Email Notifications, and enable New Service Request (All). Shop Settings Reply-To controls replies, not notification recipients. These settings require verification in Fullbay; website code does not configure them.

An alternate contact form remains inside the expandable "Having trouble" section. It is named `service-request`, uses Netlify Forms, and accepts an optional photo or PDF attachment. These fallback submissions require manual entry into Fullbay. Configure its Netlify email notification to raysmobilerepair@yahoo.com independently of Fullbay notifications.

After deployment, submit one clearly labeled test through Fullbay, confirm it appears under Service > In Process > Service Requests, and verify the notification reaches Ray's inbox. Check fallback email delivery separately.

## Technician application delivery

The careers form is named `careers` and is handled by Netlify Forms. It accepts an optional resume/work-history file.

To route applications to Ray, a recruiter/headhunter, or both, change the form notification recipient in the Netlify site dashboard. The website code does not need to change.

This is intentional: changing recruiters should be an administrative setting, not a code change.

## Suggested Netlify form notifications

- `service-request` → Ray's normal customer-service email
- `careers` → Ray, recruiter/headhunter, or both as appropriate

## Business contact details

Phone, email, service area, and other shared business details are stored in `data/site-content.json` under `business`. Updating those values automatically updates the matching items across the site.
