# FEATURES

1. Scrap NhaTot rental listings every 2-3 hours.
2. Evaluated and selected MapLibre GL JS as the rendering engine based on performance research.
3. Cutted & Packaged the Danang vector map into a compact PMTiles archive. [#2]
4. Optimised vector tile loading using cached HTTP Range Requests. [#20, #37]
5. Reduced network traffic through full client-side caching. [#38, #44]
6. Secure code using WebAssembly compilation. [#16]
7. Integrated the WebAssembly loader directly into the application. [#13]
8. Optimised bandwidth usage by caching third-party runtime assets. [#38]
9. Generated a dedicated static HTML page under `/id/` for every property. [#18, #21, #22, #23, #33, #36]
10. Built the application as an offline-capable Progressive Web App (PWA). [#7, #8, #12, #55]
11. Implemented offline support using a Service Worker.
12. Added automatic cache versioning and invalidation.
13. Enabled installation directly from supported browsers. [#55]
14. Packaged the PWA as a native Android application using Trusted Web Activities (TWA). [#48]
15. Configured automatic dark/light theme detection. [#28]
16. Implemented instant property filtering by price. [#10, #26, #29, #54]
17. Added a favourites (likes) system. [#11, #32, #35, #57, #59, #61]
18. Removed the Vietnamese "Đường" prefix from street labels for improved readability.
19. Added user geolocation support. [#49, #50]
20. Requested geolocation permission only after explicit user interaction. [#51]
21. Optimised rendering performance for thousands of simultaneously visible properties. [#20]
22. Reduced unnecessary map redraws. [#39]
23. Generator of URL for single NhaTot rental item.
24. Integrated Google Analytics 4. [#30]
25. Added custom analytics events (property opened, WebMCP tool invocation). [#46]
26. Configured Google Search Console / Yandex WebMaster. [#19]
27. Generated an XML sitemap.
28. Implemented Open Graph metadata.
29. Added Twitter/X, Telegram and WhatsApp social preview metadata.
30. Hosted the project on GitHub Pages.
31. Connected the custom domain https://danang.kim.
32. Configured automated deployment using GitHub Actions. [#24, #40, #56]
33. Implemented WebMCP support for AI agents. [#45]
34. Published AI-discoverable tools, skills and API catalog. [#45]
35. Collected usage analytics for AI agent interactions. [#46]
36. Created a custom vertical price slider. [#10, #26, #27, #52]
37. Optimised touch interaction on mobile devices. [#5, #29]
38. Improved responsive layout behaviour. [#4]
39. Deployed a dedicated Photon geocoding server for Danang (http://193.233.126.81:2322/api?q=). Eliminated dependence on third-party geocoding providers.
40. Solved overlapping property markers (up to 131 at identical coordinates) by distributing them around the building using an expanding circular layout. [#1, #15, #31, #41, #42]
41. Customised the Android splash screen.
42. Generated AI/GEO-friendly property pages with structured, crawlable content. [#18, #33]
43. Improved SEO by including the rental title in each property URL. [#18, #19, #33]
44. Published an RSS feed of rental listings. [#17]
45. Enabled external AI agents to filter listings and retrieve matching property links via WebMCP. [#45]
46. Filtered out non-residential properties from the rental map. [#3]
47. Supported demo mode with a limited public dataset when no access key is available. [#6]
48. GitHub action retry build in case fail. [#40]
49. Hit-box layer for handle user interaction [#62]