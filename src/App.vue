<template>
  <router-view />
</template>

<style lang="scss">
@import "./assets/reset.min.css";
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

html,
body {
  width: 100%;
  font-size: 14px;
  color: #000316;
  min-height: 100%;
  font-family: "Poppins", sans-serif;
}

.container {
  width: 960px;
  height: 100%;
  margin: 0 auto;
}

/* Global form style */
form {
  .group {
    display: flex;
    flex-direction: column;

    &:not(:last-child) {
      margin-bottom: 15px;
    }

    span {
      margin-bottom: 5px;
      color: #555;
    }
  }

  input[type="text"],
  textarea,
  input[type="password"] {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    border-radius: 3px;
    box-sizing: border-box;
    border: 1px solid #eee;
    font-family: "Poppins";
    font-size: 12px;
    transition: 250ms all ease;

    &:focus {
      border-color: #aaa;
    }
  }

  textarea {
    padding: 15px;
    min-height: 150px;
    resize: none;
  }

  button {
    padding: 8px 20px;
    border-radius: 3px;
    background-color: #ff374a;
    color: #fff;
    font-weight: 500;
    border: none;
    font-family: "Poppins";
    margin-right: auto;
    cursor: pointer;
    text-transform: uppercase;

    &:hover {
      background-color: #de2638;
    }
  }
}

/* Global page titles */
#page-title {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;

  h1 {
    font-size: 28px;
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>
