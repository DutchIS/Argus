<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Incident;
use App\Models\Monitor;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {
        $services_down = Incident::where('finished_at', null)->count();
        $services_up = Monitor::count() - $services_down;
        $downtime = 0;
        $incidents = Incident::get();

        foreach($incidents as $incident) {
            $downtime += $incident->created_at->diffInMinutes($incident->finished_at);
        }

        return Inertia::render('Dashboard/Index', [
            'services_up' => $services_up,
            'services_down' => $services_down,
            'downtime' => $downtime
        ]);
    }
}
