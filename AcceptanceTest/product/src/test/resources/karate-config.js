function fn() {
    const config = {
        headers: {},
        urlBase: 'http://127.0.0.5:3002/api/v1/',
    };

    karate.configure('connectTimeout', 5000);
    karate.configure('readTimeout', 5000);
    karate.configure('ssl', true);
    return config;
}