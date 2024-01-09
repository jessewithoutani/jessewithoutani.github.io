function changeTheme(background, foreground) {
    let root = document.querySelector(":root");
    root.style.setProperty("--background-color", background);
    root.style.setProperty("--foreground-color", foreground);
}