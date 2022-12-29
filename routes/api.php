<?php

use App\Http\Controllers\API\StatisticController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('stats')->group(function () {
    Route::get('/uptime', [StatisticController::class, 'uptime'])->name('api.stats.uptime');
});