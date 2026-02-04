# RaiPlay Force 1080p Userscript

A Tampermonkey userscript that forces RaiPlay streams to request the highest available quality (1080p when supported) by modifying relinker requests and adds a visual “1080p” badge to the player UI.

This script works by adding a specific query parameter to Rai relinker URLs, making the player behave like supported high-quality devices (like Apple TV).

---

## 📋 Requirements

You need a userscript manager installed in your browser like Tampermonkey (recommended), Violentmonkey, or Greasemonkey (Firefox).

Supported browsers:
- Chrome / Chromium-based browsers (Edge, Brave...)
- Firefox

---

## 🚀 Installation

### Install from Raw GitHub URL

1.	Install Tampermonkey from your browser extensions store
2.	Click [HERE](https://github.com/rgiorgiotech/RaiPlay-force-1080p/raw/refs/heads/main/raiplay-force-1080p.user.js), Tampermonkey will detect the script
5.	Click Install
6.	Refresh or open any RaiPlay page

---

## ⚙️ How It Works

The script:
1.	Intercepts fetch and XMLHttpRequest calls
2.	Detects Rai relinker URLs
3.	Appends `forceUserAgent=raiplayappletv`
4.	By adding this query, it forces the backend to serve higher quality streams
5.	Injects a UI badge into the VideoJS control bar

No DRM bypassing or illegal modifications are performed.

---

## 🔒 Privacy & Security

This script:
- Does NOT collect any data
- Does NOT send requests to external servers
- Runs entirely in your browser
- Only modifies RaiPlay network requests

---

## 📜 License

MIT License

You are free to use, modify, and redistribute this script.

---

## 🤝 Contributing

Pull requests and issues are welcome!

---

## ⚖️ Disclaimer

This project is not affiliated with Rai or RaiPlay.

It is provided for educational and personal use only.

Use at your own risk.
