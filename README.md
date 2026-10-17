# Wazzaaap AI

Wazzaaap AI is a Polish-first assistant concept for finding medical appointments in Katowice and helping users plan the trip to a clinic.

## Product direction
- Mobile-first Next.js app, deployable on Vercel.
- Polish chat interface with a distinctive dark, hooded AI character (original design; not a copy of a film character).
- Clinic search by location, specialty and preferred time.
- Appointment booking only through verified clinic calendars or official booking links.
- Uber ride hand-off through an official deep link; direct ride ordering requires separate Uber API access and user authorization.

## Current status
The first commit is a UI prototype. Clinic data, real-time availability, actual bookings, AI responses and Uber API ordering are not connected yet. The app must never present demo data as real availability.

## Run locally
Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

## Deploy
Import this repository into Vercel and deploy with the default Next.js settings.

## Environment
No API keys are needed for the UI prototype. When backend integrations are added, store secrets in Vercel Environment Variables and never commit them to Git.

## Integration order
1. Verified clinic directory and official booking links.
2. Availability providers / clinic calendar integrations.
3. AI chat backend and safe handling of personal information.
4. Uber deep link, then API access if approved.
