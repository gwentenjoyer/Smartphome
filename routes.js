app.get("/", (request, response) => {
    // відправляємо відповіль
    response.send("<h2>Привіт від Express!</h2>");
    });