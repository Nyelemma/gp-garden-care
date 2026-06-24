# GP Garden Care - Website

A fast, modern, single-page website for **GP Garden Care** (Lancaster, Morecambe & surrounding areas).
Built with plain HTML, CSS and JavaScript - no build tools, no frameworks. It works just by
opening `index.html`, and can be hosted for free on GitHub Pages, Netlify, or any web host.

## Files

| File | What it is |
| --- | --- |
| `index.html` | All page content and sections |
| `styles.css` | All styling, colours and responsive layout |
| `script.js` | Menu, before/after slider, animations, contact form |
| `Images/` | Logo and all photos used on the site |
| `README.md` | This guide |

## How to preview

Just double-click `index.html` to open it in your browser. To preview the contact form and
Instagram feed properly, it's best to run a tiny local server (optional):

```bash
# From inside the "GP garden Care" folder:
python -m http.server 8000
# then visit http://localhost:8000
```

## Swapping in your real photos (very easy)

All gallery photos are **placeholders** right now. To use your real before/after shots from
Facebook/Instagram, just **drop your photos into the `Images/` folder using the exact same file
names** - no code changes needed:

| File name | Where it shows |
| --- | --- |
| `hero.jpg` | Big background image at the top |
| `before-1.jpg` / `after-1.jpg` | First draggable before/after slider (Job 1) |
| `before-2.jpg` / `after-2.jpg` | Second draggable before/after slider (Job 2) |
| `hydrangea.jpg` | Featured hydrangea planting project |
| `about.jpg` | Photo in the "About" section |
| `Logo.jpg` | Your logo (header, footer, favicon) |

Tips:
- Use landscape (wide) photos where possible, ideally around 1600 x 1000 pixels.
- Keep the same file name and `.jpg` extension so nothing breaks.
- Try to make each before/after pair the same angle/zoom for the best effect.

### Want more or fewer gallery items?
Open `index.html`, find the `Before & After` section (search for `id="gallery"`). You can copy a
`<figure class="ba-card">` block to add another pair, or delete one to remove it.

## Editing your contact details

All your details are in `index.html`. Search for these to change them:

- **Email** - appears as `gpgardencare@hotmail.com` (also set on the form via
  `data-contact-email="gpgardencare@hotmail.com"`). Change both if your email changes.
- **Phone / WhatsApp** - the number is `447981234504` (UK format without the leading 0) in the
  `wa.me` links, and `+447981234504` in the `tel:` links. The visible text shows `07981 234504`.
- **Opening hours** - currently shows "Mon-Sat, by appointment" (search for `Hours`). Update to
  your real hours.
- **Areas covered** - "Lancaster, Morecambe & surrounding areas".

The contact form opens the visitor's own email app with the message pre-filled and addressed to
you (no server or signup required). If you'd later like form messages sent automatically without
opening an email app, a free service like [Formspree](https://formspree.io) can be added.

## Instagram feed

The Instagram section embeds your public profile **@Gpgardencare** automatically using Instagram's
official embed (`https://www.instagram.com/Gpgardencare/embed/`). It updates itself as you post.
On some devices Instagram may ask the visitor to log in - the "Follow @Gpgardencare" button always
links straight to your profile.

## Going live (hosting)

Easiest free option - **Netlify Drop**: go to <https://app.netlify.com/drop> and drag this whole
`GP garden Care` folder onto the page. You'll get a live link in seconds. You can later connect a
custom domain (e.g. `gpgardencare.co.uk`).

---

Built for GP Garden Care - established 2021. Affordable, insured & eco-conscious.
