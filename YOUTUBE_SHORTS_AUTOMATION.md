# Prestige YouTube Shorts Automation

Updated: 2026-08-21

## Goal

Use the same Prestige content factory for Facebook Reels, Instagram Reels, TikTok, and YouTube Shorts. YouTube is not a separate content-production workflow.

Current pipeline:

`normalized-products.json -> affiliate-content-feed.json -> affiliate-content-feed-builder.js --platform=youtube-shorts -> rendered vertical video -> youtube-shorts-publisher.js -> YouTube channel -> tracked link -> store/marketplace -> revenue attribution`

## Already complete

- `affiliate-link-builder.js` supports both `youtube` and `youtube-shorts` and emits deterministic `yt` tracking IDs.
- `affiliate-content-feed-builder.js` includes `youtube-shorts` in the standard platform list.
- The 60 content blueprints can therefore produce YouTube-specific hooks, CTAs, affiliate/store links and disclosures without duplicating the content library.
- `youtube-shorts-publisher.js` is the official-API upload adapter.
- `youtube-short-manifest.example.json` defines the render-to-publisher handoff.

## Account state

The Google account has confirmed YouTube creator/channel history. A Google security notification dated 2026-08-02 also records that a YouTube Channel authorization existed. That evidence confirms a channel/account relationship but does not prove the current Prestige automation has upload permission.

The current public handle/URL has not been independently verified. Do not guess it. Once OAuth is authorized, `youtube-shorts-publisher.js` calls `channels.list?mine=true`, resolves the exact channel ID/title, and can use the stable canonical URL:

`https://www.youtube.com/channel/<CHANNEL_ID>`

## One-time authorization required

YouTube write operations require Google OAuth 2.0. Configure a Google API project with YouTube Data API v3 enabled and authorize the account using the minimum upload scope:

`https://www.googleapis.com/auth/youtube.upload`

Store these only as deployment/runtime secrets:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `YOUTUBE_REFRESH_TOKEN`
- optional `YOUTUBE_EXPECTED_CHANNEL_ID` after the first verified authorization

Never commit those values to GitHub, content feeds, manifests or rendered files.

## Safety / verification sequence

1. Authorize the Google/YouTube account once and capture a refresh token.
2. Run a publisher channel check and record the returned channel ID/title/public canonical URL in `prestige-store-network.json`.
3. Render one normal 9:16 Short from the existing content factory.
4. Generate the tracked YouTube link with the existing affiliate-content resolver.
5. Run the publisher in `--dry-run` mode and verify title, description, link and disclosure.
6. Upload the first test with `privacy_status: private`.
7. Verify playback, correct channel, thumbnail/frame, title, description, affiliate disclosure, tracked URL and audience setting.
8. Only then enable scheduled/public publishing.

## Google API audit limitation

YouTube currently documents that uploads from unverified API projects created after July 28, 2020 are restricted to private viewing. The Google API project may need a YouTube API compliance audit before fully automatic public publishing can be declared operational.

Therefore:
- private test upload = integration verified,
- automatic public Short = complete only after the API project is permitted to publish publicly.

## Publisher manifest

The publisher accepts JSON with:

- `video_path`
- `title`
- `description`
- `affiliate_url`
- `disclosure`
- `tags`
- `category_id`
- `privacy_status`
- `made_for_kids`
- `notify_subscribers`
- optional `publish_at`

The final description appends the tracked destination and disclosure automatically.

## Content rules

- Use `#Shorts` naturally where useful; do not stuff tags/hashtags.
- Every affiliate link carries YouTube-specific attribution from `affiliate-link-builder.js`.
- Affiliate content includes a clear disclosure.
- DigiTools remain blocked from purchase CTAs until digital fulfillment is verified.
- Do not promise card grades, guaranteed contractor profit, guaranteed tool performance, or other unsupported outcomes.
- The Reel/Short factory should reuse the same core vertical asset but allow platform-specific opening text, CTA, caption and link treatment.

## Completion gate

YouTube is fully operational only when all of these are true:

- channel identity resolved,
- OAuth refresh works,
- expected-channel safety check passes,
- private test upload succeeds,
- tracked link/disclosure verified,
- public/scheduled publishing is permitted,
- published Short is recorded in the content/revenue tracking layer.
