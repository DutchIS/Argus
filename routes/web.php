<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\MonitorController;
use App\Http\Controllers\Status\OverviewController;
use Illuminate\Support\Facades\Route;

Route::get('/', [OverviewController::class, 'index'])->name('status.overview');

Route::middleware('auth')->group(function () {
    /* Dashboard */
    Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard.index');
        
        Route::prefix('monitors')->group(function () {
            Route::get('/', [MonitorController::class, 'index'])->name('monitors.index');
            Route::get('/{monitor}', [MonitorController::class, 'monitor'])->name('monitors.view');
            Route::post('/{monitor}/maintainance', [MonitorController::class, 'maintainance'])->name('monitors.maintainance.create');
        });
    });
    
    /* Profile */
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

require __DIR__.'/auth.php';
