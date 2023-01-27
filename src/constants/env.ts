export const YOUTUBE_API_KEYS = [
  "AIzaSyAHet0rDx61UiGSq_WGbz33Q85uSajJoOo",
  "AIzaSyC3WL28JS-QaJQBsquBCanL5hoABX0iCA4",
  "AIzaSyBCDWV74ZsM12PmZdDiZatf1MmspjpOruk",
  "AIzaSyDWBxH4aGEhoyilOgJwu3Hi1GlnmhRlTtk",
  "AIzaSyD5D_LhzKDIOgeWP4goZeqT-w-KDe15rL8",
];

const isDev = false;

// DEVELOP
export const API_URL = isDev
  ? "http://localhost:8000"
  : "https://play-dot-it.herokuapp.com";
export const APP_DOMAIN = isDev
  ? "http://localhost:1234"
  : "https://playdotit.netlify.app";
