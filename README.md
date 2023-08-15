# GameNight

### Description

GameNight is a web application for searching board games and creating a digital collection of your games. It has an estimated value of your collection based on the MSRP of the game.

<i> Mobile friendly update coming soon! </i>

# Features

### Search Board Games

Users will be able to search for board game by title, mechanic, or category.

### SignUp/Login

User can register and login. This utilizes JWT authentication.

### Add or Remove Games to/from Collection

A logged in user will be able to add a game to their collection or remove a game.

### Watch Videos

Users can watch videos on how to play the game, from the game details page.

### Edit Profile

Logged in users can edit their info pertaining to username and email. Or by uploading a photo to use as their avatar.

### Delete Account

Logged in users can full delete their account from the settings options.

# User Flow

Created with Lucidchart.

![GameNight user flow](/prep/GameNight-user-flow.png)

# API Notes

Board Game Atlas: https://www.boardgameatlas.com/api/docs

Overall I think for a free API it's well done. There a few things here and there that can be improved upon. One of the issues I faced was getting games by ID. The documentation is not exactly clear on what is to be sent. Instead of an array of string IDs, which it seems like it wants, it required an array with a single string containing all the IDs seperated by a comma. Also, it need a comma at the beginning an end of the string, to include the first and last IDs as games in the response.

# Database Schema

Created with Quick DBD.

Not all tables are currently in use. I plan on implementing more features, as I will be continuing developement on this application after course completion.

![GameNight schema](/prep/QuickDBD-Capstone-2.png)

# Technology Stack

### Front End

| HTML5                                                                                                                       | CSS                                                                         | JavaScript                                                                                                                           | React                                                                                                                      | Material UI                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| ![html5 icon](https://raw.githubusercontent.com/get-icon/geticon/fc0f660daee147afb4a56c64e12bde6486b73e39/icons/html-5.svg) | ![css icon](https://github.com/get-icon/geticon/raw/master/icons/css-3.svg) | ![javascript icon](https://raw.githubusercontent.com/get-icon/geticon/fc0f660daee147afb4a56c64e12bde6486b73e39/icons/javascript.svg) | ![react icon](https://raw.githubusercontent.com/get-icon/geticon/fc0f660daee147afb4a56c64e12bde6486b73e39/icons/react.svg) | ![mui icon](https://raw.githubusercontent.com/get-icon/geticon/fc0f660daee147afb4a56c64e12bde6486b73e39/icons/material-ui.svg) |

### Back End

| Node.js                                                                                                                      | PostgreSQL                                                                              | Express                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| ![nodejs icon](https://raw.githubusercontent.com/get-icon/geticon/fc0f660daee147afb4a56c64e12bde6486b73e39/icons/nodejs.svg) | ![postgresql icon](https://github.com/get-icon/geticon/raw/master/icons/postgresql.svg) | ![express icon](https://raw.githubusercontent.com/get-icon/geticon/fc0f660daee147afb4a56c64e12bde6486b73e39/icons/express.svg) |

Icons obtained from https://github.com/get-icon/geticon
