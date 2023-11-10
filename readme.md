# Star Tasker

Star Tasker is a web application that allows users to manage tasks with a focus on simplicity and efficiency. Users can post tasks, upload images for each task, and manage their tasks throughout their lifecycle. The application integrates with Cloudinary for image storage and provides a smooth user experience. [Let's Post a Task](https://star-tasker-10a7c6bbe05a.herokuapp.com/tasks/all)

## Features

- **User Authentication**: Secure signup and login functionality to ensure user data is protected.
- **Task Browsing**: An intuitive interface for users to browse and search through available tasks using various filters and search criteria.
- **Task Management**: Users can post tasks with detailed descriptions,address,due dates, and associated images to clearly define the task requirements.
- **Image Uploads**: Integration with Cloudinary for reliable and scalable multiply images hosting, allowing users to visually represent their tasks.
- **Dashboard**: A personalized dashboard for users to view and manage their posted and accepted tasks.
- **Task Acceptance System**: Users can accept tasks they wish to undertake, fostering a collaborative environment.
- **Responsive Design**: A mobile-friendly interface that ensures a seamless experience across all devices.


## Built With

## Built With


- [Express.js](https://expressjs.com/) - The web framework for Node.js (generated with `npx express-generator -e`).
- [Node.js](https://nodejs.org/en/) - The JavaScript runtime used.
- [MongoDB](https://www.mongodb.com/) - The NoSQL database used for storing data.
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js.
- [Cloudinary](https://cloudinary.com/) - Cloud-based image and video management service.
- [Multer](https://www.npmjs.com/package/multer) - Middleware for handling `multipart/form-data`.
- [Bootstrap](https://getbootstrap.com/) - Extensive list of components and Bundled Javascript plugins.

## Screenshots

![Screenshot Description](/public/images/22071699576777_.pic.jpg)
![Screenshot Description](/public/images/22061699576771_.pic.jpg)
![Screenshot Description](/public/images/22081699576840_.pic.jpg)
![Screenshot Description](/public/images/22091699576840_.pic.jpg)
![Screenshot Description](/public/images/22101699576840_.pic.jpg)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed.
- Cloudinary account for managing images.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/JennyZhong2022/Star-Tasker.git

2. Navigate to the project directory:
   ```sh
    cd star-tasker

3. Install NPM packages:
   ```sh
    npm install

4. Set up your environment variables in a .env file in the root directory:
   ```sh 
    DATABASE_URL=
    GOOGLE_CLIENT_ID=
    GOOGLE_SECRET=
    GOOGLE_CALLBACK=
    SECRET=
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

5. Start the server:
    ```sh 
    npx nodemon


## Deployment

To deploy this application on a live system like Heroku, follow these instructions:

1. Log in to your [Heroku account](https://dashboard.heroku.com/) and navigate to the dashboard.
2. Select your application or create a new one.
3. Go to the application's **Settings** tab.
4. Scroll down to the **Config Vars** section and click on the **Reveal Config Vars** button.
5. Enter the key-value pairs for each environment variable. These should match the ones in your `.env` file:
6. After setting your config vars, deploy your application using the Heroku Dashboard or Heroku CLI.


## Contributing

Feel free to fork the project and make any contributions. All contributions are welcome!
