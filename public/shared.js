import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, update, onValue, onDisconnect, push, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyApsAaSIFEh1BhRgl_sFPssLMOPLjnOqaE",
    authDomain: "late-light.firebaseapp.com",
    databaseURL: "https://late-light-default-rtdb.firebaseio.com",
    projectId: "late-light",
    storageBucket: "late-light.firebasestorage.app",
    messagingSenderId: "785315819458",
    appId: "1:785315819458:web:feda9dc1fb93f497f6b05b",
    measurementId: "G-C4HKZB6L22"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Helper: Format Seconds to MM:SS or HH:MM:SS
const formatTimeStr = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

// Helper: Get Week Key (YYYY-W)
const getWeekKey = (d) => {
    const s = new Date(d.getFullYear(), 0, 1);
    const w = Math.ceil((((d - s) / 86400000) + s.getDay() + 1) / 7);
    return d.getFullYear() + '-' + w;
};

export { db, ref, set, update, onValue, onDisconnect, push, get, formatTimeStr, getWeekKey };
