<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateMaintainanceRequest;
use App\Models\Incident;
use App\Models\Maintainance;
use App\Models\Monitor;
use Inertia\Inertia;

class MonitorController extends Controller
{
    public function index() {
        return Inertia::render('Monitors/index', [
            'monitors' => Monitor::paginate(),
        ]);
    }

    public function monitor(Monitor $monitor) {
        $incidents = Incident::where('monitor_id', $monitor->id)->get();
        $monitor['incidents'] = count($incidents);

        $monitor['downtime'] = 0;
        foreach($incidents as $incident) {
            $monitor['downtime'] += $incident->created_at->diffInMinutes($incident->finished_at);
        }

        return Inertia::render('Monitors/View/index', [
            'monitor' => $monitor,
            'maintainances' => Maintainance::where('monitor_id', $monitor->id)->get(),
        ]);
    }

    public function maintainance(CreateMaintainanceRequest $request, Monitor $monitor) {
        $body = $request->validated();

        $maintainance = new Maintainance();
        $maintainance->monitor_id = $monitor->id;
        $maintainance->title = $body['title'];
        $maintainance->description = $body['description'];
        $maintainance->start_at = $body['startAt'];
        $maintainance->end_at = $body['endAt'];
        $maintainance->save();

        return redirect()->route('monitors.view', $monitor->id);
    }
}
