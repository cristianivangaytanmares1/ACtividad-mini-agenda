// ============================================================
// RECURSOS QUE SE GUARDARÁN EN CACHE
// ============================================================

// Array de recursos que queremos cachear.
//
// Estos archivos se guardarán en la memoria caché del navegador
// para que la aplicación pueda acceder a ellos incluso
// cuando no exista conexión a Internet.
const assets = [

    // Página principal de la aplicación.
    "index.html",

    // Archivo CSS utilizado por la aplicación.
    "styles/styles.min.css",

    // Archivo JavaScript principal de la aplicación.
    "js/app.js"

];


// ============================================================
// INSTALACIÓN DEL SERVICE WORKER
// ============================================================

// Instalamos el Service Worker.
//
// "self" representa al propio Service Worker,
// permitiendo acceder a su contexto y eventos.
self

    // Escuchamos el evento "install", que ocurre
    // cuando el Service Worker se instala.
    .addEventListener("install", installEvent => {

        // waitUntil() mantiene el proceso de instalación
        // activo hasta que termine la operación indicada.
        installEvent.waitUntil(

            // Abrimos o creamos una caché llamada
            // "my-todo-list-0".
            caches.open("my-todo-list-0").then(cache => {

                // Agregamos todos los recursos definidos
                // anteriormente en el array "assets"
                // a la caché.
                cache.addAll(assets)

            })

        )

    });


// ============================================================
// EVENTO FETCH
// ============================================================

// Escuchamos todas las solicitudes de recursos
// que realiza la aplicación.
self.addEventListener("fetch", fetchEvent => {

    // Esta línea está comentada originalmente.
    // Se podría utilizar para mostrar en consola
    // cada evento de solicitud.
    //console.log("📡 Fetch Event: ", fetchEvent);


    // respondWith() permite controlar la respuesta
    // que recibirá el navegador para cada solicitud.
    fetchEvent.respondWith(

        // Buscamos primero la solicitud dentro
        // de la caché.
        caches.match(fetchEvent.request).then(res => {

            // Esta línea también está comentada originalmente.
            // Podría utilizarse para mostrar en consola
            // información sobre los recursos encontrados
            // en la caché.
            //console.log("  📦 From Cache: ", caches, caches.match(fetchEvent.request), res);


            // Si el recurso existe en la caché,
            // devolvemos ese recurso.
            //
            // Si no existe (res es undefined),
            // realizamos una solicitud normal
            // a Internet mediante fetch().
            return res || fetch(fetchEvent.request)

        })

    )

})