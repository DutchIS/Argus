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
        $incidents_ongoing = Incident::where('finished_at', null)->count();

        foreach($groups as $group) {
            $monitors = [];

            foreach($group->monitors as $monitor) {
                $monitor->online = Incident::where('monitor_id', $monitor->id)->where('finished_at', null)->count() == 0 ? true : false;
                
                $pings = Ping::where('monitor_id', $monitor->id)->get();
                $avg_ping = 0;
                foreach($pings as $ping) {
                    $avg_ping += $ping->ms;
                }
                $monitor->ping = round($avg_ping / $pings->count(), 0);
                $incident_days = [];
                
                for($i = 30; $i >= 0; $i--) {
                    $day = (object) [
                        'downtime' => 0,
                        'incidents' => []
                    ];

                    foreach($monitor->incidents as $incident) {
                        if ($incident->created_at->diffInDays(now()) == $i) {
                            $downtime = $incident->created_at->diffInMinutes($incident->finished_at);
                            $day->downtime += $downtime;
                            
                            array_push($day->incidents, [
                                'downtime' => $downtime,
                            ]);
                        }
                    }

                    array_push($incident_days, $day);
                }

                $monitor->incident_days = $incident_days;
                array_push($monitors, $monitor);
            }

            $group->monitors = $monitors;
        }
        
        return Inertia::render('Status/Index', [
            'groups' => $groups,
            'incidents_ongoing' => $incidents_ongoing
        ]);
    }
}
