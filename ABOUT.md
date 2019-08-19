I wanted to integrate `apollo client` and use `apollo http link` to link the api. But considering I 
didn't have much time I decided that doing this for 2 API calls was just not worth it.

I also wanted to integrate a few animations but animations required a lot of time and I just wanted
to make sure I do the core requirements first.

I didn't write any comments as I think most of the code is self explanatory.

There is definitely a lot more that could have been done if I had more time. There is currently no SEO,
the ssr just shows `Loading` component. As I am not frontend first, some of css is a bit borkend and I am sure with time I could make it better.

I also didn't show IDs as it just felt wrong to display them on frontend. I could have it would have been 3 lines
of code, but it just felt wrong. Instead I made custom ids for episodes (S1E1). The
API doesn't provide a way of fetching resources with id anyway.
