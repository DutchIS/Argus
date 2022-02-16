<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{env('APP_Name')}}</title>
        <link rel="stylesheet" href="/css/app.css">
        <link rel="stylesheet" href="/css/fontawesome/css/all.css">
        <link rel="stylesheet" href="/css/fontawesome/css/fontawesome.css">
        <link rel="stylesheet" href="/css/fontawesome/css/regular.css">
        <link rel="stylesheet" href="/css/fontawesome/css/solid.css">
    </head>
    <body class="bg-gray-50 w-1/2 mx-auto">
        <header class="py-16 flex justify-between items-center">
            <img src="https://cdn.dutchis.net/dutchis/banner-black.svg" class="w-48"/>
            <a href="#" class="p-4 bg-gray-200 shadow-lg rounded-lg">Get Notified</a>
        </header>
        <div>
            HALLOO <i class="fa-solid fa-user"></i>
        </div>
    </body>
</html>
