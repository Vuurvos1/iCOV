# Functional Programming

## 📚 Table of contents

- [🤔 About](#-About)
  - [🔮 See it live](#-See-it-live)
  - [🛠 Build with](#-Build-with)
  - [🗃 The Data](#-The-data)
- [🔧 Installing the project](#-Installing-and-using-the-project)
  - [🚀 Launch the project](#-Launch-the-project)
  - [🌺 SCSS](#-SCSS)
  - [🌍 Deploying](#-Deploying)
- [🗺️ License](#%EF%B8%8F-license)

## 🤔 About

![Screenshot op app](https://raw.githubusercontent.com/wiki/Vuurvos1/iCOV/img/liveApp02.png)

iCov (infobox for Crimineel en Onverklaarbaar Vermogen) has a partnership with various government organizations to trace unlawful obtained assets so they can be confiscated and returned. However, with the tools they currently have, it can be quite hard to find suspicious relations.
We want to make sure that partners can analyze the relationship scan with as little time and effort as possible. This means we have to look at how to make the current solution better or think of something new. The new solution must be user-friendly and interactive.

Check out the [wiki](https://github.com/vuurvos1/icov/wiki) of this repository to find out more detailed information about the project and process.

### 🔮 See it live

The site is also hosted on Surge, note that it can take a while to launch the app.
See it here: [icovdev.surge.sh](http://icovdev.surge.sh/)

### 🛠 Build with

- Svelte
- D3.js
- Node.js
- NPM packages

* Node was only used to process the dataset

### 🗃 The Data

There where 3 "fake data" datasets delivered by iCov since the data they work privacy-sensitive data

- Nodes
  Contains information about people, companies and real estate
- Edges
  This dataset contains information on how the Nodes in the Node dataset are connected and related
- ANB
  A combination of the 2 above datasets

These three datasets can be combined using the `SID` variables which are available in all three datasets.

Originally these datasets were delivered in an XML format, I converted these to JSON and removed some of the variables that wouldn't be needed for better performance later while using the data. No variables where modified or added

## 🔧 Installing and using the project

First of all, make sure you have [**Node.js**](https://nodejs.org), **NPM** and [**Git**](https://git-scm.com/) installed

1. Choose or make a new directory to clone the project to
2. Clone the repository
   `git@github.com:Vuurvos1/iCOV.git`
3. Cd into the project folder
4. Run `npm install` to install the needed npm packages
5. Run `npm run build` to build all needed files

### 🚀 Launch the project

You can start the project using `npm start`
or run `npm run dev` if you are a developer

By default, the project will be hosted on [**localhost:5000**](http://localhost:5000)

### 🌺 SCSS

If you want to use SCSS you can!
add `lang="scss"` to your style elements and SCSS away

```html
<style lang="scss">
  /* use scss here */
</style>
```

### 🌍 Deploying

Deploying the project can be easily done using Surge, run:

```bash
surge public my-project.surge.sh
```

after building the project using:

```bash
npm run build
```

and you should be good to go

## 🗺️ License

Author: [Vuurvos1](https://github.com/Vuurvos1), license by [MIT](https://github.com/Vuurvos1/iCOV/blob/main/LICENSE)
