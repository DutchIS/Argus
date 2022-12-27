<?php

use App\Models\Incident;
use App\Models\Monitor;
use App\Models\Ping as PingModel;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Http;
use JJG\Ping;

Artisan::command('monitors:run', function () {
    echo("running monitors\n");
    $monitors = Monitor::get();


    foreach($monitors as $monitor) {
        if ($monitor->type == 'http') {
            $start_time = microtime(true);

            try {
                Http::withoutVerifying()->get($monitor->destination);
            } catch (\Exception $e) {
                $runningIncidentCount = Incident::where('monitor_id', $monitor->id)->whereNull('finished_at')->count();

                if ($runningIncidentCount == 0) {
                    $incident = new Incident();
                    $incident->monitor_id = $monitor->id;
                    $incident->reason = "HTTP request to {$monitor->name} failed";
                    $incident->finished_at = null;
                    $incident->save();
                }

                continue;
            }

            $ms_time = (microtime(true) - $start_time) * 1000;
            $ping = round($ms_time, 0);
        
            $db_ping = new PingModel();
            $db_ping->monitor_id = $monitor->id;
            $db_ping->ms = $ping;
            $db_ping->save();

            $incidents = Incident::where('monitor_id', $monitor->id)->whereNull('finished_at')->get();

            foreach($incidents as $incident) {
                $incident->finished_at = now();
                $incident->save();
            }
        }

        if ($monitor->type == 'ping') {
            $ping = new \JJG\Ping($monitor->destination);
            $latency = $ping->ping();

            if (!$latency) {
                $runningIncidentCount = Incident::where('monitor_id', $monitor->id)->whereNull('finished_at')->count();

                if ($runningIncidentCount == 0) {
                    $incident = new Incident();
                    $incident->monitor_id = $monitor->id;
                    $incident->reason = "Could not ping {$monitor->name}";
                    $incident->finished_at = null;
                    $incident->save();
                }
            }

            if ($latency) {
                $db_ping = new PingModel();
                $db_ping->monitor_id = $monitor->id;
                $db_ping->ms = round($latency, 0);
                $db_ping->save();

                $incidents = Incident::where('monitor_id', $monitor->id)->whereNull('finished_at')->get();

                foreach($incidents as $incident) {
                    $incident->finished_at = now();
                    $incident->save();
                }
            }
        }
    }
    
    echo("finished running monitors\n");
})->purpose('run monitors');

Artisan::command('pings:prune', function () {
    echo("pruning old pings\n");
    $pings = Ping::get();

    foreach($pings as $ping) {
        if ($ping->created_at->diffInDays(now()) > 30) {
            $ping->delete();
        }
    }
    
    echo("finished pruning pings\n");
})->purpose('prune pings older than 30 days');
