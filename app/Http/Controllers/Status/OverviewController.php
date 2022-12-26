<?php

namespace App\Http\Controllers\Status;

use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Models\Incident;
use App\Models\Ping;
use Inertia\Inertia;

class OverviewController extends Controller
{
    public function index() {
        $groups = Group::get();

        foreach($groups as $group) {
            $monitors = [];

            foreach($group->monitors as $monitor) {
                $monitor->online = Incident::where('monitor_id', $monitor->id)->where('finished_at', null)->count() == 0 ? true : false;
                $monitor->ping = Ping::where('monitor_id', $monitor->id)->orderBy('id', 'desc')->first()['ms'];
                $incident_days = [];
                
                for($i = 30; $i >= 0; $i--) {
                    $incident_count = 0;

                    foreach($monitor->incidents as $incident) {
                        if ($incident->created_at->diffInDays(now()) == $i) {
                            $incident_count++;
                        }
                    }

                    array_push($incident_days, $incident_count);
                }

                $monitor->incident_days = $incident_days;
                array_push($monitors, $monitor);
            }

            $group->monitors = $monitors;
        }
        
        return Inertia::render('Status/Index', [
            'groups' => $groups
        ]);
    }
}
