<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'argus:user:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new user';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $name = $this->ask('What is the name of this user?');
        $email = $this->ask('What is the email of this user?');
        $password = $this->secret('What is the password of this user?');

        $this->table(
            ['User', 'Information'],
            [
                ['Email', $email],
                ['Name', $name],
                ['Password', '*********']
            ]
        );
        $this->newLine();

        if ($this->confirm("Is this information correct?")) {
            $user = new User();
            $user->password = Hash::make($password);
            $user->email = $email;
            $user->name = $name;
            $user->save();
            return Command::SUCCESS;
        }

        return Command::FAILURE;
    }
}
