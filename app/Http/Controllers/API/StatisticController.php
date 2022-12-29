<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Incident;
use Illuminate\Support\Facades\Cache;

class StatisticController extends Controller
{
    public function uptime() {
        $uptime = Cache::get('api:avg_uptime');

        if (!$uptime) {
            $downtime = 0;
            $incidents = Incident::get();

            foreach($incidents as $incident) {
                $downtime += $incident->created_at->diffInMinutes($incident->finished_at);
            }

            $uptime = round((100 - ((100 * $downtime) / 43800)) * 100000) / 100000;
            Cache::add('api:avg_uptime', $uptime, now()->addMinutes(15));
        }

        return response([
            'month' => $uptime
        ], 200);
    }
}
