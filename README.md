# Calendarize ([hosted version](https://calendarize.onrender.com/))

## What you built? 

At the start of every term, (organized) Dartmouth students diligently put their courses into their calendar. However, this process is tedious and prone to mistakes. We built a tool that allows Dartmouth students to quickly generate a calendar with their courses to import into a calendar application of their choosing to expedite this process.


Landing Page:
![Landing Page](src/assets/prodnoclasses.png)

Classes Added:
![Classes Added](src/assets/prodwithclasses.png)

Full Calendar Example, no X-Hours:
![Full Calendar, no X-Hours](src/assets/calnox.png)

Full Calendar Example, with X-Hours:
![Full Calendar, with X-Hours](src/assets/calwithx.png)

Tutorial Page:
![Tutorial](src/assets/tutorial.png)

## Who Did What?

Josh worked on the design of each component (course search, course cards, .ics import tutorial). He also implemented the course search webscraping logic and added Google Analytics to the project.

Jack worked on the .ics download and redux. He also implemented the date-finding webscraping logic (which is used when creating the .ics file).

## What you learned

We tried out TypeScript for this application and really liked the benefits of static typing. Even though it came at the expense of some boilerplate code in setting up interfaces and declaring types for variables, the gains in terms of bug-catching, documentation, and improved clarity were well worth it. We also tried out webscraping for the first time, and learned how to scrape information off of webpages for use in our application. Additionally, we worked with a new filetype (.ics) used for storing calendar data.

## Challenges

A major challenge initially was scraping data from the course timetable. Since we could not find a programmatic API, we fetched the entire webpage of a given course search and parsed through it for the fields we needed. We also ran into a CORS error; while we initially set up a server-side proxy for local testing, we ended up using a free [CORS proxy](https://corsproxy.io/) to avoid having to host our own server. We also ran into a bit of difficulty with time zones, as we needed to ensure that the calendar invites reflected EST class times regardless of the user's location.

## Authors

Josh Pfefferkorn and Jack Gnibus

## Next Steps

- Course autocomplete
- How-to-use tour
- Export directly to calendar application of choice
- Map functionality? Could be cool

## Acknowledgments

[React Redux with TypeScript](https://react-redux.js.org/introduction/getting-started)

[Ant Design Component Library]([https://ant.design/](https://ant.design/components/overview/))

[ICS NPM Documentation](https://www.npmjs.com/package/ics)

ChatGPT used occassionally for small functions, cited in code
