Created with npm create astro@latest -- --template blog  

More templates at https://github.com/withastro/astro/tree/main/examples

To build

```
npm run build --prefix blog/astro-blog && node create-mocked-service-worker.js blog/astro-blog/dist/ blog/sw.js
```

In config had to set a `base` to get relative links to work (and fix HeaderLink to use it).