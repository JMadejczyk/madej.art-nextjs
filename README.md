
# Photography portfolio Website with custom CMS and API

A while ago, I decided to create a portfolio website to gain recognition as a portrait photographer. The primary goal was to showcase my work with a simple and clean design that prioritizes the images themselves. This website is the latest iteration of that idea.

The first version was a static site built with basic HTML, CSS, and JavaScript. However, after using it for a year, I found it inconvenient to manually add new photos. This involved editing a text file for layout and manually uploading photos to the server. To address this issue, I decided to rebuild the website using more modern technology and architecture.

![diagram-export-17 06 2024-23_21_17](https://github.com/JMadejczyk/madej.art-nextjs/assets/56558546/e55a5d57-befa-4c07-af7a-ba409117bf0e)

- The website is divided into a client view (public-facing) and an admin panel (for managing content).
The client view maintains a simple and clean aesthetic, with enhancements like improved animations. However, under the hood, it's now built using React components for better performance and maintainability.

- The admin panel is built from scratch. It utilizes sessions for user authentication, and all API endpoints for data manipulation are accessible only after logging in for security purposes.


## Image Optimization
All website photos are optimized for faster loading times using several techniques:

- Lazy loading: Images are loaded only when they become visible in the viewport, improving initial page load speed.
- Base64 placeholder blur: A blurred, low-resolution version of the image encoded in Base64 is displayed initially, providing a placeholder while the actual image loads. This reduces the perceived loading time for the user.
- Responsive image formats: Images are automatically served in the WebP format, which offers superior compression compared to JPEG, for supported browsers. Additionally, images are resized to match the dimensions of the user's device screen, further reducing file size and improving loading times.



## Client view

<img width="1792" alt="image" src="https://github.com/JMadejczyk/madej.art-nextjs/assets/56558546/a91b3d79-a0ec-4f47-89f0-edfe62a7a384">

<img width="1792" alt="image" src="https://github.com/JMadejczyk/madej.art-nextjs/assets/56558546/e48cd362-9f79-4f75-9e4f-32cf239c143b">

<img width="517" alt="image" src="https://github.com/JMadejczyk/madej.art-nextjs/assets/56558546/84a8cfb1-7c62-44c5-81a2-129d3ca30691">

- The website is fully responsive and works flawlessly on mobile devices.

## Admin view

<img width="1792" alt="image" src="https://github.com/JMadejczyk/madej.art-nextjs/assets/56558546/2f82baa1-71d7-4993-bffa-99bb9c13f84f">

<img width="1792" alt="image" src="https://github.com/JMadejczyk/madej.art-nextjs/assets/56558546/06e5997b-2a42-45af-8abb-e284b034767b">

Users can add photos from the top or bottom of the grid view, with new additions appearing in the corresponding location.
Added photos are sent to the backend server, where they are resized (if necessary) and all relevant data is saved in an SQLite database.

<img width="1792" alt="image" src="https://github.com/JMadejczyk/madej.art-nextjs/assets/56558546/fe359753-ecc5-4334-992d-1c8466ce622f">

This panel allows users to manually adjust the order of photos within the grid, even for photos with different tags. This functionality was crucial for my vision of the website.

<img width="1792" alt="image" src="https://github.com/JMadejczyk/madej.art-nextjs/assets/56558546/76a415ae-6b0f-44a8-82ad-38c827c16360">

 Photos can have multiple tags. This feature will be used in the future to allow displaying photos based on selected tags in the client view, similar to the current functionality in the admin panel.

## Related

See also the API Project

[API madej.art](https://github.com/JMadejczyk/API_madej.art)

Or the website itself

[madej.art](https://madej.art/)


