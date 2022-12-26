<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Monitor;

class Group extends Model
{
    use HasFactory;

    public function monitors() {
        return $this->hasMany(Monitor::class);
    }
}
